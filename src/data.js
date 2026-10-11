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
    'Whether it is an intimate family ceremony, a traditional wedding, a prestigious official reception, or a grand celebration — and whether the occasion is set in Tirumala or across Tirupati — we provide customized solutions tailored to every requirement and budget.',
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

// Canonical deploy URL (slash-terminated). The HTML meta tags, the inline
// JSON-LD block, public/robots.txt and public/sitemap.xml all mirror this
// literal — update them together if the deploy URL ever changes.
export const SITE_URL = 'https://demo.ramsstudio.in/tirumala/';

// ── Legal copy (long-form, informational — not legal advice). ──
// Rendered as portal-mounted modal dialogs via src/components/LegalDialog.jsx.
export const PRIVACY_POLICY = {
  title: 'Privacy Policy',
  updated: 'Last updated: 11 October 2026',
  intro:
    'Tirumala Marriage Service & Suppliers ("we", "us", "our") values the trust that families and clients place in us. This Privacy Policy explains what information we collect through this website and through our enquiry process, how we use it, and the choices you have. It applies to this website and the WhatsApp, phone and email conversations that may follow from an enquiry made here.',
  sections: [
    {
      heading: 'Who We Are',
      paragraphs: [
        'Tirumala Marriage Service & Suppliers is an Indian wedding planning, event management and traditional ceremonies service, operating from Tirupati, Andhra Pradesh, since 1991. Our registered address and contact details are published on the Contact section of this website.',
        'For any question about this Privacy Policy, or to exercise a right described below, write to us at tirumala.marriage1991@gmail.com with the subject line "Privacy Request".',
      ],
    },
    {
      heading: 'Information We Collect',
      paragraphs: [
        'We collect the information you choose to share through our enquiry form on this website: your full name, mobile number, event type, approximate event date, event location, expected guest count, the services you are interested in, and any additional notes or budget details you add.',
        'When you contact us by WhatsApp, phone or email, we also keep a record of that conversation and the details you share within it, so we can respond accurately and prepare quotations.',
        'We do not run analytics, pixels, advertising cookies or user profiling on this website. Our hosting provider may keep standard server access logs (such as IP address and request time) for a limited period as part of normal website operations.',
      ],
    },
    {
      heading: 'How We Use Your Information',
      paragraphs: [
        'The information you share is used only to respond to your enquiry, prepare a tailored quotation, coordinate with the suppliers and venues your event needs, and keep you informed about the arrangements for your event.',
        'We do not sell, rent or trade your personal information. We do not use it for marketing campaigns, newsletters or unsolicited promotional messages.',
      ],
    },
    {
      heading: 'Communication by WhatsApp, Call, and Email',
      paragraphs: [
        'Our primary channel for enquiry replies is WhatsApp, because it works well for sharing quotations, references, photographs and schedules. When you tap "Send Enquiry on WhatsApp", your details are pre-filled into a WhatsApp message that is sent only when you choose to send it.',
        'You can also reach us on the phone number and email address listed in the Contact section. We will match the channel you contacted us on, unless you ask us to switch.',
      ],
    },
    {
      heading: 'Sharing with Vendors and Suppliers',
      paragraphs: [
        'A wedding or event involves several vendors — function halls, caterers, decorators, Purohits, photographers, musicians and others. To make arrangements, we may need to share limited event details (such as date, venue, guest count, service requirements and a point-of-contact mobile number) with the vendors you book through us.',
        'We share only what each vendor needs for their part of the event, and we do not share your details with any party unrelated to your event.',
      ],
    },
    {
      heading: 'No Online Payments on This Website',
      paragraphs: [
        'This website does not take any payments. We do not collect card numbers, UPI IDs, bank details or any financial information through this website. All payments related to our services, when they become due, are handled separately through the offline channels agreed in your quotation.',
      ],
    },
    {
      heading: 'Cookies and Analytics',
      paragraphs: [
        'This website does not set tracking cookies and does not include analytics or advertising scripts. Your browser may still store a small amount of technical state (for example, preferences for reduced motion) that never leaves your device.',
      ],
    },
    {
      heading: 'Third-Party Services (Maps, Fonts, Icons, WhatsApp)',
      paragraphs: [
        'Our Contact section embeds a Google Maps preview of our office location. When this preview loads, Google may receive your IP address and basic browser information, under Google\'s own privacy terms.',
        'The site also loads Google Fonts, Font Awesome icons and the Tailwind CDN runtime from third-party content delivery networks. These providers may similarly receive standard request metadata.',
        'Clicking a WhatsApp link opens WhatsApp (web or app) in a new tab or window and is governed by WhatsApp\'s own privacy terms.',
      ],
    },
    {
      heading: 'Data Retention',
      paragraphs: [
        'We retain enquiry details for as long as needed to coordinate your event, settle accounts with the vendors involved, and meet any applicable tax, accounting or legal retention requirement under Indian law. After that, we remove or anonymise the information in our ordinary records.',
      ],
    },
    {
      heading: 'Your Rights under the DPDP Act, 2023',
      paragraphs: [
        'Under the Digital Personal Data Protection Act, 2023, you have the right to access the personal information we hold about you, request a correction, request erasure where it is no longer needed, and withdraw a consent you previously gave.',
        'To exercise any of these rights, write to us at tirumala.marriage1991@gmail.com with the subject line "Privacy Request" and enough detail to identify the enquiry concerned. We will respond within a reasonable period.',
      ],
    },
    {
      heading: 'Security',
      paragraphs: [
        'We take reasonable care to protect the information we hold, including restricting access to the small team that handles your event and keeping our devices and accounts protected. No service on the internet is perfectly secure, so we encourage you to share only the information needed for your enquiry.',
      ],
    },
    {
      heading: 'Children\'s Information',
      paragraphs: [
        'Our services and this website are intended for adults planning a family or official event. We do not knowingly collect personal information from children through this website. If a parent or guardian believes a child has shared personal information, please write to us and we will remove it.',
      ],
    },
    {
      heading: 'Updates and Contact',
      paragraphs: [
        'We may update this Privacy Policy when our practices evolve. The "Last updated" line at the top always reflects the current version. Material changes will be announced on this page.',
        'For any question, request or concern about this policy, write to tirumala.marriage1991@gmail.com, or reach us on the phone number listed in the Contact section.',
      ],
    },
  ],
  closing:
    'This document is informational and provides a plain-language summary of our practices. It does not constitute legal advice and does not replace a formal privacy notice drafted by qualified counsel.',
};

export const TERMS_CONDITIONS = {
  title: 'Terms & Conditions',
  updated: 'Last updated: 11 October 2026',
  intro:
    'These Terms & Conditions describe how this website is intended to be used and the general basis on which Tirumala Marriage Service & Suppliers ("we", "us", "our") accepts enquiries and arranges events. By browsing this website or sending an enquiry through it, you agree to the terms set out below.',
  sections: [
    {
      heading: 'About these Terms',
      paragraphs: [
        'These Terms govern your use of this website and the enquiry process it supports. The actual arrangements for a wedding or event are set out separately in the written quotation or booking confirmation we share with you, and in any supplementary notes agreed by both parties.',
        'Where there is a difference between this page and the quotation or booking confirmation for a specific event, the latter prevails for that event.',
      ],
    },
    {
      heading: 'The Website and Our Services',
      paragraphs: [
        'This website presents our services, provides a short introduction to our work since 1991, and offers an enquiry form that routes directly to our WhatsApp. The content shown — descriptions, photographs and service lists — is illustrative. Exact inclusions, timings and prices are confirmed on a per-event basis.',
      ],
    },
    {
      heading: 'Enquiries and Quotations',
      paragraphs: [
        'An enquiry sent through this website is an invitation for us to respond with a tailored proposal; it is not a binding booking. We will revert over WhatsApp, phone or email with questions, suggestions and a quotation specific to your event.',
        'A quotation stays valid for a reasonable period mentioned alongside it. We may need to refresh it if vendor availability or costs change in the meantime.',
      ],
    },
    {
      heading: 'Bookings, Advances and Settlement (Offline)',
      paragraphs: [
        'A booking becomes confirmed only after we have signed off on a quotation together and the advance agreed in that quotation has been received through the offline channel we both agreed. No payment is taken through this website.',
        'Final settlement is handled on or before the event date, in the manner recorded in your quotation.',
      ],
    },
    {
      heading: 'Cancellations, Rescheduling, and Refunds',
      paragraphs: [
        'If an event is cancelled or rescheduled, the cancellation and refund terms set out in your quotation apply. Advances paid may be partly or fully non-refundable depending on how close to the event date the change is requested and on commitments already made to vendors on your behalf.',
        'We will always try to carry commitments forward to a rescheduled date wherever vendors permit it.',
      ],
    },
    {
      heading: 'Vendor and Supplier Arrangements',
      paragraphs: [
        'For end-to-end arrangements, we coordinate with a trusted network of function halls, caterers, decorators, Purohits, musicians, photographers and other suppliers. We select vendors based on fit for your event and we remain your single point of contact throughout.',
        'Each vendor is responsible for the quality and delivery of their own part of the event. We will stand behind the vendors we introduce and act promptly to resolve any issue that arises.',
      ],
    },
    {
      heading: 'Permits, Permissions, and Compliance',
      paragraphs: [
        'Weddings and large events sometimes require local permits, sound permissions or venue-specific clearances. We will advise you on what is typically needed and help coordinate it, but ultimate responsibility for permissions obtained in the name of the client or the venue rests with the party in whose name they are issued.',
      ],
    },
    {
      heading: 'Force Majeure',
      paragraphs: [
        'Neither party is liable for delays or non-performance caused by events outside reasonable control — natural disasters, government orders, communal unrest, public-health restrictions, infrastructure failures, strikes and similar causes. In such cases we will work with you in good faith to reschedule or re-plan the affected elements.',
      ],
    },
    {
      heading: 'Photography, Videography, and Content Rights',
      paragraphs: [
        'The photographs on this website are either our own work or images used with permission. If you would prefer that photographs or videos of your event are not used for our portfolio or promotional purposes, please tell us before the event and we will respect that choice.',
      ],
    },
    {
      heading: 'Intellectual Property on This Website',
      paragraphs: [
        'The brand name, logo, written content, layout and design of this website are the intellectual property of Tirumala Marriage Service & Suppliers or used under licence. Please do not reproduce, redistribute or re-publish this content for commercial purposes without written permission.',
      ],
    },
    {
      heading: 'Acceptable Use of the Website',
      paragraphs: [
        'Please use this website in good faith. Do not submit false details through the enquiry form, do not attempt to disrupt the service for others, and do not use the website or the WhatsApp channel to send abusive, misleading or unlawful content.',
      ],
    },
    {
      heading: 'Disclaimers and Limitation of Liability',
      paragraphs: [
        'The information on this website is provided on an "as is" basis without any express or implied warranty. We take care to keep it accurate but we do not guarantee that every detail is complete at all times.',
        'To the maximum extent permitted by applicable law, our aggregate liability in connection with any event is limited to the amount actually paid to us for that specific event under its quotation.',
      ],
    },
    {
      heading: 'Governing Law, Jurisdiction, and Contact',
      paragraphs: [
        'These Terms, and any dispute connected with them or with services provided by us, are governed by the laws of India. The courts at Tirupati, Andhra Pradesh have exclusive jurisdiction, subject to any mandatory consumer-protection rights that apply in your favour.',
        'For any question about these Terms, write to tirumala.marriage1991@gmail.com, or reach us on the phone number listed in the Contact section.',
      ],
    },
  ],
  closing:
    'This document is informational and provides a plain-language summary of our ordinary terms. It does not constitute legal advice and does not replace a formal contract drafted by qualified counsel.',
};
