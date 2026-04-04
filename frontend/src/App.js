import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Services from "./components/Services";
import Process from "./components/Process";
import CaseStudies from "./components/CaseStudies";
import DataStrip from "./components/DataStrip";
import Founder from "./components/Founder";
import LeadMagnet from "./components/LeadMagnet";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";

import ProcessPage from "./components/ProcessPage";
import Configurator from "./components/Configurator";
import PageWebCreator from "./components/PageWebCreator";
import PopupConfigurator from "./components/PopupConfigurator"; // Dodany import Pop-upa

// Narzędzia
import Duel from "./components/Duel";
import SocialScanner from "./components/SocialScanner";
import AdsSpy from "./components/AdsSpy";
import QrGenerator from "./components/QrGenerator";
import AIPromptLibrary from "./components/AIPromptLibrary";

// Langing Pages dla konkretnych branż (Pod SEO)
import PageKomisy from "./components/PageKomisy";
import PageTrucks from "./components/PageTrucks";
import PageVans from "./components/PageVans";

import "./App.css";

const Checkout = lazy(() => import("./components/Checkout"));
const BlogPost = lazy(() => import("./components/BlogPost"));
const Blog = lazy(() => import("./components/Blog"));

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
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  
  return null;
}

const Home = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "VisiLogo",
    "url": "https://visilogo.com"
  };

  return (
    <>
      <Helmet>
        <title>VisiLogo | Agencja Marketingowa B2B | Reklamy i�Strony WWW</title>
        <meta name="description" content="Tworzymy strony internetowe i�prowadzimy zyskowne kampanie reklamowe dla firm B2B." />
        <link rel="canonical" href="https://visilogo.com/" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
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
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#00FFD1] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollManager />
        <Layout>
          {/* Dodany komponent Pop-upa wewnątrz Layoutu */}
          <PopupConfigurator /> 
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/zamowienie/:planId" element={<Checkout />} />
              <Route path="/proces" element={<ProcessPage />} />
              <Route path="/skonfiguruj-projekt" element={<Configurator />} />
              <Route path="/kreator-www" element={<PageWebCreator />} />
              
              {/* Narzędzia */}
              <Route path="/pojedynek" element={<Duel />} />
              <Route path="/skaner" element={<SocialScanner />} />
              <Route path="/szpieg-reklam" element={<AdsSpy />} />
              <Route path="/generator-qr" element={<QrGenerator />} />
              <Route path="/baza-promptow" element={<AIPromptLibrary />} />
              
              {/* Strony Branżowe */}
              <Route path="/komisy" element={<PageKomisy />} />
              <Route path="/trucki" element={<PageTrucks />} />
              <Route path="/busy" element={<PageVans />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;