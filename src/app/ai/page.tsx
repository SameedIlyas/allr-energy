import type { Metadata } from 'next';
import IndustryCard from '@/components/ai/IndustryCard';
import Pillars from '@/components/ai/Pillars';
import ProjectBrief from '@/components/ai/ProjectBrief';
import PageHero from '@/components/PageHero';
import { AI_INDUSTRIES } from '@/content/ai-industries';
import styles from './ai.module.css';

export const metadata: Metadata = {
  title: 'AllR-AI',
  description:
    'AllR-AI: standardized and customized AI services for construction, manufacturing, engineering, logistics & supply chain and legal.',
};

export default function AiPage() {
  return (
    <>
      <PageHero
        title="AllR-AI"
        lead="Your all-in-one milieu to grow and upscale your business in today’s fast, hi-tech driven environment."
      />

      <main>
        <section id="industries" className={`section ${styles.page}`}>
          <div className="container">
            <div className={styles.head}>
              <p className={styles.intro}>
                We build smart and intelligent solutions for your business to grow through faster automated workflow and
                achieve more…
              </p>
              <h2 className="section-title">Standardized and customized AI services</h2>
              <p className="lead">
                Our specialized offerings combine tailor-made and standardized tools designed to cater to your unique
                needs and customized industry requirements.
              </p>
            </div>

            <div className={styles.grid}>
              {AI_INDUSTRIES.map((industry) => (
                <IndustryCard key={industry.id} industry={industry} />
              ))}
            </div>
          </div>
        </section>
        <Pillars />
        <ProjectBrief />
      </main>
    </>
  );
}
