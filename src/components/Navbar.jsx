import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useOverlayCount, useOverlayLock } from '../OverlayContext.jsx';
import { useMediaQuery } from '../hooks.js';
import { img, cn } from '../utils.js';
import { NAV_LINKS } from '../data.js';

// Navbar modes mirror the original scroll logic:
//   top    — y < 50 : transparent + top gradient, white text
//   solid  — scrolled up past threshold OR mobile menu open : white/95, charcoal text
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
  const menuRef = useRef(null);

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

  // When the mobile menu opens, force the navbar visible. If we're past 50px,
  // show solid (as the original did when the sidebar is open mid-page).
  useEffect(() => {
    if (menuOpen) {
      setMode(window.scrollY > 50 ? 'solid' : 'top');
    }
  }, [menuOpen]);

  // Close menu on resize to desktop (and restore focus to the hamburger).
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
    // Focus the close button after the drawer slides in.
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.replaceState(null, '', ' ');
      } else if (href.startsWith('#')) {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', href);
        }
      }
    });
  };
  useEffect(() => {
    if (!menuOpen) {
      if (!closedByLinkRef.current) {
        // Only restore focus if we didn't just navigate to a hash target.
        btnRef.current?.focus?.({ preventScroll: true });
      }
      closedByLinkRef.current = false;
    }
  }, [menuOpen]);

  const transparent = mode === 'top';
  const navTone = transparent ? 'text-white' : 'text-charcoal';
  const navBg = mode === 'solid' ? 'bg-white/95 shadow-sm' : 'bg-transparent';
  const navTransform = mode === 'hidden' ? '-translate-y-full' : 'translate-y-0';

  return (
    <>
      <nav
        id="navbar"
        className={cn(
          'fixed w-full z-50 transition-transform duration-300 transform',
          navBg,
          navTone,
          navTransform
        )}
      >
        {/* Subtle top gradient overlay for readability when transparent at the top */}
        <div
          id="nav-gradient"
          aria-hidden="true"
          className={cn(
            'absolute inset-0 bg-gradient-to-b from-charcoal/40 to-transparent pointer-events-none transition-opacity duration-300',
            transparent ? 'opacity-100' : 'opacity-0'
          )}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[58px] md:h-[60px] lg:h-[64px]">
            <a
              href="#top"
              aria-label="Tirumala Marriage Service & Suppliers — back to top"
              className="flex-shrink-0 flex items-center h-full py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            >
              <div className="flex items-center h-full space-x-2 md:space-x-[10px]">
                <img
                  src={img('balaji-icon.png')}
                  alt=""
                  className="h-[34px] md:h-[40px] w-auto object-contain transition-all duration-300 drop-shadow-md"
                />
                <div className="flex flex-col justify-center leading-none mt-1">
                  <span
                    className={cn(
                      'font-extrabold text-[18px] sm:text-[20px] lg:text-[22px] tracking-tight uppercase transition-colors duration-300',
                      transparent ? 'text-white' : 'text-[#800000]'
                    )}
                    style={{ letterSpacing: '-0.01em' }}
                  >
                    TIRUMALA
                  </span>
                  <span
                    className={cn(
                      'text-[8px] sm:text-[9.5px] lg:text-[10.5px] font-semibold tracking-wider uppercase mt-[3px] transition-colors duration-300',
                      transparent ? 'text-gray-300' : 'text-gray-500'
                    )}
                  >
                    MARRIAGE SERVICE &amp; SUPPLIERS
                  </span>
                </div>
              </div>
            </a>
            <div className="hidden lg:flex space-x-8 items-center" id="nav-links">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href === '#top' ? '#' : l.href}
                  className={cn(
                    'text-sm font-medium transition',
                    transparent ? 'hover:text-[#F1D77C]' : 'hover:text-[#856611]'
                  )}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#booking"
                className="bg-gold text-charcoal px-5 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition"
              >
                Book Now
              </a>
            </div>
            <div className="lg:hidden flex items-center">
              <button
                ref={btnRef}
                id="mobile-menu-btn"
                type="button"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen ? 'true' : 'false'}
                aria-controls="mobile-menu"
                onClick={openMenu}
                className={cn(
                  'focus:outline-none transition p-2 w-11 h-11 flex flex-col justify-center items-center relative group',
                  transparent ? 'hover:text-[#F1D77C]' : 'hover:text-[#856611]',
                  menuOpen && 'open'
                )}
              >
                <span className="hamburger-line bg-current block transition-all duration-300 ease-in-out h-[2px] w-[22px] rounded-full absolute -translate-y-2" />
                <span className="hamburger-line bg-current block transition-all duration-300 ease-in-out h-[2px] w-[22px] rounded-full absolute" />
                <span className="hamburger-line bg-current block transition-all duration-300 ease-in-out h-[2px] w-[22px] rounded-full absolute translate-y-2" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Backdrop */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 bg-charcoal/60 z-[60] transition-opacity duration-300 backdrop-blur-sm',
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* Mobile Sidebar Menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal={menuOpen ? 'true' : 'false'}
        aria-hidden={menuOpen ? 'false' : 'true'}
        aria-label="Navigation menu"
        className={cn(
          'fixed top-0 right-0 h-[100dvh] w-[min(85vw,340px)] bg-[#FDFBF7] z-[70] transform transition-transform duration-300 shadow-2xl flex flex-col',
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img src={img('balaji-icon.png')} alt="" className="h-[28px] w-auto drop-shadow-sm" />
            <span className="font-extrabold text-[16px] tracking-tight text-[#800000] uppercase" style={{ letterSpacing: '-0.01em' }}>
              TIRUMALA
            </span>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="text-charcoal hover:text-[#856611] transition text-2xl px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
          >
            &times;
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col space-y-2">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href === '#top' ? '#' : l.href}
              onClick={closeFromLink}
              className="block px-4 py-3 text-lg font-medium text-charcoal hover:text-[#856611] hover:bg-gold/5 rounded-lg transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="p-6 border-t border-gray-200 mb-8">
          <a
            href="#booking"
            onClick={closeFromLink}
            className="flex justify-center items-center w-full bg-gold text-charcoal px-5 py-4 rounded-lg text-base font-semibold hover:bg-opacity-90 transition shadow-md"
          >
            Book Now
          </a>
        </div>
      </div>
    </>
  );
}
