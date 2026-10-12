import { TAGLINE } from '../../content/business.js';
import { Lotus } from '../ui/Ornaments.jsx';

// Brand tagline on a kumkum ribbon directly under the hero.
// "Since 1991" is set upright in gold; the rest stays in the display italic.
export default function Tagline() {
  const cut = TAGLINE.indexOf(' — ');
  const lead = cut > 0 ? TAGLINE.slice(0, cut) : '';
  const rest = cut > 0 ? TAGLINE.slice(cut) : TAGLINE;
  return (
    <div className="tagline-band">
      <div className="container-x tagline">
        <Lotus />
        <p>
          {lead && <span className="since">{lead}</span>}
          {rest}
        </p>
        <Lotus />
      </div>
    </div>
  );
}
