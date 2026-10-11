import { openWhatsApp } from '../utils.js';

export default function WhatsAppFab() {
  return (
    <button
      type="button"
      onClick={() => openWhatsApp()}
      className="whatsapp-fab bg-[#25D366] text-charcoal w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-2xl md:text-3xl shadow-lg hover:scale-110 transition duration-300"
      aria-label="Chat on WhatsApp"
    >
      <i className="fab fa-whatsapp" aria-hidden="true" />
    </button>
  );
}
