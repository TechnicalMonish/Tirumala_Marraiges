import { img } from '../../lib/images.js';
import { CaptionRule, ZariBand } from '../ui/Ornaments.jsx';

// Two overlays (linear + radial) keep the photo bright; legibility comes from text-shadow,
// and the arch around the lockup is a line, never a fill. The image loads eagerly with
// high fetch priority because it is the largest paint.
export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__media">
        <img
          src={img('tirumala-temple-vimana-sunset.webp')}
          alt="Golden vimana and white gopuram of the Tirumala temple at sunset"
          width="1920"
          height="1281"
          className="hero__img opacity-100"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/10 via-transparent to-charcoal/25" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 70% at center,rgba(0,0,0,0.32) 0%,rgba(0,0,0,0.52) 58%,transparent 100%)',
          }}
        />
      </div>

      <div className="hero-lockup">
        <h1 className="hero__title h-display t-xl">
          <span className="hero__line-1">Tirumala Marriage</span>{' '}
          <span className="hero__line-2">Service &amp; Suppliers</span>
        </h1>
        <CaptionRule label="Marriages & Events" tone="dark" className="hero__caption" />
        <p className="hero__lede">
          We organize weddings and all types of events for every budget, offering complete end-to-end event management services.
        </p>
        <div className="hero__actions">
          <a href="#booking" className="btn btn--gold">Get a Free Quote</a>
          <a href="#services" className="btn btn--ghost-light">Explore Our Services</a>
        </div>
      </div>
      <ZariBand />
    </section>
  );
}
