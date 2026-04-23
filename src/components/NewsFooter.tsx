"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

type Developer = {
  name: string;
  url: string;
  description?: string;
};

const Redacted = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-[#0E0509] text-[#0E0509] select-none mx-0.5 px-0.5 rounded-none">
    {children}
  </span>
);

const DEVELOPERS: Developer[] = [
  { 
    name: "KURTO", 
    url: "https://instagram.com/kurtogath",
    description: "Sujeto identificado como KURTO. Operador especializado en [REDACTED] y despliegue de interfaces neuronales. Se sospecha vinculación directa con el protocolo [REDACTED]. Nivel de riesgo: MEDIO."
  },
  { 
    name: "DARIO", 
    url: "https://instagram.com/darioxgd",
    description: "DARIO: Analista sénior de la red UNK. Responsable de la integridad de [REDACTED] durante el incidente [REDACTED]. Ha demostrado capacidades avanzadas en [REDACTED]. Vigilancia 24/7 recomendada."
  },
  { 
    name: "TRESILLO", 
    url: "https://instagram.com/tresilllo",
    description: "Activo clasificado como TRESILLO. Experto en [REDACTED] con acceso a niveles de seguridad [REDACTED]. Se cree que interceptó el informe [REDACTED] antes de su eliminación física. Su paradero es [REDACTED] y se le considera altamente peligroso."
  }
];

export default function NewsFooter() {
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null);

  return (
    <>
      <footer className="w-full max-w-7xl mx-auto px-6 mt-16 mb-8 pt-0 border-t border-black/5 flex justify-start items-start font-mono">
        {/* Left: Credits */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-16 pt-4 text-left">
          <p className="text-zinc-600 text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase whitespace-nowrap">
            © 2026 UNK EDITION
          </p>
          <div className="flex gap-6 md:gap-12">
            {DEVELOPERS.map(dev => (
              <button 
                key={dev.name} 
                onClick={() => setSelectedDev(dev)}
                className="text-zinc-400 text-[11px] sm:text-[12px] font-black tracking-[0.3em] uppercase transition-colors hover:text-black whitespace-nowrap outline-none"
              >
                {dev.name}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* Report Bottom Sheet */}
      <AnimatePresence>
        {selectedDev && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDev(null)}
              className="fixed inset-0 z-[999] bg-black/20 backdrop-blur-[2px]"
            />
            
            {/* Bottom Drawer */}
            <motion.div
              initial={{ y: "100%", x: "-50%" }}
              animate={{ 
                y: [ "100%", "70%", "72%", "40%", "42%", "10%", "12%", "0%" ],
                rotate: [0, -0.5, 0.5, -0.3, 0.3, 0],
              }}
              exit={{ 
                y: "100%",
                transition: { duration: 0.4, ease: "circIn" }
              }}
              transition={{ 
                y: { 
                  duration: 1.2, 
                  times: [0, 0.25, 0.3, 0.55, 0.6, 0.85, 0.9, 1],
                  ease: "easeInOut" 
                },
                rotate: { duration: 1.2, ease: "linear" }
              }}
              className="fixed bottom-0 left-1/2 w-full max-w-4xl z-[1000] bg-[#f5f2eb] shadow-[0_-20px_60px_rgba(0,0,0,0.15)] rounded-t-3xl overflow-hidden flex flex-col border-t border-x border-black/10 max-h-[80vh] selection:bg-black/10"
            >
              <div className="flex-1 overflow-y-auto overflow-x-hidden px-8 md:px-10 py-12">
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.15,
                        delayChildren: 0.2
                      }
                    }
                  }}
                  className="flex justify-between items-start mb-8"
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-[#0E0509] leading-none mb-4">
                      {selectedDev.name}
                    </h2>
                  </motion.div>
                  <motion.button 
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 }
                    }}
                    onClick={() => setSelectedDev(null)}
                    className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center active:scale-90 transition-all flex-shrink-0"
                  >
                    <X className="w-4 h-4 text-[#0E0509]" />
                  </motion.button>
                </motion.div>

                {/* Content Area */}
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.2,
                        delayChildren: 0.5
                      }
                    }
                  }}
                  className="space-y-8"
                >
                  {/* Redacted Description Area */}
                  {selectedDev.description && (
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="border-y border-black/10 py-10 my-4"
                    >
                      <p className="text-base font-mono text-[#0E0509] leading-[1.8] uppercase text-justify">
                        {selectedDev.description.split(/(\[REDACTED\])/).map((part, i) => 
                          part === "[REDACTED]" ? <Redacted key={i}>ELIMINADO</Redacted> : part
                        )}
                      </p>
                    </motion.div>
                  )}

                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="p-8 rounded-[20px] bg-black/5 flex flex-col gap-6 relative overflow-hidden ring-1 ring-black/5"
                  >
                     <div className="relative z-10">
                       <p className="text-xs font-mono text-zinc-600 leading-relaxed uppercase mb-4">
                         STATUS: RESTRINGIDO<br/>
                         ÚLTIMA CONEXIÓN: DESCONOCIDA<br/>
                         UBICACIÓN: ENCRIPTADA
                       </p>
                       
                       <a 
                         href={selectedDev.url} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="group flex items-center justify-between w-full p-4 rounded-xl bg-white border border-black/10 shadow-sm hover:shadow-md transition-all active:scale-95 outline-none"
                       >
                         <span className="text-[#0E0509] text-[11px] font-black tracking-widest uppercase">
                           ACCEDER A LA RED (INSTAGRAM)
                         </span>
                         <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-colors">
                           <ArrowUpRight className="w-4 h-4 text-[#0E0509]" />
                         </div>
                       </a>
                     </div>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 0.4 }
                    }}
                    className="flex justify-center"
                  >
                    <p className="text-[8px] font-mono tracking-[0.4em] uppercase text-zinc-400">
                      --- TERMINAL DATA TRANSMISSION ---
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
