import { useCallback, useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import Photo from './Photo.jsx';
import { GALLERY, IMG_SIZE } from '../data.js';
import { useOverlayLock } from '../OverlayContext.jsx';
import { img, cn } from '../utils.js';
import { CaptionRule } from './Ornaments.jsx';

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
  const [cw, ch] = current ? IMG_SIZE[current.image] || [] : [];

  return (
    <section id="gallery" className="band band--cream">
      <div className="container-x">
        <Reveal className="gallery-head">
          <div>
            <h2 className="h-display t-h2 text-kumkum">Beautiful Moments &amp; Celebrations</h2>
            <CaptionRule label="Event Gallery" align="start" className="mt-5" />
          </div>
          <p className="gallery-note">*Images are illustrative representations of our service quality.</p>
        </Reveal>

        <div className="gallery-grid">
          {GALLERY.map((g, i) => (
            <button
              key={g.image}
              type="button"
              aria-label={`View ${g.alt}`}
              onClick={(e) => { openerRef.current = e.currentTarget; setOpenIndex(i); }}
              className={cn('tile', spanClass[g.span])}
            >
              <Photo name={g.image} alt={g.alt} />
              <span className="tile__veil" aria-hidden="true">
                <i className="fas fa-up-right-and-down-left-from-center" />
              </span>
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
        className={cn(open && 'active')}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button ref={closeBtnRef} type="button" aria-label="Close gallery" onClick={close} className="lb__btn lb__close">
          <i className="fas fa-xmark" aria-hidden="true" />
        </button>
        <button type="button" aria-label="Previous image" onClick={prev} className="lb__btn lb__prev">
          <i className="fas fa-chevron-left" aria-hidden="true" />
        </button>
        {current && (
          <figure className="lb__figure">
            <img src={img(current.image)} alt={current.alt} width={cw} height={ch} className="lb__img" />
            <figcaption className="lb__caption">
              <p>{current.alt}</p>
              <span className="lb__count" aria-live="polite">{openIndex + 1} / {GALLERY.length}</span>
            </figcaption>
          </figure>
        )}
        <button type="button" aria-label="Next image" onClick={next} className="lb__btn lb__next">
          <i className="fas fa-chevron-right" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
