import Reveal from '../ui/Reveal.jsx';
import { img } from '../../lib/images.js';
import { Lotus } from '../ui/Ornaments.jsx';

// A single bg-black/45 overlay; legibility comes from text-shadow on the copy.
export default function Editorial() {
  return (
    <section
      id="editorial"
      className="editorial-section relative bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url('${img('lotus-flower-wall-stage.webp')}')` }}
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
