// Services, occasions, process steps, gallery tiles and enquiry-form options.

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
  { image: 'white-flower-wall-stage.webp',       pos: '50% 50%', alt: 'Wedding stage with a white flower wall, greenery and candle stands', title: 'Wedding Ceremonies',      desc: 'Complete traditional wedding management.' },
  { image: 'floral-chandelier-entrance.webp',    pos: '56% 38%', alt: 'Event entrance with a floral chandelier and fairy lights',          title: 'Engagement Celebrations', desc: 'Intimate or grand pre-wedding events.' },
  { image: 'function-hall-exterior-night.webp',  pos: '40% 50%', alt: 'Function hall exterior lit with golden lights at night',            title: 'Wedding Receptions',      desc: 'Elegant stage decor and grand dinners.' },
  { image: 'tirumala-temple-vimana-sunset.webp', pos: '66% 46%', alt: 'Golden temple vimana at sunset',                                     title: 'Religious Ceremonies',    desc: 'Poojas, Vratams, and sacred rituals.' },
  { image: 'function-hall-interior.webp',        pos: '50% 56%', alt: 'Function hall interior with a decorated stage and seating',         title: 'Family Celebrations',     desc: 'Anniversaries, half-saree functions, etc.' },
  { image: 'marigold-backdrop-lotus-bowls.webp', pos: '62% 55%', alt: 'Marigold backdrop with golden lotus bowls and a flower-petal kolam', title: 'Special Events',          desc: 'Corporate gatherings or tailored occasions.' },
];

export const BENEFITS = [
  { icon: 'fa-wallet',    title: 'Budget-Friendly Options',  desc: 'We tailor our services to match your specific financial planning without compromising on quality.' },
  { icon: 'fa-handshake', title: 'End-to-End Management',    desc: 'From the initial booking to the final guest departure, we handle every detail.' },
];

export const WHY_IMAGES = {
  tall:  { image: 'lotus-flower-wall-stage.webp',       pos: '50% 50%', alt: 'Lotus-themed floral wedding stage' },
  inset: { image: 'golden-mandapam-guest-seating.webp', pos: '50% 36%', alt: 'Traditional mandapam decorated with garlands' },
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
  { image: 'white-flower-wall-stage.webp',       alt: 'Wedding stage with a white flower wall and candle stands',        span: 'feature' },
  { image: 'lotus-flower-wall-stage.webp',       alt: 'Wedding stage with a lotus flower wall',                          span: 'default' },
  { image: 'function-hall-exterior-night.webp',  alt: 'Function hall exterior lit with golden lights at night',          span: 'default' },
  { image: 'floral-chandelier-entrance.webp',    alt: 'Decorated event entrance with a floral chandelier',               span: 'tall' },
  { image: 'function-hall-interior.webp',        alt: 'Function hall interior with a decorated stage',                   span: 'default' },
  { image: 'golden-mandapam-guest-seating.webp', alt: 'Traditional wedding mandapam with garlands and guest seating',    span: 'wide' },
  { image: 'marigold-backdrop-lotus-bowls.webp', alt: 'Marigold backdrop with golden lotus bowls and a petal kolam',     span: 'desktopOnly' },
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
