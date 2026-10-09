import Image from 'next/image';
import type { AiIndustry } from '@/content/ai-industries';
import styles from '@/app/ai/ai.module.css';

export default function IndustryCard({ industry }: { industry: AiIndustry }) {
  return (
    <article id={industry.id} className={styles.card} aria-labelledby={`ai-${industry.id}`}>
      <h3 id={`ai-${industry.id}`} className={styles.cardTitle}>
        {industry.title}
      </h3>
      <Image
        src={industry.image.src}
        alt={industry.image.alt}
        width={200}
        height={200}
        quality={95}
        className={styles.cardImg}
      />
      {industry.tagline && <p className={styles.tagline}>{industry.tagline}</p>}
      {/* Arrow bullets and the trailing "Add more…" match the Services page. */}
      <ul className={styles.list}>
        {industry.services.map((s) => (
          <li key={s}>{s}</li>
        ))}
        <li>Add more…</li>
      </ul>
    </article>
  );
}
