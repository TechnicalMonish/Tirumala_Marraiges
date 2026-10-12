// WhatsApp business number: country code and number, digits only.
export const BUSINESS_WHATSAPP = '917013099397';

export function openWhatsApp(text) {
  if (!BUSINESS_WHATSAPP) {
    window.alert('Contact details are currently being updated. Please check back soon!');
    return;
  }
  const url = text
    ? `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${BUSINESS_WHATSAPP}`;
  // Click a detached <a target="_blank" rel="noopener noreferrer"> instead of
  // calling window.open: with noopener it returns null even when the tab
  // opens, so its result cannot drive a fallback without also navigating
  // the current tab.
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.click();
}

// Plain-text WhatsApp enquiry built from the form fields.
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
