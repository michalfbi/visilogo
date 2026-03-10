import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('root');

if (container.hasChildNodes()) {
  // Jeśli HTML został wygenerowany statycznie (SSG), React go "ożywia" (hydruje)
  hydrateRoot(container, <App />);
} else {
  // Zabezpieczenie (Fallback) na wypadek zwykłego renderowania CSR
  const root = createRoot(container);
  root.render(<App />);
}
