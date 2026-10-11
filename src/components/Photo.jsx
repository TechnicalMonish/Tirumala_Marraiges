import { img } from '../utils.js';
import { IMG_SIZE } from '../data.js';

// <img> with intrinsic width/height (no layout shift), lazy + async by default.
export default function Photo({ name, alt, pos, className, style, ...rest }) {
  const [w, h] = IMG_SIZE[name] || [];
  return (
    <img
      src={img(name)}
      alt={alt}
      width={w}
      height={h}
      loading="lazy"
      decoding="async"
      className={className}
      style={pos ? { objectPosition: pos, ...style } : style}
      {...rest}
    />
  );
}
