# Malik Bashaar Javaid — Portfolio

Phantom.land-inspired portfolio website. Dark WebGL-driven experience with an
infinite draggable project grid, custom shader post-processing (distortion +
vignette), and an abstract particle hero.

## Stack

- **Next.js** (App Router, static export)
- **React Three Fiber / Three.js** — WebGL grid + particles
- **Custom GLSL shaders** — distortion pass, vignette, particle material
- **GSAP** — tweens and eases
- **Lenis** — smooth scrolling
- **SCSS modules**

## Development

```bash
npm install
npm run dev
```

## Build (static export)

```bash
npm run build   # outputs to ./out
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
static export and publishes it to GitHub Pages
(`bashaarjavaid.github.io`). The repo must be named
`bashaarjavaid.github.io` (user site) and Pages must be set to
"GitHub Actions" as the source.

## Swapping the particle hero to a portrait photo

The About page particle hero pulls positions from a pluggable geometry source
(`src/webgl/particleSources.ts`). To switch from the abstract blob to a
Phantom-style face particle system:

1. Add a portrait photo and its depth map to `public/face/` (e.g.
   `portrait.jpg` + `depth.jpg` — depth maps can be generated with any
   monocular depth model).
2. In `src/webgl/ParticleHero.tsx`, replace `createAbstractSource()` with
   `createDepthMapSource('/face/portrait.jpg', '/face/depth.jpg')` — the
   source is already implemented.

## Content

All copy, projects, and experience live in `src/data/` — edit those files to
update the site without touching components.
