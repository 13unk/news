"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

// 1. Definición tipada de animaciones para evitar errores de referencia
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const BetaContent = () => {
  // Datos extraídos para mejor limpieza del código
  const betaData = [
    { img: "https://i.postimg.cc/SspRjksm/gn61.jpg", ttV: "865", ttL: "36", igV: "1.545", igL: "86", totalV: "2.410", totalL: "122" },
    { img: "https://i.postimg.cc/LXM5h2X9/gn62.jpg", ttV: "918", ttL: "35", igV: "1.718", igL: "93", totalV: "2.636", totalL: "128" },
    { img: "https://i.postimg.cc/XJ0qX4JV/gn63.jpg", ttV: "810", ttL: "39", igV: "1.737", igL: "45", totalV: "2.547", totalL: "84" }
  ];

  return (
    <div className="flex flex-col w-full h-full gap-24">
      <section className="py-10">
        <div className="flex flex-col gap-8 w-full">
          <motion.p 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeInUp} 
            className="text-zinc-400 text-[0.7rem] font-bold tracking-[0.2em] uppercase italic opacity-70 text-left"
          >
            Clips de Game Night 6: Fortnite Simpson
          </motion.p>
          
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={staggerContainer} 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {betaData.map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col gap-5 group">
                <motion.div 
                  whileHover={{ y: -8, scale: 1.02 }} 
                  className="aspect-[3/4] bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative shadow-xl"
                >
                  <img 
                    src={item.img} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" 
                    alt={`Game Night 6 - Video ${i+1}`} 
                  />
                </motion.div>
                
                <div className="flex flex-col gap-3 px-1">
                  <div className="flex flex-col gap-3 opacity-40 group-hover:opacity-100 transition-all duration-500 text-white">
                    {/* TikTok Stats */}
                    <div className="flex justify-between items-center border-b border-white/5 pb-1">
                      <span className="text-[0.5rem] tracking-[0.2em] text-zinc-500 font-bold uppercase">TikTok</span>
                      <div className="flex gap-3 ml-auto">
                        <div className="flex items-center gap-1.5 justify-end"><span className="text-[0.6rem] tabular-nums font-medium">{item.ttV}</span><svg width="10" height="10" viewBox="0 0 24 24" fill="#3b82f6"><path d="M8 5v14l11-7z"/></svg></div>
                        <div className="flex items-center gap-1.5 justify-end min-w-[35px]"><span className="text-[0.6rem] tabular-nums font-medium">{item.ttL}</span><svg width="10" height="10" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
                      </div>
                    </div>
                    {/* Instagram Stats */}
                    <div className="flex justify-between items-center">
                      <span className="text-[0.5rem] tracking-[0.2em] text-zinc-500 font-bold uppercase">Instagram</span>
                      <div className="flex gap-3 ml-auto">
                        <div className="flex items-center gap-1.5 justify-end"><span className="text-[0.6rem] tabular-nums font-medium">{item.igV}</span><svg width="10" height="10" viewBox="0 0 24 24" fill="#3b82f6"><path d="M8 5v14l11-7z"/></svg></div>
                        <div className="flex items-center gap-1.5 justify-end min-w-[35px]"><span className="text-[0.6rem] tabular-nums font-medium">{item.igL}</span><svg width="10" height="10" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
                      </div>
                    </div>
                  </div>
                  {/* Totales por clip */}
                  <div className="mt-2 pt-3 border-t border-white/20 flex items-center justify-end gap-4 text-white">
                    <div className="flex items-center gap-2"><p className="text-[0.8rem] font-black tabular-nums">{item.totalV}</p><svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><path d="M8 5v14l11-7z"/></svg></div>
                    <div className="flex items-center gap-2"><p className="text-[0.8rem] font-black tabular-nums">{item.totalL}</p><svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Globales de la Sección */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeInUp} 
            className="mt-6 pt-10 border-t border-white/30 flex justify-center items-center gap-12 text-white"
          >
            <div className="flex items-center gap-4 text-white">
              <span className="text-4xl md:text-6xl font-black tracking-tighter tabular-nums text-white">7.593</span>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#3b82f6" className="drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="flex items-center gap-4 text-white">
              <span className="text-4xl md:text-6xl font-black tracking-tighter tabular-nums text-white">334</span>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#ef4444" className="drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};