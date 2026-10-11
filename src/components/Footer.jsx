import { img } from '../utils.js';
import { TAGLINE } from '../data.js';
import { Wordmark } from './Ornaments.jsx';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer on-dark">
      <div className="container-x footer-grid">
        <div>
          <div className="brand">
            <img src={img('balaji-icon.png')} alt="" width="200" height="184" style={{ height: 56 }} />
            <Wordmark />
          </div>
          <p className="footer-desc">
            We organize weddings and all types of events for every budget, offering complete end-to-end event management services. Crafting beautiful moments into lasting memories.
          </p>
          <p className="footer-tagline">{TAGLINE}</p>
        </div>
        <div>
          <h2 className="footer-h t-label">Quick Links</h2>
          <ul className="footer-links">
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Our Services</a></li>
            <li><a href="#events">Events We Organize</a></li>
            <li><a href="#gallery">Event Gallery</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h2 className="footer-h t-label">Legal</h2>
          <ul className="footer-links">
            <li>
              <button type="button" onClick={() => window.alert('Privacy Policy Draft: Text to be updated.')}>
                Privacy Policy
              </button>
            </li>
            <li>
              <button type="button" onClick={() => window.alert('Terms & Conditions Draft: Text to be updated.')}>
                Terms &amp; Conditions
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x">
        <div className="footer-bottom">
          <p>&copy; <span id="year">{year}</span> Tirumala Marriage Service &amp; Suppliers. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
