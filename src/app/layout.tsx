import type { Metadata, Viewport } from 'next';
import { Source_Sans_3 } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';

// Humanist corporate sans, close in feel to the Calibri used on allr-energy.com.
const sans = Source_Sans_3({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'ALLR ENERGY | Profitable & Sustainable International Expansion',
    template: '%s | ALLR ENERGY',
  },
  description:
    'ALLR ENERGY builds profitable international businesses abroad to be sustainable & energy efficient: market entry, incentives, site selection, industrial engineering and AI services.',
};

export const viewport: Viewport = {
  themeColor: '#1b2735',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body>
        <LanguageProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
