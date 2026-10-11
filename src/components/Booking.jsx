import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import { EVENT_TYPES, SERVICE_OPTIONS } from '../data.js';
import { useMediaQuery } from '../hooks.js';
import { useOverlayLock } from '../OverlayContext.jsx';
import { buildEnquiryMessage, openWhatsApp, cn, BUSINESS_WHATSAPP } from '../utils.js';
import { CaptionRule, Lotus, ZariBand } from './Ornaments.jsx';

const EMPTY = { name: '', mobile: '', eventType: 'Wedding', eventDate: '', location: '', guests: '', details: '' };
const PROMISES = ['Quick Responses', 'Transparent Pricing', 'Dedicated Support'];

// Inline validation rules (name required; mobile exactly 10 digits).
function validate(f) {
  const errs = {};
  if (!f.name.trim()) errs.name = 'Please enter your full name.';
  if (!/^[0-9]{10}$/.test(f.mobile.trim())) errs.mobile = 'Enter a 10-digit mobile number.';
  return errs;
}

function Field({ id, label, required, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id} className="field__label">
        {label}
        {required && <span className="req" aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="field__error">
          <i className="fas fa-circle-exclamation" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function Booking() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [confirmed, setConfirmed] = useState(new Set()); // committed service selections
  const [sheetOpen, setSheetOpen] = useState(false);
  const [draft, setDraft] = useState(new Set());         // sheet-only draft before Done
  const [fallbackVisible, setFallbackVisible] = useState(false);
  const nameRef = useRef(null);
  const mobileRef = useRef(null);
  const sheetCloseRef = useRef(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useOverlayLock(sheetOpen);

  // After the first submit attempt, fields re-validate as the user types.
  const set = (key) => (e) => {
    const nextForm = { ...form, [key]: e.target.value };
    setForm(nextForm);
    if (attempted) setErrors(validate(nextForm));
  };

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
    setAttempted(true);
    const errs = validate(form);
    setErrors(errs);
    // Focus the first invalid field (inline errors are linked via aria-describedby).
    if (errs.name) { nameRef.current?.focus(); return; }
    if (errs.mobile) { mobileRef.current?.focus(); return; }
    const name = form.name.trim();
    const mobile = form.mobile.trim();
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

  const invalidProps = (key) =>
    errors[key] ? { 'aria-invalid': 'true', 'aria-describedby': `${key}-error` } : {};

  return (
    <section id="booking" className="band band--ivory">
      <div className="container-x">
        <Reveal className="invite">
          <div className="invite__panel on-dark">
            <ZariBand />
            <h2 className="invite__title h-display">Let's Plan Your Perfect Celebration</h2>
            <CaptionRule label="Start Planning" align="start" tone="dark" />
            <p className="invite__copy">
              Fill out the enquiry form with your event details. We provide complete wedding and event arrangements tailored to your unique requirements and budget.
            </p>
            <ul className="promises">
              {PROMISES.map((p) => (
                <li key={p}><Lotus />{p}</li>
              ))}
            </ul>
          </div>

          <div className="invite__form">
            <form id="enquiryForm" noValidate onSubmit={onSubmit} className="form-stack">
              <div className="form-row">
                <Field id="name" label="Full Name" required error={errors.name}>
                  <input
                    ref={nameRef} id="name" type="text" required autoComplete="name"
                    value={form.name} onChange={set('name')} className="field__control" {...invalidProps('name')}
                  />
                </Field>
                <Field id="mobile" label="Mobile Number (10 digits)" required error={errors.mobile}>
                  <input
                    ref={mobileRef} id="mobile" type="tel" required pattern="[0-9]{10}" inputMode="numeric"
                    autoComplete="tel-national" maxLength={10}
                    value={form.mobile} onChange={set('mobile')} className="field__control" {...invalidProps('mobile')}
                  />
                </Field>
              </div>

              <div className="form-row">
                <Field id="eventType" label="Event Type">
                  <select id="eventType" value={form.eventType} onChange={set('eventType')} className="field__control">
                    {EVENT_TYPES.map((et) => <option key={et.value} value={et.value}>{et.label}</option>)}
                  </select>
                </Field>
                <Field id="eventDate" label="Event Date">
                  <input id="eventDate" type="date" value={form.eventDate} onChange={set('eventDate')} className="field__control" />
                </Field>
              </div>

              <div className="form-row">
                <Field id="location" label="Event Location">
                  <input
                    id="location" type="text" placeholder="e.g. Tirupati"
                    value={form.location} onChange={set('location')} className="field__control"
                  />
                </Field>
                <Field id="guests" label="Expected Guest Count">
                  <input
                    id="guests" type="number" placeholder="e.g. 500"
                    value={form.guests} onChange={set('guests')} className="field__control"
                  />
                </Field>
              </div>

              {/* Services Required — one selection state for both views */}
              <div id="services-field" className="field" role="group" aria-labelledby="services-label">
                <span className="field__label" id="services-label">Services Required</span>

                {/* Mobile compact trigger (shown via CSS <768px) */}
                <button
                  type="button"
                  id="services-trigger"
                  aria-haspopup="dialog"
                  aria-expanded={sheetOpen ? 'true' : 'false'}
                  aria-labelledby="services-label services-trigger-text"
                  onClick={() => { if (!isDesktop) openSheet(); }}
                  className={confirmed.size ? 'has-value' : undefined}
                >
                  <span id="services-trigger-text">{triggerText}</span>
                  <i className="fas fa-chevron-down" aria-hidden="true" />
                </button>

                {/* Desktop option tiles */}
                <div className="svc-grid" id="servicesCheckboxes">
                  {SERVICE_OPTIONS.map((s) => (
                    <label key={s.value} className="svc-option">
                      <input
                        type="checkbox"
                        value={s.value}
                        checked={confirmed.has(s.value)}
                        onChange={toggleConfirmed(s.value)}
                      />
                      {s.short}
                    </label>
                  ))}
                </div>
              </div>

              <Field id="details" label="Additional Requirements & Budget (Optional)">
                <textarea id="details" rows="3" value={form.details} onChange={set('details')} className="field__control" />
              </Field>

              <button type="submit" className="btn btn--kumkum btn--block form-submit">
                <i className="fab fa-whatsapp" aria-hidden="true" /> Send Enquiry on WhatsApp
              </button>
              <p
                id="fallback-msg"
                role="status"
                className={cn('text-sm text-center text-[#B42318]', !fallbackVisible && 'hidden')}
              >
                WhatsApp integration is pending. Details copied to clipboard.
              </p>
            </form>
          </div>
        </Reveal>
      </div>

      {/* Services bottom sheet (mobile) — hidden + inert while closed */}
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
        className={sheetOpen ? 'open' : ''}
        {...(sheetOpen ? {} : { inert: '' })}
      >
        <div className="sheet-drag-handle" aria-hidden="true" />
        <div className="sheet-head">
          <h3 id="sheet-title">Select Services</h3>
          <button ref={sheetCloseRef} type="button" onClick={() => closeSheet(false)} className="sheet-close" aria-label="Close services panel">
            <i className="fas fa-xmark" aria-hidden="true" />
          </button>
        </div>
        <div id="sheet-service-list" role="group" aria-labelledby="sheet-title">
          {SERVICE_OPTIONS.map((s, i) => (
            <label key={s.value} className="sheet-service-item" htmlFor={`sht-${i}`}>
              <input id={`sht-${i}`} type="checkbox" value={s.value} checked={draft.has(s.value)} onChange={toggleDraft(s.value)} />
              <span>{s.long}</span>
            </label>
          ))}
        </div>
        <div className="sheet-foot">
          <button type="button" onClick={() => closeSheet(true)} className="btn btn--kumkum btn--block">
            {draft.size > 0 ? `Done (${draft.size} selected)` : 'Done'}
          </button>
        </div>
      </div>
    </section>
  );
}
