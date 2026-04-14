"use client";

import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

export const Proyecto3 = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 p-8 md:p-20 font-sans">
      {/* HEADER ESTRATÉGICO */}
      <div className="max-w-7xl mx-auto mb-20 border-l-4 border-yellow-500 pl-8">
        <p className="text-yellow-500 font-mono text-xs tracking-[0.3em] uppercase mb-2">Internal Project: 003</p>
        <h1 className="text-6xl md:text-8xl font-black italic text-white tracking-tighter uppercase leading-none">
          UNK <span className="text-zinc-800">CORRALITO</span>
        </h1>
        <p className="text-zinc-500 mt-4 max-w-2xl text-sm uppercase font-bold italic tracking-wide">
          Ecosistema autónomo de gansos disfuncionales, micro-transacciones estéticas y experimentos sociológicos masivos.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* BLOQUE 1: EL NÚCLEO */}
        <motion.div variants={cardVariants} className="md:col-span-2 bg-zinc-900/50 p-8 border border-white/5 rounded-3xl">
          <h2 className="text-white font-black italic text-2xl mb-6 uppercase">01. El Organismo (The Goose)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed">
                Cada usuario posee un ganso/pollito único con <span className="text-white italic">ID personalizado</span> y certificado de apoyo. No es solo un avatar; es una entidad que "hace vida" en la web mientras el usuario ignora la realidad.
              </p>
              <ul className="text-xs space-y-2 font-mono text-zinc-500">
                <li>• STATS EVOLUTIVAS (FUERZA, DAÑO, STAMINA)</li>
                <li>• SISTEMA DE MUERTE / REAPARICIÓN (/KILL)</li>
                <li>• MOMENTUM Y MAGNETISMO DE GRUPO</li>
              </ul>
            </div>
            <div className="bg-black/40 p-6 rounded-2xl border border-white/5 flex flex-col justify-center">
              <p className="text-[0.6rem] text-zinc-600 mb-2 tracking-widest uppercase italic">Vista Previa:</p>
              <div className="text-center py-10 border-2 border-dashed border-zinc-800 rounded-xl">
                <span className="text-4xl">🪿</span>
                <p className="text-[0.5rem] mt-4 text-zinc-700 tracking-tighter">ESTADO: RETRASADO / BUSCANDO GRUPO</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BLOQUE 2: MONETIZACIÓN & LOOT */}
        <motion.div variants={cardVariants} className="bg-zinc-900/50 p-8 border border-white/5 rounded-3xl flex flex-col justify-between">
          <div>
            <h2 className="text-white font-black italic text-2xl mb-4 uppercase text-red-500">Financiación</h2>
            <p className="text-xs leading-relaxed text-zinc-400 italic">
              "Inspirado en el sistema de píxeles y el Enclose Horse. Sin apps. Web-app pura."
            </p>
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-[0.6rem] uppercase">Lootboxes (10x)</span>
              <span className="text-xs font-mono text-white">6.00€</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-[0.6rem] uppercase">Boosts Temporales (x2)</span>
              <span className="text-xs font-mono text-white">UNK COINS</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-[0.6rem] uppercase">Flag placement</span>
              <span className="text-xs font-mono text-white">PAID</span>
            </div>
          </div>
        </motion.div>

        {/* BLOQUE 3: EL CORRALITO (WORLD) */}
        <motion.div variants={cardVariants} className="bg-zinc-900/50 p-8 border border-white/5 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl italic font-black">ANIMAL CROSSING VIEW</div>
          <h2 className="text-white font-black italic text-2xl mb-4 uppercase">02. El Corral</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Un mapa dinámico que crece con la población. Toggle "Aesthetic" para seguir al ganso mientras da botes.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-black/40 rounded-xl border border-white/5">
              <p className="text-[0.5rem] font-bold text-zinc-600 uppercase">Eventos Semanales</p>
              <p className="text-[0.6rem] text-zinc-400">Noticias locas / Atentados / Alianzas</p>
            </div>
            <div className="p-4 bg-black/40 rounded-xl border border-white/5">
              <p className="text-[0.5rem] font-bold text-zinc-600 uppercase">Easter Eggs</p>
              <p className="text-[0.6rem] text-zinc-400">Famosos sueltos / Logros ocultos</p>
            </div>
          </div>
        </motion.div>

        {/* BLOQUE 4: NARRATIVA & AI SLOP */}
        <motion.div variants={cardVariants} className="md:col-span-2 bg-white text-black p-8 rounded-3xl flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <h2 className="font-black italic text-3xl mb-4 uppercase leading-none">Revolución en la Granja <br/><span className="text-zinc-400">AI SLOP CAMUFLADO</span></h2>
            <p className="text-xs font-bold leading-relaxed uppercase">
              Contratación de relatores para narrar el caos. Generación de 2-3 shorts diarios de gansos bizcos hablando de sociología profunda y política. El video es el cebo; el corral es la trampa.
            </p>
          </div>
          <div className="flex-1 space-y-4">
            <div className="bg-black text-white p-4 rounded-xl flex items-center justify-between">
              <span className="text-[0.6rem] font-black uppercase tracking-tighter italic">Relatores de sector</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <p className="text-[0.6rem] font-mono leading-tight">
              PROYECTO: SENADORA CARROT CAKE INTERFACE.<br/>
              ESTADO: RETROALIMENTACIÓN ACTIVADA.<br/>
              META: CAOS ORGANIZADO EXTRACURRICULAR.
            </p>
          </div>
        </motion.div>

        {/* BLOQUE 5: CHANGELOG & WIDGET */}
        <motion.div variants={cardVariants} className="bg-zinc-900/50 p-8 border border-white/5 rounded-3xl border-t-yellow-500/50">
          <h2 className="text-white font-black italic text-xl mb-4 uppercase">Widget & Widget</h2>
          <p className="text-xs text-zinc-500 mb-6 uppercase font-bold italic">
            "Desktop Defender style. Un pollito en la esquina de tu pantalla 24/7."
          </p>
          <div className="space-y-4">
            <div className="h-10 w-full bg-zinc-800 rounded-lg flex items-center px-4 overflow-hidden relative">
              <motion.div 
                animate={{ x: [-100, 300] }} 
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="text-[0.5rem] font-mono text-white whitespace-nowrap"
              >
                [NEW EVENT] EL CORRAL SE AMPLÍA +20% // NUEVAS SKINS DISPONIBLES // [NEW EVENT]
              </motion.div>
            </div>
            <p className="text-[0.5rem] text-zinc-600 uppercase">Changelog para el público general: Limpio, aesthetic y claro.</p>
          </div>
        </motion.div>
      </motion.div>

      {/* FOOTER CONFIDENCIAL */}
      <div className="max-w-7xl mx-auto mt-20 flex justify-between items-end border-t border-white/10 pt-10">
        <div>
          <p className="text-[0.5rem] font-mono text-zinc-700 uppercase leading-tight">
            Login: Simple Key Access<br/>
            Support: Optional Email<br/>
            Dev: UnkEdition Infrastructure
          </p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-black italic text-zinc-800 uppercase tracking-tighter">UNKKORRALITO</p>
        </div>
      </div>
    </div>
  );
};