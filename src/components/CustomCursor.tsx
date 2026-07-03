'use client';

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.scss';

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let x = -100;
    let y = -100;
    let cx = -100;
    let cy = -100;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.classList.add(styles.visible);

      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor]');
      const dragZone = target.closest('[data-cursor-drag]');
      el.classList.toggle(styles.drag, !!dragZone);
      el.classList.toggle(styles.hover, !!interactive && !dragZone);
    };

    const onLeave = () => el.classList.remove(styles.visible);

    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.left = `${cx}px`;
      el.style.top = `${cy}px`;
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={styles.cursor} ref={ref} aria-hidden>
      <span className={styles.label}>Drag</span>
    </div>
  );
}
