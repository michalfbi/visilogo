import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, Layout, Smartphone, TrendingUp } from 'lucide-react';
const Spline = React.lazy(() => import('@splinetool/react-spline'));

const Hero = () => {
  const heroServices = [
    {
        icon: MousePointerClick,
        title: "Kampanie PPC",
        desc: "Google & Meta Ads nastawione na zdobywanie leadów B2B."
    },
    {
        icon: Layout,
        title: "Strony WWW",
        desc: "Platformy idealnie zintegrowane z Twoim lejkiem sprzedaży."
    },
    {
        icon: Smartphone,
        title: "Branding",
        desc: "Wizerunek premium, który buduje mocny autorytet rynkowy."
    },
    {
        icon: TrendingUp,
        title: "Skalowanie",
        desc: "Systemy CRM i optymalizacja procesów pozyskiwania klientów."
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-black">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#00FFD1]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-12 h-[1px] bg-[#00FFD1]"></span>
            <span className="text-[#00FFD1] uppercase tracking-[0.2em] text-sm font-bold">Zewnętrzny Dział Marketingu B2B</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 tracking-tight text-white">
            Przestań zgadywać. Zbuduj <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFD1] to-white">przewidywalny rurociąg leadów</span>.
          </h1>

          <p className="text-lg text-gray-400 mb-10 leading-relaxed">
            Skończ z nieskutecznymi zimnymi telefonami i przepalaniem budżetu na puste kliki. Wdrażamy systemy (WWW + Kampanie + Branding), które codziennie dostarczają Ci zapytania od konkretnych decydentów. Ty zajmujesz się tylko domykaniem sprzedaży.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center">
            <div className="flex flex-col">
                <a href="#contact" className="btn-primary group text-center">
                  Zarezerwuj Sesję Strategiczną
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
                <span className="text-[10px] text-gray-500 mt-2 text-center sm:text-left">* Bezpłatna 15-minutowa rozmowa wideo. Bez nachalnej sprzedaży.</span>
            </div>
            <a href="#casestudies" className="btn-secondary h-[52px]">
              Zobacz Case Studies
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-[500px] lg:h-[700px] w-full relative hidden lg:block"
        >
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-gray-800">Ładowanie 3D...</div>}>
             <Spline scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode" />
          </Suspense>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-widest text-gray-600">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#00FFD1] to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
