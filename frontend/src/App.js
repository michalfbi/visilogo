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
import Duel from "./components/Duel";

import "./App.css";

const Checkout = lazy(() => import("./components/Checkout"));
const BlogPost = lazy(() => import("./components/BlogPost"));
const Blog = lazy(() => import("./components/Blog"));

// Nowy, inteligentny menedżer przewijania
const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      // Czekamy ułamek sekundy na wyrenderowanie strony głównej
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          // Odejmujemy 100px ze względu na przyklejone menu
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
    "url": "https://visilogo.com",
    "logo": "https://visilogo.com/logo192.png",
    "image": "https://visilogo.com/og-image.jpg",
    "description": "Zewnętrzny dział marketingu dla firm B2B. Skuteczne kampanie reklamowe Google Ads, Meta Ads i nowoczesne strony WWW.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kielce",
      "addressCountry": "PL"
    },
    "priceRange": "$$",
    "serviceArea": {
      "@type": "Country",
      "name": "Poland"
    }
  };

  return (
    <>
      <Helmet>
        <title>VisiLogo | Agencja Marketingowa B2B | Reklamy i Strony WWW</title>
        <meta name="description" content="Szukasz klientów B2B? Tworzymy strony internetowe i prowadzimy zyskowne kampanie reklamowe (Google Ads, Meta Ads). Zobacz nasze Case Studies." />
        <meta name="keywords" content="agencja marketingowa B2B, skuteczne reklamy, tworzenie stron www, marketing dla firm, Google Ads, pozyskiwanie leadów" />
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
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/zamowienie/:planId" element={<Checkout />} />
              <Route path="/pojedynek" element={<Duel />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
