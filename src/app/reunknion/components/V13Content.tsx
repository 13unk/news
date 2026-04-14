"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] } 
  }
};

export const V13Content = () => {
  const youtubeUrl = "https://www.youtube.com/@unkedition";
  const bars = Array.from({ length: 24 });

  const stats = [
    { label: "Subs", value: "70" },
    { label: "Views", value: "155.8K" },
    { label: "Likes", value: "1.4K" },
    { label: "Comms", value: "40" },
    { label: "Shares", value: "290" },
  ];

  return (
    <div className="flex flex-col w-full h-full gap-10">
      {/* SECCIÓN ANALYTICS VISUALIZER */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-100px" }} 
        variants={fadeInUp}
        className="flex flex-col justify-center py-4"
      >
        <div className="flex flex-col gap-4 w-full text-white">
          <p className="text-zinc-400 text-[0.7rem] font-bold tracking-[0.2em] uppercase italic opacity-70">
            Social Data Visualization
          </p>
          
          <div className="w-full aspect-video bg-[#0a0a0c] rounded-2xl border border-white/10 overflow-hidden relative group shadow-2xl flex items-end justify-center px-12 pb-12">
            {/* BARRA SUPERIOR NAVEGADOR */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-900/90 backdrop-blur border-b border-white/5 flex items-center px-4 justify-between z-20">
               <div className="flex gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                 <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
               </div>
               <p className="text-[0.5rem] text-zinc-500 font-mono tracking-widest uppercase">metrics.youtube.analytics</p>
               <a href={youtubeUrl} target="_blank" rel="noreferrer" className="hover:text-red-600 transition-colors text-zinc-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
               </a>
            </div>

            {/* ANIMACIÓN DE BARRAS */}
            <div className="flex items-end gap-1 md:gap-2 w-full h-32 md:h-48">
              {bars.map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ height: "10%" }}
                  animate={{ 
                    height: [`${Math.random() * 60 + 20}%`, `${Math.random() * 80 + 10}%`, `${Math.random() * 50 + 30}%`] 
                  }}
                  transition={{
                    duration: Math.random() * 1.5 + 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  className="flex-1 bg-gradient-to-t from-[#FF0000] to-[#ff4d4d] opacity-40 group-hover:opacity-80 transition-opacity rounded-t-sm"
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          </div>
        </div>
      </motion.section>

      {/* MÉTRICAS EXPANDIDAS (Ocupan todo el ancho) */}
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }}
        variants={fadeInUp} 
        className="pt-10 border-t border-white/20 flex flex-row justify-between items-center w-full"
      >
        {stats.map((stat, index) => (
          <React.Fragment key={stat.label}>
            <div className="flex flex-col items-start gap-0">
              <span className="text-4xl lg:text-5xl font-black tracking-tighter tabular-nums text-white leading-none">
                {stat.value}
              </span>
              <p className="text-[0.6rem] font-black text-zinc-500 uppercase tracking-[0.2em] mt-2">
                {stat.label}
              </p>
            </div>
            {index < stats.length - 1 && (
              <div className="w-px h-10 bg-white/10 mx-2" />
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};