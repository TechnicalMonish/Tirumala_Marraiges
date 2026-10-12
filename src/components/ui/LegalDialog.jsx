import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useOverlayLock } from '../../context/OverlayContext.jsx';

// Portal-mounted scrollable modal for the Privacy Policy / Terms long-form copy.
// Consumes { title, updated, intro, sections: [{ heading, paragraphs: [...] }], closing }.
// The parent (Footer) controls open/close + focus-return via a trigger ref.
export default function LegalDialog({ doc, onClose }) {
  const open = Boolean(doc);
  const closeRef = useRef(null);
  const panelRef = useRef(null);

  useOverlayLock(open);

  // Esc closes; focus the close button on open; trap tabbing inside the panel.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const focusables = panel.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 0);
    return () => {
      document.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  if (!open) return null;

  const titleId = 'legal-title';
  const bodyId = 'legal-body';

  const node = (
    <div className="legal-overlay" role="presentation">
      <div
        className="legal-backdrop is-open"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="legal-dialog is-open"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={bodyId}
      >
        <header className="legal-head">
          <div className="legal-head__text">
            <h2 id={titleId} className="legal-title h-display t-h3 text-kumkum">
              {doc.title}
            </h2>
            <p className="legal-updated">{doc.updated}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="legal-close"
          >
            <i className="fas fa-xmark" aria-hidden="true" />
          </button>
        </header>

        <div id={bodyId} className="legal-body">
          <p className="legal-intro">{doc.intro}</p>
          {doc.sections.map((s) => (
            <section key={s.heading} className="legal-section">
              <h3 className="legal-section__h h-display">{s.heading}</h3>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="legal-section__p">{p}</p>
              ))}
            </section>
          ))}
          <p className="legal-closing">{doc.closing}</p>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(node, document.body);
}
