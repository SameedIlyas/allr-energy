import Image from 'next/image';
import HomeHero from '@/components/home/HomeHero';
import Testimonials from '@/components/home/Testimonials';
import { TESTIMONIALS } from '@/content/quotes';
import styles from './home.module.css';

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <main>
        {/* Welcome text, verbatim from allr-energy.com */}
        <section id="about" className={`section ${styles.tight} ${styles.about}`}>
          <div className={`container ${styles.aboutGrid}`}>
            <Image
              src="/assets/handshake-wide.jpg"
              alt="Business partners shaking hands"
              width={2274}
              height={835}
              sizes="(max-width: 1240px) 100vw, 1200px"
              className={styles.aboutImg}
            />

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

          </div>
        </section>

        {/* Testimonials, then the closing site-selection slides, as on allr-energy.com */}
        <section className={`section section-soft ${styles.tight}`}>
          <div className="container">
            <Testimonials items={TESTIMONIALS} />
          </div>
        </section>
      </main>
    </>
  );
}
