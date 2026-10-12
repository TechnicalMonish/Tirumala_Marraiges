import { useEffect, useRef } from 'react';

// IntersectionObserver-based scroll reveal. Adds `.active` to the ref when
// the element enters the viewport, honouring prefers-reduced-motion by
// marking everything active immediately.
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      el.classList.add('active');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -80px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
