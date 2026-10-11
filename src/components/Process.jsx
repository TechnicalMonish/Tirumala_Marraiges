import { Fragment } from 'react';
import Reveal from './Reveal.jsx';
import { PROCESS } from '../data.js';

export default function Process() {
  return (
    <section id="process" className="py-10 lg:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-8 md:mb-16 proc-header">
          <span className="text-gold-readable tracking-widest text-sm font-semibold uppercase">Our Process</span>
          <h2 className="font-bold text-3xl md:text-4xl text-charcoal mt-2">Your Celebration, Simplified</h2>
          <div className="gold-divider" />
        </Reveal>

        <div className="relative">
          <div
            className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 transform -translate-y-1/2 z-0"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8 relative z-10 process-grid">
            {PROCESS.map((p, i) => (
              <Fragment key={p.n}>
                <Reveal
                  className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 text-left md:text-center"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-2 md:block md:gap-0 md:mb-3">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-cream border-2 border-gold rounded-full flex-shrink-0 flex items-center justify-center text-gold-readable font-bold text-lg md:text-xl md:mx-auto bg-white">
                      {p.n}
                    </div>
                    <h4 className="font-bold text-[17px] md:text-lg m-0 text-charcoal">{p.title}</h4>
                  </div>
                  <p className="text-gray-500 text-[15px] pl-[60px] md:pl-0 leading-relaxed">{p.desc}</p>
                </Reveal>
                {i < PROCESS.length - 1 && (
                  <div className="process-connector md:hidden" aria-hidden="true" />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
