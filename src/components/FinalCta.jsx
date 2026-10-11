import Reveal from './Reveal.jsx';

const PATTERN =
  "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'#D4AF37\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')";

export default function FinalCta() {
  return (
    <section className="final-cta py-12 lg:py-24 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: PATTERN }} aria-hidden="true" />
      <Reveal className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <span className="text-gold tracking-widest text-sm font-semibold uppercase block mb-4">Your Special Day Begins Here</span>
        <h2 className="font-bold text-3xl md:text-5xl text-white mb-4">Let's Make Your Celebration Unforgettable</h2>
        <p className="text-gray-300 mb-7 text-base md:text-lg font-light">
          From intimate ceremonies to grand events, let us discuss the arrangements that suit your celebration.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#booking"
            className="w-full sm:w-auto bg-gold text-charcoal px-8 py-3.5 rounded-full font-medium hover:bg-white hover:text-charcoal transition duration-300 shadow-lg flex items-center justify-center min-h-[48px]"
          >
            Plan Your Event
          </a>
          <a
            href="#services"
            className="w-full sm:w-auto border border-gray-400 text-white px-8 py-3.5 rounded-full font-medium hover:border-white transition duration-300 flex items-center justify-center min-h-[48px]"
          >
            Explore Services
          </a>
        </div>
      </Reveal>
    </section>
  );
}
