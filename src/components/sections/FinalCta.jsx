import Reveal from '../ui/Reveal.jsx';
import { CaptionRule, ZariBand } from '../ui/Ornaments.jsx';

export default function FinalCta() {
  return (
    <section className="final-cta final band band--kumkum on-dark">
      <ZariBand />
      <div className="final__art" aria-hidden="true" />
      <Reveal className="final__inner container-x">
        <h2 className="h-display t-l text-cream">Let's Make Your Celebration Unforgettable</h2>
        <CaptionRule label="Your Special Day Begins Here" tone="dark" className="mt-6" />
        <p className="final__copy">
          From intimate ceremonies to grand events, let us discuss the arrangements that suit your celebration.
        </p>
        <div className="final__actions">
          <a href="#booking" className="btn btn--gold">Plan Your Event</a>
          <a href="#services" className="btn btn--ghost-light">Explore Services</a>
        </div>
      </Reveal>
      <ZariBand />
    </section>
  );
}
