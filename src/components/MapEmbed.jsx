import Reveal from './Reveal.jsx';
import { MAPS_URL, MAPS_EMBED_URL } from '../data.js';
import { CaptionRule } from './Ornaments.jsx';

// Keyless Google Maps embed pinned to the business's Google Business Profile
// coordinates (see GEO/MAPS_EMBED_URL in data.js).
// Rendered in its own full-width row below the Contact two-column grid.
export default function MapEmbed() {
  const src = MAPS_EMBED_URL;
  return (
    <Reveal className="map-row">
      <div className="map-head">
        <h3 className="h-display t-h3 text-kumkum">Find Us on the Map</h3>
        <CaptionRule label="Location" className="map-head__rule" />
      </div>
      <div className="map-frame">
        <div className="map-frame__inner">
          <iframe
            src={src}
            title="Map showing Tirumala Marriage Service &amp; Suppliers location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            style={{ border: 0, width: '100%', height: '100%', display: 'block' }}
          />
        </div>
      </div>
      <div className="map-cta">
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--ghost-kumkum btn--sm"
        >
          <i className="fas fa-location-arrow" aria-hidden="true" /> Get Directions
          <span className="sr-only"> (opens Google Maps in a new tab)</span>
        </a>
      </div>
    </Reveal>
  );
}
