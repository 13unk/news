"use client";

import React from "react";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

export const Slide3 = () => {
  return (
    <div className="relative h-screen w-full bg-black text-white overflow-hidden">
      {/* GRID DE FONDO SUTIL */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* CONTENEDOR FULL SCREEN */}
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 h-full w-full"
      >
        
        {/* TERCIO 1 */}
        <motion.div 
          variants={itemVariants} 
          className="flex flex-col items-center justify-center p-10 border-b md:border-b-0 md:border-r border-white/10 group hover:bg-zinc-900/20 transition-all duration-500 cursor-default"
        >
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-black italic tracking-tighter uppercase leading-[0.8] text-center">
            ORGANIZACIÓN<br />INTERNA
          </h3>
        </motion.div>

        {/* TERCIO 2 */}
        <motion.div 
          variants={itemVariants} 
          className="flex flex-col items-center justify-center p-10 border-b md:border-b-0 md:border-r border-white/10 group hover:bg-zinc-900/20 transition-all duration-500 cursor-default"
        >
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-black italic tracking-tighter uppercase leading-[0.8] text-center">
            RECLUTAR<br />MIEMBROS
          </h3>
        </motion.div>

        {/* TERCIO 3 */}
        <motion.div 
          variants={itemVariants} 
          className="flex flex-col items-center justify-center p-10 group hover:bg-zinc-900/20 transition-all duration-500 cursor-default"
        >
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-black italic tracking-tighter uppercase leading-[0.8] text-center">
            SPEECH<br />CONVINCENTE
          </h3>
        </motion.div>

      </motion.div>
    </div>
  );
};