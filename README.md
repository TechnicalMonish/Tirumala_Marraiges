# Tirumala Marriage Service & Suppliers

Website for Tirumala Marriage Service & Suppliers: wedding planning, event management and Vedic ceremonies in Tirumala and Tirupati since 1991.

## Tech stack

- [React 18](https://react.dev/) and [Vite 5](https://vitejs.dev/)
- [Tailwind CSS 3](https://v3.tailwindcss.com/) through PostCSS and Autoprefixer, alongside the site stylesheets in `src/styles/`
- Google Fonts (Tiro Telugu, Mukta) and Font Awesome icons from their CDNs
- Hosting on [Vercel](https://vercel.com/)

## Getting started

Requires Node.js 18 or later.

```bash
npm install       # install dependencies
npm run dev       # start the development server
npm run build     # build the production site into dist/
npm run preview   # serve the production build locally
```

## Configuration

One production URL feeds the canonical link, the Open Graph and Twitter tags, the JSON-LD business data, `robots.txt` and `sitemap.xml`. `vite.config.js` resolves it once per build and uses the first value that is set:

1. `SITE_URL`: an explicit origin, for example `https://www.example.com`
2. `VERCEL_PROJECT_PRODUCTION_URL`: provided by Vercel on every build, including previews
3. the default domain declared in `vite.config.js`

`index.html` marks these URLs with `%SITE_URL%`, and the build generates `robots.txt` and `sitemap.xml`. When a custom domain is added to the Vercel project, the next deployment uses it automatically; no code change is needed. Vercel passes its system variables to the build only while "Enable access to System Environment Variables" is checked in the project's Environment Variables settings; otherwise the build uses the default domain.

To build for a different origin locally:

```bash
SITE_URL=https://www.example.com npm run build
```

## Editing content

Page copy lives in `src/content/`. Phone, email, address and map links are in `src/content/business.js`; the WhatsApp number and the enquiry message format are in `src/lib/whatsapp.js`. Keep the business details in the JSON-LD block of `index.html` in step with them.

## Project structure

```text
index.html             page shell: SEO, Open Graph and structured data
public/images/         every image the site serves
src/
  main.jsx             entry point
  App.jsx              page composition
  components/
    layout/            navbar, footer, WhatsApp button
    sections/          page sections, in page order
    ui/                shared pieces: ornaments, photo, reveal, legal dialog
  content/             copy and data: business, navigation, about, offerings, legal
  context/             overlay and scroll-lock state
  hooks/               scroll reveal and media query hooks
  lib/                 image URLs, WhatsApp links, class name helper
  styles/              site stylesheets; index.css is the entry
tailwind.config.js     theme colours, fonts and content paths
postcss.config.js      Tailwind and Autoprefixer
vite.config.js         build settings, site URL, robots.txt and sitemap.xml
```

## Deployment

Vercel builds the site with the Vite preset (`npm run build`, output `dist/`). Pushes to `main` deploy to production; other branches get preview deployments, which keep their canonical and share URLs pointed at production.

## Images

- Keep every image in `public/images/`, named in kebab-case after what it shows, for example `tirumala-temple-vimana-sunset.webp`.
- Use WebP for photos. Add each photo's pixel size to `IMG_SIZE` in `src/lib/images.js` so its space is reserved while it loads, and reference it with `img('file-name.webp')`.
- `og-image.jpg` is the link preview for WhatsApp and social sites: 1200 × 630 JPEG, sRGB, no transparency, under 300 KB (aim for 200 KB), with the important content inside the central 630 × 630 area so square crops still work.
- `apple-touch-icon.png` is the 180 × 180 home-screen icon and needs an opaque background.
- Link previews are cached. After changing the share image, ask the platforms to fetch it again, for example with the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).
