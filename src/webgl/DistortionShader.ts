/**
 * Post-processing pass inspired by phantom.land's grid: radial barrel
 * distortion whose intensity is animated while dragging, plus a corner
 * vignette that pulls focus to the center of the viewport.
 */
export const DistortionShader = {
  uniforms: {
    tDiffuse: { value: null },
    uStrength: { value: 0.0 },
    uVignette: { value: 0.55 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uStrength;
    uniform float uVignette;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv - 0.5;
      float r2 = dot(uv, uv);

      // Barrel distortion with zoom compensation so edges never sample
      // outside the framebuffer.
      vec2 distorted = uv * (1.0 + uStrength * r2);
      distorted /= (1.0 + uStrength * 0.28);
      vec2 sampleUv = distorted + 0.5;

      vec4 color = texture2D(tDiffuse, sampleUv);

      float dist = length(uv);
      float vig = smoothstep(0.85, 0.32, dist);
      color.rgb *= mix(1.0 - uVignette, 1.0, vig);

      gl_FragColor = color;
    }
  `,
};
