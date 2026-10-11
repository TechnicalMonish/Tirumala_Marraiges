import Reveal from './Reveal.jsx';
import { openWhatsApp } from '../utils.js';

export default function Contact() {
  return (
    <section id="contact" className="py-12 lg:py-24 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center md:text-left">
            <span className="text-gold-readable tracking-widest text-sm font-semibold uppercase">Get In Touch</span>
            <h2 className="font-bold text-[28px] md:text-4xl text-charcoal mt-2 mb-4 leading-tight">
              Visit Us or Get in Touch
            </h2>
            <div className="gold-divider md:gold-divider-left mx-auto md:mx-0" />

            <div className="space-y-6 mt-8 text-left max-w-sm mx-auto md:mx-0">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-11 h-11 bg-cream rounded-full flex items-center justify-center text-gold text-base mt-1">
                  <i className="fas fa-map-marker-alt" aria-hidden="true" />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-lg text-charcoal mb-1">Address</h4>
                  <p className="text-gray-500 text-sm leading-relaxed" id="business-address">
                    D.No. 18-3-60G/101,<br />
                    Revenue Ward No. 18,<br />
                    Shanthi Nagar,<br />
                    Tirupati, Chittoor,<br />
                    Andhra Pradesh - 517501,<br />
                    India.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-11 h-11 bg-cream rounded-full flex items-center justify-center text-gold text-base mt-1">
                  <i className="fas fa-phone-alt" aria-hidden="true" />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-lg text-charcoal mb-1">Contact</h4>
                  <p className="text-gray-500 text-sm leading-relaxed" id="business-phone">
                    <span className="font-medium text-charcoal">Proprietor:</span> Rajagopal Taliyakula<br />
                    <a href="tel:+919010015899" className="hover:text-[#856611] transition">Mobile: +91 9010015899</a><br />
                    <a href="mailto:tirumala.marriage1991@gmail.com" className="hover:text-[#856611] transition break-all">
                      Email: tirumala.marriage1991@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <a
                href="tel:+919010015899"
                className="w-full sm:w-auto inline-flex justify-center items-center bg-charcoal text-white px-8 py-3.5 rounded-full hover:bg-gold hover:text-charcoal transition duration-300 text-[15px] font-semibold shadow-md min-h-[48px]"
              >
                <i className="fas fa-phone mr-2" aria-hidden="true" /> Call Now
              </a>
              <button
                type="button"
                onClick={() => openWhatsApp()}
                className="w-full sm:w-auto inline-flex justify-center items-center bg-[#25D366] text-charcoal px-8 py-3.5 rounded-full hover:bg-opacity-90 transition duration-300 text-[15px] font-semibold shadow-md min-h-[48px]"
              >
                <i className="fab fa-whatsapp mr-2 text-lg" aria-hidden="true" /> WhatsApp
              </button>
            </div>
          </div>

          <div className="h-[280px] md:h-72 lg:h-96 bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden flex items-center justify-center relative shadow-sm w-full contact-map mt-4 lg:mt-0">
            <div className="text-center p-6 relative z-10">
              <i className="fas fa-map-marked-alt text-4xl text-gray-300 mb-4" aria-hidden="true" />
              <p className="text-gray-500 font-medium">Google Maps Location</p>
              <p className="text-sm text-gray-500 mt-1">
                Map will be embedded once exact location details are provided.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
