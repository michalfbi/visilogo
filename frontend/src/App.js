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
  return (
    <>
      <Helmet>
        <title>VisiLogo | Kompleksowa Agencja Marketingowa B2B</title>
        <meta name="description" content="Zewnętrzny dział marketingu dla firm B2B. Zwiększamy sprzedaż dzięki stronom WWW i kampaniom Google/Meta Ads." />
        <link rel="canonical" href="https://visilogo.com/" />
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
