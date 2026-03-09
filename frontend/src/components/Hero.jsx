import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, Layout, Smartphone, TrendingUp } from 'lucide-react';
const Spline = React.lazy(() => import('@splinetool/react-spline'));

const Hero = () => {
  const heroServices = [
    {
        icon: MousePointerClick,
        title: "Kampanie PPC",
        desc: "Google & Meta Ads nastawione na telefony od klientów."
    },
    {
        icon: Layout,
        title: "Strony WWW",
        desc: "Szybkie landing pages zintegrowane z Twoim stokiem."
    },
    {
        icon: Smartphone,
        title: "Social Media",
        desc: "Prowadzenie profili i wideo-prezentacje aut."
    },
    {
        icon: TrendingUp,
        title: "Skalowanie",
        desc: "Systemy CRM i procesy zwiększające rotację aut."
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-black">
      {/* Abstract Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#00FFD1]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
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
            <span className="text-[#00FFD1] uppercase tracking-[0.2em] text-sm font-bold">Co robimy dla Twojego biznesu?</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8 tracking-tight text-white">
            Konkretne usługi, <br />
            które <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFD1] to-white">sprzedają pojazdy</span>.
          </h1>

          {/* Quick Services Grid in Hero */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {heroServices.map((service, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    className="bg-white/5 border border-white/10 p-4 flex items-start gap-4 hover:border-[#00FFD1]/50 hover:bg-white/10 transition-all cursor-default group"
                >
                    <div className="p-2 bg-black rounded text-[#00FFD1] group-hover:scale-110 transition-transform">
                        <service.icon size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm mb-1">{service.title}</h3>
                        <p className="text-xs text-gray-400 leading-snug">{service.desc}</p>
                    </div>
                </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary group">
              Zamów Bezpłatną Wycenę
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a href="#process" className="btn-secondary">
              Zobacz Proces
            </a>
          </div>
        </motion.div>

        {/* Right Spline - Visual Anchor */}
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
      
      {/* Scroll Indicator */}
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
