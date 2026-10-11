import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';

/*
 * Minimal overlay coordination:
 *   - counts how many overlays are open (mobile menu, lightbox, services sheet)
 *   - locks body scroll (and preserves scroll position) while any are open
 *   - lets the navbar query the count so it can skip its auto-hide logic
 */
const OverlayContext = createContext({ count: 0, open: () => () => {} });

export function OverlayProvider({ children }) {
  const [count, setCount] = useState(0);
  const open = useCallback(() => {
    setCount((n) => n + 1);
    return () => setCount((n) => Math.max(0, n - 1));
  }, []);
  const savedRef = useRef(null);

  // Layout effect so flushSync-ed closes (e.g. clicking a sidebar nav link)
  // restore scroll BEFORE the browser handles the hash navigation.
  useLayoutEffect(() => {
    if (count > 0 && !savedRef.current) {
      savedRef.current = {
        x: window.scrollX,
        y: window.scrollY,
        htmlOverflow: document.documentElement.style.overflow,
        bodyOverflow: document.body.style.overflow,
        htmlOverscroll: document.documentElement.style.overscrollBehavior,
      };
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.overscrollBehavior = 'none';
      document.body.style.overflow = 'hidden';
    } else if (count === 0 && savedRef.current) {
      const s = savedRef.current;
      document.documentElement.style.overflow = s.htmlOverflow;
      document.documentElement.style.overscrollBehavior = s.htmlOverscroll;
      document.body.style.overflow = s.bodyOverflow;
      window.scrollTo({ left: s.x, top: s.y, behavior: 'instant' });
      savedRef.current = null;
    }
  }, [count]);

  return (
    <OverlayContext.Provider value={{ count, open }}>
      {children}
    </OverlayContext.Provider>
  );
}

// Register an overlay as "open" for the lifetime of `active` being true.
export function useOverlayLock(active) {
  const { open } = useContext(OverlayContext);
  useEffect(() => {
    if (!active) return;
    const close = open();
    return close;
  }, [active, open]);
}

export function useOverlayCount() {
  return useContext(OverlayContext).count;
}
