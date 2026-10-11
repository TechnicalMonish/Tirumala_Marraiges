// All page content lives here so section components stay simple maps.
// Image paths are resolved via src/utils.js's `img()` helper.

export const SERVICES = [
  { icon: 'fa-hotel',          title: 'Venue & Stay',       desc: 'Function Hall Booking & Accommodation Arrangements for you and your guests.' },
  { icon: 'fa-utensils',       title: 'Decor & Catering',   desc: 'Traditional & Modern Decorations coupled with authentic, delicious Catering Services.' },
  { icon: 'fa-om',             title: 'Rituals & Music',    desc: 'Experienced Purohits, Pooja Materials, and traditional Sannai Melam music.' },
  { icon: 'fa-camera-retro',   title: 'Media & Grooming',   desc: 'Professional Photography, Videography, and expert Bridal Makeup Artists.' },
  { icon: 'fa-clipboard-list', title: 'Event Management',   desc: 'End-to-end Event Planning, Coordination, and VIP Guest Management.' },
  { icon: 'fa-gift',           title: 'Complete Services',  desc: 'And all other miscellaneous services required to make your event truly memorable.' },
];

export const EVENTS = [
  { image: 'venue-exterior-night.webp', alt: 'Wedding',    title: 'Wedding Ceremonies',       desc: 'Complete traditional wedding management.' },
  { image: 'entrance-decoration.webp',  alt: 'Engagement', title: 'Engagement Celebrations',  desc: 'Intimate or grand pre-wedding events.' },
  { image: 'venue-interior.webp',       alt: 'Reception',  title: 'Wedding Receptions',       desc: 'Elegant stage decor and grand dinners.' },
  // traditional-garlands.webp -> entrance-decoration.webp (scaffold-notes substitution)
  { image: 'entrance-decoration.webp',  alt: 'Religious',  title: 'Religious Ceremonies',     desc: 'Poojas, Vratams, and sacred rituals.' },
  // venue-door.webp -> 1venue-interior.webp (scaffold-notes substitution)
  { image: '1venue-interior.webp',      alt: 'Family',     title: 'Family Celebrations',      desc: 'Anniversaries, half-saree functions, etc.' },
  // Special Event.jpeg -> special-event.jpeg (renamed copy)
  { image: 'special-event.jpeg',        alt: 'Special',    title: 'Special Events',           desc: 'Corporate gatherings or tailored occasions.' },
];

export const BENEFITS = [
  { icon: 'fa-wallet',    title: 'Budget-Friendly Options',  desc: 'We tailor our services to match your specific financial planning without compromising on quality.' },
  { icon: 'fa-handshake', title: 'End-to-End Management',    desc: 'From the initial booking to the final guest departure, we handle every detail.' },
];

export const PROCESS = [
  { n: '01', title: 'Share Your Requirements', desc: 'Tell us about your event, date, location and preferences.' },
  { n: '02', title: 'Discuss Your Plan',       desc: 'Explore arrangements and services suited to your requirements and budget.' },
  { n: '03', title: 'Coordinate Every Detail', desc: 'Plan the selected services, suppliers and event arrangements.' },
  { n: '04', title: 'Celebrate Your Occasion', desc: 'Enjoy your special event while the agreed arrangements are coordinated.' },
];

// Gallery tiles, in display order. `span` maps to the lg-grid span classes.
export const GALLERY = [
  // hero-wedding.webp -> 1hero-wedding-stage.webp (scaffold-notes substitution)
  { image: '1hero-wedding-stage.webp',  alt: 'Tirumala Marriage Hall Interior', span: 'feature' },
  { image: 'wedding-stage.webp',        alt: 'Wedding mandap decoration',       span: 'default' },
  { image: 'venue-exterior-night.webp', alt: 'Function Hall Exterior Night View', span: 'default' },
  { image: 'entrance-decoration.webp',  alt: 'Decorated Event Entrance',        span: 'tall' },
  // venue-door.webp -> 1venue-interior.webp
  { image: '1venue-interior.webp',      alt: 'Decorated Venue Doorway',         span: 'default' },
  // traditional-garlands.webp -> entrance-decoration.webp
  { image: 'entrance-decoration.webp',  alt: 'Traditional flower garlands',     span: 'wide' },
  // venue-exterior-day.webp -> 1wedding-stage.webp
  { image: '1wedding-stage.webp',       alt: 'Venue Exterior Day View',         span: 'desktopOnly' },
];

export const EVENT_TYPES = [
  { value: 'Wedding',    label: 'Wedding' },
  { value: 'Engagement', label: 'Engagement' },
  { value: 'Reception',  label: 'Reception' },
  { value: 'Religious',  label: 'Religious Ceremony' },
  { value: 'Other',      label: 'Other Celebration' },
];

// Checkbox options (desktop) and sheet rows (mobile) — both views share this list.
export const SERVICE_OPTIONS = [
  { value: 'Function Hall',         short: 'Function Hall Booking',           long: 'Function Hall Booking' },
  { value: 'Accommodation',         short: 'Accommodation',                   long: 'Accommodation Arrangements' },
  { value: 'Catering',              short: 'Catering Services',               long: 'Catering Services' },
  { value: 'Decorations',           short: 'Decorations',                     long: 'Traditional & Modern Decorations' },
  { value: 'Photography',           short: 'Photography & Video',             long: 'Photography & Videography' },
  { value: 'Purohits',              short: 'Experienced Purohits',            long: 'Experienced Purohits' },
  { value: 'Pooja Materials',       short: 'Pooja Materials',                 long: 'Pooja Materials & Articles' },
  { value: 'Makeup',                short: 'Bridal Makeup',                   long: 'Bridal Makeup Artists' },
  { value: 'Music',                 short: 'Sannai Melam & Music',            long: 'Sannai Melam & Traditional Music' },
  { value: 'Management',            short: 'Event Planning',                  long: 'Event Planning & Coordination' },
  { value: 'Guest Management',      short: 'Guest Management',                long: 'Guest Management' },
  { value: 'Complete Arrangements', short: 'Complete Arrangements',           long: 'Complete Event Arrangements' },
];

export const NAV_LINKS = [
  { href: '#top',      label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#events',   label: 'Events' },
  { href: '#gallery',  label: 'Gallery' },
  { href: '#contact',  label: 'Contact' },
];
