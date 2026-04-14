"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";

const glyphs = "ABCDEFGHIKLMNOPQRSTVXYZ0123456789<>[]{}/\\?!#%&";

// --- COMPONENTE TYPEWRITER ---
function TypewriterEffect({ words, onComplete }: { words: string[], onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isFinished) return;
    if (index === words.length - 1 && subIndex === words[index].length && !reverse) {
      setTimeout(() => { setIsFinished(true); onComplete(); }, 500);
      return;
    }
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2500); 
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1));
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 20 : 50);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, isFinished, onComplete]);

  return (
    <span className={`font-light tracking-[0.2em] uppercase italic whitespace-nowrap transition-colors duration-1000 ${isFinished ? "text-zinc-500" : "text-purple-500"}`}>
      {`${words[index].substring(0, subIndex)}`}
      {!isFinished && (
        <span className="animate-pulse ml-1 text-white inline-block w-[2px] h-[0.8em] bg-white align-middle not-italic" />
      )}
    </span>
  );
}

// --- OTROS COMPONENTES ---
function MatrixText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isDeciphered, setIsDeciphered] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.4 });

  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => text.split("").map((char, index) => {
        if (index < iteration) return text[index];
        if (char === " ") return " ";
        return glyphs[Math.floor(Math.random() * glyphs.length)];
      }).join(""));
      if (iteration >= text.length) { clearInterval(interval); setIsDeciphered(true); }
      iteration += 0.8;
    }, 20);
    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => { if (isInView) { setIsDeciphered(false); const stopScramble = scramble(); return () => stopScramble(); } }, [isInView, scramble]);

  return (
    <div ref={containerRef} className="flex flex-col items-center min-h-[2.5em] justify-center pointer-events-none">
      <motion.h2 className={`font-mono text-4xl md:text-5xl tracking-[0.6em] uppercase text-center max-w-4xl px-6 transition-colors duration-700 leading-tight font-black ${isDeciphered ? "text-white" : "text-purple-500"}`}>{displayText}</motion.h2>
      <motion.div initial={{ width: 0 }} animate={isInView ? { width: "100px" } : { width: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="h-[1px] bg-white/30 mt-8" />
    </div>
  );
}

function Slide({ children, gradient, className = "" }: { children: React.ReactNode; gradient: string; className?: string }) {
  return (
    <section className={`h-screen w-full flex items-center justify-center snap-start snap-always relative overflow-hidden bg-black border-b border-white/5 ${className}`}>
      <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px]" />
      <div className={`absolute inset-0 opacity-10 ${gradient}`} />
      <div className="relative z-10 w-full h-full flex items-center justify-center">{children}</div>
    </section>
  );
}

// --- COMPONENTE DE HOJA CENSURADA ---
function CensoredSheet({ title, rotation, className }: { title: string; rotation: number; className: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: rotation, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotation, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute bg-white text-black p-6 md:p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden w-[280px] h-[380px] md:w-[380px] md:h-[520px] rounded-sm ${className}`}
    >
      <h3 className="text-sm md:text-lg font-black uppercase tracking-widest mb-4 text-zinc-900 border-b border-zinc-200 pb-2">{title}</h3>
      <div className="mb-6 brightness-0">
        <img src="https://i.postimg.cc/RCYTfhSN/logo-unk.png" alt="UNK" className="h-6 md:h-8 object-contain" />
      </div>
      <div className="flex flex-col gap-3">
        {[...Array(14)].map((_, i) => (
          <div key={i} className="h-2 bg-zinc-200 rounded" style={{ width: `${Math.random() * 50 + 50}%` }} />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
    </motion.div>
  );
}

export default function JoinPage() {
  const mainRef = useRef<HTMLElement>(null);
  const isScrolling = useRef(false);
  const [showArrow, setShowArrow] = useState(false);

  const frases = ["el nuevo paradigma", "el nuevo sello de calidad", "destacar entre la multitud", "tu nueva mentalidad"];

  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;
    const handleWheel = (e: WheelEvent) => {
      const slideHeight = window.innerHeight;
      const currentScroll = container.scrollTop;
      if (isScrolling.current) return;
      e.preventDefault();
      isScrolling.current = true;
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.round(currentScroll / slideHeight) + direction;
      container.scrollTo({ top: nextIndex * slideHeight, behavior: "smooth" });
      setTimeout(() => { isScrolling.current = false; }, 800);
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <main ref={mainRef} className="h-screen overflow-y-auto snap-y snap-mandatory bg-black text-white scroll-smooth outline-none">
      {/* SLIDE 1: INTRO */}
      <Slide gradient="bg-purple-500/5">
        <div className="relative z-10 max-w-[95%] mx-auto w-full px-6 md:px-12 flex flex-row items-center justify-start flex-nowrap gap-x-8 md:gap-x-12">
            <motion.img 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              src="https://i.postimg.cc/RCYTfhSN/logo-unk.png" 
              alt="UNK" 
              className="h-[2.5em] md:h-[4em] w-auto object-contain brightness-200 shrink-0" 
            />
            <h2 className="text-2xl md:text-6xl font-light tracking-[0.2em] uppercase flex items-center gap-6 md:gap-10">
              <span className="text-zinc-500 shrink-0">es</span>
              <div className="text-left overflow-visible">
                <TypewriterEffect words={frases} onComplete={() => setShowArrow(true)} />
              </div>
            </h2>
        </div>

        <AnimatePresence>
          {showArrow && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-[10vh] left-0 right-0 flex justify-center pointer-events-none z-50">
              <motion.svg width="50" height="50" viewBox="0 0 24 24" fill="none" animate={{ opacity: [0.3, 1, 0.3], y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                <path d="M12 21L24 5H0L12 21Z" fill="#3f3f46" />
              </motion.svg>
            </motion.div>
          )}
        </AnimatePresence>
      </Slide>

      {/* SLIDE 2: DOGMA + HOJAS EN / \ */}
      <Slide gradient="bg-zinc-500/10">
        <div className="relative w-full h-full flex items-center justify-center px-4 overflow-hidden">
          
          {/* Hoja Izquierda - Guía de Estilo inclinada hacia adentro (/) */}
          <CensoredSheet 
            title="GUÍA DE ESTILO" 
            rotation={12} 
            className="-left-24 md:-left-20 top-[15%]" 
          />

          {/* Texto Central */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="z-30 text-center px-6"
          >
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-[0.3em] mb-6 leading-tight">
              Establecemos un dogma.
            </h2>
            <p className="text-zinc-500 text-lg md:text-2xl font-light tracking-[0.15em] uppercase italic">
              Todas las visiones concurren en una.
            </p>
          </motion.div>

          {/* Hoja Derecha - Manifesto inclinada hacia adentro (\) */}
          <CensoredSheet 
            title="MANIFESTO" 
            rotation={-12} 
            className="-right-24 md:-right-20 top-[15%]" 
          />
        </div>
      </Slide>
      
      <Slide gradient="bg-zinc-500/10"><MatrixText text="EJECUTAR" /></Slide>
      
      <Slide gradient="bg-purple-500/5">
        <div className="flex flex-col items-center gap-16">
            <MatrixText text="RELATAR" />
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <Link href="/" className="px-10 py-4 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] hover:bg-purple-600 hover:text-white transition-all duration-300 rounded-full">
                    Entrar al Archivo
                </Link>
            </motion.div>
        </div>
      </Slide>
    </main>
  );
}