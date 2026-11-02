import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Bot, ChevronDown, Crosshair, Eye, Menu, QrCode, X, Zap } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const GOOGLE_PROFILE_URL =
  'https://www.google.com/maps/place/Visilogo/@51.8423743,13.85696,6z/data=!3m1!4b1!4m6!3m5!1s0x4719d3297fbdd97d:0xac90ba0d53d04fed!8m2!3d51.953761!4d19.1343692!16s%2Fg%2F11xv_g46sn?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D';
const LINKEDIN_URL = 'https://www.linkedin.com/in/micha%C5%82-paku%C5%82a-0b5b382b7';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const toolsMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

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
    const handlePointerDown = (event) => {
      if (!toolsMenuRef.current?.contains(event.target)) {
        setIsToolsOpen(false);
      }
    };
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setIsToolsOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown, { passive: true });
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

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
      { href: '/pojedynek', title: 'Pojedynek stron', subtitle: 'Szybkość Twojej strony na tle rywali', icon: Zap },
      { href: '/szpieg-reklam', title: 'Szpieg reklam', subtitle: 'Reklamy, które puszcza konkurencja', icon: Crosshair },
      { href: '/skaner', title: 'Skaner linków', subtitle: 'Jak wygląda Twój link po udostępnieniu', icon: Eye },
      { href: '/baza-promptow', title: 'Baza promptów AI', subtitle: 'Gotowe polecenia do tekstów B2B', icon: Bot },
      { href: '/generator-qr', title: 'Generator QR', subtitle: 'Darmowe kody do druku', icon: QrCode },
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

  // Routes already on the Studio system; everything else keeps the old dark styling until its pass.
  const STUDIO_ROUTES = ['/proces', '/skonfiguruj-projekt', '/zamowienie/'];
  const isRedesigned =
    location.pathname === '/' || STUDIO_ROUTES.some((route) => location.pathname.startsWith(route));

  return (
    <div className="site">
      <a className="visually-hidden" href="#main">
        Przejdź do treści
      </a>

      <header className="nav proof" data-scrolled={isScrolled || isMobileMenuOpen ? 'true' : 'false'}>
        <div className="container nav__inner">
          <a href="/" className="wordmark" aria-label="VisiLogo, strona główna">
            VisiLogo
          </a>

          <nav aria-label="Główna">
            <ul className="nav__links">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="nav__link"
                    aria-current={isLinkActive(link.route) ? 'page' : undefined}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li
                ref={toolsMenuRef}
                style={{ position: 'relative' }}
                onMouseEnter={() => setIsToolsOpen(true)}
                onMouseLeave={() => setIsToolsOpen(false)}
              >
                <button
                  type="button"
                  className="nav__link"
                  aria-expanded={isToolsOpen}
                  aria-controls="tools-menu"
                  onClick={() => setIsToolsOpen((prev) => !prev)}
                >
                  Narzędzia
                  <ChevronDown size={16} aria-hidden="true" />
                </button>

                {isToolsOpen && (
                  <div id="tools-menu" className="menu">
                    {toolLinks.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <a key={tool.href} href={tool.href} onClick={() => setIsToolsOpen(false)}>
                          <Icon size={18} aria-hidden="true" />
                          <strong>{tool.title}</strong>
                          <span>{tool.subtitle}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </li>
            </ul>
          </nav>

          <div className="nav__actions">
            <a href="/#contact" className="btn btn--sm crop">
              Darmowa analiza
            </a>
            <button
              type="button"
              className="btn btn--sm nav__burger"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {isMobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              Menu
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="drawer">
          <div className="container">
            <ul className="drawer__list">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                    {link.name}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <p className="label drawer__tools">Darmowe narzędzia</p>
            <ul className="drawer__list drawer__tools" style={{ marginTop: 'var(--space-sm)' }}>
              {toolLinks.map((tool) => (
                <li key={tool.href}>
                  <a href={tool.href} onClick={() => setIsMobileMenuOpen(false)}>
                    {tool.title}
                    <span>{tool.subtitle}</span>
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn btn--primary btn--block"
              style={{ marginTop: 'var(--space-xl)' }}
            >
              Darmowa analiza
            </a>
          </div>
        </div>
      )}

      <main id="main">{isRedesigned ? children : <div className="legacy-dark">{children}</div>}</main>

      <footer className="footer proof">
        <div className="container">
          <p className="footer__mast" aria-hidden="true">
            VisiLogo
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
  );
};

export default Layout;
