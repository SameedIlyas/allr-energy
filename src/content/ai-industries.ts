export type IndustryId = 'construction' | 'manufacturing' | 'engineering' | 'logistics' | 'legal' | 'real-estate';

export interface AiIndustry {
  id: IndustryId;
  title: string;
  /** Optional one-liner under the title. */
  tagline?: string;
  /** Card photo; 4:5-ish crop works best. */
  image: { src: string; alt: string };
  services: readonly string[];
}

// Construction, logistics, manufacturing and engineering services per "ALLR-AI webpage conceptualization rev 1".
// Display order is set by the client: logistics, engineering, manufacturing, construction, real estate, legal.
export const AI_INDUSTRIES: readonly AiIndustry[] = [
  {
    id: 'logistics',
    title: 'Logistics',
    image: { src: '/assets/ai/logistics.jpg', alt: 'Container ship and port cranes at sunset' },
    services: [
      'Dynamic Route Optimization',
      'Last-Mile ETA Prediction',
      'Predictive Inventory Management',
      'Autonomous Warehouse Robotics',
      'Carton & Pallet Packing Optimization',
    ],
  },
  {
    id: 'engineering',
    title: 'Engineering',
    image: { src: '/assets/ai/engineering.jpg', alt: 'Industrial plant with an engineer’s hard hat' },
    services: [
      'Structural Load Simulation',
      'Material Science Discoveries',
      'Auto Code & Schematic Generation',
      'CAD Component Cataloging',
      'Compliance Audits',
    ],
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    image: { src: '/assets/ai/manufacturing.jpg', alt: 'Robotic arms on a factory production line' },
    services: [
      'Predictive Maintenance',
      'Tool Lifespan Forecasting',
      'Visual Quality Control',
      'Collaborative Robots (Cobots)',
      'Digital Twins & Factory Control',
      'Setup Time Optimization',
    ],
  },
  {
    id: 'construction',
    title: 'Construction',
    image: { src: '/assets/ai/construction.jpg', alt: 'Construction site with cranes at sunset' },
    services: [
      'Generative Design & BIM Optimization',
      'Delivery Notes Reconciliation',
      'Autonomous Machinery & Drones',
      'AI-Powered Drone Progress Reporting',
      'Risk & Safety Monitoring',
      'Project & Supply Chain Scheduling',
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
];
