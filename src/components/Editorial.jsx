import Reveal from './Reveal.jsx';
import { img } from '../utils.js';

// Preserve EXACTLY bg-black/45. Do not darken further.
export default function Editorial() {
  return (
    <section
      id="editorial"
      className="editorial-section relative py-14 lg:py-32 bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url('${img('wedding-stage.webp')}')` }}
    >
      <div className="absolute inset-0 bg-black/45" />
      <Reveal className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-bold text-3xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
          Traditions to Treasure.<br />Celebrations to Remember.
        </h2>
        <div className="gold-divider" />
        <p className="text-gray-200 text-base md:text-xl font-light mb-8">
          From sacred rituals to grand celebrations, every moment deserves thoughtful planning.
        </p>
        <a
          href="#booking"
          className="inline-block border border-gold text-gold hover:bg-gold hover:text-charcoal px-8 py-3 rounded-full transition duration-300 uppercase text-sm tracking-wider"
        >
          Plan Your Celebration
        </a>
      </Reveal>
    </section>
  );
}
