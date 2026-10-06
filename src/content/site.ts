import type { Lang } from '@/components/LanguageProvider';

export type Localized = Record<Lang, string>;

export interface NavItem {
  href: string;
  label: Localized;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { href: '/', label: { en: 'Home', de: 'Start' } },
  { href: '/services', label: { en: 'Services', de: 'Leistungen' } },
  { href: '/ai', label: { en: 'AI', de: 'KI' } },
  { href: '/expertise', label: { en: 'Expertise', de: 'Expertise' } },
  { href: '/contact', label: { en: 'Contact', de: 'Kontakt' } },
];

export const LEGAL_NAV: NavItem = {
  href: '/imprint',
  label: { en: 'Imprint / Privacy Policy', de: 'Impressum / Datenschutz' },
};

export const CONTACT = {
  email: 'info@allr-energy.com',
  website: 'www.allr-energy.com',
  postal: ['Postfach 1338', '23503 Luebeck', 'Germany'],
  registered: ['Dorfstrasse 45', '23628 Klempau', 'Germany'],
  director: 'Benjamin Bhaumick, Managing Director',
} as const;

export const CTA_LABEL: Localized = { en: 'Get in touch', de: 'Kontakt aufnehmen' };
