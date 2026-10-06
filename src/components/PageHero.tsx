import type { ReactNode } from 'react';
import styles from './PageHero.module.css';

interface PageHeroProps {
  title: ReactNode;
  lead?: ReactNode;
}

/** Plain slate title band shared by every inner page so the fixed header always sits on a dark background. */
export default function PageHero({ title, lead }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.content}`}>
        <h1 className={styles.title}>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}
      </div>
    </section>
  );
}
