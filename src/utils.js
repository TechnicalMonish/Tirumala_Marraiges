// Resolve a public image path. With Vite `base: './'`, BASE_URL is `./`,
// so `./images/foo.webp` is resolved relative to the current document URL —
// which works both in dev (`/images/...`) and when deployed under a subpath.
export const img = (name) => `${import.meta.env.BASE_URL}images/${name}`;

// WhatsApp business number — kept byte-identical with the original index.html.
export const BUSINESS_WHATSAPP = '917013099397';

export function openWhatsApp(text) {
  if (!BUSINESS_WHATSAPP) {
    window.alert('Contact details are currently being updated. Please check back soon!');
    return;
  }
  const url = text
    ? `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${BUSINESS_WHATSAPP}`;
  // Programmatically click a disconnected <a target="_blank"> instead of
  // calling window.open directly. Passing noopener/noreferrer features to
  // window.open makes it return null even on a *successful* open (because
  // noopener severs the handle), which would then falsely trip a current-tab
  // redirect fallback — the double-navigation bug this replaces.
  // The anchor-click path gets the browser's native new-tab handling with
  // the same security attributes.
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.click();
}

// Reproduces the original enquiry message template byte-for-byte.
export function buildEnquiryMessage({ name, mobile, eventType, eventDate, location, guests, services, details }) {
  return (
    `Hello Tirumala Marriage Services, I would like to enquire about an event.\n\n` +
    `*Name:* ${name}\n` +
    `*Mobile:* ${mobile}\n` +
    `*Event Type:* ${eventType}\n` +
    `*Date:* ${eventDate ? eventDate : 'Not decided'}\n` +
    `*Location:* ${location ? location : 'Not specified'}\n` +
    `*Guests:* ${guests ? guests : 'Not specified'}\n` +
    `*Services Required:* ${services.length > 0 ? services.join(', ') : 'None selected'}\n` +
    `*Details/Budget:* ${details ? details : 'None'}`
  );
}

export function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}
