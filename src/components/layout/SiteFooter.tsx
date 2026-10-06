import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import { CONTACT, LEGAL_NAV, NAV_ITEMS } from '@/content/site';
import Logo from './Logo';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo />
          <p>
            Building profitable international businesses abroad to be sustainable &amp; energy efficient.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className={styles.heading}>Company</h2>
          <ul className={styles.list}>
            {NAV_ITEMS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href}>{label.en}</Link>
              </li>
            ))}
            <li>
              <Link href={LEGAL_NAV.href}>{LEGAL_NAV.label.en}</Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className={styles.heading}>Contact</h2>
          <ul className={styles.list}>
            <li className={styles.iconRow}>
              <Mail size={16} aria-hidden="true" />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li className={styles.iconRow}>
              <MapPin size={16} aria-hidden="true" />
              <span>
                ALLR ENERGY
                <br />
                {CONTACT.postal.join(', ')}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>
          &copy; {year} <strong>ALLR ENERGY</strong>, Profitable &amp; Sustainable
        </span>
        <Link href={LEGAL_NAV.href}>{LEGAL_NAV.label.en}</Link>
      </div>
    </footer>
  );
}
