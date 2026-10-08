export interface PillarService {
  name: string;
  timeline: string;
}

export interface AiPillar {
  id: 'ai' | 'web' | 'enterprise' | 'vertical';
  index: string;
  title: string;
  blurb: string;
  tags: readonly string[];
  services: readonly PillarService[];
}

export const AI_PILLARS_TITLE = 'From a gap in your team to a shipped build.';

// Content from the delivery pillars on devotrex.com.
export const AI_PILLARS: readonly AiPillar[] = [
  {
    id: 'ai',
    index: '01',
    title: 'AI & Automation Implementation',
    blurb:
      'Retrieval agents, automated workflows, document pipelines and computer vision. The AI work you have already sold, built properly and shipped on a fixed timeline.',
    tags: ['RAG agents', 'Workflows', 'OCR & vision'],
    services: [
      { name: 'RAG Knowledge Agent', timeline: '2–4 weeks' },
      { name: 'Workflow Automation Pack', timeline: '1–3 weeks' },
      { name: 'Document Extraction & OCR Pipeline', timeline: '3–6 weeks' },
      { name: 'LLM Internal Tool / Chatbot', timeline: '2–4 weeks' },
      { name: 'Computer Vision / Visual Data Extraction', timeline: '4–8 weeks' },
    ],
  },
  {
    id: 'web',
    index: '02',
    title: 'Full-Stack Web & SaaS Engineering',
    blurb:
      'MVPs, feature sprints, integrations, audits and test suites, on a modern stack or on whatever your client already runs.',
    tags: ['SaaS MVPs', 'APIs', 'Audits & QA'],
    services: [
      { name: 'SaaS MVP Build', timeline: '6–10 weeks' },
      { name: 'Feature Development (Ongoing)', timeline: 'Ongoing' },
      { name: 'API Development & Integration', timeline: '2–5 weeks per integration' },
      { name: 'Technical / Codebase Audit', timeline: '1–2 weeks' },
      { name: 'QA & Test Automation Setup', timeline: '2–4 weeks for the first suite' },
    ],
  },
  {
    id: 'enterprise',
    index: '03',
    title: 'Enterprise Systems & Legacy Integration',
    blurb:
      'The unglamorous, high-stakes work: extending legacy platforms and moving data between systems without losing a row.',
    tags: ['Legacy SQL', 'Data migration', 'ETL'],
    services: [
      { name: 'Legacy Database / CMS Integration', timeline: '4–8 weeks' },
      { name: 'Data Migration & ETL', timeline: '4–10 weeks' },
    ],
  },
  {
    id: 'vertical',
    index: '04',
    title: 'Vertical Platform Builds',
    blurb:
      'Domain platforms for legal practices, real estate and regulated labs, built on delivery models we have already proven.',
    tags: ['Legal', 'Real estate', 'LIMS'],
    services: [
      { name: 'Legal Case Management Platform', timeline: '8–12 weeks for an MVP' },
      { name: 'Real Estate Listings Platform (IDX)', timeline: '6–10 weeks' },
      { name: 'LIMS / Compliance Tooling', timeline: '8–14 weeks' },
    ],
  },
];
