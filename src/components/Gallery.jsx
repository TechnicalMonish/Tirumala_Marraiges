import { useCallback, useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import { GALLERY } from '../data.js';
import { useOverlayLock } from '../OverlayContext.jsx';
import { img, cn } from '../utils.js';

const spanClass = {
  feature: 'lg:col-span-2 lg:row-span-2',
  tall: 'lg:row-span-2',
  wide: 'lg:col-span-2',
  default: '',
  desktopOnly: 'hidden lg:block',
};

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(-1);
  const openerRef = useRef(null);
  const closeBtnRef = useRef(null);
  const open = openIndex >= 0;

  useOverlayLock(open);

  const close = useCallback(() => {
    setOpenIndex(-1);
    // return focus to opening tile
    setTimeout(() => openerRef.current?.focus?.({ preventScroll: true }), 0);
  }, []);

  const next = useCallback(() => {
    setOpenIndex((i) => (i < 0 ? i : (i + 1) % GALLERY.length));
  }, []);

  const prev = useCallback(() => {
    setOpenIndex((i) => (i < 0 ? i : (i - 1 + GALLERY.length) % GALLERY.length));
  }, []);

  // keyboard
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    };
    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => closeBtnRef.current?.focus({ preventScroll: true }), 0);
    return () => { document.removeEventListener('keydown', onKey); clearTimeout(t); };
  }, [open, close, next, prev]);

  // swipe
  const touchStartX = useRef(0);
  const onTouchStart = (e) => { touchStartX.current = e.changedTouches[0].screenX; };
  const onTouchEnd = (e) => {
    const dx = touchStartX.current - e.changedTouches[0].screenX;
    if (Math.abs(dx) > 50) (dx > 0 ? next : prev)();
  };

  const current = open ? GALLERY[openIndex] : null;

  return (
    <section id="gallery" className="py-10 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gallery-header">
          <div>
            <span className="text-gold-readable tracking-widest text-sm font-semibold uppercase">Event Gallery</span>
            <h2 className="font-bold text-4xl text-charcoal mt-2">Beautiful Moments &amp; Celebrations</h2>
          </div>
          <p className="text-xs text-gray-500 mt-4 md:mt-0 max-w-xs md:text-right italic">
            *Images are illustrative representations of our service quality.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[180px] lg:auto-rows-[200px] gallery-grid">
          {GALLERY.map((g, i) => (
            <button
              key={i}
              type="button"
              aria-label={`View ${g.alt}`}
              onClick={(e) => { openerRef.current = e.currentTarget; setOpenIndex(i); }}
              className={cn(
                'relative group overflow-hidden rounded-xl lg:rounded-2xl cursor-pointer shadow-sm',
                spanClass[g.span]
              )}
            >
              <img
                src={img(g.image)}
                alt={g.alt}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-charcoal/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <i className="fas fa-search-plus text-white text-3xl" aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <div
        id="lightbox"
        role="dialog"
        aria-modal={open ? 'true' : 'false'}
        aria-hidden={open ? 'false' : 'true'}
        aria-label="Event gallery image viewer"
        className={cn('fixed inset-0 items-center justify-center', open && 'active')}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button
          ref={closeBtnRef}
          type="button"
          aria-label="Close gallery"
          onClick={close}
          className="absolute top-6 right-8 text-white text-4xl hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          &times;
        </button>
        <button
          type="button"
          aria-label="Previous image"
          onClick={prev}
          className="absolute left-4 md:left-8 text-white text-3xl hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <i className="fas fa-chevron-left" aria-hidden="true" />
        </button>
        {current && (
          <img
            src={img(current.image)}
            alt={current.alt}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-md shadow-2xl"
          />
        )}
        <button
          type="button"
          aria-label="Next image"
          onClick={next}
          className="absolute right-4 md:right-8 text-white text-3xl hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <i className="fas fa-chevron-right" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
