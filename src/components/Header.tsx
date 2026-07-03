'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { profile } from '@/data/profile';
import styles from './Header.module.scss';

const links = [
  { href: '/', label: 'Work' },
  { href: '/about/', label: 'About' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo} data-cursor>
        BJ<sup>®</sup>
      </Link>
      <nav className={styles.nav}>
        {links.map((l) => {
          const active =
            l.href === '/' ? pathname === '/' || pathname.startsWith('/work') : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.link} ${active ? styles.active : ''}`}
              data-cursor
            >
              {l.label}
            </Link>
          );
        })}
        <a href={`mailto:${profile.email}`} className={styles.link} data-cursor>
          Contact
        </a>
      </nav>
    </header>
  );
}
