import Reveal from '../ui/Reveal.jsx';
import { SERVICES } from '../../content/offerings.js';
import { CaptionRule } from '../ui/Ornaments.jsx';

// A ruled "programme" of services (hairline grid, arch niches), not a card wall.
export default function Services() {
  return (
    <section id="services" className="band band--kolam">
      <div className="container-x">
        <Reveal className="section-head section-head--center">
          <h2 className="h-display t-h2">Complete Event Services</h2>
          <CaptionRule label="Our Expertise" />
        </Reveal>

        <ul className="programme">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.title} className="programme__item" style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
              <span className="niche">
                <i className={`fas ${s.icon}`} aria-hidden="true" />
              </span>
              <div>
                <h3 className="programme__title h-display t-h3">{s.title}</h3>
                <p className="programme__desc">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
