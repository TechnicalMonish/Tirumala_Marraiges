# In-place React (Vite) port of the Tirumala marriage services landing

The single-file HTML landing has been converted in place to a Vite + React 18 app, with the original backed up to `.agents/tasks/react-inplace-conversion/original-index.html` (95,823 bytes, verbatim) and the top-level `images/` folder preserved alongside copies in `public/images/`. All page content, phone/WhatsApp/email, service lists, event cards, and the WhatsApp enquiry message template have been moved into `src/data.js` and `src/utils.js` so section components stay thin maps over data. The overlay-touching values the brief singled out (hero linear + radial, hero `<img>` eager/high-priority, nav top gradient, editorial `bg-black/45`) are preserved verbatim; no `0.22` or darkened radial crept in. Build is green per the implementer's record (50 modules in ~280 ms, zero errors), and the preview smoke test at 1280×720 and 390×844 shows one `<h1>`, no horizontal overflow, no failing requests, and the hamburger, services sheet, lightbox, and nav anchor interactions all wired up.

Watch for: a form-validation UX softening where the React port adds `noValidate` and only focuses invalid fields where the original relied on native tooltips — **confirmed, non-blocking** per the speed brief; and a `fetchpriority` lower-case attribute that React 18 will warn about in dev but renders correctly in the built HTML — **confirmed, cosmetic**.

**Verdict**: APPROVED

## High-level view

The scaffold is honestly in place. `package.json`, `vite.config.js` (with `base: './'`), the Vite entry `index.html`, `src/`, and `public/` all sit directly under the workspace root. No `react-site/` or `app/` subfolder exists. Dependencies are the lean set the brief asked for: `react`, `react-dom`, `@vitejs/plugin-react`, `vite` — no Vitest, no RTL, no `vite-imagetools`, no icon packages (Font Awesome stays on CDN, as does Tailwind). The built `dist/index.html` rewrites the source `<link rel="icon" href="/images/favicon.png">` to `./images/favicon.png`, so the site works under any subpath including the deploy target.

Hero overlay values are byte-identical. The linear `from-charcoal/10 via-transparent to-charcoal/25`, the radial `rgba(0,0,0,0.32) → rgba(0,0,0,0.52) at 58% → transparent`, the `object-cover object-center opacity-100` `<img>` with `fetchpriority="high"` and no `loading` attribute, the nav top gradient `from-charcoal/40 to-transparent`, and the editorial `bg-black/45` all appear exactly in `Hero.jsx`, `Navbar.jsx`, and `Editorial.jsx`. A grep for `0.22` across `src/**` returns nothing.

Image references all resolve to files in `public/images/`. The implementer's substitution table (hero-wedding → 1hero-wedding-stage, traditional-garlands → entrance-decoration, venue-door → 1venue-interior, venue-exterior-day → 1wedding-stage, "Special Event.jpeg" → "special-event.jpeg") is reflected in `data.js` with inline comments, and the Special Events card correctly points at `special-event.jpeg`.

Overlay coordination is a minimal `OverlayContext` refcount: `useOverlayLock(active)` increments while active and decrements on cleanup; a `useLayoutEffect` locks `html`/`body` scroll and restores the saved position on close. The mobile menu, lightbox, and services sheet all plug into it, and the navbar reads the count to skip its auto-hide logic while any overlay is open. Deliberately not a full focus-trap/inert-root system — matches the brief's override.

The mobile sidebar handles hash navigation itself with `flushSync` + `scrollIntoView`, because the OverlayProvider's scroll restore on close would otherwise clobber the browser's default hash scroll. Awkward but necessary given the chosen scroll-lock approach; the preview smoke test asserts the resulting behaviour (menu closes, URL updates, viewport scrolls to the section) works at 390 wide.

The services picker on booking is cleanly modelled as two sets: `confirmed` drives the trigger label and the WhatsApp message; `draft` is seeded from `confirmed` on sheet open and mutated by sheet checkboxes. Done commits `draft → confirmed`; Escape, backdrop, and resize-to-desktop all close without saving. The desktop checkboxes write directly to `confirmed`, so switching viewports stays consistent.

Enquiry validation deviates from the original: the React form carries `noValidate` and the JS handler only focuses the invalid field, where the original form let the browser's native "Please fill out this field" / "Please match the requested format" tooltips appear. The gate behaviour is intact (invalid data does not open WhatsApp, valid data opens the deep link with the byte-identical message template), so this is a UX softening on invalid submits, not a validation hole.

The gallery lightbox gains a touch-swipe gesture that wasn't in the original; keyboard (Escape / arrow keys), close/prev/next buttons, backdrop click, and focus return to the opening tile all work. The swipe is a pure addition.

A11y baseline: one `<h1>` (hero), semantic `<nav>`/`<main>`/`<footer>`/`<section>`, `aria-label` on every icon-only button (hamburger, lightbox close/prev/next, WhatsApp FAB, sheet close), `role="dialog"` + `aria-modal` wiring on the three overlays, `focus-visible:ring-2 ring-gold` on key interactive elements, and alt text on content images (decorative `balaji-icon.png` uses `alt=""`). Escape closes both the lightbox and the mobile menu.

<details>
<summary>Issues (2)</summary>

1. **Form validation UX softening** — React port adds `noValidate` so native tooltips no longer appear on empty name or non-10-digit mobile; JS only focuses the field. Gate behaviour (does WhatsApp open?) is intact. Non-blocking; drop `noValidate` and let the native validity UI do the work, since `required` and `pattern="[0-9]{10}"` are still on the inputs.
2. **`fetchpriority` casing warning** — React 18 prefers `fetchPriority` camelCase; the lower-case form still renders the correct HTML attribute (verified in `dist/index.html`), so this is a dev-console cosmetic nit. Non-blocking; rename to `fetchPriority` in `Hero.jsx` to silence the warning.

</details>

<details>
<summary>Details</summary>

### Content and image fidelity

Section order in `App.jsx` matches the original top-to-bottom (Navbar, Hero, About, Services, Editorial, Events, WhyChooseUs, Process, Gallery, Booking, Contact, FinalCta, Footer, WhatsAppFab). Phone number resolves everywhere: `BUSINESS_WHATSAPP = '919885670534'` in `utils.js`, `tel:+919885670534` in both the Contact detail block and the Call Now button, email `tirumala.marriage1991@gmail.com` unchanged. The WhatsApp enquiry template in `buildEnquiryMessage()` is byte-identical with the original's inline string:

```
Hello Tirumala Marriage Services, I would like to enquire about an event.
...
*Services Required:* <joined or 'None selected'>
*Details/Budget:* <value or 'None'>
```

The orphan `footer .footer-grid { grid-template-columns: 1fr; … }` rule that sits outside the `@media (max-width: 767px)` block in the inline `<style>` is preserved verbatim — the implementer flagged this and kept it per the content-fidelity rule rather than silently fixing it.

### Overlay coordination

While `count > 0` the `useLayoutEffect` in `OverlayContext.jsx` saves the current scroll position and overflow styles, sets `html`/`body` to `overflow: hidden`, and on close restores the saved scroll with `window.scrollTo({ behavior: 'instant' })`. The layout-effect timing matters: `closeFromLink` in `Navbar.jsx` uses `flushSync` to close the menu synchronously so the restore runs before the `requestAnimationFrame` that then calls `scrollIntoView` on the hash target. Without the `flushSync`, the restore would race the hash scroll and the viewport would land back at the saved position.

### Enquiry validation and WhatsApp handoff

The form carries `noValidate`, so the browser's native tooltip chain is suppressed. `onSubmit` does its own checks:

```jsx
if (!name) { document.getElementById('name')?.focus(); return; }
if (!/^[0-9]{10}$/.test(mobile)) { document.getElementById('mobile')?.focus(); return; }
```

Invalid data doesn't open WhatsApp — the gate matches the original. But the user sees no visible error on an invalid submit; the field just gets focus. The original form had no `noValidate`, so the browser's own tooltips would appear. Given the speed brief this is a UX softening, not a must-hold violation.

### Test coverage

No unit tests were added, as scoped. The implementer's headless Chromium smoke test (kept at `.agents/scratch/smoke.js` for re-runs) asserts: single `<h1>`, hero image loaded, no horizontal overflow, zero failed network requests, hamburger opens/closes the sidebar, services sheet commits a selection, lightbox opens on tile click and closes on Escape, nav anchor scroll works on both viewports, desktop checkbox state toggles. **Not asserted:** navbar scroll-direction modes (`top` / `hidden` / `solid`), scroll-reveal `IntersectionObserver`, WhatsApp deep-link URL construction, `prefers-reduced-motion`, resize-to-desktop closing the mobile menu and sheet, lightbox arrow-key pagination, footer legal alert buttons, year rendering. These were reviewed in code only.

</details>

<details>
<summary>Changed and new files</summary>

- `index.html` — Vite entry: head + inline `<style>` from original kept verbatim; body shrunk to `<div id="root"></div>` + module script.
- `vite.config.js` — Vite + React plugin, `base: './'`.
- `package.json` — lean deps: react, react-dom, @vitejs/plugin-react, vite.
- `src/main.jsx` — `createRoot` + `<StrictMode>` boot.
- `src/App.jsx` — section composition inside `<OverlayProvider>`.
- `src/OverlayContext.jsx` — refcount + scroll lock + scroll-position restore.
- `src/hooks.js` — `useReveal` (IntersectionObserver + reduced-motion), `useMediaQuery`.
- `src/utils.js` — `img()`, `BUSINESS_WHATSAPP`, `openWhatsApp`, `buildEnquiryMessage` (byte-identical template), `cn`.
- `src/data.js` — SERVICES, EVENTS (with substitution comments), BENEFITS, PROCESS, GALLERY, EVENT_TYPES, SERVICE_OPTIONS, NAV_LINKS.
- `src/components/*` — 15 section/overlay/FAB components (Navbar, Hero, About, Services, Editorial, Events, WhyChooseUs, Process, Gallery, Booking, Contact, FinalCta, Footer, Reveal, WhatsAppFab).
- `public/images/` — 11 image files copied from the original `images/` folder (including the renamed `special-event.jpeg`).
- `images/` — original folder untouched as a backup.
- `.agents/tasks/react-inplace-conversion/` — `original-index.html` (95,823-byte verbatim backup), `scaffold-notes.md`, `verification.md`.
- `dist/` — build output: `dist/index.html` (16.4 kB), `dist/assets/index-*.js` (~189.5 kB), `dist/images/` with all 11 assets.

</details>
