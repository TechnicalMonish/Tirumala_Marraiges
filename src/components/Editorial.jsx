import Reveal from './Reveal.jsx';
import { img } from '../utils.js';
import { Lotus } from './Ornaments.jsx';

// Brightness constraint: exactly one overlay, bg-black/45. Do not darken further.
// Legibility comes from text-shadow on the copy.
export default function Editorial() {
  return (
    <section
      id="editorial"
      className="editorial-section relative bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url('${img('wedding-stage.webp')}')` }}
    >
      <div className="absolute inset-0 bg-black/45" />
      <Reveal className="relative z-10 container-x text-center">
        <h2 className="editorial__title h-display t-l">
          Traditions to Treasure.{' '}
          <em>Celebrations to Remember.</em>
        </h2>
        <div className="lotus-divider mt-7" aria-hidden="true">
          <span /><Lotus /><span />
        </div>
        <p className="editorial__copy">
          From sacred rituals to grand celebrations, every moment deserves thoughtful planning.
        </p>
        <div className="mt-9">
          <a href="#booking" className="btn btn--ghost-gold">Plan Your Celebration</a>
        </div>
      </Reveal>
    </section>
  );
}
