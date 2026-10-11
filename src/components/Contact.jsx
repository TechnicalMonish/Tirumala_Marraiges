import Reveal from './Reveal.jsx';
import { openWhatsApp } from '../utils.js';
import { CONTACT, MAPS_URL } from '../data.js';
import { CaptionRule, Lotus } from './Ornaments.jsx';
import MapEmbed from './MapEmbed.jsx';

// Contact: details + arch-shaped Address card; a full-width Google Maps embed
// row ("Find Us on the Map") sits below the two-column grid.
export default function Contact() {
  return (
    <section id="contact" className="band band--cream">
      <div className="container-x contact-grid">
        <Reveal>
          <h2 className="h-display t-h2 text-kumkum">Visit Us or Get in Touch</h2>
          <CaptionRule label="Get In Touch" align="start" className="mt-5" />

          <div className="contact-block">
            <h3 className="contact-block__title h-display t-h3">Contact</h3>
            <ul className="contact-list" id="business-phone">
              <li className="contact-row">
                <span className="niche"><i className="fas fa-user-tie" aria-hidden="true" /></span>
                <span className="contact-row__role">{CONTACT.role}</span>
              </li>
              <li className="contact-row">
                <span className="niche"><i className="fas fa-phone-alt" aria-hidden="true" /></span>
                <a href={CONTACT.phoneHref}>{CONTACT.phoneLabel}</a>
              </li>
              <li className="contact-row">
                <span className="niche"><i className="fas fa-envelope" aria-hidden="true" /></span>
                <a href={CONTACT.emailHref}>{CONTACT.emailLabel}</a>
              </li>
            </ul>
          </div>

          <div className="contact-actions">
            <a href={CONTACT.phoneHref} className="btn btn--kumkum">
              <i className="fas fa-phone" aria-hidden="true" /> Call Now
            </a>
            <button type="button" onClick={() => openWhatsApp()} className="btn btn--whatsapp">
              <i className="fab fa-whatsapp" aria-hidden="true" /> WhatsApp
            </button>
          </div>
        </Reveal>

        <Reveal className="reveal-arch address-wrap">
          <div className="arch-frame">
            <div className="address-card arch-media on-dark">
              <Lotus className="lotus-mark" />
              <h3 className="address-card__title t-label">Address</h3>
              <address id="business-address">
                {CONTACT.addressLines.map((line, i) => (
                  <span key={line} className="block">
                    {line}
                    {i < CONTACT.addressLines.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </address>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn--gold">
                <i className="fas fa-location-arrow" aria-hidden="true" /> Get Directions
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="container-x">
        <MapEmbed />
      </div>
    </section>
  );
}
