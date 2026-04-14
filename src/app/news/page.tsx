"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, Clock, Share2, Bookmark, ChevronLeft, ChevronRight, X } from "lucide-react";

import newsData from "../../data/news.json";

const newsItems = newsData;

const CATEGORY_GROUPS = [
  { id: "MUNDOS", categories: ["POLÍTICA", "SOCIEDAD"], img: "https://i.postimg.cc/xT0RQDzx/circus5.png", label: "TELÉFONO ROJO" },
  { id: "ESTADIO", categories: ["FÚTBOL", "DEPORTE"], img: "https://i.postimg.cc/bNzTPctM/circus4.png", label: "FURBO" },
  { id: "TODO", categories: [], img: "https://i.postimg.cc/nc01cR42/circus1.png", label: "TODO" },
  { id: "SONIDO", categories: ["MÚSICA"], img: "https://i.postimg.cc/qMjGMbsj/circus2.png", label: "SONIDO" },
  { id: "FARÁNDULA", categories: ["GOSSIP", "INFLUENCERS"], img: "https://i.postimg.cc/rF8JTXrh/circus6.png", label: "FARÁNDULA" }
];

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/<b>|<\/b>/g, '') // Remove bold tags
    .normalize('NFD') // Normalize to handle accents
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-'); // Remove consecutive -
};

export const formatDateForUrl = (dateStr: string) => {
  const months: { [key: string]: string } = {
    'ENE': '01', 'FEB': '02', 'MAR': '03', 'ABR': '04',
    'MAY': '05', 'JUN': '06', 'JUL': '07', 'AGO': '08',
    'SEP': '09', 'OCT': '10', 'NOV': '11', 'DIC': '12'
  };
  const [day, mon, year] = dateStr.split(' ');
  return `${year}-${months[mon]}-${day}`;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  },
  exit: { 
    opacity: 0, 
    transition: { duration: 0.15 }
  }
};

export const formatViews = (views: number) => {
  if (!views) return "";
  if (views >= 1000000) {
    const val = views / 1000000;
    return val.toFixed(1).replace('.', ',').replace(',0', '') + 'M';
  }
  if (views >= 1000) {
    const val = Math.floor(views / 1000);
    return val + 'K';
  }
  return views.toString();
};

const renderTitle = (title: string) => {
  const regex = /(<b>.*?<\/b>|\n)/g;
  const parts = title.split(regex);
  
  return parts.map((part, i) => {
    if (part === '\n') return <br key={i} />;
    if (part.startsWith('<b>') && part.endsWith('</b>')) {
      const content = part.substring(3, part.length - 4);
      return <span key={i} className="text-[#9B5DE0]">{content}</span>;
    }
    return part;
  });
};

function NavButton({ label }: { label: string }) {
  return (
    <div className="h-[44px] overflow-hidden flex items-end px-1">
      <motion.button
        initial="locked"
        whileHover="active"
        className="px-5 py-2 md:px-7 md:py-2.5 rounded-full carved flex items-center justify-center relative z-20 group/btn"
        variants={{
          locked: { y: 22, opacity: 0.2, filter: "grayscale(1)" },
          active: { y: 0, opacity: 1, filter: "grayscale(0)" }
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#1b1b1b] relative z-30 pointer-events-none">
          {label}
        </span>
        
        {/* Diagonal Slash - Centered */}
        <motion.div 
          variants={{
            locked: { opacity: 0.6, width: "60%" },
            active: { opacity: 0, width: "0%" }
          }}
          className="absolute top-[52%] left-[20%] h-[1.5px] bg-zinc-400 rotate-[-15deg] pointer-events-none z-40"
        />
      </motion.button>
    </div>
  );
}

export default function NewsPage() {
  const [selectedGroup, setSelectedGroup] = useState("TODO");

  const displayedNews = [...newsItems].reverse().filter(item => {
    if (selectedGroup === "TODO") return true;
    const group = CATEGORY_GROUPS.find(g => g.id === selectedGroup);
    return group?.categories.includes(item.category || "");
  });

  return (
    <main className="min-h-screen bg-[#fafafa] text-zinc-950 font-sans selection:bg-[#9B5DE0]/10 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* CATEGORY SELECTOR */}
        <section className="mb-12">
          <div className="flex items-center justify-between gap-2 md:gap-4 max-w-4xl mx-auto px-4">
            {CATEGORY_GROUPS.map((group) => {
              const isActive = selectedGroup === group.id;
              const isCenter = group.id === "TODO";
              
              return (
                <button
                  key={group.id}
                  onClick={() => setSelectedGroup(group.id)}
                  className={`relative transition-all duration-500 flex flex-col items-center gap-2 group/cat ${
                    isActive ? "scale-105" : "opacity-40 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <div className={`relative ${isCenter ? "w-24 h-24 md:w-32 md:h-32" : "w-16 h-16 md:w-24 md:h-24"} transition-all duration-500`}>
                    <img 
                      src={group.img} 
                      alt={group.label}
                      className={`w-full h-full object-contain ${isActive ? "drop-shadow-[0_0_20px_rgba(155,93,224,0.3)]" : "grayscale"}`}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-1.5 min-h-[20px]">
                    <div className={`px-4 py-1.5 rounded-xl text-[8px] md:text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-300 ${
                      isActive 
                        ? "bg-[#e4e4e7] text-black shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)]" 
                        : "text-zinc-500 hover:bg-[#f4f4f5] border border-transparent hover:border-black/5"
                    }`}>
                      {group.label}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ADVANCED FILTERS BUTTON */}
        <div className="max-w-7xl mx-auto px-4 flex justify-end mb-4 mt-12">
          <Link 
            href="/tag/todas"
            className="group flex items-center gap-3 px-8 py-3.5 rounded-full carved text-[10px] font-black tracking-[0.2em] uppercase text-zinc-500 hover:text-[#9B5DE0] transition-all hover:scale-105 active:scale-95 shadow-[8px_8px_16px_rgba(0,0,0,0.05),-8px_-8px_16px_#ffffff]"
          >
            FILTROS AVANZADOS »
          </Link>
        </div>

        {/* NEWS GRID */}
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedGroup}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pt-0"
            >
              {displayedNews.map((news) => {
                const group = CATEGORY_GROUPS.find(g => 
                  g.categories.includes(news.category || "")
                ) || CATEGORY_GROUPS[2];

                const articleUrl = news.slug && news.dateUrl 
                  ? `/${news.dateUrl}/${news.slug}`
                  : null;

                const ArticleWrapper = ({ children }: { children: React.ReactNode }) => {
                  if (articleUrl) {
                    return <Link href={articleUrl}>{children}</Link>;
                  }
                  return <>{children}</>;
                };

                return (
                  <ArticleWrapper key={news.id}>
                    <motion.article 
                      variants={itemVariants}
                      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                      className={`group relative flex flex-col pt-6 px-6 pb-4 rounded-2xl bg-[#fafafa] shadow-[inset_6px_6px_15_rgba(0,0,0,0.05),inset_-6px_-6px_15_rgba(255,255,255,0.8)] border border-black/5 ${articleUrl ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                    <div className="relative aspect-[2/1] rounded-xl overflow-hidden border border-black/5 bg-white mb-5 shadow-[inset_2px_2px_8px_rgba(0,0,0,0.15)]">
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className={`w-full h-full object-cover transition-all duration-700 ${
                          news.image === 'https://i.postimg.cc/SKRXS9MK/035.png' 
                            ? 'grayscale group-hover:grayscale-[0.5]' 
                            : 'grayscale-[10%] group-hover:grayscale-0'
                        }`}
                      />
                      <div className="absolute inset-0 shadow-[inset_0_4px_12px_rgba(0,0,0,0.15)] pointer-events-none" />
                    </div>

                    <div className="flex flex-col flex-1">
                      <h3 className="text-lg font-[var(--font-montserrat)] font-black mb-2 leading-[1.1] tracking-tighter uppercase line-clamp-4 transition-colors min-h-[4.4em]">
                        {renderTitle(news.title)}
                      </h3>
                      
                      <div className="mt-auto pt-3 flex items-center justify-between border-t border-black/[0.03] gap-2">
                         <span className="text-[9px] font-bold text-zinc-400 tracking-[0.2em] uppercase w-1/3 text-left">
                           {news.date.split(' ').slice(0, 2).join(' ')}
                         </span>
                         
                         <div className="w-8 h-8 opacity-40 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-110 flex items-center justify-center">
                            <img src={group.img} alt={group.label} className="w-full h-full object-contain" />
                         </div>

                         <div className="w-1/3 flex items-center justify-end gap-1.5 transition-all">
                           <span className="text-[14px] font-black text-[#B8860B] tracking-[0.05em] uppercase">
                             {formatViews((news as any).views)}
                           </span>
                           <svg className="w-4 h-4 text-[#FFCB00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                             <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
                             <circle cx="12" cy="12" r="3" />
                           </svg>
                         </div>
                      </div>
                    </div>
                  </motion.article>
                </ArticleWrapper>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

        <footer className="mt-32 pt-16 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8 font-mono">
          <p className="text-zinc-400 text-[10px] font-bold tracking-[0.3em] uppercase">
            © 2026 UNK GLOBAL DISPATCH / ACCESS GRANTED
          </p>
          <div className="flex gap-12">
            {["INSTAGRAM", "X", "RADIO"].map(social => (
              <button key={social} className="text-zinc-400 hover:text-black text-[10px] font-black tracking-[0.3em] transition-colors">{social}</button>
            ))}
          </div>
        </footer>
      </div>

      <Script 
        src="https://platform.instagram.com/en_US/embeds.js" 
        strategy="afterInteractive"
      />
    </main>
  );
}
