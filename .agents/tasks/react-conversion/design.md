# Tirumala Marriage Services: React Conversion (Requirements + Design)

## 1. Summary

Convert the single-file marketing page `tirumala/index.html` (Tailwind CDN, Font Awesome CDN, inline CSS and JS) into a production React site that keeps the same content, brand, and behavior and looks more polished. The site is Persuade-mode: visitors should trust the business and send an enquiry, usually over WhatsApp.

Three user changes already made in `index.html` must carry over exactly:

1. The hero image (`hero-wedding-stage.webp`, the golden Tirumala temple at sunset) stays bright. The overlays stay light.
2. The Editorial band (`wedding-stage.webp`, the lotus floral stage) stays bright, with a `bg-black/45` overlay.
3. The "Special Events" card uses `Special Event.jpeg`, renamed to `special-event.jpeg` in the React copy.

The original `index.html` and `images/` are not changed. The React project goes in a new folder, `tirumala/react-site/`.

Assumptions:
- Deploy target is a static subfolder (`https://demo.ramsstudio.in/tirumala/...`). The build therefore uses relative asset paths (`base: './'`).
- The canonical/OG URL constant is `https://demo.ramsstudio.in/tirumala/react-site/dist/`. It lives in one constant (`SITE.url`) and can be changed before deploy.
- All copy is kept word-for-word. The only text changes are image `alt` values, which currently describe the wrong thing ("Catering" on a stage photo) and are fixed for accessibility, and a few accessible names.

## 2. Functional Requirements

FR-1 Sections render in the original order, one component each: Navbar (with Mobile Menu), Hero, About, Services, Editorial, Events, WhyChooseUs, Process, Gallery (with Lightbox), Booking (enquiry form + mobile Services Sheet), Contact, FinalCta, Footer, plus the floating WhatsApp button.
FR-2 All copy, links, phone, email, address, proprietor name, WhatsApp number, service lists, event types, and the WhatsApp message format match the original exactly.
FR-3 Every interactive behavior in §9 is recreated with the same rules. Fixes to known defects are noted there.
FR-4 Every image reference points to a file that exists. Missing originals are replaced per §11.
FR-5 SEO/meta: title, favicon, plus a new description, OG/Twitter tags, theme-color, and LocalBusiness JSON-LD built only from facts on the page (§10).
FR-6 Brightness: hero and editorial overlay values are exactly as in §6.
FR-7 Content comes from typed data files (`src/data/*.ts`). Components don't hard-code repeated lists.

## 3. Non-Functional Requirements

- NFR-1 Performance: the hero is served as responsive WebP (the largest file is under about 450 KB at 1920w) with `fetchpriority="high"`. Everything else is lazy-loaded with `srcset`/`sizes`. No CDN scripts or CSS at runtime. Poppins is self-hosted. JS bundle is under 120 KB gzip.
- NFR-2 Accessibility: WCAG 2.2 AA targets for contrast, focus visibility, keyboard operation, and 44px minimum touch targets (48px on form controls and CTAs). Full conformance still needs manual assistive-technology testing.
- NFR-3 Responsive at 375, 768, 1280, and 1536px, plus short-landscape phones (max-height 560px). No horizontal scroll at any width.
- NFR-4 `prefers-reduced-motion: reduce` turns off all movement: reveal, hero entrance, image zoom, drawer and sheet slides. Content still shows up immediately.
- NFR-5 `npm run build` (type check + Vite build) and `npm test` pass with zero errors.

## 4. Acceptance Criteria

1. `react-site/` runs with `npm install && npm run dev` and builds with `npm run build` into `react-site/dist/`. Opening `dist/index.html` from a subfolder server loads every asset (relative base).
2. Section order and copy match `index.html`. Spot-check: hero h1 "Tirumala Marriage / Service & Suppliers", services count 6, events count 6, process steps 4, gallery tiles 7, footer "© {current year} Tirumala Marriage Service & Suppliers. All Rights Reserved."
3. The hero uses `hero-wedding-stage.webp` with overlays exactly: linear `from-charcoal/10 via-transparent to-charcoal/25`, and radial `rgba(0,0,0,0.32) 0% → rgba(0,0,0,0.22) 58% → transparent 100%`. There are no other darkening layers, and the image opacity is 100%.
4. The Editorial section uses `wedding-stage.webp` with one `bg-black/45` overlay. On ≥1024px the background is fixed. On <1024px it uses `scroll` and `center 40%`.
5. The Special Events card shows `special-event.jpeg`.
6. Zero 404s in the network panel. Every `<img>` has a descriptive alt, or `alt=""` if it is decorative.
7. Navbar: transparent with white text and gradient when scrollY < 50. It hides on scroll down (delta > 10). It shows solid (white/95, charcoal text, maroon wordmark, shadow) on scroll up. It stays frozen while any overlay is open. A page loaded mid-scroll starts solid.
8. Mobile menu (<1024px): opens from the hamburger, which animates to an X. It closes on the X, a backdrop click, Escape, any link, or a resize to ≥1024px. Focus is trapped inside, the page is inert and scroll-locked, and focus returns to the hamburger. The scroll position is preserved.
9. Lightbox: opens from any gallery tile. Prev/next wrap around. ArrowLeft/ArrowRight, swipe (>50px), Escape, a backdrop click, and the close button all work. Focus is trapped and returns to the opening tile. A "n / 7" counter and caption are shown.
10. Services Sheet (<768px): the trigger opens the sheet with a draft copy of the confirmed selections. The label reads "Done (n selected)". Done commits; close, backdrop, and Escape discard. The trigger label reads "Select required services", "1 service selected", or "n services selected". Resizing to ≥768px closes the sheet without saving. Desktop checkboxes and the sheet share one selection state.
11. Enquiry submit with an empty name or a non-10-digit mobile shows inline errors and focuses the first invalid field, and nothing opens. A valid submit opens `https://wa.me/919885670534?text=…` with the message byte-identical to the original template (§9.7).
12. All WhatsApp CTAs (Contact button and FAB) open `https://wa.me/919885670534` in a new tab with `rel="noopener noreferrer"`.
13. Keyboard-only pass: a skip link exists, every control has a visible focus ring, and there are no focus traps outside open overlays. There is exactly one `<h1>` and no skipped heading levels.
14. With reduced motion on, no element animates `transform`, and every reveal element is visible on first paint.
15. At 375, 768, 1280, and 1536px there is no horizontal overflow and no text clipping. Hero height equals the viewport height (svh). At 812×375 landscape the hero is auto height with all content visible.
16. `index.html` has a title, description, OG/Twitter tags, favicon, theme-color, and valid LocalBusiness JSON-LD (it passes a JSON parse; the test checks this).
17. `npm test` passes the unit and component tests listed in §14.

## 5. Out of Scope

- Changing copy, prices, claims, or adding testimonials or counters.
- Real Privacy/Terms pages (backlogged; they keep the original draft alerts).
- Embedding Google Maps (the original's placeholder card stays).
- A backend or email form submission. WhatsApp deep link stays the only channel.
- Routing or multi-page. This stays a single page with hash anchors.
- Editing `tirumala/index.html` or `tirumala/images/`.

---

## 6. Brightness Treatment (locked values)

**Hero.** Layer stack, bottom to top:
1. `bg-charcoal` base (only shows while the image loads).
2. `<picture>`/`<img>` with `hero-wedding-stage.webp`, `object-cover`, `opacity-100`. `object-position` is `60% center` below 768px, which keeps the golden vimana in frame on portrait phones, and `center` from 768px up.
3. Linear overlay: `bg-gradient-to-b from-charcoal/10 via-transparent to-charcoal/25`.
4. Radial scrim: `radial-gradient(ellipse 100% 70% at center, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.22) 58%, transparent 100%)`.

Note: the live `index.html` currently has `0.52` at the 58% stop. The brief and the user's "make it light" request both specify `0.22`, so the React version uses `0.22`.

Text stays legible through text shadow, not more darkening. Define one token `--shadow-text-hero: 0 1px 2px rgb(0 0 0 / .55), 0 4px 18px rgb(0 0 0 / .45)` and apply it to the eyebrow, h1, and paragraph. The gold span "Service & Suppliers" sits over a golden subject, so it gets a stronger variant: `0 1px 2px rgb(0 0 0 / .7), 0 2px 24px rgb(0 0 0 / .55)`. No other overlay layers are allowed.

The hero gets one authored motion moment:
- Image settles from `scale(1.06)` to `1` over 1600ms with `cubic-bezier(.16,1,.3,1)`.
- Content fades up 24px, staggered: eyebrow 0ms, h1 120ms, paragraph 240ms, CTA 360ms. Each step is 800ms, same easing.
- Reduced motion turns both off.

**Editorial.** Section background is `wedding-stage.webp` via CSS `background-image`, with `bg-cover bg-center`, and `bg-fixed` from 1024px up. Below 1024px it uses `background-attachment: scroll` and `background-position: center 40%`. Exactly one overlay: `bg-black/45`. The heading and paragraph get `--shadow-text-hero`. The paragraph color changes from `text-gray-200` to `text-white/90` for contrast on the brighter image. Because the image is a CSS background, it is imported through imagetools at 1920w WebP and injected with an inline `style`.

**Event cards (consistency with the brightness direction).** The original overlay `from-black/95 via-black/60` is very heavy. It is lightened to `bg-gradient-to-t from-black/80 via-black/30 to-transparent` with `via` at 45%. The text sits in the bottom 40% and stays legible. The original hover rule `.img-overlay → charcoal/40` is dropped because it conflicted with the gradient. Hover now only scales the image.

## 7. Technology Stack (locked)

| Concern | Choice (exact version) | Reason |
|---|---|---|
| Build | `vite@8.3.4`, `@vitejs/plugin-react@6.1.2` | Current stable. Peer deps were checked and are compatible. |
| UI | `react@19.3.0`, `react-dom@19.3.0` | React 19 supports the `inert` prop natively, which the overlay system needs. |
| Language | `typescript@7.0.2`, strict | Current `latest`. Fallback if `tsc -b` misbehaves: pin `typescript@6`. |
| Styling | `tailwindcss@4.3.3` + `@tailwindcss/vite@4.3.3` | v4 CSS-first `@theme` tokens. No `tailwind.config.js`. |
| Images | `vite-imagetools@12.0.1` | Generates WebP `srcset` at build time. The 2.4 MB, 3840px hero would otherwise ship to phones as-is. |
| Icons | `@fortawesome/fontawesome-svg-core@7.3.1`, `@fortawesome/free-solid-svg-icons@7.3.1`, `@fortawesome/free-brands-svg-icons@7.3.1`, `@fortawesome/react-fontawesome@3.5.0` | Keeps the exact original glyphs (`om`, `whatsapp`, `camera-retro`). Lucide has no Om or WhatsApp glyph. Per-icon imports are tree-shaken SVG with no webfont. |
| Font | `@fontsource/poppins@5.3.0`, weights 300/400/500/600/700/800 | Self-hosted. 800 is for the wordmark (`font-extrabold`), which the original only faked. |
| Motion | No Framer Motion. CSS transitions plus an `IntersectionObserver` `Reveal` component. | There are no gesture or layout animations. Saves about 40 KB. Reduced motion is handled in CSS and a hook. |
| Tests | `vitest@5.0.3`, `jsdom@30.1.2`, `@testing-library/react@16.3.3`, `@testing-library/user-event@14.6.7`, `@testing-library/jest-dom@7.0.1` | Native to Vite. |

All versions are pinned exactly in `package.json`, with no `^`. Scripts:
- `dev`: `vite`
- `build`: `tsc -b && vite build`
- `preview`: `vite preview`
- `test`: `vitest run`

`vite.config.ts` sets:
- `base: './'`
- plugins: `[react(), tailwindcss(), imagetools()]`
- `test: { environment: 'jsdom', setupFiles: './src/test/setup.ts' }`

## 8. Project Structure

```
react-site/
  index.html                      # meta, OG, JSON-LD, favicon, #root
  package.json  vite.config.ts  tsconfig.json  tsconfig.app.json  tsconfig.node.json
  public/
    favicon.png                   # copy of images/favicon.png
    og-image.jpg                  # 1200x630 crop of hero-wedding-stage (made once with sips, see §10)
  src/
    main.tsx                      # fontsource imports, FA config (autoAddCss=false + import FA css), render <App/>
    App.tsx                       # <OverlayProvider><SkipLink/><Navbar/><main id="main">…sections…</main><Footer/><WhatsAppFab/></OverlayProvider>
    index.css                     # @import "tailwindcss"; @theme tokens; base layer; utilities (§12)
    vite-env.d.ts                 # vite/client + imagetools module declarations
    types.ts                      # shared content types
    assets/images/                # copies; "Special Event.jpeg" -> special-event.jpeg; balaji-icon.png
    data/  site.ts nav.ts images.ts services.ts events.ts benefits.ts process.ts gallery.ts enquiry.ts about.ts
    lib/   whatsapp.ts  validation.ts  cn.ts
    hooks/ useNavbarState.ts  useMediaQuery.ts  usePrefersReducedMotion.ts  useInView.ts
    components/
      ui/        Container.tsx Section.tsx SectionHeading.tsx Eyebrow.tsx GoldDivider.tsx Button.tsx Icon.tsx Reveal.tsx CheckList.tsx ResponsiveImage.tsx
      overlay/   OverlayProvider.tsx useOverlay.ts Portal.tsx
      layout/    SkipLink.tsx Navbar.tsx MobileMenu.tsx Hamburger.tsx Brand.tsx Footer.tsx WhatsAppFab.tsx
      sections/  Hero.tsx About.tsx Services.tsx Editorial.tsx Events.tsx WhyChooseUs.tsx Process.tsx Gallery.tsx Lightbox.tsx Booking.tsx Contact.tsx FinalCta.tsx
      booking/   EnquiryForm.tsx Field.tsx ServicesPicker.tsx ServicesSheet.tsx
    test/  setup.ts  *.test.ts(x)
```

`images.ts` is the only module that imports image files. For each image it exports `{ src, srcSet, width, height }`, using imagetools queries:
- Hero: `?w=640;1024;1600;1920;2560&format=webp&as=srcset` plus `?w=1920&format=webp`.
- Other photos: `?w=480;800;1200&format=webp&as=srcset` plus `?w=1200&format=webp`.
- Editorial background: `?w=1920&format=webp`.
- `special-event.jpeg` is 1280px wide, so its widths cap at 1280 (`480;800;1280`). Imagetools never upscales, and it outputs WebP.
- `balaji-icon.png` and favicon are imported plain.

`vite-env.d.ts` declares wildcard modules `'*&as=srcset'` (string) and `'*&format=webp'` (string).

## 9. Interactive Behavior Inventory

### 9.1 Overlay system (`OverlayProvider`, `useOverlay`)

This replaces the original `overlayStack`/`beginOverlay`/`endOverlay`.

- **State.** A context holds `stack: OverlayEntry[]`, where `OverlayEntry = { id, panelRef, initialFocusRef?, openerEl, close }`.
- **Rendering.** Overlays render through `Portal` into `document.body`. The page wrapper `#page` (everything except portals) gets `inert` and `aria-hidden` while the stack is non-empty. Only the top panel is interactive; lower panels get `inert`.
- **Open.**
  - When the first overlay opens, the provider stores `scrollX/scrollY`, the inline `overflow` of html and body, and `overscrollBehavior`. It then sets html and body `overflow:hidden` and html `overscroll-behavior:none`.
  - The opener is captured from `document.activeElement` at open time.
  - Focus goes to `initialFocusRef`, or else the first focusable element, using `{preventScroll:true}`.
- **Close.**
  - The entry is removed. If the stack is now empty, the saved styles are restored and `window.scrollTo({left, top, behavior:'instant'})` runs.
  - If the removed entry was on top, focus returns to its opener. If the opener is gone or hidden (`!isConnected` or no client rects), focus goes to the new top panel, or else to a `fallbackFocus` supplied by the caller.
- **Global listeners** are attached only while the stack is non-empty:
  - `keydown`: Escape calls `top.close()` with `preventDefault`. Tab cycles between the first and last focusable elements in the top panel, using the same `canFocus` rules as the original (not disabled, not in `[inert]`, has client rects, not `visibility:hidden`). If focus is outside the panel, Tab wraps to first or last.
  - `focusin`: if the target is outside the top panel, refocus the panel.
- **Opening an already-open id** does nothing.
- **Error handling.** No operation can throw for user reasons. If a ref is null at open (unmounted), the open is a no-op and a `console.warn` fires in dev only. Scroll restore is wrapped so a missing saved state is skipped silently.
- **Owner of the invariant.** The provider alone owns the rule "only one scroll lock, focus only inside the top overlay". Components never touch `document.body.style`.

### 9.2 Navbar (`useNavbarState`)

- **Modes:** `top` (scrollY < 50), `hidden`, `solid`.
- **Scroll handling.** One rAF-throttled passive scroll listener. If the overlay stack is non-empty, it only updates `lastY`. Otherwise:
  - If `y < 50`, mode is `top`.
  - Else if `|delta| > 10`: delta > 0 gives `hidden`, delta < 0 gives `solid`.
- **Fix.** On mount, if `y ≥ 50`, the initial mode is `solid`, not transparent.
- **Styles per mode:**
  - `top`: `bg-transparent text-white`, gradient overlay `from-charcoal/40 to-transparent` at opacity 1, wordmark white, subtitle `gray-300`, link hover `gold-light`.
  - `solid`: `bg-white/95 shadow-sm text-charcoal`, gradient opacity 0, wordmark `maroon`, subtitle `gray-500`, link hover `gold-readable`.
  - `hidden`: `-translate-y-full`.
  - Transitions: transform 300ms, background-color and color 300ms.
- **Opening the mobile menu** forces the navbar visible. If y > 50, it also forces `solid`.
- **Desktop links (≥1024px):** Home (`#top`), About, Services, Events, Gallery, Contact, and a "Book Now" primary small button linking to `#booking`.
- **Logo.** The logo is `<a href="#top" aria-label="Tirumala Marriage Service & Suppliers, back to top">`. This replaces the original `div onclick`. `#top` is an id on the hero section.
- **Anchor scrolling.**
  - `html { scroll-behavior: smooth }`, removed under reduced motion.
  - `scroll-padding-top: 72px` so headings aren't hidden under the nav.
  - Wordmark sizes: 18/20/22px, emblem 34/40px, bar height 58/60/64px.

### 9.3 Mobile menu (`MobileMenu`, below 1024px)

- **Layout.** Right drawer, `w-[min(85vw,340px)]`, `h-dvh`, `bg-cream`, `shadow-2xl`. Backdrop `bg-charcoal/60 backdrop-blur-sm`. Drawer slides with `translate-x-full` ↔ `0` over 300ms; backdrop opacity also 300ms.
- **Close-animation timing.** On close, the drawer stays mounted for 300ms to finish the animation. It unmounts after `transitionend` or a 320ms timeout, whichever comes first. Reduced motion closes instantly.
- **Header:** Balaji icon (`alt=""`; the wordmark text names it), the "TIRUMALA" wordmark in maroon, and a close button (`faXmark`, `aria-label="Close menu"`, 44×44px). Close is the initial focus.
- **Body.** A `<nav aria-label="Mobile">` with 6 links (text-lg, py-3, rounded-lg, hover `bg-gold/5` and `gold-readable`). The footer area holds a full-width "Book Now" primary button.
- **Closing.** Every link click calls close. The close does not restore focus to the hamburger when the link navigates, so focus follows the anchor target. To do this, the link's onClick passes `restoreFocus:false`, and the browser's hash navigation moves focus naturally. `#main` sections have `tabIndex={-1}` so focus can land on them.
- **Resize.** At ≥1024px (via `useMediaQuery('(min-width:1024px)')`) the menu closes and focus falls back to the first desktop nav link.
- **Hamburger.** Three spans morph to an X (the original CSS transforms), with `aria-expanded` and `aria-controls="mobile-menu"`. The aria-label toggles between "Open navigation menu" and "Close navigation menu". The drawer is `role="dialog" aria-modal="true" aria-label="Navigation menu"`.

### 9.4 Scroll reveal (`Reveal`)

- `Reveal` wraps children with props `as?`, `delay?` (ms), and `className`. It uses `useInView`, which is a one-shot `IntersectionObserver` with `rootMargin:'0px 0px -80px 0px'` and threshold 0.
- **Animation.** Initial state is `opacity-0 translate-y-6`. Active state is `opacity-100 translate-y-0`. Duration 700ms with `cubic-bezier(.16,1,.3,1)`; the delay is applied as `transition-delay`.
- **Reduced motion.** `usePrefersReducedMotion()` true renders the active state immediately. The CSS media query also forces `opacity:1; transform:none` as a belt-and-braces fallback.
- **No IntersectionObserver** (very old browsers): render visible.
- **Stagger is limited to grids.** Services delays 0/60/120/180/240/300. Events use the same steps. Process uses 0/100/200/300 (original). Section headings use no delay. Everything else uses no stagger.

### 9.5 Process connectors

These are CSS only: a `<div aria-hidden className="md:hidden …">` between steps (2×20px, gold at 30% opacity, `ml-[43px]`). This drops the original resize JS. The desktop horizontal line (`hidden md:block`, `h-0.5 bg-gray-200`, vertically centered) is kept. On tablet the original shows a 2-column grid with the line hidden, so the line is `hidden lg:block` and the grid is `md:grid-cols-2 lg:grid-cols-4`.

### 9.6 Gallery and Lightbox

- **Data.** `gallery.ts` holds a `GalleryItem[]` of `{ image, alt, span }`, where `span ∈ 'feature' | 'tall' | 'wide' | 'default' | 'desktopOnly'`. The span maps to classes: `feature` gives `lg:col-span-2 lg:row-span-2`, `tall` gives `lg:row-span-2`, `wide` gives `lg:col-span-2`, `desktopOnly` gives `hidden lg:block`.
- **Grid.** `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`, `auto-rows-[140px] md:auto-rows-[180px] lg:auto-rows-[200px]`, gap 2/3/4.
- **Tiles.** Each tile is a `<button type="button" aria-label="View {alt}">` containing the image (`alt=""`, since the button names it) and a hover/focus overlay (`bg-charcoal/30` with `faMagnifyingGlassPlus`). The overlay shows on every tile; the original showed it only on the first.
- **Opening.** The Lightbox opens with an index, using `openerEl` = the tile.
- **Lightbox layout.** Portal, `role="dialog" aria-modal="true" aria-label="Event gallery image viewer"`, background `rgb(44 44 44 / .95)`, z-index 1000.
- **Lightbox controls:**
  - Close (top-right, `faXmark`, 48px, initial focus).
  - Prev/Next (`faChevronLeft`/`faChevronRight`, 48px hit area, vertically centered).
  - Image `max-h-[85svh] max-w-[90vw] object-contain rounded-md shadow-2xl` using the 1200w source.
  - Caption with the alt text and an `aria-live="polite"` counter "3 / 7" below the image.
- **Navigation.** `(i ± 1 + n) % n` across all 7 items, including the desktop-only tile, which matches the original. ArrowLeft/ArrowRight are handled only while the lightbox is the top overlay.
- **Swipe.** Passive `touchstart`/`touchend` comparing `screenX`. A delta over 50 gives next; below −50 gives prev.
- **Backdrop click.** A click whose target is the dialog root closes it.
- **Image load error.** If the lightbox image fails, an `onError` handler shows the text "Image could not be loaded" in place of the image, and the controls keep working. Not logged.

### 9.7 Enquiry form (`EnquiryForm`)

The form is controlled React state and uses `noValidate`, with custom inline validation (rules below).

| Field (id) | Required | Type / input | Rules | Error copy |
|---|---|---|---|---|
| `name` | yes | text, `autoComplete="name"`, maxLength 80 | trimmed length 1–80 | "Please enter your full name." |
| `mobile` | yes | `type="tel"`, `inputMode="numeric"`, `autoComplete="tel-national"`, maxLength 10 | `/^[0-9]{10}$/` after trim; non-digits are rejected, not stripped (matches original pattern) | "Enter a 10-digit mobile number." |
| `eventType` | no (default `Wedding`) | select: Wedding, Engagement, Reception, Religious (label "Religious Ceremony"), Other (label "Other Celebration") | must be one of the values; otherwise reset to `Wedding` | none |
| `eventDate` | no | date, `min` = today (local) | empty or ≥ today | "Please choose today or a future date." |
| `location` | no | text, placeholder "e.g. Tirupati", maxLength 120 | trim | none |
| `guests` | no | number, `min=1 max=100000 step=1`, placeholder "e.g. 500" | empty, or an integer 1–100000 | "Enter a guest count between 1 and 100,000." |
| services | no | checkbox values from `enquiry.ts` | subset of known values | none |
| `details` | no | textarea rows 3, maxLength 1000 | trim | none |

**Validation display.** Errors show only after the first submit attempt. After that, each field re-validates on change. Each error is a `<p id="{id}-error">` in `text-red-700` (#B91C1C, 5.9:1 on white), linked via `aria-describedby`, with `aria-invalid="true"` on the input. On a failed submit, focus moves to the first invalid field. Labels keep the original text ("Full Name *", "Mobile Number (10 digits) *", and so on). The `*` is `aria-hidden`, and the input has `required` for screen readers.

**Message.** `lib/whatsapp.ts → buildEnquiryMessage(data): string` is a pure function that reproduces the original template exactly:

```
Hello Tirumala Marriage Services, I would like to enquire about an event.\n\n*Name:* {name}\n*Mobile:* {mobile}\n*Event Type:* {eventType}\n*Date:* {date||'Not decided'}\n*Location:* {location||'Not specified'}\n*Guests:* {guests||'Not specified'}\n*Services Required:* {services.join(', ')||'None selected'}\n*Details/Budget:* {details||'None'}
```

- Services are joined in `enquiry.ts` list order. The original used insertion order; list order is deterministic and testable.
- The event type sent is the option value (for example `Religious`), as in the original.

**Submit outcomes:**
- `SITE.whatsapp` is set (it is: `919885670534`): `openWhatsApp(text)` calls `window.open(url, '_blank', 'noopener,noreferrer')`. If that returns `null` (popup blocked), fall back to `window.location.assign(url)`. This is recoverable and not logged. The form is not cleared, so the user can go back and edit.
- `SITE.whatsapp` is empty (config fallback kept from the original): `navigator.clipboard.writeText(message)`.
  - On success, show the original "WhatsApp integration is pending. Details copied to clipboard." in a `role="status"` paragraph for 5s.
  - On rejection, or if the clipboard API is missing, show "Couldn't copy automatically. Please call +91 9885670534." and `console.warn` it.
- **Submit button.** Full-width primary pill with a `faWhatsapp` icon and the text "Send Enquiry on WhatsApp". There is no loading state, since the action is synchronous.

### 9.8 Services picker and sheet (`ServicesPicker`, `ServicesSheet`)

- **State.** One `confirmed: string[]` lives in `EnquiryForm`. Below 768px it shows a trigger; from 768px up, a 2-column checkbox grid. Both read and write `confirmed`, so they are always in sync.
- **Group labelling.** The group is `role="group" aria-labelledby="services-label"`. The label text is "Services Required".
- **Labels per view.** Desktop checkboxes use the short labels; the sheet uses the long labels. Both come from `enquiry.ts` `{ value, label, sheetLabel }`.
- **Trigger** (`aria-haspopup="dialog"`, `aria-expanded`): 48px tall, gray-50 background, chevron-down icon. Text is "Select required services", "1 service selected", or "{n} services selected". Text color is `gray-500` when nothing is selected, otherwise charcoal.
- **Sheet layout.** Portal. Bottom sheet `rounded-t-[20px]`, `max-h-[85dvh]`, `translate-y-full` ↔ `0` over 320ms with `cubic-bezier(.32,.72,0,1)`. Backdrop `rgb(44 44 44 / .55)` with blur 2px. Gold drag handle 40×4px (decorative; no drag gesture, same as original).
- **Sheet header.** h2 "Select Services" and a close button (`faXmark`, 44px, initial focus).
- **Sheet list.** A scrollable `role="group"` with `overscroll-behavior: contain`. Each row is a label with a 20px checkbox, `accent-color: gold`, `py-3.5 px-5`, active background `gold/8`.
- **Footer.** A "Done" / "Done ({n} selected)" button with safe-area bottom padding.
- **Behavior.**
  - Opening copies `confirmed` into `draft`.
  - Done sets `confirmed = draft` and closes.
  - Close, backdrop, and Escape close without saving.
  - At ≥768px while open: close without saving, and set the fallback focus to the first desktop checkbox.

### 9.9 Other

- **WhatsApp FAB.** `<a href="https://wa.me/919885670534" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">`, 48px (56px from md), `bg-whatsapp text-charcoal`. Position: `bottom: calc(24px + env(safe-area-inset-bottom))`, right 20px plus the inset; from 768px, 32/32. z-index 49. Hover scales to 1.1, except under reduced motion and on touch.
- **Contact buttons.** "Call Now" is a `tel:+919885670534` dark pill. "WhatsApp" is an anchor styled as the whatsapp pill.
- **Footer legal links.** Two `<button type="button">` elements styled as links. They call `window.alert('Privacy Policy Draft: Text to be updated.')` and the Terms equivalent, matching the original behavior. Real pages are backlogged.
- **Year.** `new Date().getFullYear()` at render.
- **Touch hover.** `@media (hover: none)`: event descriptions always visible, service-card lift disabled. In Tailwind v4, `hover:` variants already apply only on hover-capable devices, so the remaining work is only the always-visible event description (`[@media(hover:none)]:opacity-100`).

## 10. SEO and Meta (`react-site/index.html`)

- `<html lang="en">`.
- `<title>`: `Tirumala Marriage Services & Suppliers | Marriages & Events` (original).
- `meta description`: "Complete wedding and event arrangements in Tirupati: function hall booking, accommodation, decorations, catering, purohits, Sannai Melam, photography and bridal makeup for every budget." (composed only from on-page services and address).
- `meta keywords`: "Tirupati marriage services, wedding arrangements Tirupati, function hall booking, wedding decorations, catering, purohits, Sannai Melam, event management".
- `theme-color`: `#2C2C2C`.
- `link rel="icon"`: `./favicon.png`, type image/png.
- `link rel="canonical"`: `SITE.url`.
- Open Graph:
  - `og:type` = website
  - `og:title` = title
  - `og:description` = description
  - `og:url` = `SITE.url`
  - `og:image` = `SITE.url + 'og-image.jpg'`, with width 1200 and height 630
  - `og:image:alt` = "Golden vimana of the Tirumala temple at sunset"
  - `og:locale` = en_IN
- Twitter: `twitter:card` = `summary_large_image`, plus title, description, and image.
- JSON-LD `<script type="application/ld+json">`:
  - `@type` `["LocalBusiness","EventPlanner"]`
  - `name` "Tirumala Marriage Service & Suppliers"
  - `description`
  - `telephone` "+91-9885670534"
  - `email` "tirumala.marriage1991@gmail.com"
  - `founder`: `{"@type":"Person","name":"Rajagopal Taliyakula"}`. The page says "Proprietor"; `founder` is the closest schema.org property.
  - `address` PostalAddress: streetAddress "D.No. 18-3-60G/101, Revenue Ward No. 18, Shanthi Nagar", addressLocality "Tirupati", addressRegion "Andhra Pradesh", postalCode "517501", addressCountry "IN"
  - `areaServed` "Tirupati"
  - `image` and `url` from `SITE.url`
  - `logo` `SITE.url + 'favicon.png'`
  - No ratings, hours, or price range (not on the page).
- **OG image generation** (implementer, once):
  - `sips -s format jpeg -Z 1200 images/hero-wedding-stage.webp --out /tmp/og.jpg`
  - then `sips --cropToHeightWidth 630 1200 /tmp/og.jpg --out react-site/public/og-image.jpg`
  - The 3840×2561 source becomes 1200×800, then is center-cropped to 630.
  - Delete the temp file.
- Remove the Google Fonts, Font Awesome, and Tailwind CDN tags.

## 11. Image Inventory and Substitutions

The actual subjects were checked by viewing each file:

| File | Size | Subject |
|---|---|---|
| `hero-wedding-stage.webp` | 3840×2561 | Golden vimana and white gopuram of the Tirumala temple at sunset |
| `wedding-stage.webp` | 1280×720 | Lotus floral reception stage, green carpet |
| `1hero-wedding-stage.webp` | 1672×941 | Bright greenery and white-flower stage with beige sofa |
| `1wedding-stage.webp` | 1600×1067 | Same stage seen from the hall floor, white drape |
| `1venue-interior.webp` | 1600×1067 | Hall interior, red aisle carpet, covered chairs, stage at the end |
| `venue-interior.webp` | 1277×786 | Traditional mandap with garlands and an aisle of cane chairs |
| `entrance-decoration.webp` | 1600×1067 | Crystal chandelier with florals under fairy lights |
| `venue-exterior-night.webp` | 1600×1067 | Building facade lit with string lights |
| `special-event.jpeg` | 1280×960 | Yellow backdrop, marigold ring, golden urlis, flower rangoli |
| `balaji-icon.png` | 200×184 | Brand emblem |
| `favicon.png` | 64×64 | Favicon |

All of these are copied into `react-site/src/assets/images/`, except `favicon.png`, which goes to `public/`.

Missing files referenced by the original: `hero-wedding.webp`, `traditional-garlands.webp` (2 references), `venue-door.webp` (2), `venue-exterior-day.webp` (2).

**Substitutions:**

| Slot (original src) | Section | Substitute | Reason |
|---|---|---|---|
| Religious Ceremonies card (`traditional-garlands.webp`) | Events | `venue-interior.webp` | Mandap with garlands is the most religious image available |
| Family Celebrations card (`venue-door.webp`) | Events | `1venue-interior.webp` | Hall set for a family gathering. Distinct from its neighbors. |
| Why image 2 (`venue-exterior-day.webp`) | WhyChooseUs | `1wedding-stage.webp` | Not used elsewhere nearby. Pairs well with the lotus stage beside it. |
| Gallery feature tile (`hero-wedding.webp`, alt "Hall Interior") | Gallery | `1venue-interior.webp` | Matches the alt text exactly. Largest-impact tile. |
| Gallery doorway tile (`venue-door.webp`) | Gallery | `special-event.jpeg` | A decorated entrance courtyard. Also gives the user's new image a gallery appearance. |
| Gallery wide tile (`traditional-garlands.webp`) | Gallery | `venue-interior.webp` | Garlanded mandap, landscape, suits the wide span |
| Gallery desktop-only tile (`venue-exterior-day.webp`) | Gallery | `1hero-wedding-stage.webp` | Brightest stage shot, so all main photos appear in the gallery |

**One deliberate reassignment of an existing image.** The Wedding Receptions card changes from `venue-interior.webp` to `1hero-wedding-stage.webp`, for two reasons:
- `venue-interior.webp` is now a mandap (the user replaced the file). It fits Religious Ceremonies, and leaving it on Reception would put the same image in adjacent cards.
- The sofa stage is literally the "elegant stage decor" in the Reception copy.

**Final Events order:** Wedding = `venue-exterior-night`, Engagement = `entrance-decoration`, Reception = `1hero-wedding-stage`, Religious = `venue-interior`, Family = `1venue-interior`, Special = `special-event`. No duplicates within the grid.

**Other uses (unchanged):** About = `venue-interior.webp`, Booking panel background = `venue-interior.webp` at 20% opacity, Editorial = `wedding-stage.webp`, Why image 1 = `wedding-stage.webp`.

**Alt text** (replaces the vague originals):

| Image / slot | Alt text |
|---|---|
| Hero | "Golden vimana of the Tirumala temple at sunset" |
| About | "Traditional wedding mandap decorated with garlands" |
| Wedding card | "Function hall facade lit with string lights at night" |
| Engagement card | "Crystal chandelier and fresh flowers under fairy lights" |
| Reception card | "Reception stage with floral wall and sofa" |
| Religious card | "Garlanded mandap prepared for a traditional ceremony" |
| Family card | "Decorated hall with guest seating and red aisle carpet" |
| Special card | "Marigold backdrop with golden urlis and flower rangoli" |
| Why image 1 | "Lotus-themed floral wedding stage" |
| Why image 2 | "Floral stage with greenery walls and candle stands" |

**Gallery alts** keep the original captions where they still fit: "Tirumala Marriage Hall Interior", "Wedding mandap decoration" (lotus stage, kept), "Function Hall Exterior Night View", "Decorated Event Entrance" (chandelier). Captions for substituted tiles:
- Doorway tile becomes "Decorated entrance with golden urlis"
- Garlands tile becomes "Traditional flower garlands on the mandap"
- Day-view tile becomes "Floral reception stage"

**Decorative images:** Booking background, the gallery `<img>` inside named buttons, and the drawer emblem use `alt=""`. The Navbar and Footer emblem use alt "Tirumala Balaji".

## 12. Design System

**Palette** (Tailwind v4 `@theme` in `index.css`):

| Token | Hex | Use |
|---|---|---|
| `--color-cream` | `#FDFBF7` | Page background, alternate sections |
| `--color-gold` | `#D4AF37` | Fills, icons, dividers, text on dark only. 2.1:1 on white, so never small text on light. |
| `--color-gold-light` | `#F1D77C` | Hover and eyebrows on dark |
| `--color-gold-readable` | `#856611` | Gold text on light (5.2:1 on cream), light-surface focus ring |
| `--color-charcoal` | `#2C2C2C` | Text, dark sections, text on gold (6.7:1) |
| `--color-ink` | `#1A1A1A` | Footer |
| `--color-maroon` | `#800000` | Wordmark on light |
| `--color-sand` | `#E8DCC0` | Footer wordmark |
| `--color-whatsapp` | `#25D366` | WhatsApp buttons (charcoal text) |

White and Tailwind grays are used as in the original. Body secondary is `gray-600`; minor text is `gray-500`, at least 4.6:1 on cream and white. Footer text is `gray-400` on ink (6.8:1).

**Fonts.** `--font-sans: 'Poppins', ui-sans-serif, system-ui, sans-serif`.

**Shadows:**
- `--shadow-elegant: 0 10px 30px -10px rgb(44 44 44 / .05)`
- `--shadow-elegant-hover: 0 20px 40px -10px rgb(44 44 44 / .10)`
- `--shadow-card: 0 12px 32px -12px rgb(44 44 44 / .18)` for image cards
- The text-shadow tokens from §6

**Easing:** `--ease-out-expo: cubic-bezier(.16,1,.3,1)`, `--ease-sheet: cubic-bezier(.32,.72,0,1)`.

**Type scale.** Poppins throughout. Headings use `text-wrap: balance`; body uses `text-wrap: pretty`.

| Role | 375 | 768 | 1280 | 1536 | Weight / leading |
|---|---|---|---|---|---|
| Hero h1 | 32px | 46px | 64px | 72px | 700, 1.15, tracking -0.01em |
| Display (Editorial h2, FinalCta h2) | 28px | 36px | 48px | 52px | 600, 1.2 |
| Section h2 | 24px | 28px | 34px | 34px | 600, 1.3 (original override values) |
| Booking panel h2 | 24px | 30px | 36px | 36px | 700 |
| Card title h3 | 17px | 18px | 18px | 18px | 600 |
| Body large (hero p, editorial p) | 16px | 20px | 20px | 20px | 500 hero, 300 editorial |
| Body | 15px | 16px | 16px | 16px | 400, 1.7 |
| Card body | 14px | 14px | 14px | 14px | 400, 1.6 |
| Eyebrow | 12px | 14px | 14px | 14px | 600, uppercase, tracking 0.2em |
| Fine print | 12px | 12px | 12px | 12px | italic gallery disclaimer |

Body text max width is 65ch (`max-w-prose`) on About, Why, and Booking paragraphs.

**Spacing and rhythm:**
- Section vertical padding: 48px at <768, 60px at 768–1023, 96px at ≥1024. FinalCta is 56/72/96.
- Container: `max-w-7xl` (1280px), `px-4 sm:px-6 lg:px-8`.
- Heading block to content: 32px mobile, 48px md, 64px lg.
- Heading group: eyebrow, then 8px, then h2, then 16px, then divider, then 24px, then body.
- Grid gaps: services 16/24/32, events 20/24/20, why 40/64.
- Section backgrounds alternate as in the original: hero, cream, white, image, cream, white (+ border-y gray-100), cream, white, cream (+ border-t gray-200), white (+ border-y), charcoal, ink.

**Radius:** `rounded-lg` 8px for inputs and the services trigger. `rounded-xl` 12px for gallery tiles below lg (16px at lg). `rounded-2xl` 16px for cards, images, and the map. `rounded-3xl` 24px for the booking shell at lg. `rounded-full` for all action buttons, icon discs, and the FAB.

Button-shape decision: the original mixes `rounded-lg` (hero CTA, nav Book Now, submit, sheet Done) and `rounded-full` (About, Editorial, Contact, FinalCta). All action buttons become pills, for one consistent, more refined CTA language. Inputs stay `rounded-lg`.

**Primitives** (`components/ui`):

- **`Container`**: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`.
- **`Section`**:
  - Props: `id`, `tone: 'cream'|'white'|'charcoal'|'ink'`, `bordered?: 'y'|'t'`, `labelledBy`, `className`.
  - Renders `<section id aria-labelledby tabIndex={-1}>` with the rhythm padding. Charcoal and ink tones set the `--ring` variable to gold-light.
- **`Eyebrow`**: `<p>` (not a heading), `text-gold-readable` on light or `text-gold-light` on dark, uppercase.
  - Decision: the original has an eyebrow on every section. It is kept, because the conversion preserves copy and brand voice. Impeccable's craft floor flags eyebrows as a template habit; this is a recorded deviation in favor of the brief.
- **`GoldDivider`**: 60×3px gold bar. `align: 'center'|'start'`, where start becomes centered below 768px. `aria-hidden`.
- **`SectionHeading`**:
  - Props: `eyebrow`, `title` (ReactNode), `id`, `align`, `tone: 'light'|'dark'`, `as = 'h2'`, `size: 'section'|'display'`, `divider = true`.
  - Renders Eyebrow, heading, and GoldDivider with the rhythm above.
- **`Button`**: one polymorphic component (`as="a"|"button"`).
  - `variant`:
    - `primary`: gold background, charcoal text. Hover: white on dark contexts, `gold-light` on light contexts. Chosen by a `tone` prop.
    - `outline`: charcoal border, which fills charcoal on hover.
    - `outlineGold`: gold border and gold text, which fills gold on hover; used on Editorial.
    - `ghostLight`: gray-400 border, white text; hover border white.
    - `dark`: charcoal background, which turns gold on hover.
    - `whatsapp`.
  - `size`: `sm` (h-10, px-5, text-sm; nav) and `md` (min-h-12, px-8, text-[15px], font-semibold).
  - Props: `fullWidthOnMobile?`, `icon?`.
  - Transition 300ms on colors only. Pressed state `active:scale-[.98]`, except under reduced motion. `disabled` gives opacity-60 and `cursor-not-allowed`.
- **`Icon`**: thin wrapper over `FontAwesomeIcon` with `aria-hidden` by default and a `fixedWidth` option.
- **`CheckList`**: `<ul>` of items with a gold `faCheck`, used by About and the Booking panel.
- **`Reveal`**: see §9.4.
- **`ResponsiveImage`**: `{ image, alt, sizes, className, loading='lazy', priority? }`. Renders `<img src srcSet sizes width height decoding="async">`; `priority` sets `fetchPriority="high"` and eager loading.

**Browser surfaces** (`index.css` base layer):
- `::selection { background: rgb(212 175 55 / .35); color: #2C2C2C }`
- `caret-color: #856611`
- `accent-color: #D4AF37` on checkboxes
- Placeholders `#6B7280` at opacity 1 (original)
- Thin scrollbar via `scrollbar-color: #D4AF37 transparent` on the sheet list
- `scrollbar-gutter: stable` on html
- `overflow-x: clip` on html and body (`clip` instead of `hidden`, so sticky and positioned elements keep working)
- `-webkit-tap-highlight-color: transparent`
- Focus: global `:focus-visible { outline: 2px solid var(--ring, #856611); outline-offset: 3px; }`. Dark surfaces, the hero, the transparent navbar, the lightbox, and the footer set `--ring: #F1D77C`. Form inputs additionally get `focus:border-gold focus:ring-2 focus:ring-gold/40`.

**Section components** (structure and responsive notes):

- **Hero** (`id="top"`): see §6. Content is `max-w-5xl`, centered, `mt-14 md:mt-16`. Eyebrow "Marriages & Events" (white). h1 with `<br>`, and the gold span on its own line. Paragraph is `max-w-2xl`. CTA "Get a Free Quote" is primary on dark and links to `#booking`.
- **About**:
  - 2-column at lg, gap 64px. Image column has an offset gold border (`translate-x-4 translate-y-4`, shown at lg only).
  - Image heights: 220px at <768 with radius 14px; 288px at md; 384px at md+; 500px at lg.
  - Text is centered below 768px and left-aligned from 768px up (original). Divider is `start`. The CheckList stays left-aligned inside a centered `inline-block` on mobile.
  - "Explore Our Services" is an outline button linking to `#services`, full width below 640px.
- **Services**: 6 cards (cream background, `border-gray-100`, `shadow-elegant`, radius 16px).
  - Icon disc: 48px, white, gold icon.
  - Columns: 1 at <768 (centered content, padding 20px), 2 at md (padding 28px), 3 at lg (padding 32px).
  - Hover lift `-translate-y-1` and `shadow-elegant-hover`, on hover devices only.
- **Editorial**: see §6. Content is `max-w-4xl`, centered. Divider is gold. CTA "Plan Your Celebration" is `outlineGold`, uppercase, tracking-wider, and links to `#booking`. Padding 56px at <768, 80px at md, 128px at lg.
- **Events**:
  - Card image height: 200px at <768, 240px at md, 320px at lg. Columns: 1, then 2 at sm, then 3 at lg.
  - Gradient per §6. Content at the bottom: h3 white, description `text-white/80` (on hover-capable devices it is hidden until hover or focus-within, opacity and translate-y-2; on touch it is always visible), and an "Enquire Now" link with `faArrowRight` in gold.
  - The link uses a stretched `after:absolute after:inset-0` so the whole card is one target. Its accessible name is "Enquire about {title}"; visible text stays "Enquire Now".
- **WhyChooseUs**:
  - Text column: eyebrow, h2, divider, body, then 2 benefits. Each benefit has a 44px cream disc with a gold icon, an h3, and a description in gray-500.
  - Image pair (264px tall, radius 16px, `shadow-lg`, second image offset `mt-8`): hidden at <768, a 2-column grid at md, and in the right column at lg. Body text is centered on mobile.
- **Process**:
  - 4 white cards with a number badge: 48px (56px at md), gold border, `gold-readable` numerals with `tabular-nums`.
  - Below 768px: the badge sits inline left of the h3, the description is indented `pl-[60px]`, and connectors run between cards (§9.5).
  - From 768px up: centered stack. The number badge is kept because the sequence carries meaning.
- **Gallery**:
  - Header row: heading (left) and disclaimer (right, italic, `max-w-xs`). Stacked and centered below 768px. This section has no divider (original).
  - Grid per §9.6.
- **Booking**:
  - Shell: white, radius 16px (24px at lg), `shadow-elegant`, `border-gray-100`. Row layout at lg; column layout below.
  - Info panel (lg 40% width): charcoal, background image at 20% opacity, "Start Planning" eyebrow in gold-light, h2, body in gray-300 weight 300, and a 3-item CheckList. Padding 32×20px at <768, 40px at md, 40px at lg.
  - Form panel (lg 60% width): padding 24×20, then 40, then 56px.
  - Form grid: 2 columns from md, gap 16px, field spacing 24px.
- **Contact**:
  - 2-column at lg. Info: Address (6 lines with `<br>`, wrapped in `<address class="not-italic">`) and Contact (proprietor, tel link, mailto link with `break-all`). Each block has a 44px cream disc icon and an h3.
  - Buttons: "Call Now" (dark pill, tel link) and "WhatsApp". Both full width below 640px.
  - Map placeholder card: gray-100, `faMapLocationDot`, and the original two lines. Height 280px, 320px at md, 384px at lg.
- **FinalCta**: charcoal with the original gold cross-pattern SVG (inline data URI as a CSS background, opacity 5%). Eyebrow "Your Special Day Begins Here" in gold, display h2 white, paragraph gray-300. Buttons: "Plan Your Event" (primary on dark, links to `#booking`) and "Explore Services" (ghostLight, links to `#services`).
- **Footer**:
  - Background ink with `border-gray-800`. Grid: 1 column at <768, 2 at 768–1023, 4 at lg; the brand block spans 2.
  - Brand: emblem 52px (60px at md), wordmark sand 24px (28px at md), subtitle, and the description.
  - "Quick Links" (5 links) and "Legal" (2 buttons) column headings are h2 at text-lg, gold.
  - Bottom bar has the copyright.
  - Padding top 40/60/80px. Padding bottom 96px at <768 (clears the FAB), 32px at md, 40px at lg.

## 13. Accessibility Plan

- **Landmarks:** `SkipLink` ("Skip to main content", visually hidden until focused, links to `#main`), `<header>` wrapping `<nav aria-label="Primary">`, `<main id="main" tabIndex={-1}>`, `<footer>`. The drawer has its own `<nav aria-label="Mobile">`.
- **Headings:**
  - The single h1 is in the Hero.
  - Each section has an h2 with an id used by `aria-labelledby`. The Booking panel's heading is promoted to h2, since the section otherwise has none.
  - Card, benefit, process, and contact titles are h3. The original used h4 there, skipping a level.
  - Footer column headings are h2. Sheet and dialog titles are h2.
- **Images:** see §11.
- **Icons:** always `aria-hidden`. Icon-only controls have an `aria-label`.
- **Dialogs:** all three use `role="dialog"`, `aria-modal`, a label, initial focus, a focus trap, Escape, focus restore, and an inert background (§9.1).
- **Touch targets:** at least 44×44px. Form controls and primary CTAs are at least 48px.
- **Contrast:** checked per §12. Gold is never used for small text on light surfaces.
- **Forms:**
  - Every input has a `<label for>`.
  - Required fields use the `required` attribute plus visual `*`.
  - Errors are linked via `aria-describedby` and `aria-invalid`.
  - The status message is `role="status"`.
  - Checkbox groups are labelled.
- **Reduced motion:** NFR-4. Smooth scroll is also disabled under reduced motion.
- Full WCAG validation still needs manual testing with screen readers (VoiceOver iOS/macOS, NVDA).

## 14. Testability

Unit tests (Vitest, pure):
- `buildEnquiryMessage`: full and empty optional fields, compared byte-for-byte against the original template, and services order.
- `validateEnquiry`: each rule boundary (mobile 9, 10, and 11 digits, and letters; guests 0, 1, 100000, 100001, and 1.5; date yesterday and today).
- `waLink` encoding.
- JSON-LD lives as a static block in `react-site/index.html`. A test reads the file with `fs`, extracts the `application/ld+json` script, runs `JSON.parse`, and asserts the telephone, postalCode, and name match `site.ts`.

Component tests (Testing Library + jsdom):
- **OverlayProvider:** opening sets `inert` on `#page` and html `overflow:hidden`. Escape closes. Focus returns to the opener. Nested stack (sheet over nothing / menu) keeps a single lock.
- **MobileMenu:** hamburger toggles `aria-expanded`. A link click closes it.
- **Lightbox:** opens on the tile with the right image. ArrowRight from the last wraps to the first. Escape closes and focuses the tile.
- **ServicesSheet:** Done commits and the trigger label updates. Close discards. Desktop checkboxes reflect committed values. `matchMedia` is mocked for the 768px query.
- **EnquiryForm:** an invalid submit shows errors, focuses name, and doesn't call `window.open`. A valid submit calls `window.open` with the expected URL. A `null` return triggers `location.assign`.
- **Reveal:** under mocked reduced motion, it renders the visible class immediately.

`src/test/setup.ts` mocks `IntersectionObserver`, `matchMedia`, and `scrollTo`, and imports `@testing-library/jest-dom/vitest`.

Visual and responsive checks (manual, during implementation): one batched screenshot pass at 375×812, 768×1024, 1280×800, 1536×864, and 812×375. Check the hero brightness, editorial visibility, the special event card, and overflow. One fix pass, one confirm pass. After the UI is finished, run the Impeccable detector once: `impeccable detect --json react-site/src`.

## 15. Error Handling Summary

| Operation | Failure | Recoverable? | User sees | Logged |
|---|---|---|---|---|
| Image load (any `<img>`) | 404 or decode error | yes | Charcoal or cream background (container bg), layout stable (width and height set) | no |
| Lightbox image | load error | yes | "Image could not be loaded" text; navigation still works | no |
| `window.open` WhatsApp | popup blocked (returns null) | yes | Same-tab navigation to wa.me | no |
| Clipboard fallback | API missing or rejected | yes | Inline message with the phone number | `console.warn` |
| Form validation | invalid fields | yes | Inline errors, focus on the first one | no |
| Overlay open with null ref | programming error | yes (no-op) | nothing | `console.warn` (dev only) |
| Scroll-lock restore | missing saved state | yes | nothing | no |
| Build-time imagetools | bad path or query | fatal (build fails) | n/a | Vite error |

## 16. Implementation Order

1. Scaffold `react-site` with pinned dependencies and config. Copy and rename assets. Generate the OG image.
2. `index.css` tokens and base layer, `data/*`, `images.ts`, primitives.
3. OverlayProvider and hooks.
4. Sections top to bottom.
5. Form, picker, and sheet.
6. Lightbox.
7. Tests.
8. Build and the batched visual check.
