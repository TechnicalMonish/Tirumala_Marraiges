import { img } from '../utils.js';

// Hero overlay values preserved EXACTLY per the brief:
//  - linear:  bg-gradient-to-b from-charcoal/10 via-transparent to-charcoal/25
//  - radial:  rgba(0,0,0,0.32) -> rgba(0,0,0,0.52) at 58% -> transparent
//  - image:   object-cover object-center, opacity-100, fetchpriority=high, eager (not lazy)
export default function Hero() {
  return (
    <section id="top" className="hero-full relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-charcoal">
        <img
          src={img('hero-wedding-stage.webp')}
          alt="Tirumala Marriage Function Hall"
          className="w-full h-full object-cover object-center opacity-100"
          fetchpriority="high"
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
      <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto hero-animate mt-14 md:mt-16">
        <span className="text-white tracking-widest text-sm md:text-base font-semibold uppercase mb-4 block drop-shadow-md shadow-black">
          Marriages &amp; Events
        </span>
        <h1 className="text-[32px] leading-tight sm:text-4xl md:text-[46px] lg:text-[64px] text-white font-bold mb-6 drop-shadow-lg shadow-black">
          Tirumala Marriage <br />
          <span className="text-gold drop-shadow-lg shadow-black mt-2 inline-block">Service &amp; Suppliers</span>
        </h1>
        <p className="text-white text-base md:text-xl font-medium mb-10 max-w-2xl mx-auto drop-shadow-md shadow-black">
          We organize weddings and all types of events for every budget, offering complete end-to-end event management services.
        </p>
        <a
          href="#booking"
          className="inline-block bg-gold text-charcoal px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-charcoal transition duration-300 shadow-lg"
        >
          Get a Free Quote
        </a>
      </div>
    </section>
  );
}
