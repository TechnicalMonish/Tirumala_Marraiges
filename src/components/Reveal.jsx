import { useReveal } from '../hooks.js';
import { cn } from '../utils.js';

// Thin wrapper that adds `reveal` class + sets up the IntersectionObserver.
export default function Reveal({ as: Tag = 'div', className, children, style, ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={cn('reveal', className)} style={style} {...rest}>
      {children}
    </Tag>
  );
}
