import React, { Suspense, lazy, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import CaseStudies from './components/CaseStudies';
import Reviews from './components/Reviews';
import Founder from './components/Founder';
import LeadMagnet from './components/LeadMagnet';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import ProcessPage from './components/ProcessPage';
import Configurator from './components/Configurator';
import PageWebCreator from './components/PageWebCreator';
import PopupConfigurator from './components/PopupConfigurator';
import Duel from './components/Duel';
import SocialScanner from './components/SocialScanner';
import AdsSpy from './components/AdsSpy';
import QrGenerator from './components/QrGenerator';
import AIPromptLibrary from './components/AIPromptLibrary';
import PageKomisy from './components/PageKomisy';
import PageTrucks from './components/PageTrucks';
import PageVans from './components/PageVans';

const Checkout = lazy(() => import('./components/Checkout'));
const BlogPost = lazy(() => import('./components/BlogPost'));
const Blog = lazy(() => import('./components/Blog'));

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: [0.7, 0, 0.84, 0] } },
};

const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 180);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
};

const Home = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MarketingAgency',
    name: 'VisiLogo',
    url: 'https://visilogo.com',
  };

  return (
    <>
      <Helmet>
        <title>VisiLogo | Agencja Marketingowa B2B | Reklamy i Strony WWW</title>
        <meta name="description" content="Tworzymy strony internetowe i prowadzimy zyskowne kampanie reklamowe dla firm B2B." />
        <link rel="canonical" href="https://visilogo.com/" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <Hero />
      <Services />
      <Process />
      <CaseStudies />
      <Reviews />
      <Founder />
      <LeadMagnet />
      <Pricing />
      <FAQ />
      <Contact />
    </>
  );
};

const PageLoader = () => (
  <div className="loader" role="status" aria-label="Ładowanie">
    <span />
  </div>
);

const RoutedPage = ({ children, routeKey }) => (
  <motion.div
    key={routeKey}
    variants={pageTransition}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const routeKey = `${location.pathname}${location.search}`;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={routeKey}>
        <Route path="/" element={<RoutedPage routeKey={routeKey}><Home /></RoutedPage>} />
        <Route path="/blog" element={<RoutedPage routeKey={routeKey}><Blog /></RoutedPage>} />
        <Route path="/blog/:slug" element={<RoutedPage routeKey={routeKey}><BlogPost /></RoutedPage>} />
        <Route path="/zamowienie/:planId" element={<RoutedPage routeKey={routeKey}><Checkout /></RoutedPage>} />
        <Route path="/proces" element={<RoutedPage routeKey={routeKey}><ProcessPage /></RoutedPage>} />
        <Route path="/skonfiguruj-projekt" element={<RoutedPage routeKey={routeKey}><Configurator /></RoutedPage>} />
        <Route path="/kreator-www" element={<RoutedPage routeKey={routeKey}><PageWebCreator /></RoutedPage>} />
        <Route path="/pojedynek" element={<RoutedPage routeKey={routeKey}><Duel /></RoutedPage>} />
        <Route path="/skaner" element={<RoutedPage routeKey={routeKey}><SocialScanner /></RoutedPage>} />
        <Route path="/szpieg-reklam" element={<RoutedPage routeKey={routeKey}><AdsSpy /></RoutedPage>} />
        <Route path="/generator-qr" element={<RoutedPage routeKey={routeKey}><QrGenerator /></RoutedPage>} />
        <Route path="/baza-promptow" element={<RoutedPage routeKey={routeKey}><AIPromptLibrary /></RoutedPage>} />
        <Route path="/komisy" element={<RoutedPage routeKey={routeKey}><PageKomisy /></RoutedPage>} />
        <Route path="/trucki" element={<RoutedPage routeKey={routeKey}><PageTrucks /></RoutedPage>} />
        <Route path="/busy" element={<RoutedPage routeKey={routeKey}><PageVans /></RoutedPage>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollManager />
        <Layout>
          <PopupConfigurator />
          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes />
          </Suspense>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
