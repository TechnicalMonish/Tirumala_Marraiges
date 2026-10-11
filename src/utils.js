// Resolve a public image path. With Vite `base: './'`, BASE_URL is `./`,
// so `./images/foo.webp` is resolved relative to the current document URL —
// which works both in dev (`/images/...`) and when deployed under a subpath.
export const img = (name) => `${import.meta.env.BASE_URL}images/${name}`;

// WhatsApp business number — kept byte-identical with the original index.html.
export const BUSINESS_WHATSAPP = '919885670534';

export function openWhatsApp(text) {
  if (!BUSINESS_WHATSAPP) {
    window.alert('Contact details are currently being updated. Please check back soon!');
    return;
  }
  const url = text
    ? `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${BUSINESS_WHATSAPP}`;
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (win === null) window.location.assign(url);
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
