import type { Metadata } from 'next';
import { profile, experience, leadership, education, skills } from '@/data/profile';
import AboutHero from '@/components/about/AboutHero';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'About',
  description: profile.summary,
};

export default function AboutPage() {
  return (
    <div>
      <AboutHero />

      <section className={styles.intro}>
        <span className="mono-label">Profile</span>
        <p className={styles.introText}>{profile.summary}</p>
      </section>

      <section className={styles.block}>
        <h2 className={`display ${styles.blockHeading}`}>Experience</h2>
        <div className={styles.timeline}>
          {experience.map((e) => (
            <div key={e.company} className={styles.entry}>
              <div className={styles.entryMeta}>
                <span className={`display ${styles.entryCompany}`}>{e.company}</span>
                <span className="mono-label">{e.period}</span>
                <span className="mono-label">{e.location}</span>
              </div>
              <div>
                <p className={styles.entryRole}>{e.role}</p>
                <ul className={styles.entryBullets}>
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={`display ${styles.blockHeading}`}>Leadership</h2>
        <div className={styles.timeline}>
          {leadership.map((l) => (
            <div key={l.org} className={styles.entry}>
              <div className={styles.entryMeta}>
                <span className={`display ${styles.entryCompany}`}>{l.org}</span>
                <span className="mono-label">{l.period}</span>
              </div>
              <div>
                <p className={styles.entryRole}>{l.role}</p>
                <ul className={styles.entryBullets}>
                  {l.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={`display ${styles.blockHeading}`}>Education</h2>
        <div className={styles.timeline}>
          <div className={styles.entry}>
            <div className={styles.entryMeta}>
              <span className={`display ${styles.entryCompany}`}>{education.school}</span>
              <span className="mono-label">{education.graduation}</span>
              <span className="mono-label">{education.location}</span>
            </div>
            <div>
              <p className={styles.entryRole}>{education.degree}</p>
              <ul className={styles.entryBullets}>
                {education.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={`display ${styles.blockHeading}`}>Skills</h2>
        {skills.map((g) => (
          <div key={g.group} className={styles.skillGroup}>
            <span className="mono-label">{g.group}</span>
            <div className={styles.tags}>
              {g.items.map((item) => (
                <span key={item} className={styles.tag} data-cursor>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className={styles.contact}>
        <h2 className={`display ${styles.contactTitle}`}>
          <a href={`mailto:${profile.email}`} data-cursor>
            Let&apos;s talk →
          </a>
        </h2>
        <div className={styles.contactMeta}>
          <a href={`mailto:${profile.email}`} className={styles.contactLink} data-cursor>
            {profile.email}
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className={styles.contactLink} data-cursor>
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className={styles.contactLink} data-cursor>
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
