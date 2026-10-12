import { useReveal } from '../../hooks/useReveal.js';
import { cn } from '../../lib/cn.js';

// Thin wrapper that adds `reveal` class + sets up the IntersectionObserver.
export default function Reveal({ as: Tag = 'div', className, children, style, ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={cn('reveal', className)} style={style} {...rest}>
      {children}
    </Tag>
  );
}
