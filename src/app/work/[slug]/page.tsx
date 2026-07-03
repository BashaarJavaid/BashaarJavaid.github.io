import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProject, nextProject } from '@/data/projects';
import styles from './page.module.scss';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.blurb,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = nextProject(slug);

  return (
    <article className="page">
      <div className={styles.hero}>
        <h1 className={`display ${styles.heroTitle}`}>{project.title}</h1>

        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <span className="mono-label">Year</span>
            <span className={styles.metaValue}>{project.year}</span>
          </div>
          <div className={styles.metaItem}>
            <span className="mono-label">Role</span>
            <span className={styles.metaValue}>{project.role}</span>
          </div>
          {project.client && (
            <div className={styles.metaItem}>
              <span className="mono-label">Client</span>
              <span className={styles.metaValue}>{project.client}</span>
            </div>
          )}
          <div className={styles.metaItem}>
            <span className="mono-label">Stack</span>
            <span className={styles.metaValue}>{project.tags.join(' · ')}</span>
          </div>
        </div>

        <p className={styles.blurb}>{project.blurb}</p>
      </div>

      <div className={styles.coverWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.cover} alt={`${project.title} cover art`} className={styles.cover} />
      </div>

      {project.metrics.length > 0 && (
        <div className={styles.metrics}>
          {project.metrics.map((m) => (
            <div key={m.label} className={styles.metric}>
              <div className={styles.metricValue}>{m.value}</div>
              <div className="mono-label">{m.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.body}>
        {project.sections.map((s) => (
          <section key={s.heading} className={styles.section}>
            <h2 className={`display ${styles.sectionHeading}`}>{s.heading}</h2>
            <div className={styles.sectionBody}>
              {s.body && <p>{s.body}</p>}
              {s.bullets && (
                <ul className={styles.bullets}>
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>

      {project.links.length > 0 && (
        <div className={styles.links}>
          {project.links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className={styles.linkBtn}
              data-cursor
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}

      <Link href={`/work/${next.slug}/`} className={styles.next} data-cursor>
        <span className={`mono-label ${styles.nextLabel}`}>Next project</span>
        <span className={`display ${styles.nextTitle}`}>{next.title} →</span>
      </Link>
    </article>
  );
}
