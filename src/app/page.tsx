import Image from 'next/image';
import HomeHero from '@/components/home/HomeHero';
import Testimonials from '@/components/home/Testimonials';
import { LOCATION_IMAGES, LOCATION_STATEMENTS, TESTIMONIALS } from '@/content/quotes';
import styles from './home.module.css';

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <main>
        {/* Welcome text, verbatim from allr-energy.com */}
        <section id="about" className={`section ${styles.about}`}>
          <div className={`container ${styles.aboutGrid}`}>
            <div>
              <p className={styles.welcome}>
                Welcome to ALLR ENERGY, your reliable partner in expanding your business globally in today’s
                ever-expanding sphere of energy efficiency.
              </p>
              <p className={styles.body}>
                We aspire building sustainably profitable international business expansions for our clients, adhering
                in particular to the absolute of reduced energy needs. We do so through decades of international C-level
                executive decision making expertise, including full P&amp;L responsibility in world class corporations,
                e.g. heavy equipment manufacturers, investment-grade renewable energy power plant developers, global
                consumer goods serial manufacturing giants, make-to-order batch steel based manufacturers, OEM machinery
                manufacturers and more.
              </p>
              <p className={styles.body}>
                All this, by diligently employing an in-house top tier international educational foundation a.o. from
                MIT and Harvard University, as well as renowned German universities like the IFAM in Bremen, or the
                University of Paderborn, combined with external specialty expertise (as and when required).
              </p>
              <p className={styles.body}>
                We are dedicated to upholding sustainable profitability in all our business undertakings
                cradle-to-grave, and are well-versed in the scope of renewable energy investment-grade installation
                projects. Also, we employ decades of expansion and green- &amp; brownfield manufacturing plant, built
                and operations optimization experience.
              </p>
            </div>

            <Image
              src="/assets/handshake.jpg"
              alt="Business partners shaking hands"
              width={2454}
              height={1025}
              sizes="(max-width: 900px) 100vw, 520px"
              className={styles.aboutImg}
            />
          </div>
        </section>

        {/* Testimonials */}
        <section className="section section-soft">
          <div className="container">
            <Testimonials items={TESTIMONIALS} />
          </div>
        </section>

        {/* Location */}
        <section className="section">
          <div className="container">
            <div className={styles.locationText}>
              {LOCATION_STATEMENTS.map((s) => (
                <p key={s} className={styles.body}>
                  {s}
                </p>
              ))}
            </div>
            <div className={styles.locationImages}>
              {LOCATION_IMAGES.map((img) => (
                <figure key={img.src}>
                  <Image src={img.src} alt={img.alt} width={img.width} height={img.height} quality={95} />
                  <figcaption>{img.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
