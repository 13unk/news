"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

// 1. Definición explícita de variantes para evitar errores de referencia
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

export const AlphaContent = () => {
  // Datos tipados para evitar errores en el map
  const videoData = [
    { img: "https://i.postimg.cc/pLZkd6rm/lux1.jpg", ttV: "1074", ttL: "89", igV: "701", igL: "48", totalV: "1.775", totalL: "137" },
    { img: "https://i.postimg.cc/FHZGKBzf/lux2.jpg", ttV: "553", ttL: "16", igV: "655", igL: "46", totalV: "1.208", totalL: "62" },
    { img: "https://i.postimg.cc/4x5w3Syh/lux3.jpg", ttV: "451", ttL: "14", igV: "538", igL: "45", totalV: "989", totalL: "59" }
  ];

  return (
    <div className="flex flex-col w-full h-full gap-24">
      {/* SECCIÓN WEBAPP */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-100px" }} 
        variants={fadeInUp}
        className="flex flex-col justify-center py-10"
      >
        <div className="flex flex-col gap-4 w-full text-white">
          <p className="text-zinc-400 text-[0.7rem] font-bold tracking-[0.2em] uppercase italic opacity-70">
            Lanzamiento de nuestra primera webapp
          </p>
          <div className="w-full aspect-video bg-black rounded-2xl border border-white/10 overflow-hidden relative group shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-900/80 backdrop-blur border-b border-white/5 flex items-center px-4 justify-between z-10">
               <div className="flex gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                 <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
               </div>
               <p className="text-[0.5rem] text-zinc-500 font-mono tracking-widest uppercase">rosalia.unkedition.com</p>
               <a href="https://rosalia.unkedition.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-zinc-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
               </a>
            </div>
            <iframe 
              src="https://rosalia.unkedition.com" 
              className="w-full h-full pt-8 grayscale-[0.5] hover:grayscale-0 transition-all duration-700 border-none"
              title="Rosalia Webapp"
            />
          </div>
        </div>
      </motion.section>

      {/* SECCIÓN VIDEOS INDIVIDUALES */}
      <section className="pb-10">
        <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
          <motion.p 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} 
            className="text-zinc-400 text-[0.7rem] font-bold tracking-[0.2em] uppercase italic opacity-70 text-left"
          >
            Videos promocionales
          </motion.p>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} 
            variants={staggerContainer} 
            className="grid grid-cols-3 gap-6"
          >
            {videoData.map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col gap-5 group">
                <motion.div 
                  whileHover={{ y: -8, scale: 1.02 }} 
                  className="aspect-[3/4] bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative shadow-xl"
                >
                  <img src={item.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" alt="" />
                </motion.div>
                
                <div className="flex flex-col gap-3 px-1">
                  <div className="flex flex-col gap-3 opacity-40 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex justify-between items-center border-b border-white/5 pb-1 text-white">
                      <span className="text-[0.5rem] tracking-[0.2em] text-zinc-500 font-bold uppercase">TikTok</span>
                      <div className="flex gap-3 ml-auto text-white">
                        <div className="flex items-center gap-1.5 justify-end"><span className="text-[0.6rem] tabular-nums font-medium">{item.ttV}</span><svg width="10" height="10" viewBox="0 0 24 24" fill="#3b82f6"><path d="M8 5v14l11-7z"/></svg></div>
                        <div className="flex items-center gap-1.5 justify-end min-w-[35px]"><span className="text-[0.6rem] tabular-nums font-medium">{item.ttL}</span><svg width="10" height="10" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-white">
                      <span className="text-[0.5rem] tracking-[0.2em] text-zinc-500 font-bold uppercase">Instagram</span>
                      <div className="flex gap-3 ml-auto">
                        <div className="flex items-center gap-1.5 justify-end"><span className="text-[0.6rem] tabular-nums font-medium">{item.igV}</span><svg width="10" height="10" viewBox="0 0 24 24" fill="#3b82f6"><path d="M8 5v14l11-7z"/></svg></div>
                        <div className="flex items-center gap-1.5 justify-end min-w-[35px]"><span className="text-[0.6rem] tabular-nums font-medium">{item.igL}</span><svg width="10" height="10" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 pt-3 border-t border-white/20 flex items-center justify-end gap-4 text-white">
                    <div className="flex items-center gap-2"><p className="text-[0.8rem] font-black tabular-nums">{item.totalV}</p><svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><path d="M8 5v14l11-7z"/></svg></div>
                    <div className="flex items-center gap-2"><p className="text-[0.8rem] font-black tabular-nums">{item.totalL}</p><svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* STATS TOTALES */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mt-6 pt-10 border-t border-white/30 flex justify-center items-center gap-12 text-white">
              <div className="flex items-center gap-4">
                <span className="text-4xl md:text-6xl font-black tracking-tighter tabular-nums">3.972</span>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#3b82f6" className="drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="flex items-center gap-4">
                <span className="text-4xl md:text-6xl font-black tracking-tighter tabular-nums">258</span>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#ef4444" className="drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};