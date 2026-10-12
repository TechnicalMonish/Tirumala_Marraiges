import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useOverlayCount, useOverlayLock } from '../../context/OverlayContext.jsx';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { img } from '../../lib/images.js';
import { cn } from '../../lib/cn.js';
import { NAV_LINKS } from '../../content/navigation.js';
import { Lotus, Wordmark, ZariBand } from '../ui/Ornaments.jsx';

const scrollBehavior = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

// Navbar modes:
//   top    — y < 50 : transparent + top gradient, light text
//   solid  — scrolled up past threshold OR mobile menu open : ivory, dark text
//   hidden — scrolled down past threshold : translated off-screen
export default function Navbar() {
  const [mode, setMode] = useState('top'); // 'top' | 'solid' | 'hidden'
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayCount = useOverlayCount();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);
  const btnRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Scroll handling
  useEffect(() => {
    lastYRef.current = window.scrollY;
    const update = () => {
      const y = window.scrollY;
      // While any overlay is open, don't re-mode (position is frozen anyway).
      if (overlayCount > 0 || menuOpen) {
        lastYRef.current = y;
        tickingRef.current = false;
        return;
      }
      const delta = y - lastYRef.current;
      const threshold = 10;
      if (y < 50) {
        setMode('top');
      } else if (Math.abs(delta) > threshold) {
        setMode(delta > 0 ? 'hidden' : 'solid');
      }
      lastYRef.current = y;
      tickingRef.current = false;
    };
    const onScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(update);
        tickingRef.current = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, [overlayCount, menuOpen]);

  // A page loaded (or refreshed) mid-scroll starts solid, so light nav text
  // never sits on a light section.
  useEffect(() => {
    if (window.scrollY >= 50) setMode('solid');
  }, []);

  // Opening the mobile menu forces the navbar visible: solid past 50px, otherwise top.
  useEffect(() => {
    if (menuOpen) {
      setMode(window.scrollY > 50 ? 'solid' : 'top');
    }
  }, [menuOpen]);

  // Close menu on resize to desktop.
  useEffect(() => {
    if (menuOpen && isDesktop) setMenuOpen(false);
  }, [isDesktop, menuOpen]);

  // Lock scroll while menu is open.
  useOverlayLock(menuOpen);

  // Escape to close + initial focus to the close button.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => closeBtnRef.current?.focus({ preventScroll: true }), 0);
    return () => {
      document.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [menuOpen]);

  // Restore focus to the hamburger when the menu closes (unless user clicked a link).
  const closedByLinkRef = useRef(false);
  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);
  // Close the menu and navigate to the section ourselves — the OverlayProvider
  // restores the pre-open scroll position on close, so we can't rely on the
  // browser's own hash-scroll behaviour to run afterwards.
  const closeFromLink = (e) => {
    const href = e.currentTarget.getAttribute('href') || '';
    closedByLinkRef.current = true;
    e.preventDefault();
    flushSync(() => setMenuOpen(false));
    requestAnimationFrame(() => {
      if (href === '#' || href === '#top') {
        window.scrollTo({ top: 0, behavior: scrollBehavior() });
        history.replaceState(null, '', ' ');
      } else if (href.startsWith('#')) {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
          history.replaceState(null, '', href);
        }
      }
    });
  };
  // Only react to a real open -> closed transition (not the initial mount),
  // so the page never steals focus onto the hamburger on load.
  const wasOpenRef = useRef(menuOpen);
  useEffect(() => {
    const wasOpen = wasOpenRef.current;
    wasOpenRef.current = menuOpen;
    if (wasOpen && !menuOpen) {
      if (!closedByLinkRef.current) {
        // Only restore focus if we didn't just navigate to a hash target.
        btnRef.current?.focus?.({ preventScroll: true });
      }
      closedByLinkRef.current = false;
    }
  }, [menuOpen]);

  const transparent = mode === 'top';

  return (
    <>
      <nav id="navbar" aria-label="Main" data-mode={mode} className="site-nav">
        {/* Top gradient for readability while the navbar is transparent */}
        <div
          id="nav-gradient"
          aria-hidden="true"
          className={cn(
            'absolute inset-0 bg-gradient-to-b from-charcoal/40 to-transparent pointer-events-none transition-opacity duration-300',
            transparent ? 'opacity-100' : 'opacity-0'
          )}
        />
        <div className="container-x site-nav__inner">
          <a href="#top" aria-label="Tirumala Marriage Service & Suppliers — back to top" className="brand">
            <img src={img('venkateswara-emblem.png')} alt="" width="200" height="184" />
            <Wordmark />
          </a>
          <div className="hidden lg:flex site-nav__links" id="nav-links">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href === '#top' ? '#' : l.href} className="nav-link">
                {l.label}
              </a>
            ))}
            <a href="#booking" className="btn btn--gold btn--sm">Book Now</a>
          </div>
          <button
            ref={btnRef}
            id="mobile-menu-btn"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen ? 'true' : 'false'}
            aria-controls="mobile-menu"
            onClick={openMenu}
            className={cn('hamburger lg:hidden', menuOpen && 'open')}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Drawer backdrop */}
      <div onClick={closeMenu} aria-hidden="true" className={cn('drawer-backdrop', menuOpen && 'is-open')} />

      {/* Mobile drawer: hidden + inert while closed so nothing inside is tabbable */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal={menuOpen ? 'true' : 'false'}
        aria-hidden={menuOpen ? 'false' : 'true'}
        aria-label="Navigation menu"
        className={cn('drawer', menuOpen && 'is-open')}
        {...(menuOpen ? {} : { inert: '' })}
      >
        <ZariBand />
        <div className="drawer__head">
          <span className="brand">
            <img src={img('venkateswara-emblem.png')} alt="" width="200" height="184" style={{ height: 34 }} />
            <Wordmark />
          </span>
          <button ref={closeBtnRef} type="button" onClick={closeMenu} aria-label="Close menu" className="drawer__close">
            <i className="fas fa-xmark" aria-hidden="true" />
          </button>
        </div>
        <nav className="drawer__nav" aria-label="Mobile">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href === '#top' ? '#' : l.href} onClick={closeFromLink} className="drawer__link">
              {l.label}
              <Lotus />
            </a>
          ))}
        </nav>
        <div className="drawer__foot">
          <a href="#booking" onClick={closeFromLink} className="btn btn--gold btn--block">Book Now</a>
        </div>
      </div>
    </>
  );
}
