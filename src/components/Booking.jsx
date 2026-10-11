import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import { EVENT_TYPES, SERVICE_OPTIONS } from '../data.js';
import { useMediaQuery } from '../hooks.js';
import { useOverlayLock } from '../OverlayContext.jsx';
import { buildEnquiryMessage, openWhatsApp, img, cn, BUSINESS_WHATSAPP } from '../utils.js';

const EMPTY = { name: '', mobile: '', eventType: 'Wedding', eventDate: '', location: '', guests: '', details: '' };

export default function Booking() {
  const [form, setForm] = useState(EMPTY);
  const [confirmed, setConfirmed] = useState(new Set()); // committed service selections
  const [sheetOpen, setSheetOpen] = useState(false);
  const [draft, setDraft] = useState(new Set());         // sheet-only draft before Done
  const [fallbackVisible, setFallbackVisible] = useState(false);
  const sheetRef = useRef(null);
  const triggerRef = useRef(null);
  const sheetCloseRef = useRef(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useOverlayLock(sheetOpen);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // Desktop checkbox toggles sync with `confirmed`.
  const toggleConfirmed = (value) => () => {
    setConfirmed((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
  };

  // Sheet draft toggles.
  const toggleDraft = (value) => () => {
    setDraft((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
  };

  const openSheet = () => {
    setDraft(new Set(confirmed));
    setSheetOpen(true);
  };

  const closeSheet = (save) => {
    if (save) setConfirmed(new Set(draft));
    setSheetOpen(false);
  };

  // Escape closes sheet without saving; initial focus to close button.
  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); closeSheet(false); }
    };
    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => sheetCloseRef.current?.focus({ preventScroll: true }), 0);
    return () => { document.removeEventListener('keydown', onKey); clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetOpen]);

  // On resize to >=768px with sheet open, close without saving.
  useEffect(() => {
    if (sheetOpen && isDesktop) closeSheet(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop]);

  const onSubmit = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const mobile = form.mobile.trim();
    if (!name) {
      // native required will catch empty, but trim-check anyway
      document.getElementById('name')?.focus();
      return;
    }
    if (!/^[0-9]{10}$/.test(mobile)) {
      document.getElementById('mobile')?.focus();
      return;
    }
    // Merge desktop checkboxes + mobile confirmed (same set, but future-proof).
    const services = Array.from(confirmed);
    const message = buildEnquiryMessage({
      name,
      mobile,
      eventType: form.eventType,
      eventDate: form.eventDate,
      location: form.location.trim(),
      guests: form.guests.trim(),
      services,
      details: form.details.trim(),
    });
    if (BUSINESS_WHATSAPP) {
      openWhatsApp(message);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(message).then(() => {
        setFallbackVisible(true);
        setTimeout(() => setFallbackVisible(false), 5000);
      });
    }
  };

  const triggerText =
    confirmed.size === 0
      ? 'Select required services'
      : confirmed.size === 1
        ? '1 service selected'
        : `${confirmed.size} services selected`;

  return (
    <section id="booking" className="py-10 lg:py-24 bg-cream border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="bg-white rounded-2xl lg:rounded-3xl shadow-elegant overflow-hidden flex flex-col lg:flex-row border border-gray-100 booking-inner">
          <div className="lg:w-2/5 relative bg-charcoal text-white p-7 md:p-10 flex flex-col justify-center booking-info">
            <div
              className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
              style={{ backgroundImage: `url('${img('venue-interior.webp')}')` }}
            />
            <div className="relative z-10">
              <span className="text-[#F1D77C] tracking-widest text-xs font-semibold uppercase">Start Planning</span>
              <h3 className="font-bold text-2xl md:text-4xl mt-2 mb-3">Let's Plan Your Perfect Celebration</h3>
              <p className="text-gray-300 font-light mb-6 text-sm leading-relaxed">
                Fill out the enquiry form with your event details. We provide complete wedding and event arrangements tailored to your unique requirements and budget.
              </p>
              <div className="space-y-4 text-sm">
                <p className="flex items-center"><i className="fas fa-check text-gold mr-3" aria-hidden="true" /> Quick Responses</p>
                <p className="flex items-center"><i className="fas fa-check text-gold mr-3" aria-hidden="true" /> Transparent Pricing</p>
                <p className="flex items-center"><i className="fas fa-check text-gold mr-3" aria-hidden="true" /> Dedicated Support</p>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 p-5 md:p-10 lg:p-14 booking-form-wrap">
            <form id="enquiryForm" noValidate onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 form-grid-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    id="name" type="text" required autoComplete="name"
                    value={form.name} onChange={set('name')}
                    className="w-full border border-gray-300 rounded-lg py-3 px-4 bg-gray-50 text-base min-h-[48px] focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number (10 digits) *</label>
                  <input
                    id="mobile" type="tel" required pattern="[0-9]{10}" inputMode="numeric" autoComplete="tel-national" maxLength={10}
                    value={form.mobile} onChange={set('mobile')}
                    className="w-full border border-gray-300 rounded-lg py-3 px-4 bg-gray-50 text-base min-h-[48px] focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 form-grid-2">
                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                  <select
                    id="eventType" value={form.eventType} onChange={set('eventType')}
                    className="w-full border border-gray-300 rounded-lg py-3 px-4 bg-gray-50 text-base min-h-[48px] focus:ring-2 focus:ring-gold focus:border-gold outline-none text-gray-600"
                  >
                    {EVENT_TYPES.map((et) => <option key={et.value} value={et.value}>{et.label}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                  <input
                    id="eventDate" type="date" value={form.eventDate} onChange={set('eventDate')}
                    className="w-full border border-gray-300 rounded-lg py-3 px-4 bg-gray-50 text-base min-h-[48px] focus:ring-2 focus:ring-gold focus:border-gold outline-none text-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 form-grid-2">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Event Location</label>
                  <input
                    id="location" type="text" placeholder="e.g. Tirupati"
                    value={form.location} onChange={set('location')}
                    className="w-full border border-gray-300 rounded-lg py-3 px-4 bg-gray-50 text-base min-h-[48px] focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Expected Guest Count</label>
                  <input
                    id="guests" type="number" placeholder="e.g. 500"
                    value={form.guests} onChange={set('guests')}
                    className="w-full border border-gray-300 rounded-lg py-3 px-4 bg-gray-50 text-base min-h-[48px] focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                  />
                </div>
              </div>

              {/* Services Required */}
              <div id="services-field">
                <label className="block text-sm font-medium text-gray-700 mb-1" id="services-label">Services Required</label>

                {/* Mobile compact trigger (shown via CSS <768px) */}
                <button
                  ref={triggerRef}
                  type="button"
                  id="services-trigger"
                  aria-haspopup="dialog"
                  aria-expanded={sheetOpen ? 'true' : 'false'}
                  aria-labelledby="services-label"
                  onClick={() => { if (!isDesktop) openSheet(); }}
                  style={confirmed.size === 0 ? undefined : { color: '#2C2C2C' }}
                >
                  <span id="services-trigger-text">{triggerText}</span>
                  <i className="fas fa-chevron-down text-gray-400 text-sm ml-2 flex-shrink-0" aria-hidden="true" />
                </button>

                {/* Desktop checkboxes */}
                <div className="hidden md:grid md:grid-cols-2 gap-2 text-sm text-gray-600 mt-2" id="servicesCheckboxes">
                  {SERVICE_OPTIONS.map((s) => (
                    <label key={s.value} className="flex items-center gap-2 py-1 cursor-pointer">
                      <input
                        type="checkbox"
                        value={s.value}
                        checked={confirmed.has(s.value)}
                        onChange={toggleConfirmed(s.value)}
                        className="accent-gold rounded w-4 h-4"
                      /> {s.short}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements &amp; Budget (Optional)</label>
                <textarea
                  id="details" rows="3" value={form.details} onChange={set('details')}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 bg-gray-50 text-base min-h-[48px] focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gold text-charcoal font-medium py-4 rounded-lg shadow-md hover:bg-opacity-90 transition flex justify-center items-center"
              >
                <i className="fab fa-whatsapp text-xl mr-2" aria-hidden="true" /> Send Enquiry on WhatsApp
              </button>
              <p
                id="fallback-msg"
                role="status"
                className={cn('text-xs text-center text-red-500 mt-2', !fallbackVisible && 'hidden')}
              >
                WhatsApp integration is pending. Details copied to clipboard.
              </p>
            </form>
          </div>
        </Reveal>
      </div>

      {/* Services bottom sheet */}
      <div
        id="services-sheet-backdrop"
        role="presentation"
        aria-hidden="true"
        className={sheetOpen ? 'open' : ''}
        onClick={() => closeSheet(false)}
      />
      <div
        id="services-bottom-sheet"
        role="dialog"
        aria-modal={sheetOpen ? 'true' : 'false'}
        aria-hidden={sheetOpen ? 'false' : 'true'}
        aria-labelledby="sheet-title"
        ref={sheetRef}
        className={sheetOpen ? 'open' : ''}
      >
        <div className="sheet-drag-handle" aria-hidden="true" />
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <h3 id="sheet-title" className="font-bold text-base text-charcoal">Select Services</h3>
          <button
            ref={sheetCloseRef}
            type="button"
            onClick={() => closeSheet(false)}
            className="text-gray-500 hover:text-[#856611] text-xl w-9 h-9 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gold rounded"
            aria-label="Close services panel"
          >
            &times;
          </button>
        </div>
        <div id="sheet-service-list" role="group" aria-labelledby="sheet-title">
          {SERVICE_OPTIONS.map((s, i) => (
            <label key={s.value} className="sheet-service-item" htmlFor={`sht-${i}`}>
              <input
                id={`sht-${i}`}
                type="checkbox"
                value={s.value}
                checked={draft.has(s.value)}
                onChange={toggleDraft(s.value)}
              />
              <span>{s.long}</span>
            </label>
          ))}
        </div>
        <div
          className="px-5 py-4 border-t border-gray-100 flex-shrink-0"
          style={{ paddingBottom: 'max(16px,env(safe-area-inset-bottom,16px))' }}
        >
          <button
            type="button"
            onClick={() => closeSheet(true)}
            className="w-full bg-gold text-charcoal font-semibold py-3 rounded-lg text-base min-h-[48px] hover:bg-opacity-90 transition"
          >
            {draft.size > 0 ? `Done (${draft.size} selected)` : 'Done'}
          </button>
        </div>
      </div>
    </section>
  );
}
