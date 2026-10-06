'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CTA_LABEL, NAV_ITEMS } from '@/content/site';
import { useLanguage, type Lang } from '../LanguageProvider';
import Logo from './Logo';
import styles from './SiteHeader.module.css';

const LANGS: readonly Lang[] = ['de', 'en'];
const SCROLL_THRESHOLD = 24;

function isActive(pathname: string, href: string): boolean {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  // The menu remembers the path it was opened on, so navigating closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean) => setOpenOn(next ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenOn(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className={`${styles.header} ${solid ? styles.solid : ''}`}>
      <div className={`container ${styles.bar}`}>
        <Logo />

        <nav className={styles.nav} aria-label="Main">
          <ul className={styles.links}>
            {NAV_ITEMS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.link} ${isActive(pathname, href) ? styles.active : ''}`}
                  aria-current={isActive(pathname, href) ? 'page' : undefined}
                >
                  {label[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <div className={styles.lang} role="group" aria-label="Language">
            {LANGS.map((code) => (
              <button
                key={code}
                type="button"
                className={lang === code ? styles.langActive : undefined}
                aria-pressed={lang === code}
                onClick={() => setLang(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <Link href="/contact" className={`btn btn-primary btn-sm ${styles.cta}`}>
            {CTA_LABEL[lang]} <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`${styles.mobile} ${open ? styles.mobileOpen : ''}`} hidden={!open}>
        <ul className="container">
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={isActive(pathname, href) ? styles.active : undefined}>
                {label[lang]}
              </Link>
            </li>
          ))}
          <li className={styles.mobileCta}>
            <Link href="/contact" className="btn btn-primary">
              {CTA_LABEL[lang]} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
