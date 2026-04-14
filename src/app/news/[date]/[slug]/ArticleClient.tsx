"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, Share2, Bookmark } from "lucide-react";
import { useEffect } from "react";
import Script from "next/script";

// Simple slugify function for tags in client side
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/<b>|<\/b>/g, '') 
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const formatViews = (views: number) => {
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

export default function ArticleClient({ article }: { article: any }) {
  const getInstagramId = (url: string) => {
    if (!url) return null;
    const regex = /(?:\/p\/|\/reel\/|\/reels\/)([^/?#&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const igId = getInstagramId(article.link || "");

  // Re-initialize Instagram embeds on navigation
  useEffect(() => {
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, [igId]);

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

  return (
    <main className="min-h-screen bg-[#fafafa] text-zinc-950 font-sans selection:bg-[#9B5DE0]/10 overflow-x-hidden pb-20">
      <article className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="group relative z-50 flex items-center gap-3 px-6 py-3 rounded-full carved text-[10px] font-black tracking-[0.2em] uppercase transition-all hover:scale-105 active:scale-95">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            NEWS
          </Link>
          <div className="flex items-center gap-6">
            <a 
              href={article.link || "https://instagram.com/unkedition"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full carved flex items-center justify-center hover:scale-110 transition-transform p-2.5"
            >
               <img 
                 src="https://i.postimg.cc/mhfHSKnp/ig-icon.png" 
                 alt="View on Instagram" 
                 className="w-full h-full object-contain brightness-0 grayscale transition-all group-hover:brightness-100 group-hover:grayscale-0"
               />
            </a>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-[21/9] rounded-xl overflow-hidden mb-16 shadow-[10px_10px_30px_rgba(0,0,0,0.05),-10px_-10px_30px_#ffffff] border border-black/5"
        >
          <img 
            src={article.image || "https://i.postimg.cc/SKRXS9MK/035.png"} 
            alt={article.title.replace(/<b>|<\/b>/g, '')}
            className={`w-full h-full object-cover ${
              article.image === 'https://i.postimg.cc/SKRXS9MK/035.png' 
                ? 'grayscale' 
                : 'grayscale-[10%]'
            }`}
          />
          <div className="absolute inset-0 shadow-[inset_0_4px_24px_rgba(0,0,0,0.1)] pointer-events-none" />
        </motion.div>

        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-[var(--font-montserrat)] font-black uppercase leading-[1.0] tracking-tighter mb-4 max-w-3xl">
            {renderTitle(article.title)}
          </h1>
          {article.subtitle && (
            <p className="text-[#FFCB00] text-sm md:text-base font-black uppercase tracking-widest mb-8 drop-shadow-[2px_2px_0px_#000000]">
              {article.subtitle}
            </p>
          )}

          <div className="flex items-center justify-between py-6 border-y border-black/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full carved overflow-hidden p-1 flex items-center justify-center">
                 <img src="https://i.postimg.cc/qMjGMbsj/circus2.png" alt="Author" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-[10px] font-black tracking-widest uppercase text-zinc-900">
                  {article.category === "MÚSICA" ? "SONIDO" : 
                   article.category === "FÚTBOL" || article.category === "DEPORTE" ? "FURBO" :
                   article.category === "POLÍTICA" || article.category === "SOCIEDAD" ? "TELÉFONO ROJO" :
                   article.category === "GOSSIP" || article.category === "INFLUENCERS" ? "FARÁNDULA" :
                   article.category}
                </p>
                <p className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">
                  {article.date.split(' ').slice(0, 2).join(' ')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinc-50 border border-black/[0.03] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.02)]">
              <span className="text-sm font-black text-[#B8860B] tracking-tight">
                {formatViews(article.views)}
              </span>
              <svg className="w-4 h-4 text-[#FFCB00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
          </div>
        </header>

        <div className="prose prose-zinc max-w-none">
          <div className="space-y-8 text-lg md:text-xl text-zinc-800 leading-relaxed font-[var(--font-montserrat)] max-w-3xl">
            {article.body && article.body.map((para: string, idx: number) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {igId && (
            <div key={igId} className="mt-20 flex justify-center w-full">
              <div className="w-full max-w-[400px] md:max-w-[500px] rounded-xl overflow-hidden shadow-[20px_20px_40px_rgba(0,0,0,0.08),-20px_-20px_40px_#ffffff] border border-black/5 bg-white p-2">
                <blockquote 
                  className="instagram-media" 
                  data-instgrm-permalink={`https://www.instagram.com/reel/${igId}/?utm_source=ig_embed&amp;utm_campaign=loading`}
                  data-instgrm-version="14"
                  style={{ width: '100%', margin: '0', padding: '0', border: '0' }}
                >
                </blockquote>
              </div>
            </div>
          )}
        </div>

        <div className="mt-20 pt-10 border-t border-black/5 flex flex-wrap justify-end items-center gap-3">
           {article.tags && article.tags.split(',').map((tag: string, idx: number) => {
             const tagText = tag.trim();
             return (
               <Link 
                 key={idx}
                 href={`/tag/${slugify(tagText)}`}
                 className="px-4 py-2 rounded-full carved text-[9px] font-black tracking-[0.2em] uppercase text-zinc-500 shadow-[4px_4px_10px_rgba(0,0,0,0.05),-4px_-4px_10px_#ffffff] hover:scale-105 active:scale-95 cursor-pointer transition-all"
               >
                 #{tagText.toUpperCase()}
               </Link>
             );
           })}
        </div>
      </article>
      
      <footer className="max-w-7xl mx-auto px-6 mt-32 pt-16 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8 font-mono">
        <p className="text-zinc-400 text-[10px] font-bold tracking-[0.3em] uppercase">
          © 2026 UNK GLOBAL DISPATCH / ACCESS GRANTED
        </p>
        <div className="flex gap-12">
          {["INSTAGRAM", "X", "RADIO"].map(social => (
            <button key={social} className="text-zinc-400 hover:text-black text-[10px] font-black tracking-[0.3em] transition-colors">{social}</button>
          ))}
        </div>
      </footer>

      <Script 
        src="https://platform.instagram.com/en_US/embeds.js" 
        strategy="afterInteractive"
      />
    </main>
  );
}
