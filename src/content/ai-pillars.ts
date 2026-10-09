export interface AiPillar {
  id: 'ai' | 'web' | 'enterprise' | 'vertical';
  index: string;
  title: string;
  blurb: string;
  tags: readonly string[];
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
  },
  {
    id: 'web',
    index: '02',
    title: 'Full-Stack Web & SaaS Engineering',
    blurb:
      'MVPs, feature sprints, integrations, audits and test suites, on a modern stack or on whatever your client already runs.',
    tags: ['SaaS MVPs', 'APIs', 'Audits & QA'],
  },
  {
    id: 'enterprise',
    index: '03',
    title: 'Enterprise Systems & Legacy Integration',
    blurb:
      'The unglamorous, high-stakes work: extending legacy platforms and moving data between systems without losing a row.',
    tags: ['Legacy SQL', 'Data migration', 'ETL'],
  },
  {
    id: 'vertical',
    index: '04',
    title: 'Vertical Platform Builds',
    blurb:
      'Domain platforms for legal practices, real estate and regulated labs, built on delivery models we have already proven.',
    tags: ['Legal', 'Real estate', 'LIMS'],
  },
];
