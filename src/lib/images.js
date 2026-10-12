// URL of a file in public/images, resolved against Vite's base path.
export const img = (name) => `${import.meta.env.BASE_URL}images/${name}`;

// Intrinsic pixel sizes, used for width/height attributes (no layout shift).
export const IMG_SIZE = {
  'tirumala-temple-vimana-sunset.webp': [1920, 1281],
  'lotus-flower-wall-stage.webp': [1280, 720],
  'white-flower-wall-stage.webp': [1672, 941],
  'golden-mandapam-guest-seating.webp': [1277, 786],
  'function-hall-interior.webp': [1600, 1067],
  'floral-chandelier-entrance.webp': [1600, 1067],
  'function-hall-exterior-night.webp': [1600, 1067],
  'marigold-backdrop-lotus-bowls.webp': [1280, 960],
  'venkateswara-emblem.png': [200, 184],
};
