import Reveal from './Reveal.jsx';
import { EVENTS } from '../data.js';
import { img } from '../utils.js';

export default function Events() {
  return (
    <section id="events" className="py-10 lg:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-8 md:mb-16 evt-header">
          <span className="text-gold-readable tracking-widest text-sm font-semibold uppercase">Our Celebrations</span>
          <h2 className="font-bold text-3xl md:text-4xl text-charcoal mt-2">Every Occasion Deserves Something Special</h2>
          <div className="gold-divider" />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 events-grid">
          {EVENTS.map((e, i) => (
            <Reveal
              key={e.title}
              className="event-card group relative rounded-2xl overflow-hidden cursor-pointer shadow-md"
            >
              <img
                src={img(e.image)}
                alt={e.alt}
                className="event-card-img w-full h-52 md:h-64 lg:h-80 object-cover img-scale transition duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent img-overlay flex flex-col justify-end p-4 md:p-5">
                <h3 className="font-bold text-xl text-white mb-1">{e.title}</h3>
                <p className="event-desc text-gray-300 text-sm mb-3 opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {e.desc}
                </p>
                <a
                  href="#booking"
                  className="event-link text-gold text-sm font-medium uppercase tracking-wider"
                >
                  Enquire Now &rarr;
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
