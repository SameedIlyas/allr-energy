'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useLanguage } from '../LanguageProvider';
import styles from './HomeHero.module.css';

// three.js is browser-only and sizeable, so it is code-split and never server-rendered.
const HeroCanvas = dynamic(() => import('./hero-scene/HeroCanvas'), { ssr: false });

const COPY = {
  en: {
    title: 'Building profitable international businesses abroad to be sustainable & energy efficient.',
    primary: 'Services',
    secondary: 'Contact',
    scroll: 'Scroll',
  },
  de: {
    title: 'Aufbau profitabler internationaler Geschäfte im Ausland, nachhaltig & energieeffizient.',
    primary: 'Leistungen',
    secondary: 'Kontakt',
    scroll: 'Scrollen',
  },
} as const;

export default function HomeHero() {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const [sceneReady, setSceneReady] = useState(false);
  const onReady = useCallback(() => setSceneReady(true), []);

  return (
    <section className={styles.hero}>
      {/* Static fallback: the original 2D campus render, shown until WebGL is ready (or if it fails). */}
      <Image
        src="/assets/logo-top.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={75}
        className={`${styles.fallback} ${sceneReady ? styles.fallbackHidden : ''}`}
        loading="eager"
        fetchPriority="high"
      />
      <div className={`${styles.scene} ${sceneReady ? styles.sceneReady : ''}`}>
        <HeroCanvas onReady={onReady} />
      </div>
      <div className={styles.shade} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <h1 className={styles.title}>{t.title}</h1>
        <div className="btn-group">
          <Link href="/services" className="btn btn-primary">
            {t.primary}
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            {t.secondary}
          </Link>
        </div>
      </div>

      <a href="#about" className={styles.scrollCue} aria-label={t.scroll}>
        <ChevronDown size={20} aria-hidden="true" />
      </a>
    </section>
  );
}
