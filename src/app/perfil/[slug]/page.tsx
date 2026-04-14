"use client";

import { useParams } from "next/navigation";
import { misReportajes } from "../../data"; 
import Link from "next/link";
import { motion, Variants } from "framer-motion"; // <-- Importamos Variants

const sectionEmojis: Record<string, string> = {
  TV: "📺",
  Records: "💿",
  Dev: "💻",
  Mag: "📖"
};

// 1. Añadimos el tipo : Variants para que TypeScript no se queje en Vercel
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function PerfilPage() {
  const params = useParams();
  // Forzamos que el slug sea un string para evitar errores de tipo
  const slug = (params?.id || params?.slug) as string;

  const todosLosFirmantes = misReportajes.flatMap(r => r.signed);
  const persona = todosLosFirmantes.find(p => p.id === slug);

  const reportajesDelCreador = misReportajes
    .filter(repo => repo.signed.some(s => s.id === slug))
    .sort((a, b) => Number(b.id) - Number(a.id));

  if (!persona) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono uppercase">
        Creador no encontrado
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="relative h-[40vh] flex items-end pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-black z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center md:items-end gap-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-40 h-40 rounded-full border-4 border-white/10 shadow-2xl overflow-hidden ring-8 ring-black/50"
          >
            <img src={persona.avatar} alt={persona.nombre} className="w-full h-full object-cover" />
          </motion.div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-6xl font-black tracking-tighter uppercase">{persona.nombre}</h1>
            <p className="text-zinc-500 mt-2 font-mono text-sm tracking-widest">PERFIL OFICIAL UNK</p>
          </div>

          <Link 
            href="/#relatos" 
            className="mb-2 px-6 py-2 rounded-full border border-white/20 text-xs font-bold uppercase hover:bg-white hover:text-black transition-all"
          >
            Volver
          </Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {reportajesDelCreador.map((repo) => (
            <motion.div key={repo.id} variants={itemVariants}>
              <Link 
                href={`/relato/${repo.id}`} 
                className="group relative block aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10 bg-zinc-900 shadow-xl transition-all duration-500 hover:border-white/20"
              >
                <img 
                  src={repo.imagenUrl} 
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" 
                  alt={repo.titulo}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4 text-xl bg-black/20 backdrop-blur-sm p-2 rounded-lg z-10">
                  {sectionEmojis[repo.section]}
                </div>

                <div className="absolute bottom-8 left-8 right-8 z-10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">
                    {repo.section}
                  </p>
                  <h3 className="text-xl font-bold leading-tight group-hover:text-blue-300 transition-colors">
                    {repo.titulo}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}