export interface ServiceImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Service {
  id: string;
  title: string;
  listTitle?: string;
  bullets: readonly string[];
  note?: string;
  /** Shown under the title, as on allr-energy.com/services.php. */
  image?: ServiceImage;
  /** Shown in its own column beside the text, with a caption (energy efficiency only). */
  asideImage?: ServiceImage & { caption: string };
}

export const SERVICES_INTRO =
  'Value: All undertakings specifically catered to foreign business expansion such as, but not limited to';

/** The arrow graphic that sits beside the incentive steps. */
export const INCENTIVE_ARROW: ServiceImage = { src: '/assets/services/2.jpg', alt: '', width: 93, height: 273 };

export const INCENTIVE_STEPS = [
  'Define Business Needs',
  'Derive Incentive Suite',
  'Accept Customized Offers',
  'Negotiate Optimal Solution',
  'Finalize Development Contract',
] as const;

export const SERVICES: readonly Service[] = [
  {
    id: 'business-establishment',
    title: 'Consulting for international business establishment',
    listTitle: 'Establish your Business Plan w/ details such as',
    bullets: [
      'Country / Local Is-Analysis, Business Climate',
      'Market entry plan',
      'UVP',
      'Sales strategy (Top Line & Bottom Line, pricing)',
      'Possible M&A, access partnerships',
      'Factory planning',
    ],
    note: 'For sustainably profitable business growth.',
    image: { src: '/assets/services/1.jpg', alt: 'Consulting meeting', width: 403, height: 341 },
  },
  {
    id: 'incentives',
    title: 'Optimal Incentives Package: Tailor Made Top Value',
    listTitle: 'Incentive examples',
    bullets: [
      'Federal, State',
      'Taxes',
      'Local Financing / Investment',
      'Tariffs, FTZ',
      'Infrastructure (on- and offsite)',
      'Manufacturing Site and Plant Construction',
    ],
    note: 'Collectively weighing in on your core business objectives.',
  },
  {
    id: 'site-selection',
    title: 'Site Selection',
    bullets: [
      'Relevant business climate',
      'Personnel',
      'Taxes, tax reductions, tariffs',
      'Cash incentives',
      'Transportation modes, distances',
      'Main Supplier location',
      'Main customer locations',
    ],
    image: { src: '/assets/services/3.jpg', alt: 'Aerial view of an industrial site by a river', width: 403, height: 341 },
  },
  {
    id: 'development-contract',
    title: 'Development Contract',
    bullets: [],
    note: 'The Company’s investment and operational strategy is aligned with bankable, multimodal, high-value incentives extended by multiple local and federal institutions.',
    image: { src: '/assets/services/4.jpg', alt: 'Delegation and negotiation meeting', width: 403, height: 341 },
  },
  {
    id: 'transportation',
    title: 'Multi-modal Transportation Analysis',
    bullets: [
      'Competitors locations',
      'Suppliers exchange',
      'Customer unit circulation',
      'Cost/Needs optimized transportation modes, distances / units',
    ],
    image: { src: '/assets/services/5.png', alt: 'Ship, rail, road and air transport', width: 400, height: 400 },
  },
  {
    id: 'industrial-engineering',
    title: 'Industrial Engineering',
    bullets: [
      'Conducive placement and structuring of departments',
      'Process optimization, in-& external logistics',
      'Machine placement',
      'Sustainably efficient installations, utilities, constructions, meeting local legal standards',
    ],
    image: { src: '/assets/services/6.jpg', alt: 'Empty modern production hall', width: 457, height: 387 },
  },
  {
    id: 'energy-efficiency',
    title: 'Energy Efficient Plant and Operations',
    bullets: [
      'Climatic Conditions of Manufacturing Site',
      'Plant construction and layout',
      'Processes',
      'Machinery',
      'Transportation modes and distances',
      'Renewable Energy Sources, own and external',
      'Own or proximity to low cost renewable energy sources',
    ],
    note: 'Sustainably low energy consumption w/o business limitations.',
    // Framed from the full-resolution campus render (logo-top.jpg); the original 7.jpg is a 500px thumbnail.
    asideImage: {
      src: '/assets/services/7-framed.jpg',
      alt: '3D layout depicting energy efficient operations',
      width: 1210,
      height: 1024,
      caption: '3D Layout depicting energy efficient operations',
    },
  },
];
