import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { INCENTIVE_ARROW, INCENTIVE_STEPS, SERVICES, SERVICES_INTRO, type Service } from '@/content/services';
import styles from './services.module.css';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Consulting, incentives, site selection, development contracts, transportation analysis, industrial engineering and energy efficient operations.',
};

function IncentiveSteps() {
  return (
    <div className={styles.steps}>
      <Image
        src={INCENTIVE_ARROW.src}
        alt={INCENTIVE_ARROW.alt}
        width={INCENTIVE_ARROW.width}
        height={INCENTIVE_ARROW.height}
        className={styles.arrow}
      />
      <ol>
        {INCENTIVE_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

// Layout mirrors allr-energy.com/services.php: two columns, each service is title → image → list → note.
function ServiceBlock({ service }: { service: Service }) {
  return (
    <article id={service.id} className={styles.block}>
      <h2 className={styles.title}>{service.title}</h2>

      {service.image && (
        <Image
          src={service.image.src}
          alt={service.image.alt}
          width={service.image.width}
          height={service.image.height}
          quality={90}
          sizes="(max-width: 900px) 100vw, 403px"
          className={styles.img}
        />
      )}

      {service.imagePair && (
        <div className={styles.pair}>
          {service.imagePair.map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              quality={90}
              sizes="(max-width: 900px) 50vw, 260px"
              style={{ flexGrow: img.width / img.height }}
            />
          ))}
        </div>
      )}

      {service.id === 'incentives' && <IncentiveSteps />}

      {service.listTitle && <h3 className={styles.listTitle}>{service.listTitle}</h3>}
      {service.bullets.length > 0 && (
        <ul className={styles.list}>
          {service.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
          <li>Etc.</li>
        </ul>
      )}
      {service.note && <p className={styles.note}>{service.note}</p>}
    </article>
  );
}

function AsideFigure({ image }: { image: NonNullable<Service['asideImage']> }) {
  return (
    <figure className={styles.figure}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        quality={90}
        sizes="(max-width: 900px) 100vw, 560px"
      />
      <figcaption>{image.caption}</figcaption>
    </figure>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Services" />

      <main className="section">
        <div className="container">
          <p className={styles.intro}>{SERVICES_INTRO}</p>

          <div className={styles.grid}>
            {SERVICES.map((s) =>
              s.asideImage ? (
                [<ServiceBlock key={s.id} service={s} />, <AsideFigure key={`${s.id}-figure`} image={s.asideImage} />]
              ) : (
                <ServiceBlock key={s.id} service={s} />
              ),
            )}
          </div>
        </div>
      </main>
    </>
  );
}
