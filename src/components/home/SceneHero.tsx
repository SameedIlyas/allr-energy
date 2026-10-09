'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useCallback, useState, type ReactNode } from 'react';
import styles from './SceneHero.module.css';

// three.js is browser-only and sizeable, so it is code-split and never server-rendered.
const HeroCanvas = dynamic(() => import('./hero-scene/HeroCanvas'), { ssr: false });

interface SceneHeroProps {
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  scrollTarget: string;
  scrollLabel: string;
}

/** Full-height hero with the 3D campus scene, shared by the home and AllR-AI pages. */
export default function SceneHero({ title, lead, actions, scrollTarget, scrollLabel }: SceneHeroProps) {
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
        <h1 className={styles.title}>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}
        {actions && <div className="btn-group">{actions}</div>}
      </div>

      <a href={scrollTarget} className={styles.scrollCue} aria-label={scrollLabel}>
        <ChevronDown size={20} aria-hidden="true" />
      </a>
    </section>
  );
}
