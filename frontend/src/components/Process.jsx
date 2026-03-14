import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { mockProcess } from '../mock';

const Process = () => {
  const containerRef = useRef(null);
  
  return (
    <section id="process" className="py-16 lg:py-32 bg-black relative" ref={containerRef}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 md:gap-32">
          
          <div className="md:w-1/3">
            <div className="sticky top-32">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                Jak wygląda <br/> <span className="text-[#00FFD1]">współpraca?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Przeprowadzimy Cię przez cały proces krok po kroku. Bez chaosu i bez niespodzianek. Po prostu konkretne działanie.
              </p>
              <Link to="/proces" className="btn-secondary text-sm">
                Poznaj szczegóły procesu
              </Link>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="space-y-32">
              {mockProcess.map((step, index) => (
                <ProcessStep key={index} step={step} index={index} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const ProcessStep = ({ step, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="relative pl-12 border-l border-white/10"
    >
      <span className="absolute -left-[3rem] top-0 text-6xl font-bold text-[#00FFD1]/10 select-none">
        {step.step}
      </span>
      <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-[#00FFD1]" />
      
      <h3 className="text-3xl font-bold mb-4 text-white">{step.title}</h3>
      <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
        {step.desc}
      </p>
    </motion.div>
  );
};

export default Process;
