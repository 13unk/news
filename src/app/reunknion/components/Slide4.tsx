"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// IMPORTACIONES DE LOS PROYECTOS
import { Proyecto1 } from "./Proyecto1";
import { Proyecto2 } from "./Proyecto2";
import { Proyecto3 } from "./Proyecto3";
import { Proyecto4 } from "./Proyecto4"; 

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
};

export const Slide4 = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const projects = [
    { id: 1, title: "PROYECTO TRANSFER", component: <Proyecto1 /> },
    { id: 2, title: "PROYECTO CURSED", component: <Proyecto2 /> },
    { id: 3, title: "PROYECTO CORRALITO", component: <Proyecto3 /> },
    { id: 4, title: "PROYECTO BIBUJITO", component: <Proyecto4 /> },
  ];

  return (
    <div className="relative h-screen w-full bg-black text-white overflow-hidden">
      {/* GRID DE FONDO SUTIL */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* CUADRÍCULA 2x2 */}
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }}
        className="grid grid-cols-2 grid-rows-2 h-full w-full"
      >
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            variants={itemVariants} 
            onClick={() => setActiveProject(project.id)}
            className={`
              flex flex-col items-center justify-center p-10 cursor-pointer transition-all duration-500 group
              border-white/10
              ${index === 0 ? "border-r border-b" : ""}
              ${index === 1 ? "border-b" : ""}
              ${index === 2 ? "border-r" : ""}
              hover:bg-white/5
            `}
          >
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black italic tracking-tighter uppercase leading-none text-center group-hover:scale-105 transition-transform duration-500">
              {project.title}
            </h3>
          </motion.div>
        ))}
      </motion.div>

      {/* OVERLAY DE PROYECTO ABIERTO */}
      <AnimatePresence>
        {activeProject !== null && (
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-50 bg-[#16161d] overflow-y-auto no-scrollbar"
          >
            {/* BOTÓN CERRAR */}
            <button 
              onClick={() => setActiveProject(null)}
              className="fixed top-8 right-8 z-[60] bg-white text-black px-6 py-2 rounded-full font-black italic uppercase text-[10px] hover:scale-110 transition-transform shadow-2xl"
            >
              Cerrar [ESC]
            </button>

            {/* CONTENIDO DINÁMICO */}
            <div className="min-h-screen w-full">
              {projects.find(p => p.id === activeProject)?.component}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};