'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { createAbstractSource, type ParticleAttributes, type ParticleSource } from './particleSources';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;

  attribute vec3 aColor;
  attribute float aSeed;

  varying vec3 vColor;
  varying float vAlpha;

  // Simplex-style pseudo noise (cheap, good enough for ambient motion).
  vec3 hash3(vec3 p) {
    p = vec3(
      dot(p, vec3(127.1, 311.7, 74.7)),
      dot(p, vec3(269.5, 183.3, 246.1)),
      dot(p, vec3(113.5, 271.9, 124.6))
    );
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(
        mix(dot(hash3(i + vec3(0,0,0)), f - vec3(0,0,0)), dot(hash3(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
        mix(dot(hash3(i + vec3(0,1,0)), f - vec3(0,1,0)), dot(hash3(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x),
        u.y
      ),
      mix(
        mix(dot(hash3(i + vec3(0,0,1)), f - vec3(0,0,1)), dot(hash3(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
        mix(dot(hash3(i + vec3(0,1,1)), f - vec3(0,1,1)), dot(hash3(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x),
        u.y
      ),
      u.z
    );
  }

  void main() {
    vColor = aColor;

    vec3 pos = position;

    // Organic morph: displace along the normal-ish direction with noise.
    float n = noise(pos * 0.55 + uTime * 0.18);
    pos += normalize(pos) * n * 0.75;

    // Slow rotation driven by time + scroll.
    float angle = uTime * 0.06 + uScroll * 1.6;
    float c = cos(angle);
    float s = sin(angle);
    pos.xz = mat2(c, -s, s, c) * pos.xz;

    // Mouse repulsion in view space.
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vec2 toMouse = mv.xy - uMouse * 3.2;
    float dist = length(toMouse);
    float force = smoothstep(1.6, 0.0, dist);
    mv.xy += normalize(toMouse + 0.0001) * force * 0.9;

    gl_Position = projectionMatrix * mv;

    float size = mix(1.4, 3.4, aSeed);
    gl_PointSize = size * (140.0 / -mv.z) * 0.045 + size;
    vAlpha = mix(0.35, 0.95, aSeed) * (1.0 - force * 0.6);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.12, d);
    gl_FragColor = vec4(vColor, vAlpha * soft);
  }
`;

function ParticleCloud({ source }: { source: ParticleSource }) {
  const points = useRef<THREE.Points>(null);
  const [attrs, setAttrs] = useState<ParticleAttributes | null>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const smoothMouse = useRef(new THREE.Vector2(0, 0));
  const scrollRef = useRef(0);
  const { size } = useThree();

  useEffect(() => {
    let cancelled = false;
    source.load().then((a) => {
      if (!cancelled) setAttrs(a);
    });
    return () => {
      cancelled = true;
    };
  }, [source]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.set((e.clientX / size.width) * 2 - 1, -((e.clientY / size.height) * 2 - 1));
    };
    const onScroll = () => {
      scrollRef.current = window.scrollY / window.innerHeight;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [size]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uScroll: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useEffect(() => () => material.dispose(), [material]);

  useFrame(({ clock }) => {
    smoothMouse.current.lerp(mouse.current, 0.06);
    material.uniforms.uTime.value = clock.elapsedTime;
    material.uniforms.uMouse.value.copy(smoothMouse.current);
    material.uniforms.uScroll.value += (scrollRef.current - material.uniforms.uScroll.value) * 0.08;
  });

  if (!attrs) return null;

  return (
    <points ref={points} material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[attrs.positions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[attrs.colors, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[attrs.seeds, 1]} />
      </bufferGeometry>
    </points>
  );
}

export default function ParticleHero() {
  // Swap to createDepthMapSource('/face/portrait.jpg', '/face/depth.jpg')
  // for the phantom.land-style portrait particle effect.
  const source = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 720;
    return createAbstractSource(isMobile ? 6000 : 14000);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true }}
    >
      <ParticleCloud source={source} />
    </Canvas>
  );
}
