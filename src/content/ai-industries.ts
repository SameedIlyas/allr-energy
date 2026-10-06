export type IndustryId = 'construction' | 'manufacturing' | 'engineering' | 'logistics' | 'legal' | 'real-estate';

export interface AiIndustry {
  id: IndustryId;
  title: string;
  tagline: string;
  /** Card photo; 4:5-ish crop works best. */
  image: { src: string; alt: string };
  services: readonly string[];
}

export const AI_INDUSTRIES: readonly AiIndustry[] = [
  {
    id: 'construction',
    title: 'Construction',
    tagline: 'From drawing set to bid, without the manual takeoff.',
    image: { src: '/assets/ai/construction.jpg', alt: 'Construction site with cranes at sunset' },
    services: [
      'AI quantity takeoff from drawings',
      'Estimating built on your cost data',
      'Spec and addendum intelligence',
      'RFI and submittal automation',
      'Site photo to progress reporting',
      'Permit package automation',
    ],
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    tagline: 'Quote-to-order automation for custom and engineer-to-order manufacturers.',
    image: { src: '/assets/ai/manufacturing.jpg', alt: 'Robotic arms on a factory production line' },
    services: [
      'CPQ readiness assessment',
      'Quote generation from RFQs and specs',
      'BOM and routing automation',
      'Vision-based quality control',
      'ERP integration (SAP, NetSuite, Epicor, Infor)',
    ],
  },
  {
    id: 'engineering',
    title: 'Engineering',
    tagline: 'Your engineering rules, captured and automated.',
    image: { src: '/assets/ai/engineering.jpg', alt: 'Industrial plant with an engineer’s hard hat' },
    services: [
      'Automated 2D drawing generation',
      'CAD automation from product configurations',
      'Design rule and configuration logic capture',
      'Drawing data extraction and cataloging',
      'Engineering document intelligence',
    ],
  },
  {
    id: 'logistics',
    title: 'Logistics & Supply Chain',
    tagline: 'The back office of freight, automated end to end.',
    image: { src: '/assets/ai/logistics.jpg', alt: 'Container ship and port cranes at sunset' },
    services: [
      'Trade document extraction (BOL, invoices, customs)',
      'Freight payment audit and recovery',
      'Automated spot quoting from your rate data',
      'Carrier and vendor onboarding',
      'Ops inbox and exception handling',
    ],
  },
  {
    id: 'legal',
    title: 'Legal',
    tagline: 'Platforms and pipelines for high-volume practices.',
    image: { src: '/assets/ai/legal.jpg', alt: 'Hand shielding blocks with a protection emblem' },
    services: [
      'Client intake and document extraction',
      'Court form and filing preparation',
      'Custom case management platforms',
      'Practice system integration (Aderant, Elite, Clio)',
      'Deadline and notice monitoring',
    ],
  },
  {
    id: 'real-estate',
    title: 'Real Estate & Property',
    tagline: 'Leases, loan files and due diligence, read by machines, reviewed by your team.',
    image: { src: '/assets/ai/real-estate.jpg', alt: 'Office towers seen from street level' },
    services: [
      'Lease abstraction and portfolio data extraction',
      'Acquisition due diligence document review',
      'Loan package and underwriting doc processing',
      'Property management ops automation (invoices, COIs, work orders)',
      'Listing content and media automation',
      'CRM and PMS integration (Yardi, AppFolio, Buildium)',
    ],
  },
];
