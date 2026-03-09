import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, Layout, Smartphone, Palette } from 'lucide-react';
const Spline = React.lazy(() => import('@splinetool/react-spline'));

const Hero = () => {
  const heroServices = [
    {
        icon: Palette,
        title: "Branding i Wizerunek",
        desc: "Projektowanie logo i pełnej identyfikacji firmy."
    },
    {
        icon: Layout,
        title: "Zaawansowane Strony WWW",
        desc: "Nowoczesne, szybkie i piękne witryny internetowe."
    },
    {
        icon: Smartphone,
        title: "Grafiki na Social Media",
        desc: "Kompleksowa oprawa wizualna Twoich profili."
    },
    {
        icon: MousePointerClick,
        title: "Kampanie Internetowe",
        desc: "Reklamy, które ściągają do Ciebie nowych klientów."
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
            <span className="text-[#00FFD1] uppercase tracking-[0.2em] text-sm font-bold">Wszystko w jednym miejscu</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 tracking-tight text-white">
            Tworzymy wizerunek, strony i kampanie, które <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFD1] to-white">przyciągają klientów</span>.
          </h1>

          <p className="text-lg text-gray-400 mb-10 leading-relaxed">
            Konkretnie i bez trudnego żargonu. Zdejmujemy z Ciebie ciężar marketingu – od zaprojektowania profesjonalnego logo i zaawansowanej strony WWW, po tworzenie grafik na social media i prowadzenie skutecznych reklam.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center">
            <a href="#contact" className="btn-primary group text-center">
              Darmowa Konsultacja
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a href="#services" className="btn-secondary h-[52px]">
              Zobacz co robimy
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
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
    </section>
  );
};

export default Hero;
