import Image from 'next/image';
import type { AiIndustry } from '@/content/ai-industries';
import styles from '@/app/ai/ai.module.css';

export default function IndustryCard({ industry }: { industry: AiIndustry }) {
  return (
    <article id={industry.id} className={styles.card} aria-labelledby={`ai-${industry.id}`}>
      <div className={styles.cardHead}>
        <Image
          src={industry.image.src}
          alt={industry.image.alt}
          width={118}
          height={122}
          quality={95}
          className={styles.cardImg}
        />
        <h3 id={`ai-${industry.id}`} className={styles.cardTitle}>
          {industry.title}
        </h3>
      </div>
      {industry.tagline && <p className={styles.tagline}>{industry.tagline}</p>}
      <ul className={`check-list ${styles.list}`}>
        {industry.services.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </article>
  );
}
