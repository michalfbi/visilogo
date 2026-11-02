import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import ConsentCheckbox from './ConsentCheckbox';

const PopupConfigurator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hiddenPaths = [
      '/',
      '/skonfiguruj-projekt',
      '/kreator-www',
      '/zamowienie',
      '/skaner',
      '/szpieg-reklam',
      '/generator-qr',
      '/pojedynek',
      '/baza-promptow',
    ];
    const isHiddenPath = hiddenPaths.some((path) =>
      path === '/' ? location.pathname === '/' : location.pathname.includes(path)
    );

    if (isHiddenPath) {
      setIsOpen(false);
      return undefined;
    }

    const hasSeenPopup = sessionStorage.getItem('visilogo_configurator_popup');
    if (hasSeenPopup) return undefined;

    let hasOpened = false;

    const openPopup = () => {
      if (hasOpened) return;
      hasOpened = true;
      setIsOpen(true);
      window.removeEventListener('scroll', handleScroll);
    };

    const handleScroll = () => {
      if (window.scrollY > 1000) {
        openPopup();
      }
    };

    const timer = window.setTimeout(openPopup, 18000);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('visilogo_configurator_popup', 'true');
  };

  const handleClickThrough = () => {
    setIsOpen(false);
    sessionStorage.setItem('visilogo_configurator_popup', 'true');
  };

  if (!isOpen) return null;

  return (
    <aside className="popup" aria-labelledby="popup-title">
      <button type="button" className="popup__close" onClick={handleClose} aria-label="Zamknij">
        <X size={18} aria-hidden="true" />
      </button>
      <h2 id="popup-title">Zbuduj własny pakiet usług</h2>
      <p>
        Skorzystaj z naszego kreatora à la carte. Dobierz technologie i usługi marketingowe w bardziej elastyczny sposób i
        zyskaj nawet 20% rabatu na start. Wycena online zajmuje około 2 minuty.
      </p>
      <ConsentCheckbox marketingConsent={marketingConsent} setMarketingConsent={setMarketingConsent} />
      <Link
        to={marketingConsent ? '/skonfiguruj-projekt' : '#'}
        aria-disabled={!marketingConsent}
        onClick={(event) => {
          if (!marketingConsent) {
            event.preventDefault();
            return;
          }
          handleClickThrough();
        }}
        className="btn btn--block crop"
      >
        Przejdź do kreatora
        <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </aside>
  );
};

export default PopupConfigurator;
