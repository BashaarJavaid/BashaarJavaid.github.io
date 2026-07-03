'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { projects } from '@/data/projects';
import { profile } from '@/data/profile';
import styles from './WorkView.module.scss';

const InfiniteGrid = dynamic(() => import('@/webgl/InfiniteGrid'), { ssr: false });

type View = 'grid' | 'index';

export default function WorkView() {
  const router = useRouter();
  const [view, setView] = useState<View>('grid');
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    // Fall back to the index view when WebGL is unavailable or the user
    // prefers reduced motion.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let gl = false;
    try {
      const canvas = document.createElement('canvas');
      gl = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
      gl = false;
    }
    if (reduced || !gl) {
      setWebglOk(gl);
      setView('index');
    }
  }, []);

  const byYear = useMemo(() => {
    const groups = new Map<string, typeof projects>();
    for (const p of projects) {
      const list = groups.get(p.year) ?? [];
      list.push(p);
      groups.set(p.year, list);
    }
    return [...groups.entries()].sort((a, b) => Number(b[0]) - Number(a[0]));
  }, []);

  return (
    <section className={styles.section}>
      {view === 'grid' && webglOk && (
        <div className={styles.canvasWrap} data-cursor-drag>
          <InfiniteGrid onNavigate={(href) => router.push(href)} />
        </div>
      )}

      <div className={styles.toggle}>
        <button
          className={`${styles.toggleBtn} ${view === 'grid' ? styles.toggleActive : ''}`}
          onClick={() => setView('grid')}
          disabled={!webglOk}
          data-cursor
        >
          Grid
        </button>
        <button
          className={`${styles.toggleBtn} ${view === 'index' ? styles.toggleActive : ''}`}
          onClick={() => setView('index')}
          data-cursor
        >
          Index
        </button>
      </div>

      {view === 'index' && (
        <div className={styles.list}>
          <p className={`mono-label ${styles.listCount}`}>
            All projects — {projects.length}
          </p>
          {byYear.map(([year, items]) => (
            <div key={year} className={styles.yearGroup}>
              <div className={styles.year}>{year}</div>
              <div className={styles.rows}>
                {items.map((p) => (
                  <Link key={p.slug} href={`/work/${p.slug}/`} className={styles.row} data-cursor>
                    <span className={`display ${styles.rowTitle}`}>{p.title}</span>
                    <span className={`mono-label ${styles.rowMeta}`}>
                      {p.tags.slice(0, 2).join(' · ')}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'grid' && (
        <div className={styles.overlay}>
          <div className={styles.overlayRow}>
            <h1 className={`display ${styles.title}`}>
              {profile.tagline}
            </h1>
            <div className={styles.hint}>
              <p className="mono-label">Drag to explore</p>
              <p className="mono-label">{profile.subTagline}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
