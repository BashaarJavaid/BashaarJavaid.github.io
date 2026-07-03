'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { profile } from '@/data/profile';
import styles from './Loader.module.scss';

export default function Loader() {
  const [done, setDone] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true);
      return;
    }

    const state = { value: 0 };
    const tween = gsap.to(state, {
      value: 100,
      duration: 1.8,
      ease: 'power3.inOut',
      onUpdate: () => {
        const v = Math.round(state.value);
        if (counterRef.current) counterRef.current.textContent = String(v).padStart(3, '0');
        if (barRef.current) barRef.current.style.width = `${v}%`;
      },
      onComplete: () => setDone(true),
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div className={`${styles.loader} ${done ? styles.done : ''}`} aria-hidden={done}>
      <div className={styles.top}>
        <span className="mono-label">Portfolio — {new Date().getFullYear()}</span>
        <span className="mono-label">{profile.location}</span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.name}>
          <span>
            {profile.wordmark}
            <sup>®</sup>
          </span>
        </h1>
        <div className={styles.counter} ref={counterRef}>
          000
        </div>
      </div>
      <div className={styles.bar} ref={barRef} />
    </div>
  );
}
