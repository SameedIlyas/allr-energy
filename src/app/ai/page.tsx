import type { Metadata } from 'next';
import IndustryCard from '@/components/ai/IndustryCard';
import Pillars from '@/components/ai/Pillars';
import ProjectBrief from '@/components/ai/ProjectBrief';
import SceneHero from '@/components/home/SceneHero';
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
      <SceneHero
        title="AllR-AI"
        lead="Your comprehensive partner to grow and upscale your business in today’s fast, hi-tech driven environment."
        scrollTarget="#industries"
        scrollLabel="Scroll"
      />

      <main>
        <section id="industries" className={`section ${styles.page}`}>
          <div className="container">
            <div className={styles.head}>
              <p className={styles.intro}>
                We build intelligent AI solutions efficiently for your business to grow sustainably, to increase
                productivity and to reduce cost.
              </p>
              <h2 className="section-title">Standardized and Customized AI Services</h2>
              <p className="lead">
                Our specialized offerings combine both tailor-made as well as standardized tools catering to your specific
                requirements.
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
