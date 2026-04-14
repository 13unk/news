"use client";

import { misReportajes } from "@/app/data";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";

export default function PaginaRelato({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  // Buscamos el relato. Convertimos el ID de la URL (string) a número
  const relato = misReportajes.find((r) => r.id === Number(resolvedParams.id));

  if (!relato) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO SECTION */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.2 }}
          src={relato.imagenUrl} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        {/* BOTÓN VOLVER (Estilo Perfil Page) */}
        <div className="absolute top-10 right-8 z-50">
          <Link 
            href="/#relatos" 
            className="px-6 py-2 rounded-full border border-white/20 text-xs font-bold uppercase hover:bg-white hover:text-black transition-all backdrop-blur-md"
          >
            Volver
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 z-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-5xl"
          >
            <span className="px-4 py-1 rounded-full bg-blue-500/20 text-[10px] font-black uppercase tracking-widest mb-6 inline-block border border-blue-400/20 text-blue-200">
              {relato.section}
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9] uppercase">
              {relato.titulo}
            </h1>
            <p className="text-zinc-400 text-xl md:text-2xl font-light max-w-3xl">
              {relato.resumen}
            </p>
          </motion.div>
        </div>
      </div>

      {/* CUERPO DEL RELATO */}
      <section className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          {relato.cita && (
            <p className="text-3xl md:text-5xl font-serif italic text-blue-400/90 mb-12 leading-tight">
              "{relato.cita}"
            </p>
          )}
          <div className="prose prose-invert prose-xl text-zinc-400 font-light">
             <p className="mb-8 leading-relaxed">
               Este es el espacio destinado al desarrollo completo del relato de UNK. 
               Aquí es donde la narrativa toma forma y se profundiza en la historia 
               detrás de <strong>{relato.titulo}</strong>.
             </p>
             <p className="leading-relaxed">
               Diseñado para una lectura inmersiva, eliminando distracciones y 
               centrándose en lo que realmente importa: el contenido y el legado.
             </p>
          </div>
        </div>

        {/* SIDEBAR: INFO Y FIRMAS */}
        <div className="space-y-8">
          <div className="p-8 rounded-[32px] border border-white/10 bg-zinc-900/30 backdrop-blur-sm sticky top-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-8 text-center">Créditos del Relato</h3>
            <div className="flex flex-col gap-4">
              {relato.signed.map((persona) => (
                <Link 
                  key={persona.id} 
                  href={`/perfil/${persona.id}`}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 group-hover:border-white transition-all ring-2 ring-transparent group-hover:ring-white/10">
                    <img src={persona.avatar} className="w-full h-full object-cover" alt={persona.nombre} />
                  </div>
                  <div>
                    <p className="font-bold text-sm group-hover:text-blue-400 transition-colors">{persona.nombre}</p>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-tighter">Ver Perfil</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* IMPACTO COMPLETO */}
            {relato.impacto && (
              <div className="mt-10 pt-8 border-t border-white/10">
                <div className="grid grid-cols-2 gap-y-8 gap-x-4 text-center">
                  <div>
                    <p className="text-[9px] text-zinc-500 uppercase font-black mb-1 tracking-widest">Views</p>
                    <p className="text-xl font-mono text-blue-400">{(relato.impacto.views / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-zinc-500 uppercase font-black mb-1 tracking-widest">Likes</p>
                    <p className="text-xl font-mono text-red-400">{relato.impacto.likes.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-zinc-500 uppercase font-black mb-1 tracking-widest">Comments</p>
                    <p className="text-xl font-mono text-emerald-400">{relato.impacto.comments.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-zinc-500 uppercase font-black mb-1 tracking-widest">Shares</p>
                    <p className="text-xl font-mono text-amber-400">{relato.impacto.shares.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}