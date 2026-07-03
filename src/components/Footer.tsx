import { profile } from '@/data/profile';
import Marquee from './Marquee';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.col}>
          <h3 className="mono-label">Contact</h3>
          <ul>
            <li>
              <a href={`mailto:${profile.email}`} className={styles.link} data-cursor>
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" className={styles.link} data-cursor>
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className={styles.link} data-cursor>
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.col}>
          <h3 className="mono-label">Location</h3>
          <ul>
            <li>{profile.location}</li>
          </ul>
        </div>
        <div className={styles.col}>
          <h3 className="mono-label">Currently</h3>
          <p className={styles.open}>Open to {profile.openTo}. Graduating May 2026.</p>
        </div>
      </div>
      <Marquee duration={30}>
        <span className={styles.wordmark}>
          {profile.wordmark}
          <sup>®</sup>&nbsp;
        </span>
      </Marquee>
      <div className={styles.meta}>
        <span className="mono-label">
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="mono-label">{profile.tagline}</span>
      </div>
    </footer>
  );
}
