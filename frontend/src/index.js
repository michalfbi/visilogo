import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource/hedvig-letters-serif/400.css';
import '@fontsource/geist/400.css';
import '@fontsource/geist/500.css';
import './index.css';
import './styles/studio.css';
import './styles/glass.css';
import App from './App';

const container = document.getElementById('root');

// HYDRACJA: Jeśli strona została już wygenerowana dla Google jako HTML, nie ładuj jej od zera, tylko ją "ożyw" (to przyspiesza ładowanie o 50% i daje punkty w SEO).
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  const root = createRoot(container);
  root.render(<App />);
}
