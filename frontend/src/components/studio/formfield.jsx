import React, { createContext, useContext, useEffect, useId, useRef } from 'react';

/* The registration glyph: a thin square interrupted by an offset oxide notch. Decorative. */
export const Glyph = () => (
  <svg viewBox="0 0 28 28" fill="none" aria-hidden="true" focusable="false">
    <path d="M22.2 7.6V24.4H3.6V3.6H17.8" stroke="#11110F" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter" />
    <rect x="16.6" y="1.9" width="8.4" height="3.2" fill="#B85E3E" />
  </svg>
);

/* Lets any component (hero pills, nav) open the shared tools dialog. */
export const ToolsDialogContext = createContext({ openTools: () => {} });
export const useToolsDialog = () => useContext(ToolsDialogContext);

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/*
 * Local dialog: dimmer + chalk panel with an ink hairline.
 * Locks body scroll, focuses the heading after 20ms, traps Tab, closes on Escape
 * or a click on the dimmer, and returns focus to whatever opened it.
 */
export const Dialog = ({ open, onClose, title, lead, children, returnFocusTo }) => {
  const headingId = useId();
  const panelRef = useRef(null);
  const headingRef = useRef(null);
  const openerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    openerRef.current = returnFocusTo?.current || document.activeElement;
    const prevOverflow = document.body.style.overflowY;
    document.body.style.overflowY = 'hidden';
    const focusTimer = window.setTimeout(() => headingRef.current?.focus(), 20);

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const items = [...panelRef.current.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === headingRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflowY = prevOverflow;
      const opener = openerRef.current;
      if (opener && typeof opener.focus === 'function' && document.contains(opener)) opener.focus();
    };
  }, [open, onClose, returnFocusTo]);

  if (!open) return null;

  return (
    <div className="ff-dialog">
      <div className="ff-dialog__dim" onClick={onClose} aria-hidden="true" />
      <div ref={panelRef} className="ff-dialog__panel" role="dialog" aria-modal="true" aria-labelledby={headingId}>
        <div className="ff-dialog__head">
          <h2 id={headingId} ref={headingRef} tabIndex={-1}>
            {title}
          </h2>
          <button type="button" className="ff-dialog__close" aria-label="Zamknij" onClick={onClose}>
            ×
          </button>
        </div>
        {lead && <p className="ff-dialog__lead">{lead}</p>}
        {children}
      </div>
    </div>
  );
};
