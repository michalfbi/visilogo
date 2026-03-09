import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

// --- ERROR SUPPRESSION FOR BROWSER EXTENSIONS ---
// This prevents the "Red Screen of Death" caused by the user's "Talisman" extension
// and other common browser extension errors.
if (process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args) => {
    if (args.some(arg => 
        typeof arg === 'string' && (
            arg.includes('Talisman extension') || 
            arg.includes('Extension context invalidated') ||
            arg.includes('ResizeObserver')
        )
    )) {
      return;
    }
    originalError.apply(console, args);
  };

  window.addEventListener('error', (e) => {
    if (e.message && (
        e.message.includes('Talisman extension') || 
        e.message.includes('Extension context invalidated')
    )) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  });
}
// ------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
