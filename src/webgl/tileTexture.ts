import * as THREE from 'three';
import type { GridTile } from './gridTiles';

const TEX_W = 768;
const TEX_H = 960;

function cssFont(varName: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return value || fallback;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Renders a project/brand tile (cover art + typography) to a canvas and
 * returns it as a THREE texture. Text is drawn at texture resolution so
 * titles stay crisp inside the WebGL grid.
 */
export async function createTileTexture(tile: GridTile): Promise<THREE.CanvasTexture> {
  await document.fonts.ready;

  const canvas = document.createElement('canvas');
  canvas.width = TEX_W;
  canvas.height = TEX_H;
  const ctx = canvas.getContext('2d')!;

  const display = cssFont('--font-anton', 'Anton, impact, sans-serif');
  const mono = cssFont('--font-mono-plex', 'monospace');

  ctx.fillStyle = '#242424';
  ctx.fillRect(0, 0, TEX_W, TEX_H);

  if (tile.kind === 'project' && tile.cover) {
    try {
      const img = await loadImage(tile.cover);
      ctx.drawImage(img, 0, 0, TEX_W, TEX_H);
    } catch {
      // keep flat background if the cover fails to load
    }

    // Bottom gradient for text legibility.
    const grad = ctx.createLinearGradient(0, TEX_H * 0.55, 0, TEX_H);
    grad.addColorStop(0, 'rgba(24, 24, 24, 0)');
    grad.addColorStop(1, 'rgba(24, 24, 24, 0.92)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, TEX_H * 0.55, TEX_W, TEX_H * 0.45);

    ctx.fillStyle = '#e8e6e1';
    ctx.font = `400 64px ${display}`;
    ctx.textBaseline = 'alphabetic';
    const title = tile.title.toUpperCase();
    // Shrink long titles to fit.
    let size = 64;
    while (size > 30 && ctx.measureText(title).width > TEX_W - 96) {
      size -= 4;
      ctx.font = `400 ${size}px ${display}`;
    }
    ctx.fillText(title, 48, TEX_H - 96);

    ctx.font = `400 21px ${mono}`;
    ctx.fillStyle = 'rgba(232, 230, 225, 0.62)';
    ctx.fillText(tile.meta.toUpperCase(), 48, TEX_H - 52);
  } else {
    // Brand tile: stacked oversized display type.
    ctx.fillStyle = '#1c1c1c';
    ctx.fillRect(0, 0, TEX_W, TEX_H);
    ctx.strokeStyle = 'rgba(232, 230, 225, 0.25)';
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, TEX_W - 48, TEX_H - 48);

    const lines = tile.lines ?? [tile.title.toUpperCase()];
    ctx.fillStyle = '#e8e6e1';
    const lineSize = 148;
    ctx.font = `400 ${lineSize}px ${display}`;
    ctx.textAlign = 'left';
    const totalH = lines.length * lineSize * 0.94;
    let y = (TEX_H - totalH) / 2 + lineSize * 0.82;
    for (const line of lines) {
      ctx.fillText(line, 64, y);
      y += lineSize * 0.94;
    }

    ctx.font = `400 22px ${mono}`;
    ctx.fillStyle = 'rgba(232, 230, 225, 0.62)';
    ctx.fillText(tile.meta.toUpperCase(), 64, TEX_H - 72);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}
