// All page content lives here so section components stay simple maps.
// Image paths are resolved via src/utils.js's `img()` helper.

// Intrinsic pixel sizes, used for width/height attributes (no layout shift).
export const IMG_SIZE = {
  'hero-wedding-stage.webp': [1920, 1281],
  'wedding-stage.webp': [1280, 720],
  '1hero-wedding-stage.webp': [1672, 941],
  'venue-interior.webp': [1277, 786],
  '1venue-interior.webp': [1600, 1067],
  'entrance-decoration.webp': [1600, 1067],
  'venue-exterior-night.webp': [1600, 1067],
  'special-event.jpeg': [1280, 960],
  'balaji-icon.png': [200, 184],
};

// User-supplied, authoritative brand copy (byte-exact).
export const TAGLINE = 'Since 1991 — Trusted by Generations, Chosen for Prestigious Celebrations, Dedicated to Every Family.';

// About copy. Markup markers only: **strong** and {{ceremony name}}; stripping
// them yields the exact user-supplied text.
export const ABOUT = {
  heading: 'Tirumala Marriage Service & Suppliers',
  subheading: 'Celebrating Traditions, Creating Memories Since 1991',
  paragraphs: [
    '**With over 35 years of experience**, Tirumala Marriage Service & Suppliers has built a distinguished reputation for excellence in wedding planning, event management, and traditional religious ceremonies. **Established in 1991**, we take pride in transforming special occasions into unforgettable celebrations through our commitment to quality, tradition, professionalism, and personalized service.',
    "Over the decades, we have had the privilege of organizing prestigious weddings, engagements, grand receptions, official gatherings, and special celebrations for **distinguished personalities**, including film celebrities, members of the judiciary, IAS and IPS officers, MLAs, ministers, and other prominent dignitaries. Among our notable achievements is the honour of managing **the wedding celebrations of a former Vice President of India's granddaughter**, reflecting the trust and confidence placed in our expertise.",
    'Our experience extends beyond weddings and social celebrations. We specialize in organizing **traditional Hindu religious ceremonies and sacred Vedic events**, including {{Upanayanam}}, {{Namakaranam}}, {{Poojas}}, {{Vratams}}, {{Datta Sweekara Mahotsavam}}, {{Veda Sudha Mangala Mahotsavam}}, {{Veda Sadasulu}}, and various other spiritual and cultural gatherings. We ensure that every ceremony is conducted with authenticity, devotion, and respect for our rich cultural heritage.',
    'As a **complete wedding and event management service provider**, we offer comprehensive end-to-end solutions, including venue and function hall bookings, accommodation arrangements, catering, traditional and modern decorations, photography and videography, experienced Vedic Purohits, pooja materials, bridal makeup, Sannai Melam, traditional music, guest hospitality, and professional event coordination.',
    'Whether it is an intimate family ceremony, a traditional wedding, a prestigious official reception, or a grand celebration, we provide customized solutions tailored to every requirement and budget.',
    'At Tirumala Marriage Service & Suppliers, we believe that **every occasion deserves exceptional care and attention**, regardless of its scale or budget. Our experienced team manages every detail with dedication, ensuring a seamless, stress-free, and memorable experience for our clients and their families.',
    'Our journey of **more than three decades** is built on trust, reliability, cultural values, attention to detail, and lasting relationships with generations of satisfied families.',
  ],
  promiseTitle: 'Our Promise',
  promise: 'To honour your traditions, understand your vision, and create celebrations that become cherished memories for a lifetime.',
  closing: 'Tirumala Marriage Service & Suppliers — Where Tradition Meets Excellence.',
};

// Orchestrator-approved contact data (user's own edit supersedes the old address
// and proprietor line). Display lines keep the user's line breaks.
export const CONTACT = {
  role: 'Office Manager',
  phoneLabel: 'Mobile: +91 7013099397',
  phoneHref: 'tel:+917013099397',
  emailLabel: 'Email: tirumala.marriage1991@gmail.com',
  emailHref: 'mailto:tirumala.marriage1991@gmail.com',
  addressLines: ['D.No. 6-8-1093/A 3rd Floor,', 'NGOs Colony, KT Road', 'Near Nandhi Circle, Tirupati,', 'Andhra Pradesh - 517501,', 'India.'],
  mapsQuery: 'Tirumala Marriage Service & Suppliers, D.No. 6-8-1093/A, 3rd Floor, NGOs Colony, KT Road, Near Nandhi Circle, Tirupati, Andhra Pradesh 517501, India',
};
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.mapsQuery)}`;

export const SERVICES = [
  { icon: 'fa-hotel',          title: 'Venue & Stay',       desc: 'Function Hall Booking & Accommodation Arrangements for you and your guests.' },
  { icon: 'fa-utensils',       title: 'Decor & Catering',   desc: 'Traditional & Modern Decorations coupled with authentic, delicious Catering Services.' },
  { icon: 'fa-om',             title: 'Rituals & Music',    desc: 'Experienced Purohits, Pooja Materials, and traditional Sannai Melam music.' },
  { icon: 'fa-camera-retro',   title: 'Media & Grooming',   desc: 'Professional Photography, Videography, and expert Bridal Makeup Artists.' },
  { icon: 'fa-clipboard-list', title: 'Event Management',   desc: 'End-to-end Event Planning, Coordination, and VIP Guest Management.' },
  { icon: 'fa-gift',           title: 'Complete Services',  desc: 'And all other miscellaneous services required to make your event truly memorable.' },
];

// Six distinct photos (none repeats About or the Editorial band). `pos` is the
// object-position used for the 3:4 arch crop.
export const EVENTS = [
  { image: '1hero-wedding-stage.webp',  pos: '50% 50%', alt: 'Wedding stage with a white flower wall, greenery and candle stands', title: 'Wedding Ceremonies',      desc: 'Complete traditional wedding management.' },
  { image: 'entrance-decoration.webp',  pos: '56% 38%', alt: 'Event entrance with a floral chandelier and fairy lights',          title: 'Engagement Celebrations', desc: 'Intimate or grand pre-wedding events.' },
  { image: 'venue-exterior-night.webp', pos: '40% 50%', alt: 'Function hall exterior lit with golden lights at night',            title: 'Wedding Receptions',      desc: 'Elegant stage decor and grand dinners.' },
  { image: 'hero-wedding-stage.webp',   pos: '66% 46%', alt: 'Golden temple vimana at sunset',                                     title: 'Religious Ceremonies',    desc: 'Poojas, Vratams, and sacred rituals.' },
  { image: '1venue-interior.webp',      pos: '50% 56%', alt: 'Function hall interior with a decorated stage and seating',         title: 'Family Celebrations',     desc: 'Anniversaries, half-saree functions, etc.' },
  // Special Event.jpeg -> special-event.jpeg (the user's requested image)
  { image: 'special-event.jpeg',        pos: '62% 55%', alt: 'Marigold backdrop with golden lotus bowls and a flower-petal kolam', title: 'Special Events',          desc: 'Corporate gatherings or tailored occasions.' },
];

export const BENEFITS = [
  { icon: 'fa-wallet',    title: 'Budget-Friendly Options',  desc: 'We tailor our services to match your specific financial planning without compromising on quality.' },
  { icon: 'fa-handshake', title: 'End-to-End Management',    desc: 'From the initial booking to the final guest departure, we handle every detail.' },
];

export const WHY_IMAGES = {
  tall:  { image: 'wedding-stage.webp',  pos: '50% 50%', alt: 'Lotus-themed floral wedding stage' },
  inset: { image: 'venue-interior.webp', pos: '50% 36%', alt: 'Traditional mandapam decorated with garlands' },
};

export const PROCESS = [
  { n: '01', title: 'Share Your Requirements', desc: 'Tell us about your event, date, location and preferences.' },
  { n: '02', title: 'Discuss Your Plan',       desc: 'Explore arrangements and services suited to your requirements and budget.' },
  { n: '03', title: 'Coordinate Every Detail', desc: 'Plan the selected services, suppliers and event arrangements.' },
  { n: '04', title: 'Celebrate Your Occasion', desc: 'Enjoy your special event while the agreed arrangements are coordinated.' },
];

// Gallery tiles, in display order. `span` maps to the lg-grid span classes.
// Seven distinct photos; alt text doubles as the lightbox caption.
export const GALLERY = [
  { image: '1hero-wedding-stage.webp',  alt: 'Wedding stage with a white flower wall and candle stands',        span: 'feature' },
  { image: 'wedding-stage.webp',        alt: 'Wedding stage with a lotus flower wall',                          span: 'default' },
  { image: 'venue-exterior-night.webp', alt: 'Function hall exterior lit with golden lights at night',          span: 'default' },
  { image: 'entrance-decoration.webp',  alt: 'Decorated event entrance with a floral chandelier',               span: 'tall' },
  { image: '1venue-interior.webp',      alt: 'Function hall interior with a decorated stage',                   span: 'default' },
  { image: 'venue-interior.webp',       alt: 'Traditional wedding mandapam with garlands and guest seating',    span: 'wide' },
  { image: 'special-event.jpeg',        alt: 'Marigold backdrop with golden lotus bowls and a petal kolam',     span: 'desktopOnly' },
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
