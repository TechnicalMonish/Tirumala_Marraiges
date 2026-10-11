import Reveal from './Reveal.jsx';
import { SERVICES } from '../data.js';

export default function Services() {
  return (
    <section id="services" className="py-10 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-8 md:mb-16 svc-header">
          <span className="text-gold-readable tracking-widest text-sm font-semibold uppercase">Our Expertise</span>
          <h2 className="font-bold text-3xl md:text-4xl text-charcoal mt-2">Complete Event Services</h2>
          <div className="gold-divider" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 services-grid">
          {SERVICES.map((s) => (
            <Reveal
              key={s.title}
              className="bg-cream rounded-2xl p-5 lg:p-8 shadow-elegant service-card border border-gray-100"
            >
              <div className="svc-icon w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-gold text-xl">
                <i className={`fas ${s.icon}`} aria-hidden="true" />
              </div>
              <h3 className="svc-title font-bold text-xl lg:text-2xl mb-2">{s.title}</h3>
              <p className="svc-desc text-gray-600 text-xs lg:text-sm leading-relaxed">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
