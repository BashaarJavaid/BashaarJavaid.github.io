/**
 * Pluggable geometry sources for the particle hero.
 *
 * The hero renders whatever a ParticleSource returns, so swapping the
 * abstract blob for a phantom.land-style face particle system later only
 * requires calling `createDepthMapSource()` with a portrait photo and its
 * depth map — no changes to the rendering component.
 */

export interface ParticleAttributes {
  /** xyz positions, length = count * 3 */
  positions: Float32Array;
  /** rgb colors, length = count * 3 */
  colors: Float32Array;
  /** per-particle random seed, length = count */
  seeds: Float32Array;
  count: number;
}

export interface ParticleSource {
  load(): Promise<ParticleAttributes>;
}

/**
 * Abstract source: particles scattered over a sphere surface with radial
 * jitter. The organic morphing motion comes from noise displacement in the
 * vertex shader, so the base shape stays simple.
 */
export function createAbstractSource(count = 14000, radius = 2.2): ParticleSource {
  return {
    async load() {
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const seeds = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        // Even distribution over a sphere (Fibonacci-ish via random gaussian).
        let x = gaussian();
        let y = gaussian();
        let z = gaussian();
        const len = Math.hypot(x, y, z) || 1;
        const r = radius * (0.82 + Math.random() * 0.36);
        x = (x / len) * r;
        y = (y / len) * r;
        z = (z / len) * r;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Monochrome palette with subtle per-particle variance.
        const shade = 0.62 + Math.random() * 0.38;
        colors[i * 3] = 0.91 * shade;
        colors[i * 3 + 1] = 0.9 * shade;
        colors[i * 3 + 2] = 0.88 * shade;

        seeds[i] = Math.random();
      }

      return { positions, colors, seeds, count };
    },
  };
}

/**
 * Depth-map source (phantom.land face technique): builds a 3D point cloud
 * from a 2D photo plus its depth map. Ready for when a portrait photo is
 * added — see README for the swap instructions.
 */
export function createDepthMapSource(
  imageUrl: string,
  depthUrl: string,
  options: { step?: number; width?: number; depthScale?: number } = {}
): ParticleSource {
  const { step = 3, width = 5, depthScale = 1.6 } = options;

  return {
    async load() {
      const [img, depth] = await Promise.all([loadImageData(imageUrl), loadImageData(depthUrl)]);

      const positions: number[] = [];
      const colors: number[] = [];
      const seeds: number[] = [];

      const aspect = img.height / img.width;
      const height = width * aspect;

      for (let py = 0; py < img.height; py += step) {
        for (let px = 0; px < img.width; px += step) {
          const i = (py * img.width + px) * 4;
          const alpha = img.data[i + 3];
          if (alpha < 32) continue;

          // Map depth pixel (nearest) to displacement along z.
          const dx = Math.min(depth.width - 1, Math.floor((px / img.width) * depth.width));
          const dy = Math.min(depth.height - 1, Math.floor((py / img.height) * depth.height));
          const di = (dy * depth.width + dx) * 4;
          const d = depth.data[di] / 255;

          positions.push(
            (px / img.width - 0.5) * width,
            (0.5 - py / img.height) * height,
            (d - 0.5) * depthScale
          );
          colors.push(img.data[i] / 255, img.data[i + 1] / 255, img.data[i + 2] / 255);
          seeds.push(Math.random());
        }
      }

      return {
        positions: new Float32Array(positions),
        colors: new Float32Array(colors),
        seeds: new Float32Array(seeds),
        count: seeds.length,
      };
    },
  };
}

function gaussian(): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

async function loadImageData(url: string): Promise<ImageData> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.crossOrigin = 'anonymous';
    el.onload = () => resolve(el);
    el.onerror = reject;
    el.src = url;
  });
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, img.width, img.height);
}
