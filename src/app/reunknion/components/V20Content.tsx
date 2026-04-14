"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] } 
  }
};

const shakeVariants: Variants = {
  hover: {
    x: [0, -2, 2, -4, 4, -5, 5, -2, 0],
    y: [0, 1, -1, 2, -2, 1, -1, 0],
    transition: { duration: 0.3, repeat: Infinity, ease: "linear" }
  }
};

export const V20Content = () => {
  const [updated, setUpdated] = useState([false, false, false, false]);
  // Estado para controlar qué bloques de información han sido revelados
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string) => {
    setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleUpdate = (index: number) => {
    const newUpdated = [...updated];
    newUpdated[index] = true;
    setUpdated(newUpdated);
  };

  const oldImages = [
    "https://i.postimg.cc/prypYj4g/ana1.jpg",
    "https://i.postimg.cc/x8qcymBf/bruno1.jpg",
    "https://i.postimg.cc/5yj6qzDc/jamon1.jpg",
    "https://i.postimg.cc/Y0jhfFTk/alba1.jpg",
  ];

  const newImages = [
    "https://i.postimg.cc/cC6rM3Py/ana2.jpg",
    "https://i.postimg.cc/PJNPzD0H/bruno2.jpg",
    "https://i.postimg.cc/Gt9HJDVW/jamon2.jpg",
    "https://i.postimg.cc/cC6rM3PS/alba2.jpg",
  ];

  return (
    <div className="flex flex-col w-full h-full gap-16 pb-32">
      {/* CABECERA */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex flex-col gap-1 border-l-[6px] border-white pl-8">
        <div className="text-white bg-white w-8 h-8 flex items-center justify-center rounded-full mb-2">
           <span className="text-black font-black text-xl">!</span>
        </div>
        <p className="text-white font-black tracking-[0.3em] uppercase text-xl md:text-2xl italic leading-none">MISIÓN:</p>
        <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter text-zinc-400 uppercase leading-none">REFORZAR LA IDENTIDAD DE MARCA.</h3>
      </motion.div>

      {/* MINIATURAS */}
      <section className="flex flex-col gap-6">
        <motion.p initial="hidden" whileInView="visible" variants={fadeInUp} className="text-zinc-400 text-[0.7rem] font-bold tracking-[0.2em] uppercase italic opacity-70">01. Miniaturas en las News</motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {updated.map((isUpdated, i) => (
            <motion.div key={i} onClick={() => handleUpdate(i)} whileHover={!isUpdated ? "hover" : ""} variants={shakeVariants} className="relative aspect-[4/5] bg-zinc-900 rounded-xl overflow-hidden cursor-pointer group border border-white/5 shadow-2xl">
              <AnimatePresence mode="wait">
                {!isUpdated ? (
                  <motion.img key="old" src={oldImages[i]} initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-300" alt="Old" />
                ) : (
                  <motion.img key="new" src={newImages[i]} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 w-full h-full object-cover" alt="New" />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BLOQUES DE INFORMACIÓN (3x3 Grid con Reveal) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-y-24 gap-x-12 border-t border-white/10 pt-16">
        {/* FILA 1: WIPs */}
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-black italic text-sm uppercase tracking-tight">Nueva plantilla News</h4>
          <p className="text-zinc-600 text-[0.65rem] font-mono uppercase tracking-widest italic">Work in progress</p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-black italic text-sm uppercase tracking-tight">Uso de Stories</h4>
          <p className="text-zinc-600 text-[0.65rem] font-mono uppercase tracking-widest italic">Work in progress</p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-black italic text-sm uppercase tracking-tight">Story Highlights</h4>
          <p className="text-zinc-600 text-[0.65rem] font-mono uppercase tracking-widest italic">Work in progress</p>
        </div>

        {/* FILA 2: INTERACTIVOS */}
        <div className="flex flex-col gap-3 cursor-pointer group" onClick={() => toggleReveal('formatos')}>
          <h4 className="text-white font-black italic text-sm uppercase tracking-tight group-hover:text-red-500 transition-colors underline decoration-white/10">Nuevos Formatos</h4>
          <motion.ul animate={{ filter: revealed['formatos'] ? "blur(0px)" : "blur(8px)", opacity: revealed['formatos'] ? 1 : 0.3 }} className="text-zinc-500 text-[0.7rem] uppercase font-bold flex flex-col gap-1 transition-all duration-500">
            <li>• Citas célebres</li>
            <li>• ¡Última hora!</li>
            <li>• Así sonaría X en Y</li>
          </motion.ul>
        </div>

        <div className="flex flex-col gap-3 cursor-pointer group" onClick={() => toggleReveal('quedanvan')}>
          <h4 className="text-white font-black italic text-sm uppercase tracking-tight underline decoration-white/10">Se quedan, Se van</h4>
          <motion.div animate={{ filter: revealed['quedanvan'] ? "blur(0px)" : "blur(8px)", opacity: revealed['quedanvan'] ? 1 : 0.3 }} className="grid grid-cols-2 gap-4 transition-all duration-500">
            <div className="flex flex-col gap-1">
              <p className="text-[0.55rem] text-zinc-600 font-mono italic">QUEDAN:</p>
              <p className="text-zinc-400 text-[0.65rem] font-bold uppercase tracking-tighter leading-tight">News, Lyrics, Mentality</p>
            </div>
            <div className="flex flex-col gap-1 border-l border-white/5 pl-4">
              <p className="text-[0.55rem] text-red-900 font-mono italic">VAN:</p>
              <p className="text-zinc-400 text-[0.65rem] font-bold uppercase tracking-tighter leading-tight italic line-through opacity-50">Shitpost</p>
              <p className="text-zinc-400 text-[0.65rem] font-bold uppercase tracking-tighter leading-tight">Game Nights → Clipinator</p>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-3 cursor-pointer group" onClick={() => toggleReveal('strats')}>
          <h4 className="text-white font-black italic text-sm uppercase tracking-tight underline decoration-white/10">Nuevas Strats</h4>
          <motion.ul animate={{ filter: revealed['strats'] ? "blur(0px)" : "blur(8px)", opacity: revealed['strats'] ? 1 : 0.3 }} className="text-zinc-500 text-[0.7rem] uppercase font-bold flex flex-col gap-1 transition-all duration-500">
            <li>• Hashtag #UNK</li>
            <li>• Comentarios pinneados</li>
            <li>• Posts / Engagementmaxxing</li>
          </motion.ul>
        </div>

        {/* FILA 3: INTERACTIVOS */}
        <div className="flex flex-col gap-3 cursor-pointer group" onClick={() => toggleReveal('reportajes')}>
          <h4 className="text-white font-black italic text-sm uppercase tracking-tight underline decoration-white/10">Reportajes</h4>
          <motion.div animate={{ filter: revealed['reportajes'] ? "blur(0px)" : "blur(8px)", opacity: revealed['reportajes'] ? 1 : 0.3 }} className="transition-all duration-500">
            <p className="text-zinc-600 text-[0.6rem] mb-1 italic">Noticias inventadas / High production</p>
            <ul className="text-zinc-400 text-[0.7rem] uppercase font-bold flex flex-col gap-1">
              <li>• Abecedario escolar</li>
              <li>• Sponsors de famosos</li>
              <li>• Subway Surfers 2 / Pase Islámico</li>
            </ul>
          </motion.div>
        </div>

        <div className="flex flex-col gap-3 cursor-pointer group" onClick={() => toggleReveal('slogan')}>
          <h4 className="text-white font-black italic text-sm uppercase tracking-tight underline decoration-white/10">Nuevo Slogan</h4>
          <motion.div animate={{ filter: revealed['slogan'] ? "blur(0px)" : "blur(8px)", opacity: revealed['slogan'] ? 1 : 0.3 }} className="bg-white/5 p-4 rounded-lg border border-white/10 transition-all duration-500">
            <p className="text-zinc-400 text-[0.6rem] font-black italic uppercase leading-tight tracking-tighter">
              Unkonventional, unkontrolled, unklassified... <span className="text-white">UNK</span>
            </p>
            <p className="text-zinc-600 text-[0.55rem] mt-2 italic">Our motivation remains unknown.</p>
            <p className="text-zinc-300 text-[0.55rem] font-bold mt-1 uppercase">La realidad es una mentira. Están pasando cosas.</p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-2 cursor-pointer group" onClick={() => toggleReveal('twitter')}>
          <h4 className="text-white font-black italic text-sm uppercase tracking-tight underline decoration-white/10">Twitter</h4>
          <motion.div animate={{ filter: revealed['twitter'] ? "blur(0px)" : "blur(8px)", opacity: revealed['twitter'] ? 1 : 0.3 }} className="transition-all duration-500">
            <div className="h-px w-full bg-white/10 mb-2" />
            <p className="text-zinc-600 text-[0.65rem] font-mono uppercase tracking-widest italic">Work in progress</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};