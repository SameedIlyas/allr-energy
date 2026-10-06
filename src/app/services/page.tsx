import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { INCENTIVE_STEPS, SERVICES, SERVICES_INTRO, type Service } from '@/content/services';
import styles from './services.module.css';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Consulting, incentives, site selection, development contracts, transportation analysis, industrial engineering and energy efficient operations.',
};

function ServiceBlock({ service }: { service: Service }) {
  const hasImage = Boolean(service.image);
  return (
    <article id={service.id} className={`${styles.block} ${hasImage ? '' : styles.noImage}`}>
      <div>
        <h2 className={styles.title}>{service.title}</h2>

        {service.id === 'incentives' && (
          <ol className={styles.steps}>
            {INCENTIVE_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        )}

        {service.listTitle && <p className={styles.listTitle}>{service.listTitle}</p>}
        {service.bullets.length > 0 && (
          <ul className={styles.list}>
            {service.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
            <li>Etc.</li>
          </ul>
        )}
        {service.note && <p className={styles.note}>{service.note}</p>}
      </div>

      {service.image && (
        <figure className={styles.figure}>
          <Image
            src={service.image.src}
            alt={service.image.alt}
            width={service.image.width}
            height={service.image.height}
            quality={90}
            sizes="(max-width: 900px) 100vw, 480px"
          />
          {service.id === 'energy-efficiency' && <figcaption>3D Layout depicting energy efficient operations</figcaption>}
        </figure>
      )}
    </article>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Services" lead={`${SERVICES_INTRO}:`} />

      <main className="section">
        <div className="container">
          {SERVICES.map((s) => (
            <ServiceBlock key={s.id} service={s} />
          ))}
        </div>
      </main>
    </>
  );
}
