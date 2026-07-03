'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { profile } from '@/data/profile';
import styles from '@/app/about/page.module.scss';

const ParticleHero = dynamic(() => import('@/webgl/ParticleHero'), { ssr: false });

export default function AboutHero() {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let gl = false;
    try {
      const canvas = document.createElement('canvas');
      gl = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
      gl = false;
    }
    setShowParticles(!reduced && gl);
  }, []);

  return (
    <div className={styles.hero}>
      {showParticles && (
        <div className={styles.heroCanvas}>
          <ParticleHero />
        </div>
      )}
      <div className={styles.heroContent}>
        <h1 className={`display ${styles.heroTitle}`}>About</h1>
        <div className={styles.heroMeta}>
          <span className="mono-label">{profile.name}</span>
          <span className="mono-label">{profile.tagline}</span>
          <span className="mono-label">{profile.location}</span>
        </div>
      </div>
    </div>
  );
}
