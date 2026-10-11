# React In-Place Conversion — Scaffold Notes

## (a) Backup
Original index.html backed up VERBATIM to:
`/Users/technicalmonish/Desktop/Website/demo.ramsstudio.in/demo.ramsstudio.in/tirumala/.agents/tasks/react-inplace-conversion/original-index.html`
(95,823 bytes, non-empty, verified.)

## (b) Files copied into public/images/
Source: `tirumala/images/` → copied (not moved) to `tirumala/public/images/`. Original `images/` left intact as backup.

- 1hero-wedding-stage.webp
- 1venue-interior.webp
- 1wedding-stage.webp
- balaji-icon.png
- entrance-decoration.webp
- favicon.png
- hero-wedding-stage.webp
- special-event.jpeg  ← renamed from `Special Event.jpeg` (copy only; original filename preserved in `images/`)
- venue-exterior-night.webp
- venue-interior.webp
- wedding-stage.webp

`Special Event.jpeg` → yes, the copy was renamed to `special-event.jpeg`.

## (c) Section inventory and order (from index.html, top → bottom)
1. Navbar (sticky) + MobileMenu (slide-in drawer)
2. Hero (`<section class="hero-full">`, line 406) — full-screen image + vignette + headline/CTAs
3. About (`#about`, line 425)
4. Services (`#services`, line 449)
5. Editorial (`#editorial`, line 505) — parallax bg `images/wedding-stage.webp`
6. Events (`#events`, line 516)
7. WhyChooseUs (`.why-section`, line 579)
8. Process (`#process`, line 622)
9. Gallery (`#gallery`, line 671) + Lightbox modal (`#lightbox`)
10. Booking (`#booking`, line 720) + ServicesSheet (slide-up services picker tied to enquiryForm)
11. Contact (`#contact`, line 819)
12. FinalCta (`.final-cta`, line 870)
13. Footer
Plus: floating WhatsApp FAB (fixed, bottom-right).

## (d) Referenced-but-missing images → substitute mapping
Image references found in index.html (via `src="images/..."` and `url('images/...')`):
balaji-icon.png, entrance-decoration.webp, hero-wedding-stage.webp, hero-wedding.webp, Special Event.jpeg, traditional-garlands.webp, venue-door.webp, venue-exterior-day.webp, venue-exterior-night.webp, venue-interior.webp, wedding-stage.webp.

Actually present in `public/images/` after copy:
1hero-wedding-stage.webp, 1venue-interior.webp, 1wedding-stage.webp, balaji-icon.png, entrance-decoration.webp, favicon.png, hero-wedding-stage.webp, special-event.jpeg, venue-exterior-night.webp, venue-interior.webp, wedding-stage.webp.

| Referenced (missing) | Substitute from public/images/ | Notes |
|---|---|---|
| `hero-wedding.webp` | `1hero-wedding-stage.webp` | closest hero-style stage shot; keeps hero visually distinct from the `wedding-stage.webp` used by editorial parallax |
| `traditional-garlands.webp` | `entrance-decoration.webp` | decorative floral/entrance imagery, best thematic match |
| `venue-door.webp` | `1venue-interior.webp` | interior entrance view; avoids reusing `venue-interior.webp` in adjacent card |
| `venue-exterior-day.webp` | `1wedding-stage.webp` | no daytime exterior exists; use remaining unused alternate so adjacent gallery cards don't repeat |
| `Special Event.jpeg` (ref form) | `special-event.jpeg` | not missing — just filename-cased; update references to new lowercase/hyphenated name |

Adjacency check: hero uses `1hero-wedding-stage.webp`; editorial parallax keeps `wedding-stage.webp`; gallery/cards distribute `entrance-decoration.webp`, `1venue-interior.webp`, `venue-interior.webp`, `1wedding-stage.webp`, `venue-exterior-night.webp`, `special-event.jpeg`, `hero-wedding-stage.webp` so no two adjacent cards reuse the same asset.

## (e) Tailwind config + custom color CSS (verbatim from current index.html <head>)

```js
tailwind.config = {
    theme: {
        extend: {
            colors: {
                cream: '#FDFBF7',
                gold: '#D4AF37',
                charcoal: '#2C2C2C',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            boxShadow: {
                'elegant': '0 10px 30px -10px rgba(44, 44, 44, 0.05)',
                'elegant-hover': '0 20px 40px -10px rgba(44, 44, 44, 0.1)',
            }
        }
    }
}
```

Custom color utility classes used (verbatim):
```css
.text-gold { color: #D4AF37; }
.text-gold-readable { color: #856611; }
.bg-gold { background-color: #D4AF37; }
.gold-divider { width: 60px; height: 3px; background-color: #D4AF37; margin: 1rem auto; }
.gold-divider-left { width: 60px; height: 3px; background-color: #D4AF37; margin-top: 1rem; margin-bottom: 1rem; }
```
Body defaults: `font-family: 'Poppins', sans-serif; background-color: #FDFBF7; color: #2C2C2C;` — reuse in the Vite `index.css` / Tailwind base layer.
Font: Google Fonts Poppins weights 300;400;500;600;700. FontAwesome 6.4.0 via cdnjs.
