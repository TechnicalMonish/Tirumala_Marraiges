import { img } from '../utils.js';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#1A1A1A] text-white pt-10 lg:pt-20 pb-24 md:pb-8 lg:pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-8 lg:mb-16 footer-grid text-left">
          <div className="col-span-1 md:col-span-2 flex flex-col items-start">
            <div className="flex items-center justify-start space-x-3 mb-4">
              <img
                src={img('balaji-icon.png')}
                alt=""
                className="h-[52px] md:h-[60px] w-auto object-contain drop-shadow-md"
              />
              <div className="flex flex-col justify-center text-left leading-none mt-1">
                <span
                  className="font-extrabold text-[24px] md:text-[28px] tracking-tight text-[#E8DCC0] uppercase"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  TIRUMALA
                </span>
                <span className="text-[10.5px] font-semibold tracking-widest uppercase mt-[4px] text-gray-400">
                  MARRIAGE SERVICE &amp; SUPPLIERS
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-0">
              We organize weddings and all types of events for every budget, offering complete end-to-end event management services. Crafting beautiful moments into lasting memories.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white text-sm transition py-1 block">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white text-sm transition py-1 block">Our Services</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-white text-sm transition py-1 block">Events We Organize</a></li>
              <li><a href="#gallery" className="text-gray-400 hover:text-white text-sm transition py-1 block">Event Gallery</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white text-sm transition py-1 block">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg text-gold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => window.alert('Privacy Policy Draft: Text to be updated.')}
                  className="text-gray-400 hover:text-white text-sm transition py-1 block text-left w-full bg-transparent"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => window.alert('Terms & Conditions Draft: Text to be updated.')}
                  className="text-gray-400 hover:text-white text-sm transition py-1 block text-left w-full bg-transparent"
                >
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left text-xs text-gray-400">
          <p>&copy; <span id="year">{year}</span> Tirumala Marriage Service &amp; Suppliers. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
