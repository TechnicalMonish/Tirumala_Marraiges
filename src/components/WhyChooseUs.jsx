import Reveal from './Reveal.jsx';
import { BENEFITS } from '../data.js';
import { img } from '../utils.js';

export default function WhyChooseUs() {
  return (
    <section className="why-section py-10 lg:py-24 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <span className="text-gold-readable tracking-widest text-sm font-semibold uppercase">Why Choose Us</span>
            <h2 className="font-bold text-3xl md:text-4xl text-charcoal mt-2 mb-4">
              Your Perfect Partner for Flawless Events
            </h2>
            <div className="gold-divider-left" />
            <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base why-body">
              We understand that planning an event can be stressful. Our goal is to take that burden off your shoulders by providing reliable, end-to-end solutions that fit within your budget.
            </p>
            <div className="space-y-6">
              {BENEFITS.map((b) => (
                <div key={b.title} className="flex">
                  <div className="flex-shrink-0">
                    <div className="benefit-icon flex items-center justify-center h-11 w-11 rounded-full bg-cream text-gold">
                      <i className={`fas ${b.icon}`} aria-hidden="true" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="benefit-title text-base font-semibold text-charcoal">{b.title}</h4>
                    <p className="benefit-desc mt-1 text-sm text-gray-500">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="grid grid-cols-2 gap-4 why-images">
            <img
              src={img('wedding-stage.webp')}
              alt="Decor"
              className="rounded-2xl h-64 object-cover w-full shadow-lg"
              loading="lazy"
            />
            {/* venue-exterior-day.webp -> 1wedding-stage.webp */}
            <img
              src={img('1wedding-stage.webp')}
              alt="Catering"
              className="rounded-2xl h-64 object-cover w-full shadow-lg mt-8"
              loading="lazy"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
