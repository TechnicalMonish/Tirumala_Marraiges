import Reveal from './Reveal.jsx';
import Photo from './Photo.jsx';
import { EVENTS } from '../data.js';
import { CaptionRule } from './Ornaments.jsx';

// Arch-topped occasion tiles. Photos carry no overlay (full brightness);
// captions sit on the card stock beneath.
export default function Events() {
  return (
    <section id="events" className="band band--ivory">
      <div className="container-x">
        <Reveal className="section-head section-head--center">
          <h2 className="h-display t-h2">Every Occasion Deserves Something Special</h2>
          <CaptionRule label="Our Celebrations" />
        </Reveal>

        <ul className="occasions">
          {EVENTS.map((e, i) => (
            <Reveal as="li" key={e.title} className="occasion" style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
              <div className="occasion__frame">
                <div className="arch-media occasion__media">
                  <Photo name={e.image} pos={e.pos} alt={e.alt} />
                </div>
              </div>
              <h3 className="occasion__title h-display">{e.title}</h3>
              <p className="occasion__desc">{e.desc}</p>
              <a href="#booking" className="link-caps">
                Enquire Now <i className="fas fa-arrow-right-long" aria-hidden="true" />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
