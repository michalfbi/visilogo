import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Dialog, Glyph, ToolsDialogContext } from './studio/formfield';

const GOOGLE_PROFILE_URL =
  'https://www.google.com/maps/place/Visilogo/@51.8423743,13.85696,6z/data=!3m1!4b1!4m6!3m5!1s0x4719d3297fbdd97d:0xac90ba0d53d04fed!8m2!3d51.953761!4d19.1343692!16s%2Fg%2F11xv_g46sn?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D';
const LINKEDIN_URL = 'https://www.linkedin.com/in/micha%C5%82-paku%C5%82a-0b5b382b7';

const Layout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const burgerRef = useRef(null);
  const toolsReturnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflowY = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflowY = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsToolsOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isMobileMenuOpen]);

  const navLinks = useMemo(
    () => [
      { name: 'Usługi', href: '/#services', route: '/' },
      { name: 'Proces', href: '/proces', route: '/proces' },
      { name: 'Realizacje', href: '/#cases', route: '/' },
      { name: 'Pakiety', href: '/#pricing', route: '/' },
      { name: 'Konfigurator', href: '/skonfiguruj-projekt', route: '/skonfiguruj-projekt' },
    ],
    []
  );

  const toolLinks = useMemo(
    () => [
      { href: '/pojedynek', title: 'Pojedynek stron', subtitle: 'Szybkość Twojej strony na tle rywali' },
      { href: '/szpieg-reklam', title: 'Szpieg reklam', subtitle: 'Reklamy, które puszcza konkurencja' },
      { href: '/skaner', title: 'Skaner linków', subtitle: 'Jak wygląda Twój link po udostępnieniu' },
      { href: '/baza-promptow', title: 'Baza promptów AI', subtitle: 'Gotowe polecenia do tekstów B2B' },
      { href: '/generator-qr', title: 'Generator QR', subtitle: 'Darmowe kody do druku' },
    ],
    []
  );

  const industryLinks = [
    { href: '/komisy', title: 'Komisy samochodowe' },
    { href: '/trucki', title: 'Sprzedawcy taboru' },
    { href: '/busy', title: 'Sprzedaż aut użytkowych' },
  ];

  // Only "/" path matches are section anchors; a link is current when its route owns the page.
  const isLinkActive = (route) => {
    if (route === '/') return false;
    return location.pathname.startsWith(route);
  };

  const openTools = useCallback((trigger) => {
    toolsReturnRef.current = trigger || document.activeElement;
    setIsToolsOpen(true);
  }, []);
  const closeTools = useCallback(() => setIsToolsOpen(false), []);
  const toolsContext = useMemo(() => ({ openTools }), [openTools]);

  const openToolsFromMenu = () => {
    setIsMobileMenuOpen(false);
    openTools(burgerRef.current);
  };

  const menuTab = isMobileMenuOpen ? undefined : -1;

  return (
    <ToolsDialogContext.Provider value={toolsContext}>
    <div className={`site${isHome ? ' site--home' : ''}`}>
      <a className="visually-hidden" href="#main">
        Przejdź do treści
      </a>

      <header
        className="nav"
        data-scrolled={isScrolled || !isHome ? 'true' : 'false'}
        data-menu={isMobileMenuOpen ? 'open' : 'closed'}
      >
        <div className="nav__inner">
          <a href="/" className="wordmark" aria-label="VisiLogo, strona główna">
            VisiLogo
            <Glyph />
          </a>

          <nav aria-label="Główna">
            <p className="nav__sentence">
              {navLinks.map((link) => (
                <React.Fragment key={link.name}>
                  <a href={link.href} className="nav__item" aria-current={isLinkActive(link.route) ? 'page' : undefined}>
                    {link.name}
                  </a>
                  {', '}
                </React.Fragment>
              ))}
              <button type="button" className="nav__item" aria-haspopup="dialog" onClick={(e) => openTools(e.currentTarget)}>
                Narzędzia
              </button>
            </p>
          </nav>

          <a href="/#contact" className="nav__cta">
            Darmowa analiza
          </a>

          <button
            ref={burgerRef}
            type="button"
            className="burger"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className="overlay-menu" data-open={isMobileMenuOpen ? 'true' : 'false'} aria-hidden={!isMobileMenuOpen}>
        <nav aria-label="Menu">
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} tabIndex={menuTab} onClick={() => setIsMobileMenuOpen(false)}>
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <button type="button" tabIndex={menuTab} onClick={openToolsFromMenu}>
                Narzędzia
              </button>
            </li>
            <li>
              <a href="/#contact" className="is-cta" tabIndex={menuTab} onClick={() => setIsMobileMenuOpen(false)}>
                Darmowa analiza
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <Dialog open={isToolsOpen} onClose={closeTools} title="Darmowe narzędzia" returnFocusTo={toolsReturnRef}>
        <ul className="ff-list">
          {toolLinks.map((tool, i) => (
            <li key={tool.href}>
              <a href={tool.href} onClick={closeTools}>
                <b>{String(i + 1).padStart(2, '0')}</b>
                <strong>{tool.title}</strong>
                <span>{tool.subtitle}</span>
              </a>
            </li>
          ))}
        </ul>
      </Dialog>

      <main id="main" inert={isMobileMenuOpen}>{children}</main>

      <footer className="footer">
        <div className="container">
          <p className="footer__mast" aria-hidden="true">
            VisiLogo
            <Glyph />
          </p>

          <div className="footer__cols">
            <nav className="footer__col" aria-labelledby="f-offer">
              <h2 id="f-offer">Oferta</h2>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.name}
                </a>
              ))}
            </nav>
            <nav className="footer__col" aria-labelledby="f-tools">
              <h2 id="f-tools">Darmowe narzędzia</h2>
              {toolLinks.map((tool) => (
                <a key={tool.href} href={tool.href}>
                  {tool.title}
                </a>
              ))}
            </nav>
            <nav className="footer__col" aria-labelledby="f-more">
              <h2 id="f-more">Branże i wiedza</h2>
              {industryLinks.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.title}
                </a>
              ))}
              <a href="/blog">Blog</a>
              <a href="/#report">Raport PDF</a>
            </nav>
            <div className="footer__col">
              <h2>Kontakt</h2>
              <a href="/#contact">Darmowa analiza</a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                Michał Pakuła na LinkedIn
              </a>
              <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noreferrer">
                Profil w Google
              </a>
            </div>
          </div>

          <div className="footer__legal label">
            <span>© 2026 VisiLogo Agency. Wszystkie prawa zastrzeżone.</span>
          </div>
        </div>
      </footer>
    </div>
    </ToolsDialogContext.Provider>
  );
};

export default Layout;
