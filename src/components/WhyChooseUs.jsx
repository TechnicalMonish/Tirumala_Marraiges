import Reveal from './Reveal.jsx';
import Photo from './Photo.jsx';
import { BENEFITS, WHY_IMAGES } from '../data.js';
import { CaptionRule, ZariBand } from './Ornaments.jsx';

export default function WhyChooseUs() {
  const { tall, inset } = WHY_IMAGES;
  return (
    <section className="why-section why band band--kumkum on-dark">
      <ZariBand />
      <div className="container-x why__grid">
        <Reveal>
          <h2 className="h-display t-h2 text-cream">Your Perfect Partner for Flawless Events</h2>
          <CaptionRule label="Why Choose Us" align="start" tone="dark" className="mt-5" />
          <p className="why__body t-lead measure">
            We understand that planning an event can be stressful. Our goal is to take that burden off your shoulders by providing reliable, end-to-end solutions that fit within your budget.
          </p>
          <ul className="benefits">
            {BENEFITS.map((b) => (
              <li key={b.title} className="benefit">
                <span className="niche niche--dark">
                  <i className={`fas ${b.icon}`} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="benefit__title h-display t-h3">{b.title}</h3>
                  <p className="benefit__desc">{b.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="reveal-arch why__art">
          <div className="arch-frame arch-frame--dark arch-frame--tall">
            <div className="arch-media">
              <Photo name={tall.image} pos={tall.pos} alt={tall.alt} />
            </div>
          </div>
          <div className="why__inset">
            <div className="arch-media">
              <Photo name={inset.image} pos={inset.pos} alt={inset.alt} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
