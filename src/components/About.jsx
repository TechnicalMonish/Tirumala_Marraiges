import { Fragment } from 'react';
import Reveal from './Reveal.jsx';
import Photo from './Photo.jsx';
import { ABOUT } from '../data.js';
import { CaptionRule, Kolam, Lotus } from './Ornaments.jsx';

// Render the About copy's markup markers: **strong** and {{ceremony}}.
// Markers never change the words, so textContent equals the supplied copy.
function rich(text) {
  return text.split(/(\*\*[^*]+\*\*|\{\{[^}]+\}\})/g).map((part, i) => {
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('{{')) return <span key={i} className="ritual">{part.slice(2, -2)}</span>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export default function About() {
  const [p1, p2, p3, p4, p5, p6, p7] = ABOUT.paragraphs;
  return (
    <section id="about" className="band band--ivory">
      <div className="container-x">
        <div className="about-grid">
          <Reveal className="reveal-arch about-media">
            <div className="arch-frame">
              <div className="arch-media">
                <Photo name="venue-interior.webp" pos="52% 40%" alt="Traditional wedding mandapam with a golden backdrop, garlands and guest seating" />
              </div>
            </div>
            <p className="seal">
              <span className="seal__since">Since</span> <span className="seal__year">1991</span>
            </p>
          </Reveal>

          <div className="about-copy">
            <Reveal>
              <h2 className="h-display t-h2 text-kumkum">{ABOUT.heading}</h2>
              <p className="about-sub font-display t-sub">{ABOUT.subheading}</p>
              <CaptionRule label="About Tirumala" align="start" />
              <p className="about-lead t-lead dropcap measure">{rich(p1)}</p>
            </Reveal>
            <Reveal className="honour measure">
              <p>{rich(p2)}</p>
            </Reveal>
          </div>
        </div>

        <Reveal className="rituals">
          <Kolam />
          <p>{rich(p3)}</p>
        </Reveal>

        <Reveal className="about-columns">
          <div>
            <p>{rich(p4)}</p>
            <p>{rich(p5)}</p>
          </div>
          <div>
            <p>{rich(p6)}</p>
            <p>{rich(p7)}</p>
            <div className="about-cta">
              <a href="#services" className="btn btn--ghost-kumkum">Explore Our Services</a>
            </div>
          </div>
        </Reveal>

        <Reveal className="promise">
          <div className="promise__arch on-dark">
            <CaptionRule as="h3" label={ABOUT.promiseTitle} tone="dark" />
            <blockquote className="promise__quote">
              <p>{ABOUT.promise}</p>
            </blockquote>
          </div>
          <div className="signature">
            <Lotus />
            <p>{ABOUT.closing}</p>
            <Lotus />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
