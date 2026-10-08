import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import styles from './expertise.module.css';

export const metadata: Metadata = {
  title: 'Expertise',
  description: 'Permanently held in-house expertise: decades of management+ level experience & academics.',
};

const EEE_URL =
  'https://www.energie-effizienz-experten.de/fuer-private-bauherren/finden-sie-experten-in-ihrer-naehe/suchergebnis';

// The delivery pillars section ("From a gap in your team to a shipped build.") on the AI page.
const AI_DELIVERY_HREF = '/ai#delivery';

const AI_ITEMS: readonly string[] = [
  'C-level AI & Software Engineering',
  'Ops-level AI & Automation Implementation: RAG Knowledge Agents, Workflow Automation, Document Extraction & OCR, Computer Vision',
  'Ops-level Full-Stack Web & SaaS Engineering: SaaS MVPs, Feature Development, API Development & Integration, Codebase Audits, QA & Test Automation',
  'Ops-level Enterprise Systems & Legacy Integration: Legacy Database / CMS Integration, Data Migration & ETL',
  'Ops-level Vertical Platform Builds: Legal Case Management, Real Estate Listings (IDX), LIMS / Compliance Tooling',
];

// As listed on www.allr-energy.com/expertise.php (exact duplicates merged), plus the NUST degrees.
const ITEMS: readonly { label: string; href?: string }[] = [
  { label: 'C-level Investment Grade Renewable Energy Projects Permitting => EPC, Small Lot & Serial Manufacturing, Mass Production' },
  { label: 'C-level International Business Establishment, Market Entry Planning and Execution, Recruiting, ROE, NPV, Investment, Finance' },
  { label: 'C-level Manufacturing Plant EPC, Incentives Optimization, Development Contract Structuring' },
  { label: 'C-level Consulting' },
  { label: 'C-level M&A' },
  { label: 'C-level P&L' },
  { label: 'Ops-level Project Management' },
  { label: 'Ops-level Industrial Engineering' },
  { label: 'Ops-level Defense Planning' },
  { label: 'Ops-level Publication' },
  { label: 'MSc. Management of Technology/Sloan Fellow, MIT' },
  { label: 'MSc. Mechanical Engineering & Business Administration (Dipl. Wirt.-Ing.), University of Paderborn, Germany' },
  { label: 'MBA, UMass Lowell' },
  { label: 'Honors Degree in English' },
  { label: 'BE Mechanical Engineering, NUST, Islamabad, Gold Medalist' },
  { label: 'BE Software Engineering, NUST, Islamabad, Best Adjudged Industrial Project' },
  { label: 'European Adhesive Bonding Engineer (Klebfachingenieur), IFAM Bremen' },
  { label: 'Certified Energy Efficiency Expert (Energie Effizienz Experte), DENA' },
  { label: 'Energy Efficiency Experts (EEE) Residential Buildings', href: EEE_URL },
  { label: 'Certified Energy Efficiency Expert (Energie Effizienz Experte) incl. non-residential buildings, DENA' },
];

export default function ExpertisePage() {
  return (
    <>
      <PageHero title="Expertise" />

      <main className="section">
        <div className={`container ${styles.content}`}>
          <section className={styles.group} aria-labelledby="ai-expertise">
            <h2 id="ai-expertise" className={styles.heading}>
              AI &amp; Software Engineering
            </h2>
            <ul className={styles.list}>
              {AI_ITEMS.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
            <Link href={AI_DELIVERY_HREF} className="btn btn-primary">
              See how we deliver <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </section>

          <h2 className={styles.heading}>
            Permanently held In-house expertise (decades of management+ level experience &amp; academics)
          </h2>
          <ul className={styles.list}>
            {ITEMS.map(({ label, href }) => (
              <li key={label}>
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                ) : (
                  label
                )}
              </li>
            ))}
          </ul>

          <p className={styles.external}>External Expertise readily accessible as and when needed.</p>
          <p className={styles.external}>Virtually unlimited in scale and scope!</p>
        </div>
      </main>
    </>
  );
}
