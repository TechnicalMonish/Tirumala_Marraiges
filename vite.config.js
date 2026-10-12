import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Default production origin, used when neither environment variable is set.
const DEFAULT_SITE_URL = 'https://tirumalamarraiges.vercel.app';

/**
 * Public origin of the site (no trailing slash). First match wins:
 *   1. SITE_URL                       explicit override, e.g. https://www.example.com
 *   2. VERCEL_PROJECT_PRODUCTION_URL  set by Vercel on every build (host only)
 *   3. DEFAULT_SITE_URL
 */
function resolveSiteUrl(env) {
  const candidate =
    env.SITE_URL ||
    (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : DEFAULT_SITE_URL);
  const siteUrl = candidate.trim().replace(/\/+$/, '');
  if (!/^https?:\/\/[^/\s]+$/.test(siteUrl)) {
    throw new Error(`SITE_URL must be an origin such as https://www.example.com (received "${candidate}").`);
  }
  return siteUrl;
}

/**
 * Fills the %SITE_URL% placeholders in index.html and emits robots.txt and
 * sitemap.xml, so every absolute URL the site publishes comes from one value.
 */
function siteMetadata(siteUrl) {
  return {
    name: 'site-metadata',
    transformIndexHtml: {
      // 'pre' runs before Vite scans the HTML for asset URLs.
      order: 'pre',
      handler: (html) => html.replaceAll('%SITE_URL%', siteUrl),
    },
    generateBundle() {
      const lastmod = new Date().toISOString().slice(0, 10);
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          '  <url>',
          `    <loc>${siteUrl}/</loc>`,
          `    <lastmod>${lastmod}</lastmod>`,
          '  </url>',
          '</urlset>',
          '',
        ].join('\n'),
      });
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), siteMetadata(resolveSiteUrl(process.env))],
});
