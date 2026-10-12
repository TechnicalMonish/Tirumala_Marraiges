import Reveal from '../ui/Reveal.jsx';
import { PROCESS } from '../../content/offerings.js';
import { CaptionRule, Kolam } from '../ui/Ornaments.jsx';

// Four steps on a gold rail threaded through kolam nodes
// (vertical timeline on phones, 2x2 on tablets, one line on desktop).
export default function Process() {
  return (
    <section id="process" className="band band--kolam">
      <div className="container-x">
        <Reveal className="section-head section-head--center">
          <h2 className="h-display t-h2">Your Celebration, Simplified</h2>
          <CaptionRule label="Our Process" />
        </Reveal>

        <ol className="steps">
          {PROCESS.map((p, i) => (
            <Reveal as="li" key={p.n} className="step" style={{ transitionDelay: `${i * 120}ms` }}>
              <Kolam className="step__node" />
              <p className="step__num" aria-hidden="true">{p.n}</p>
              <h3 className="step__title h-display t-h3">{p.title}</h3>
              <p className="step__desc">{p.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
