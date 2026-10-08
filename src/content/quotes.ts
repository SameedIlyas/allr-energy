export interface QuoteImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface SlideImage extends QuoteImage {
  /** Short label shown under the photo. */
  caption?: string;
}

export interface Testimonial {
  /** Speaker, shown above the quote. Statement-only slides have none. */
  name?: string;
  role?: string;
  /** Quoted passages; rendered in quotation marks. */
  quotes?: readonly string[];
  /** ALLR's own statements, rendered without quotation marks. */
  statements?: readonly string[];
  /** Context of the photo / meeting, shown under the photo. */
  note?: string;
  images: readonly SlideImage[];
}

// Slides as published in the carousel on allr-energy.com, including the two closing site-selection slides.
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    name: 'Jennifer Granholm',
    role: '16th United States Secretary of Energy · National Press Club, Washington, DC, February 21, 2024',
    quotes: [
      '…using a 21st-century industrial strategy to bring manufacturing back to America after years of offshoring…',
      '…In a closed-down factory in Hamtramck, Michigan, we’re building electric vehicles. In a formerly shuttered plant in Lordstown, Ohio, we’re building EV batteries…',
    ],
    images: [{ src: '/assets/img55.jpg', alt: 'Meeting with Jennifer Granholm', width: 207, height: 140 }],
  },
  {
    name: 'Jennifer Granholm',
    role: '16th United States Secretary of Energy · National Press Club, Washington, DC, February 21, 2024',
    quotes: [
      '…So, as we fully deploy our tax credits and the grants and the loans to boost domestic production of these technologies, we’re also working hand-in-hand with our colleagues at the U.S. Trade Representative’s office, and Treasury, and Commerce, and State, of course, the White House…',
      '…If you’re using taxpayer money to develop a technology, you’ll be expected to manufacture it right here in America…',
    ],
    note: '(Here, while and after discussing a green- & brownfield options with then Governor of Michigan, Jennifer Granholm)',
    images: [{ src: '/assets/img53.jpg', alt: 'Jennifer Granholm', width: 130, height: 120 }],
  },
  {
    name: 'Haley Barbour',
    role: 'Governor of the State of Mississippi, Jan. 13th 2004 – Jan. 10th 2012',
    quotes: [
      '…No one achieves greatness alone. It is through collaboration and teamwork that we accomplish extraordinary things…',
    ],
    note: '(Here, we are after structuring manufacturing scenarios with then Governor Barbour)',
    images: [{ src: '/assets/img51.jpg', alt: 'Meeting with Haley Barbour', width: 181, height: 135 }],
  },
  {
    name: 'Barack Obama',
    role: 'President of the US, Jan. 20th, 2009 – Jan. 20th, 2017',
    quotes: [
      '…Global investors have taken notice and are accelerating their investment in the United States, already home to more foreign direct investment than any other country in the world…',
    ],
    images: [{ src: '/assets/img43.jpg', alt: 'Barack Obama', width: 181, height: 146 }],
  },
  {
    name: 'Governor Strickland',
    role: 'State of Ohio, Jan. 8th, 2007 – Jan. 10th, 2011',
    quotes: [
      '…Energy is at the core of Ohio’s economic and environmental health: energy built our past, energy sustains our present, and energy holds the promise of an even brighter future…',
    ],
    images: [{ src: '/assets/img45.jpg', alt: 'Governor Strickland', width: 181, height: 135 }],
  },
  {
    name: 'Rudolf Albert Scharping',
    role: 'Former Federal Minister of Defense for Germany',
    quotes: [
      'Those who invest in new jobs should be better off than those who put their money in a bank for speculative purposes.',
    ],
    note: '(With minister Scharping at an MIT event.)',
    images: [{ src: '/assets/b-husenberg.jpg', alt: 'MIT event with Rudolf Scharping', width: 1024, height: 524 }],
  },
  {
    statements: [
      'The optimal region for you to select as manufacturing site will decisively support your investment financing and other business needs.',
    ],
    images: [{ src: '/assets/img47.jpg', alt: 'Incentive package breakdown', caption: 'Incentive package', width: 155, height: 233 }],
  },
  {
    statements: [
      'Your optimal location for producing products and doing business requires a multi-factorial decision process that we are very well positioned to support you in. We will make a highly profitable difference for you!',
    ],
    // The hall photo uses the larger copy from the services page; the riverside site only exists at thumbnail size.
    images: [
      { src: '/assets/services/6.jpg', alt: 'Empty production hall', caption: 'Production hall', width: 457, height: 387 },
      { src: '/assets/img54.jpg', alt: 'Aerial view of a 57 acre riverside site', caption: '57 acre riverside site', width: 155, height: 98 },
    ],
  },
];
