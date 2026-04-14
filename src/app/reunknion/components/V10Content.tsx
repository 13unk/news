"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

// 1. Tipado explícito de variantes
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] } 
  }
};

export const V10Content = () => {
  const [isLocked, setIsLocked] = React.useState(false);

  const handleLockClick = () => {
    setIsLocked(true);
    setTimeout(() => setIsLocked(false), 500);
  };

  const videoData = [
    { 
      img: "https://i.postimg.cc/XNgvQR2y/sp1.jpg", 
      ttV: "346", ttL: "28", 
      igV: "1.174", igL: "20", 
      totalV: "1.520", totalL: "48" 
    },
    { 
      img: "https://i.postimg.cc/NGx0p3N2/sp2.jpg", 
      ttV: "705", ttL: "90", 
      igV: "4.104", igL: "179", 
      totalV: "4.809", totalL: "269" 
    },
  ];

  return (
    <div className="flex flex-col w-full h-full gap-24">
      <section className="py-10">
        <div className="flex flex-col gap-8 w-full text-white">
          <motion.p 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeInUp} 
            className="text-zinc-400 text-[0.7rem] font-bold tracking-[0.2em] uppercase italic opacity-70 text-left"
          >
            Shitposting
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* VIDEO 1 Y 2 */}
            {videoData.map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                className="flex flex-col gap-5 group"
              >
                <motion.div 
                  whileHover={{ y: -8, scale: 1.02 }} 
                  className="aspect-[3/4] bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative shadow-xl"
                >
                  <img src={item.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" alt="" />
                </motion.div>
                
                <div className="flex flex-col gap-3 px-1">
                  <div className="flex flex-col gap-3 opacity-40 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex justify-between items-center border-b border-white/5 pb-1">
                      <span className="text-[0.5rem] tracking-[0.2em] text-zinc-500 font-bold uppercase">TikTok</span>
                      <div className="flex gap-3 ml-auto">
                        <div className="flex items-center gap-1.5 justify-end"><span className="text-[0.6rem] tabular-nums font-medium">{item.ttV}</span><svg width="10" height="10" viewBox="0 0 24 24" fill="#3b82f6"><path d="M8 5v14l11-7z"/></svg></div>
                        <div className="flex items-center gap-1.5 justify-end min-w-[35px]"><span className="text-[0.6rem] tabular-nums font-medium">{item.ttL}</span><svg width="10" height="10" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[0.5rem] tracking-[0.2em] text-zinc-500 font-bold uppercase">Instagram</span>
                      <div className="flex gap-3 ml-auto">
                        <div className="flex items-center gap-1.5 justify-end"><span className="text-[0.6rem] tabular-nums font-medium">{item.igV}</span><svg width="10" height="10" viewBox="0 0 24 24" fill="#3b82f6"><path d="M8 5v14l11-7z"/></svg></div>
                        <div className="flex items-center gap-1.5 justify-end min-w-[35px]"><span className="text-[0.6rem] tabular-nums font-medium">{item.igL}</span><svg width="10" height="10" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 pt-3 border-t border-white/20 flex items-center justify-end gap-4">
                    <div className="flex items-center gap-2"><p className="text-[0.8rem] font-black text-white tabular-nums">{item.totalV}</p><svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><path d="M8 5v14l11-7z"/></svg></div>
                    <div className="flex items-center gap-2"><p className="text-[0.8rem] font-black text-white tabular-nums">{item.totalL}</p><svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* STACK DE 7 CARTAS */}
            <div className="flex flex-col gap-10">
              <div className="aspect-[3/4] relative group">
                {Array.from({ length: 7 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-[-20px_0_40px_rgba(0,0,0,0.8)]"
                    style={{ 
                      zIndex: 10 - i,
                      left: i * 35,
                      top: i * 2,
                    }}
                    initial={{ rotate: i * 2 }}
                    whileHover={{ x: i * 20, rotate: i * 1, transition: { type: "spring", stiffness: 100 } }}
                  >
                    <img 
                      src="https://i.postimg.cc/66hQYkHv/sp3.jpg"
                      className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-opacity duration-700 grayscale"
                      alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-transparent" />
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center w-full">
                <motion.button 
                  onClick={handleLockClick}
                  animate={isLocked ? { x: [-6, 6, -6, 6, -3, 3, 0], transition: { duration: 0.4 } } : {}}
                  className="flex items-center gap-4 group cursor-not-allowed select-none"
                >
                  <span className={`text-6xl font-black italic tracking-tighter transition-all duration-300 ${isLocked ? 'text-red-600 scale-110' : 'text-white/10 group-hover:text-white/30'}`}>
                    +8
                  </span>
                  
                  <div className={`p-3 rounded-xl border transition-all duration-300 ${isLocked ? 'border-red-600 bg-red-600/20 shadow-[0_0_20px_rgba(220,38,38,0.4)]' : 'border-white/5 bg-white/5'}`}>
                    <svg 
                      width="28" height="28" viewBox="0 0 24 24" fill="none" 
                      stroke={isLocked ? "#dc2626" : "#52525b"} 
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                </motion.button>
              </div>
            </div>

            {/* TOTALES GLOBALES */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} 
              className="md:col-span-2 mt-6 pt-10 border-t border-white/30 flex justify-center items-center gap-12"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl md:text-6xl font-black tracking-tighter tabular-nums text-white">6.329</span>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#3b82f6" className="drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="flex items-center gap-4">
                <span className="text-4xl md:text-6xl font-black tracking-tighter tabular-nums text-white">317</span>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#ef4444" className="drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};