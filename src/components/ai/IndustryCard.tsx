import Image from 'next/image';
import { Building2, Cog, DraftingCompass, HardHat, Scale, Truck, type LucideIcon } from 'lucide-react';
import type { AiIndustry, IndustryIcon } from '@/content/ai-industries';
import styles from '@/app/ai/ai.module.css';

const ICONS: Record<IndustryIcon, LucideIcon> = {
  construction: HardHat,
  manufacturing: Cog,
  engineering: DraftingCompass,
  logistics: Truck,
  legal: Scale,
  'real-estate': Building2,
};

export default function IndustryCard({ industry }: { industry: AiIndustry }) {
  const Icon = ICONS[industry.id];
  return (
    <article id={industry.id} className={styles.card} aria-labelledby={`ai-${industry.id}`}>
      <div className={styles.cardTop}>
        <Image
          src={industry.image.src}
          alt={industry.image.alt}
          width={118}
          height={122}
          quality={95}
          className={styles.cardImg}
        />
        <div>
          <span className={styles.iconCircle} aria-hidden="true">
            <Icon size={20} strokeWidth={2.2} />
          </span>
          <h3 id={`ai-${industry.id}`} className={styles.cardTitle}>
            {industry.title}
          </h3>
          <p className={styles.tagline}>{industry.tagline}</p>
        </div>
      </div>
      <ul className={`check-list ${styles.list}`}>
        {industry.services.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </article>
  );
}
