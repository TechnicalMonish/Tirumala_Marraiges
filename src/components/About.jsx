import Reveal from './Reveal.jsx';
import { img } from '../utils.js';

export default function About() {
  return (
    <section id="about" className="py-10 lg:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal className="relative">
            <div className="absolute inset-0 border-2 border-gold rounded-2xl transform translate-x-4 translate-y-4 offset-border" />
            <img
              src={img('venue-interior.webp')}
              alt="Tirumala Marriage Hall Interior"
              className="about-img relative z-10 w-full rounded-2xl shadow-xl object-cover h-64 sm:h-72 md:h-96 lg:h-[500px]"
              loading="lazy"
            />
          </Reveal>
          <Reveal className="text-center md:text-left">
            <span className="text-gold-readable tracking-widest text-sm font-semibold uppercase">About Tirumala</span>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-charcoal mt-2 mb-4 lg:mb-6 leading-tight">
              Crafting Beautiful Moments, Creating Lasting Memories
            </h2>
            <div className="gold-divider-left" />
            <p className="text-gray-600 mb-4 leading-relaxed about-body text-sm md:text-base">
              Tirumala Marriage Services &amp; Suppliers provides complete wedding and event arrangements for celebrations of all sizes and budgets. From finding the right venue to coordinating catering, decorations, traditional ceremonies, photography and guest arrangements, we help bring every essential service together.
            </p>
            <ul className="space-y-2 mb-6 about-ul">
              <li className="flex items-center text-charcoal text-sm md:text-base"><i className="fas fa-check text-gold mr-3 text-sm" aria-hidden="true" /> Complete Wedding Arrangements</li>
              <li className="flex items-center text-charcoal"><i className="fas fa-check text-gold mr-3" aria-hidden="true" /> Traditional &amp; Modern Celebrations</li>
              <li className="flex items-center text-charcoal text-sm md:text-base"><i className="fas fa-check text-gold mr-3 text-sm" aria-hidden="true" /> Services for Every Budget</li>
            </ul>
            <a
              href="#services"
              className="inline-block border border-charcoal text-charcoal px-8 py-3 rounded-full hover:bg-charcoal hover:text-white transition duration-300 text-center w-full sm:w-auto font-semibold"
            >
              Explore Our Services
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
