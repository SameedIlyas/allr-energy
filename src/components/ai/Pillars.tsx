import { AI_PILLARS, AI_PILLARS_TITLE } from '@/content/ai-pillars';
import styles from './Pillars.module.css';

export default function Pillars() {
  return (
    <section id="delivery" className={`section ${styles.section}`} aria-labelledby="pillars-title">
      <div className="container">
        <div className="section-head">
          <h2 id="pillars-title" className="section-title">
            {AI_PILLARS_TITLE}
          </h2>
        </div>

        <div className={styles.grid}>
          {AI_PILLARS.map((pillar) => (
            <article key={pillar.id} className={styles.card} aria-labelledby={`pillar-${pillar.id}`}>
              <div className={styles.head}>
                <span className={styles.index}>{pillar.index}</span>
                <h3 id={`pillar-${pillar.id}`} className={styles.title}>
                  {pillar.title}
                </h3>
              </div>
              <p className={styles.blurb}>{pillar.blurb}</p>
              <ul className={styles.tags} aria-label="Focus areas">
                {pillar.tags.map((tag) => (
                  <li key={tag} className="chip">
                    {tag}
                  </li>
                ))}
              </ul>
              <ul className={styles.services}>
                {pillar.services.map((s) => (
                  <li key={s.name}>
                    <span>{s.name}</span>
                    <span className={styles.timeline}>{s.timeline}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
