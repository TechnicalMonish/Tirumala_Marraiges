import { openWhatsApp } from '../utils.js';

export default function WhatsAppFab() {
  return (
    <button type="button" onClick={() => openWhatsApp()} className="whatsapp-fab" aria-label="Chat on WhatsApp">
      <i className="fab fa-whatsapp" aria-hidden="true" />
    </button>
  );
}
