'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import gsap from 'gsap';
import { DistortionShader } from './DistortionShader';
import { createTileTexture } from './tileTexture';
import { gridTiles, type GridTile } from './gridTiles';

const COLS = 3;
const TILE_W = 3.1;
const TILE_H = 3.875;
const GAP = 0.5;
const CELL_W = TILE_W + GAP;
const CELL_H = TILE_H + GAP;
const ROWS = Math.ceil(gridTiles.length / COLS);
const GRID_W = COLS * CELL_W;
const GRID_H = ROWS * CELL_H;
const CAMERA_Z = 9;
const CAMERA_Z_DRAG = 12.5;

interface SharedState {
  scroll: THREE.Vector2;
  velocity: THREE.Vector2;
  ambient: THREE.Vector2;
  dragging: boolean;
  distortion: { value: number };
  hoveredId: string | null;
}

interface TileMeshProps {
  tile: GridTile;
  texture: THREE.Texture | null;
  basePos: [number, number];
  state: SharedState;
  onNavigate: (href: string) => void;
}

function TileMesh({ tile, texture, basePos, state, onNavigate }: TileMeshProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const downPos = useRef<{ x: number; y: number } | null>(null);

  useFrame(() => {
    const m = mesh.current;
    if (!m) return;

    // Wrap the tile position so the grid repeats infinitely in both axes.
    const span = GRID_W * 3;
    const spanV = GRID_H * 3;
    let x = basePos[0] + state.scroll.x + state.ambient.x;
    let y = basePos[1] + state.scroll.y + state.ambient.y;
    x = ((((x + span / 2) % span) + span) % span) - span / 2;
    y = ((((y + spanV / 2) % spanV) + spanV) % spanV) - spanV / 2;
    m.position.set(x, y, 0);

    // Hover response: scale + brightness.
    const hovered = state.hoveredId === tile.id && !state.dragging;
    const targetScale = hovered ? 1.045 : 1;
    m.scale.x += (targetScale - m.scale.x) * 0.12;
    m.scale.y += (targetScale - m.scale.y) * 0.12;

    if (material.current) {
      const target = hovered ? 1 : 0.82;
      const c = material.current.color;
      const next = c.r + (target - c.r) * 0.1;
      c.setRGB(next, next, next);

      // Fade in once the texture-backed material mounts.
      material.current.opacity += (1 - material.current.opacity) * 0.08;
    }
  });

  // Mount the mesh only once its texture exists so the shader is compiled
  // with the map in place (assigning a map to an already-compiled material
  // leaves the tile rendering as a flat white plane).
  if (!texture) return null;

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => {
        state.hoveredId = tile.id;
      }}
      onPointerOut={() => {
        if (state.hoveredId === tile.id) state.hoveredId = null;
      }}
      onPointerDown={(e) => {
        downPos.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        const d = downPos.current;
        downPos.current = null;
        if (!d || !tile.href) return;
        const dist = Math.hypot(e.clientX - d.x, e.clientY - d.y);
        if (dist < 8) onNavigate(tile.href);
      }}
    >
      <planeGeometry args={[TILE_W, TILE_H]} />
      <meshBasicMaterial
        ref={material}
        map={texture}
        color={new THREE.Color(0.82, 0.82, 0.82)}
        transparent
        opacity={0}
        toneMapped={false}
      />
    </mesh>
  );
}

/** Base positions for one 3x3 block, replicated in a 3x3 super-grid so the
 * wrapped positions always cover the viewport. */
function useBasePositions() {
  return useMemo(() => {
    const positions: { tile: GridTile; pos: [number, number]; key: string }[] = [];
    for (let bx = -1; bx <= 1; bx++) {
      for (let by = -1; by <= 1; by++) {
        gridTiles.forEach((tile, i) => {
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          // Offset alternate columns vertically for a staggered, phantom-like layout.
          const staggerY = col % 2 === 0 ? 0 : CELL_H * 0.5;
          const x = (col - (COLS - 1) / 2) * CELL_W + bx * GRID_W;
          const y = ((ROWS - 1) / 2 - row) * CELL_H + staggerY + by * GRID_H;
          positions.push({ tile, pos: [x, y], key: `${tile.id}-${bx}-${by}` });
        });
      }
    }
    return positions;
  }, []);
}

function GridScene({ onNavigate }: { onNavigate: (href: string) => void }) {
  const { gl, scene, camera, size } = useThree();
  const positions = useBasePositions();

  const state = useMemo<SharedState>(
    () => ({
      scroll: new THREE.Vector2(0, 0),
      velocity: new THREE.Vector2(0, 0),
      ambient: new THREE.Vector2(0, 0),
      dragging: false,
      distortion: { value: 0.12 },
      hoveredId: null,
    }),
    []
  );

  const [textures, setTextures] = useState<Map<string, THREE.Texture>>(new Map());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const entries = await Promise.all(
        gridTiles.map(async (tile) => [tile.id, await createTileTexture(tile)] as const)
      );
      if (!cancelled) setTextures(new Map(entries));
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Post-processing composer with the distortion + vignette pass.
  const { composer, distortionPass } = useMemo(() => {
    const composer = new EffectComposer(gl);
    composer.addPass(new RenderPass(scene, camera));
    const distortionPass = new ShaderPass(DistortionShader);
    composer.addPass(distortionPass);
    return { composer, distortionPass };
  }, [gl, scene, camera]);

  useEffect(() => {
    composer.setSize(size.width, size.height);
    composer.setPixelRatio(gl.getPixelRatio());
  }, [composer, size, gl]);

  useEffect(() => () => composer.dispose(), [composer]);

  // Drag / inertia / ambient mouse handling on the canvas element.
  useEffect(() => {
    const el = gl.domElement;
    let last: { x: number; y: number } | null = null;

    const worldPerPixel = () => {
      const persp = camera as THREE.PerspectiveCamera;
      const height = 2 * Math.tan((persp.fov * Math.PI) / 360) * persp.position.z;
      return height / el.clientHeight;
    };

    const onDown = (e: PointerEvent) => {
      state.dragging = true;
      last = { x: e.clientX, y: e.clientY };
      el.setPointerCapture(e.pointerId);
      gsap.to(camera.position, { z: CAMERA_Z_DRAG, duration: 0.7, ease: 'power3.out' });
      gsap.to(state.distortion, { value: 0.42, duration: 0.7, ease: 'power3.out' });
    };

    const onMove = (e: PointerEvent) => {
      // Ambient offset target from cursor position (moves grid subtly
      // opposite to the mouse).
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      state.ambient.set(-nx * 0.35, ny * 0.35);

      if (!state.dragging || !last) return;
      const scale = worldPerPixel();
      const dx = (e.clientX - last.x) * scale;
      const dy = (e.clientY - last.y) * scale;
      state.scroll.x += dx;
      state.scroll.y -= dy;
      state.velocity.set(dx, -dy);
      last = { x: e.clientX, y: e.clientY };
    };

    const endDrag = () => {
      if (!state.dragging) return;
      state.dragging = false;
      last = null;
      gsap.to(camera.position, { z: CAMERA_Z, duration: 1.1, ease: 'power3.inOut' });
      gsap.to(state.distortion, { value: 0.12, duration: 1.1, ease: 'power3.inOut' });
    };

    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);

    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);
    };
  }, [gl, camera, state]);

  useFrame(() => {
    // Inertia after release.
    if (!state.dragging) {
      state.scroll.x += state.velocity.x;
      state.scroll.y += state.velocity.y;
      state.velocity.multiplyScalar(0.94);
    }

    distortionPass.uniforms.uStrength.value = state.distortion.value;
    composer.render();
  }, 1);

  return (
    <>
      {positions.map(({ tile, pos, key }) => (
        <TileMesh
          key={key}
          tile={tile}
          texture={textures.get(tile.id) ?? null}
          basePos={pos}
          state={state}
          onNavigate={onNavigate}
        />
      ))}
    </>
  );
}

export default function InfiniteGrid({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <Canvas
      camera={{ position: [0, 0, CAMERA_Z], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      style={{ touchAction: 'none' }}
      onCreated={({ gl }) => {
        gl.setClearColor('#202020');
      }}
    >
      <GridScene onNavigate={onNavigate} />
    </Canvas>
  );
}
