import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import CaseStudies from "./components/CaseStudies";
import Contact from "./components/Contact";

// Industry Pages
import PageKomisy from "./components/PageKomisy";
import PageTrucks from "./components/PageTrucks";
import PageVans from "./components/PageVans";

import "./App.css";

// Helper to scroll to top on route change
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
      <Hero />
      <Services />
      <Process />
      <CaseStudies />
      <Contact />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Industry Routes */}
          <Route path="/dla-komisow" element={<PageKomisy />} />
          <Route path="/dla-ciezarowek" element={<PageTrucks />} />
          <Route path="/dla-busow-dostawczych" element={<PageVans />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
