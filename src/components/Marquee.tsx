import { ReactNode } from 'react';
import styles from './Marquee.module.scss';

interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  className?: string;
}

export default function Marquee({ children, duration = 24, className }: MarqueeProps) {
  return (
    <div
      className={`${styles.marquee} ${className ?? ''}`}
      style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      aria-hidden
    >
      {[0, 1].map((i) => (
        <div key={i} className={styles.track}>
          <span className={styles.item}>{children}</span>
        </div>
      ))}
    </div>
  );
}
