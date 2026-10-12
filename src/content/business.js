// Business identity, contact details and location.

// Brand tagline, shown under the hero and in the footer.
export const TAGLINE = 'Since 1991 — Trusted by Generations, Chosen for Prestigious Celebrations, Dedicated to Every Family.';

// Contact details; addressLines renders one line per entry.
export const CONTACT = {
  role: 'Office Manager',
  phoneLabel: 'Mobile: +91 7013099397',
  phoneHref: 'tel:+917013099397',
  emailLabel: 'Email: tirumala.marriage1991@gmail.com',
  emailHref: 'mailto:tirumala.marriage1991@gmail.com',
  addressLines: ['D.No. 6-8-1093/A 3rd Floor,', 'NGOs Colony, KT Road', 'Near Nandhi Circle, Tirupati,', 'Andhra Pradesh - 517501,', 'India.'],
};

// Coordinates of the Google Business Profile listing.
export const GEO = { lat: 13.652572, lng: 79.4197161 };

// Short link to the Google Business listing. Used for "Get Directions".
export const MAPS_URL = 'https://maps.app.goo.gl/uCBzdT8RkYt5GNaa9';

// Keyless embed pinned to the business's exact coordinates (with the business
// name as the marker label) so the map centres on the Google Business pin.
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  `Tirumala Marriage Service & Suppliers@${GEO.lat},${GEO.lng}`
)}&ll=${GEO.lat},${GEO.lng}&z=16&output=embed`;
