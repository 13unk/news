"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

// 1. Tipado explícito de Variants para evitar errores de referencia
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] } 
  }
};

export const V11Content = () => {
  const images = [
    "https://i.postimg.cc/y8x5wRsG/top10.png",
    "https://i.postimg.cc/qMjSbwH4/top9.png",
    "https://i.postimg.cc/TYCF70vG/top8.png",
    "https://i.postimg.cc/m28JXjfw/top7.png",
    "https://i.postimg.cc/GhqV7KwS/top6.png",
    "https://i.postimg.cc/vH3kqhFt/top5.png",
    "https://i.postimg.cc/3JnVS15Z/top4.png",
    "https://i.postimg.cc/MKdNP52y/top3.png",
    "https://i.postimg.cc/HsBRZzD0/top2.png",
    "https://i.postimg.cc/7Zhcpzwj/topmh.png",
    "https://i.postimg.cc/wT0Zf28J/top1.png",
    "https://i.postimg.cc/wT6nQPP0/top0.png"
  ];

  const totalViews = "483.384"; 
  const totalLikes = "28.258";

  // 2. Definición de la variante del abanico con tipado correcto
  const fanVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.02, duration: 0.4 }
    })
  };

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <section className="pt-0 pb-4">
        <div className="flex flex-col gap-6 w-full">
          <motion.p 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeInUp} 
            className="text-zinc-400 text-[0.7rem] font-bold tracking-[0.2em] uppercase italic opacity-70 text-left"
          >
            Lista de los 10 españoles con más aura de 2025
          </motion.p>
          
          <div className="relative w-full h-[450px] select-none mt-4"> 
            <div className="absolute inset-0 flex items-start">
              {images.map((img, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fanVariants}
                  className="absolute aspect-[3/4] w-[26%] bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-200"
                  style={{ 
                    zIndex: i,
                    left: `${i * 6.6}%`,
                  }}
                  whileHover={{ 
                    y: -25,
                    zIndex: 100,
                    transition: { type: "spring", stiffness: 500, damping: 15 }
                  }}
                >
                  <img 
                    src={img}
                    className="w-full h-full object-cover grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-200"
                    alt={`Top Aura ${i}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/10 to-transparent pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeInUp} 
            className="mt-4 pt-6 border-t border-white/20 flex justify-center items-center gap-10"
          >
            <div className="flex items-center gap-3">
              <span className="text-4xl md:text-5xl font-black tracking-tighter tabular-nums text-white">
                {totalViews}
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#3b82f6" className="drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            
            <div className="w-px h-8 bg-white/10" />
            
            <div className="flex items-center gap-3">
              <span className="text-4xl md:text-5xl font-black tracking-tighter tabular-nums text-white">
                {totalLikes}
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#ef4444" className="drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};