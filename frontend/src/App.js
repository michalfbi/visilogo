import { useEffect } from "react";
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
import Checkout from "./components/Checkout";
import BlogPost from "./components/BlogPost";
import Blog from "./components/Blog";

import "./App.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/zamowienie/:planId" element={<Checkout />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
