'use client';

import Link from 'next/link';
import { useLanguage } from '../LanguageProvider';
import SceneHero from './SceneHero';

const COPY = {
  en: {
    title:
      'Building profitable international businesses abroad to be sustainable and efficient, technologically and energy wise.',
    primary: 'AI Services',
    secondary: 'Contact',
    scroll: 'Scroll',
  },
  de: {
    title:
      'Aufbau profitabler internationaler Geschäfte im Ausland, nachhaltig und effizient, technologisch wie energetisch.',
    primary: 'KI-Leistungen',
    secondary: 'Kontakt',
    scroll: 'Scrollen',
  },
} as const;

export default function HomeHero() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <SceneHero
      title={t.title}
      scrollTarget="#about"
      scrollLabel={t.scroll}
      actions={
        <>
          <Link href="/ai" className="btn btn-primary">
            {t.primary}
          </Link>
          <Link href="/ai#project" className="btn btn-ghost">
            {t.secondary}
          </Link>
        </>
      }
    />
  );
}
