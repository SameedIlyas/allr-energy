import type { NextConfig } from 'next';

// Old PHP URLs from the original site, kept working for bookmarks and search engines.
const LEGACY_PAGES = ['services', 'expertise', 'contact', 'imprint'] as const;

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 95],
  },
  async redirects() {
    return [
      { source: '/index.php', destination: '/', permanent: true },
      ...LEGACY_PAGES.map((page) => ({ source: `/${page}.php`, destination: `/${page}`, permanent: true })),
    ];
  },
};

export default nextConfig;
