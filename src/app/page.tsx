"use client";

import { useState } from "react";
import { misReportajes, type Reportaje } from "../data";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { useInView, useSpring, useTransform } from "framer-motion";

const sectionEmojis: Record<string, string> = {
  TV: "📺",
  Records: "💿",
  Dev: "💻",
  Mag: "📖"
};

const sectionDescriptions: Record<string, string> = {
  Mag: "Crónicas, análisis y reportajes de investigación sobre la cultura contemporánea y la actualidad global.",
  TV: "Producciones audiovisuales, directos y formatos de entretenimiento diseñados para la nueva era digital.",
  Dev: "Software, experimentos técnicos y herramientas construidas para expandir los límites del ecosistema UNK.",
  Records: "El sello sonoro. Archivo de lanzamientos musicales, podcasts y paisajes acústicos bajo nuestra firma."
};

const categorias = ["TODOS", "Mag", "TV", "Dev", "Records"];

// --- COMPONENTES AUXILIARES ---

function NumberTicker({ value }: { value: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const spring = useSpring(0, { mass: 1, stiffness: 100, damping: 30 });
  const display = useTransform(spring, (current) => {
    const rounded = Math.round(current);
    return `+${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  });
  useEffect(() => { if (isInView) spring.set(value); }, [isInView, spring, value]);
  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function CatalogoPage() {
  const [filtro, setFiltro] = useState("TODOS");

  const reportajesFiltrados = [...misReportajes]
    .sort((a, b) => b.id - a.id)
    .filter((repo) => filtro === "TODOS" || repo.section.toLowerCase() === filtro.toLowerCase());

  return (
    <main className="min-h-screen bg-black text-white scroll-smooth selection:bg-emerald-500/30">
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* HEADER DEL ARCHIVO */}
          <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-black tracking-[0.2em] uppercase border border-emerald-500/20 rounded">
                  Live Archive
                </span>
                <Link href="/news" className="text-zinc-500 hover:text-white text-[10px] font-black tracking-[0.2em] uppercase transition-colors">
                  News
                </Link>
                <span className="text-zinc-800 text-[10px]">/</span>
                <Link href="/join" className="text-zinc-500 hover:text-white text-[10px] font-black tracking-[0.2em] uppercase transition-colors">
                  Info / Join →
                </Link>
              </div>
              <h1 className="text-7xl font-black tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent uppercase">
                Relatos
              </h1>
              <p className="text-zinc-500 text-xl font-light mt-2">En UNK somos dueños de nuestro propio relato.</p>
            </div>
          </header>

          {/* SELECTOR DE CATEGORÍAS */}
          <nav className="relative z-50 mb-8">
            <div className="bg-zinc-900/40 backdrop-blur-2xl border border-white/10 p-2 rounded-[28px] flex relative overflow-hidden">
              <motion.div
                className="absolute bg-white rounded-[20px]"
                animate={{ x: categorias.indexOf(filtro) * 100 + "%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ width: `${100 / categorias.length}%`, height: "calc(100% - 16px)", top: "8px", left: "0px", scale: 0.95 }}
              />
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFiltro(cat)}
                  className={`relative z-10 flex-1 py-4 flex items-center justify-center gap-3 transition-colors duration-500 ${filtro === cat ? "text-black" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  <span className="text-xl">{cat === "TODOS" ? "💎" : sectionEmojis[cat]}</span>
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase hidden sm:block">{cat}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* DESCRIPCIÓN DINÁMICA */}
          <div className="h-24 mb-12 overflow-hidden">
            <AnimatePresence mode="wait">
              {filtro !== "TODOS" && (
                <motion.div
                  key={filtro}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black tracking-widest uppercase text-emerald-500">Sección // {filtro}</span>
                    <div className="h-px flex-1 bg-emerald-500/20" />
                  </div>
                  <p className="text-zinc-400 text-lg max-w-2xl font-medium italic">
                    {sectionDescriptions[filtro]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* GRID DE CONTENIDO */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={filtro}
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {reportajesFiltrados.map((repo: Reportaje) => (
                <motion.div 
                  key={repo.id} 
                  layout
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="relative w-full aspect-[4/5] rounded-[32px] border border-white/10 overflow-hidden bg-zinc-900 group flex flex-col justify-between shadow-2xl hover:border-white/20 transition-all duration-700"
                >
                  <Link href={`/relato/${repo.id}`} className="absolute inset-0 z-30" />
                  
                  {/* Badge de Categoría */}
                  <div className="absolute top-0 left-0 w-16 h-16 z-40 bg-white/10 backdrop-blur-md flex items-start justify-start p-2.5 pointer-events-none" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}>
                    <span className="text-xl -rotate-12 group-hover:rotate-0 transition-transform duration-500">{sectionEmojis[repo.section]}</span>
                  </div>

                  {/* Imagen y Gradient */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <img src={repo.imagenUrl} className="w-full h-full object-cover opacity-50 grayscale-[40%] group-hover:grayscale-0 group-hover:opacity-70 group-hover:scale-110 transition-all duration-1000" alt={repo.titulo} />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black group-hover:via-black/20 transition-all duration-700" />
                  </div>

                  {/* Información */}
                  <div className="relative z-10 p-8 pt-20 pointer-events-none">
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-emerald-400 transition-colors duration-500 leading-tight">{repo.titulo}</h2>
                    <p className="text-zinc-400 text-sm line-clamp-2 mb-6 font-medium group-hover:text-zinc-200 transition-all">{repo.resumen}</p>
                    
                    <div className="pt-6 border-t border-white/10">
                      {repo.layout === "stats" && repo.impacto && (
                        <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                          <div><span className="text-[8px] uppercase tracking-widest text-zinc-500 font-black block mb-1">Views</span><span className="text-lg font-mono font-bold text-emerald-400/80 group-hover:text-emerald-400"><NumberTicker value={repo.impacto.views} /></span></div>
                          <div><span className="text-[8px] uppercase tracking-widest text-zinc-500 font-black block mb-1">Likes</span><span className="text-lg font-mono font-bold text-red-400/80 group-hover:text-red-400"><NumberTicker value={repo.impacto.likes} /></span></div>
                          <div><span className="text-[8px] uppercase tracking-widest text-zinc-500 font-black block mb-1">Comments</span><span className="text-lg font-mono font-bold text-blue-400/80 group-hover:text-blue-400"><NumberTicker value={repo.impacto.comments} /></span></div>
                          <div><span className="text-[8px] uppercase tracking-widest text-zinc-500 font-black block mb-1">Shares</span><span className="text-lg font-mono font-bold text-amber-400/80 group-hover:text-amber-400"><NumberTicker value={repo.impacto.shares} /></span></div>
                        </div>
                      )}
                      {repo.layout === "frase" && (
                        <p className="text-lg font-serif italic text-emerald-100/70 group-hover:text-emerald-100 transition-colors py-2 leading-snug">"{repo.cita}"</p>
                      )}
                    </div>
                  </div>

                  {/* Avatares de Firmantes */}
                  <div className="relative z-50 px-8 pb-8 flex justify-end">
                    <div className="flex -space-x-3 group-hover:space-x-1 transition-all duration-500">
                      {repo.signed.map((persona, i) => (
                        <Link key={`${persona.id}-${i}`} href={`/perfil/${persona.id}`} className="relative group/avatar block pointer-events-auto">
                          <div className="w-11 h-11 rounded-full border-2 border-white/20 overflow-hidden ring-4 ring-black bg-zinc-800 shadow-2xl transition-all group-hover/avatar:scale-110 group-hover/avatar:border-white">
                            <img src={persona.avatar} alt={persona.nombre} className="w-full h-full object-cover" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}