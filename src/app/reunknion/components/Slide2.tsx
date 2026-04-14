"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Importaciones relativas
import { AlphaContent } from "./AlphaContent";
import { BetaContent } from "./BetaContent";
import { V10Content } from "./V10Content";
import { V11Content } from "./V11Content";
import { V12Content } from "./V12Content";
import { V13Content } from "./V13Content";
import { V14Content } from "./V14Content";
import { V20Content } from "./V20Content";

// 1. Definición de interfaz para evitar errores de 'any'
interface VersionDetail {
  header: string;
  title: React.ReactNode;
  sub: string;
  content: React.ReactNode;
}

interface Version {
  date: string;
  name: string;
  details: VersionDetail;
  hasBreak?: boolean;
  isFullWidth?: boolean;
}

interface Slide2Props {
  activeVersion: Version | null;
  setActiveVersion: (version: Version | null) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export const Slide2 = ({ activeVersion, setActiveVersion, scrollContainerRef }: Slide2Props) => {
  
  const versions: Version[] = [
    { date: "07/11/25", name: "Alpha", details: { header: "@UNK ALPHA", title: "PROYECTO LUX", sub: "07/11/25", content: <AlphaContent /> } },
    { date: "29/11/25", name: "Beta", hasBreak: true, details: { header: "@UNK BETA", title: "GAME NIGHT 6", sub: "29/11/25", content: <BetaContent /> } },
    { date: "25/12/25", name: "1.0", details: { header: "@UNK 1.0", title: "OFFICIAL RELEASE", sub: "25/12/25", content: <V10Content /> } },
    { date: "29/12/25", name: "1.1", details: { header: "@UNK 1.1", title: "REPORTAJE", sub: "29/12/25", content: <V11Content /> } },
    { date: "01/01/26", name: "1.2", details: { header: "@UNK 1.2", title: "UNK NEWS", sub: "01/01/26", content: <V12Content /> } },
    { 
      date: "05/01/26", 
      name: "1.3", 
      details: { 
        header: "@UNK 1.3", 
        title: (
          <span className="flex items-center gap-4">
            <img src="https://i.postimg.cc/9fhBQfxb/yt.png" className="w-8 h-8 md:w-10 md:h-10 object-contain" alt="YT" />
            <span className="text-[#FF0000]">YOUTUBE UPDATE</span>
          </span>
        ), 
        sub: "05/01/26", 
        content: <V13Content /> 
      } 
    },
    { 
      date: "16/01/26", 
      name: "1.4", 
      hasBreak: true, // He movido el break aquí para separar las actualizaciones de redes del Rebranding final
      details: { 
        header: "@UNK 1.4", 
        title: (
          <span className="flex items-center gap-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <span className="text-[#1877F2]">FACEBOOK UPDATE</span>
          </span>
        ), 
        sub: "16/01/26", 
        content: <V14Content /> 
      } 
    },
    { date: "01/02/26", name: "2.0", isFullWidth: true, details: { header: "@UNK 2.0", title: "REBRANDING", sub: "01/02/26", content: <V20Content /> } },
  ];

  return (
    <div className="h-full w-full flex items-center justify-center p-12 relative overflow-hidden bg-[#16161d]">
      <motion.div 
        animate={{ 
          x: activeVersion ? (activeVersion.isFullWidth ? "-100%" : "-42%") : "0%", 
          opacity: activeVersion?.isFullWidth ? 0 : 1 
        }}
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        className="text-center w-full max-w-7xl flex flex-col items-center z-20"
      >
        <div className="flex flex-col items-center mb-8 shrink-0">
          <img src="https://i.postimg.cc/RCYTfhSN/logo-unk.png" className="w-12 h-auto opacity-30 grayscale mb-4" alt="logo" />
          <p className="text-zinc-500 text-[0.5rem] font-black tracking-[0.6em] uppercase">UNK EDITION</p>
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-12 italic text-white">REDES SOCIALES</h2>

        <div className="flex flex-col items-center border-t border-white/5 pt-10 w-full max-w-sm">
          {versions.map((v) => (
            <React.Fragment key={v.name}>
              <motion.button 
                onClick={() => setActiveVersion(v)} 
                whileHover={{ x: 20, scale: 1.1 }}
                className={`group relative flex items-center w-full px-8 py-3 text-[0.7rem] tracking-[0.2em] uppercase mb-1 transition-colors ${activeVersion?.name === v.name ? "text-white" : "text-zinc-500 hover:text-white"}`}
              >
                <div className={`absolute inset-0 z-0 rounded-sm transition-opacity ${activeVersion?.name === v.name ? "opacity-100 bg-white/[0.08]" : "opacity-0 group-hover:opacity-100 bg-white/[0.03]"}`} />
                <span className="relative z-10 tabular-nums font-bold flex items-center gap-2">
                   {v.date} <span className="opacity-20">@</span>UNK {v.name}
                </span>
              </motion.button>
              {v.hasBreak && <div className="py-4 opacity-10 text-zinc-500 tracking-[1.5em] text-[0.6rem] font-bold pl-[1.5em]">...</div>}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {activeVersion && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0, width: activeVersion.isFullWidth ? "100%" : "60%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            className="absolute right-0 h-full bg-[#1c1c24]/95 backdrop-blur-3xl border-l border-white/5 p-12 md:p-24 flex flex-col z-50 shadow-2xl"
          >
            <div className="max-w-5xl mx-auto w-full h-full flex flex-col overflow-hidden text-white">
              <div className="flex flex-col shrink-0 mb-8">
                <p className="text-zinc-500 text-[0.6rem] font-black tracking-[0.5em] mb-1 uppercase">{activeVersion.details.header}</p>
                <div className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">{activeVersion.details.title}</div>
                <h4 className="text-zinc-400 text-lg font-bold mt-2 uppercase tracking-[0.3em]">{activeVersion.details.sub}</h4>
              </div>
              
              <div 
                ref={scrollContainerRef} 
                className="mask-fade overflow-y-auto no-scrollbar h-full pt-4 scroll-smooth"
              >
                {activeVersion.details.content}
                <div className="h-[20vh] shrink-0" />
              </div>
            </div>
            
            <motion.button 
              onClick={() => setActiveVersion(null)} 
              whileHover={{ rotate: 90 }} 
              className="absolute top-16 right-16 p-4 text-zinc-500 hover:text-white transition-colors z-[60]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};