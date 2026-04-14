"use client";

import React from "react";
import { motion } from "framer-motion";

export const Slide1 = () => {
  return (
    <div className="h-full w-full flex items-center justify-center p-12 bg-[#16161d] relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.21, 0.45, 0.32, 0.9] }}
        className="text-center flex flex-col items-center"
      >
        {/* LOGO SUPERIOR */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="mb-8"
        >
          <img 
            src="https://i.postimg.cc/RCYTfhSN/logo-unk.png" 
            className="w-16 h-auto grayscale" 
            alt="logo" 
          />
        </motion.div>

        {/* SUBTÍTULO */}
        <p className="text-zinc-500 text-[0.6rem] font-black tracking-[0.8em] uppercase mb-4 italic">
          UNK EDITION
        </p>

        {/* TÍTULO PRINCIPAL */}
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic leading-none">
          RE<span className="text-zinc-500">UNK</span>NIÓN
          <br />
          <span className="text-4xl md:text-6xl block mt-4 not-italic font-bold tracking-widest opacity-20">
            ENERO 2026
          </span>
        </h1>
      </motion.div>

      {/* INDICADOR: TRIÁNGULO PARPADEANTE ABAJO */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.5, 0.1] }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2 // Aparece después de que cargue el título
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div 
          className="w-0 h-0 
          border-l-[6px] border-l-transparent 
          border-r-[6px] border-r-transparent 
          border-t-[8px] border-t-white" 
        />
      </motion.div>
    </div>
  );
};