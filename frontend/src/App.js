import React, { Suspense, lazy, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Services from './components/Services';
import Process from './components/Process';
import CaseStudies from './components/CaseStudies';
import DataStrip from './components/DataStrip';
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
import './App.css';

const Checkout = lazy(() => import('./components/Checkout'));
const BlogPost = lazy(() => import('./components/BlogPost'));
const Blog = lazy(() => import('./components/Blog'));

const pageTransition = {
  initial: {
    opacity: 0,
    filter: 'blur(20px)',
    scale: 1.02,
  },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.36,
      ease: [0.17, 0.7, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    filter: 'blur(16px)',
    scale: 0.98,
    transition: {
      duration: 0.28,
      ease: [0.4, 0, 0.2, 1],
    },
  },
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
      <TrustBar />
      <Services />
      <Process />
      <CaseStudies />
      <DataStrip />
      <Founder />
      <LeadMagnet />
      <Pricing />
      <FAQ />
      <Contact />
    </>
  );
};

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#050505]">
    <div className="relative flex h-16 w-16 items-center justify-center">
      <div className="absolute h-16 w-16 rounded-full border border-[#00FFD1]/15" />
      <div className="absolute h-10 w-10 rounded-full border border-[#00FFD1]/20" />
      <div className="relative h-3 w-3 rounded-full bg-[#00FFD1]" />
    </div>
  </div>
);

const InitialLoader = ({ onComplete }) => {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      sessionStorage.setItem('visilogo_loaded', 'true');
      onComplete();
    }, 1600);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      key="initial-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]"
    >
      <div className="relative flex h-24 w-24 items-center justify-center">
        <motion.div
          initial={{ opacity: 0.25, scale: 0.95 }}
          animate={{ opacity: [0.25, 0.75, 0.25], scale: [0.94, 1.03, 0.94] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute h-24 w-24 rounded-full border border-[#00FFD1]/18"
        />
        <motion.div
          initial={{ rotate: 0, opacity: 0.55 }}
          animate={{ rotate: 360, opacity: [0.55, 0.95, 0.55] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute h-16 w-16 rounded-full border border-[#00FFD1]/25"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [1, 0.85, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative h-3 w-3 rounded-full bg-[#00FFD1]"
        />
      </div>
    </motion.div>
  );
};

const RoutedPage = ({ children, routeKey }) => (
  <motion.div
    key={routeKey}
    variants={pageTransition}
    initial="initial"
    animate="animate"
    exit="exit"
    className="will-change-[filter,opacity,transform]"
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
  const [appReady, setAppReady] = useState(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('visilogo_loaded') === 'true';
  });

  return (
    <HelmetProvider>
      <AnimatePresence mode="wait">
        {!appReady && <InitialLoader onComplete={() => setAppReady(true)} />}
      </AnimatePresence>
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
