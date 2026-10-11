import { useRef, useState } from 'react';
import { img } from '../utils.js';
import { TAGLINE, PRIVACY_POLICY, TERMS_CONDITIONS } from '../data.js';
import { Wordmark } from './Ornaments.jsx';
import LegalDialog from './LegalDialog.jsx';

export default function Footer() {
  const year = new Date().getFullYear();
  const [doc, setDoc] = useState(null);
  const privacyTriggerRef = useRef(null);
  const termsTriggerRef = useRef(null);

  // Return focus to the trigger that opened the dialog.
  const handleClose = () => {
    const r = doc?.title === 'Privacy Policy' ? privacyTriggerRef.current : termsTriggerRef.current;
    setDoc(null);
    setTimeout(() => r?.focus({ preventScroll: true }), 0);
  };

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
              <button
                type="button"
                ref={privacyTriggerRef}
                onClick={() => setDoc(PRIVACY_POLICY)}
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                type="button"
                ref={termsTriggerRef}
                onClick={() => setDoc(TERMS_CONDITIONS)}
              >
                Terms &amp; Conditions
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x">
        <div className="footer-bottom">
          <p>&copy; <span id="year">{year}</span> Tirumala Marriage Service &amp; Suppliers. All Rights Reserved.</p>
          <a
            href="https://www.linkedin.com/in/technicalmonish/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Technical Monish's LinkedIn profile (opens in a new tab)"
            className="footer-credit"
          >
            <span>Created by Technical Monish</span>
            <i className="fab fa-linkedin" aria-hidden="true" />
          </a>
        </div>
      </div>
      {doc && <LegalDialog doc={doc} onClose={handleClose} />}
    </footer>
  );
}
