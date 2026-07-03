import { projects } from '@/data/projects';
import { profile } from '@/data/profile';

export interface GridTile {
  id: string;
  kind: 'project' | 'brand';
  title: string;
  meta: string;
  lines?: string[];
  cover?: string;
  href?: string;
}

const projectTiles: GridTile[] = projects.map((p) => ({
  id: p.slug,
  kind: 'project',
  title: p.title,
  meta: `${p.year} — ${p.tags.slice(0, 3).join(' · ')}`,
  cover: p.cover,
  href: `/work/${p.slug}/`,
}));

const brandTiles: GridTile[] = [
  {
    id: 'brand-name',
    kind: 'brand',
    title: profile.wordmark,
    meta: profile.tagline,
    lines: ['BASHAAR', 'JAVAID', '®'],
    href: '/about/',
  },
  {
    id: 'brand-contact',
    kind: 'brand',
    title: 'Get in touch',
    meta: profile.email,
    lines: ['OPEN', 'TO', 'WORK'],
    href: '/about/',
  },
];

// Interleave brand cards into the grid like phantom.land does.
export const gridTiles: GridTile[] = [
  ...projectTiles.slice(0, 4),
  brandTiles[0],
  ...projectTiles.slice(4),
  brandTiles[1],
];
