"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, Share2, Bookmark, User } from "lucide-react";
import { useEffect, useState } from "react";
import Script from "next/script";
import NewsFooter from "@/components/NewsFooter";

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

const CATEGORY_GROUPS = [
  { id: "MUNDOS", categories: ["POLÍTICA", "SOCIEDAD"], img: "https://i.postimg.cc/xT0RQDzx/circus5.png", label: "TELÉFONO ROJO" },
  { id: "ESTADIO", categories: ["FÚTBOL", "DEPORTE"], img: "https://i.postimg.cc/bNzTPctM/circus4.png", label: "FURBO" },
  { id: "TODO", categories: [], img: "https://i.postimg.cc/nc01cR42/circus1.png", label: "TODO" },
  { id: "SONIDO", categories: ["MÚSICA"], img: "https://i.postimg.cc/qMjGMbsj/circus2.png", label: "SONIDO" },
  { id: "FARÁNDULA", categories: ["GOSSIP", "INFLUENCERS"], img: "https://i.postimg.cc/rF8JTXrh/circus6.png", label: "FARÁNDULA" }
];

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

  const [activeCommentIndex, setActiveCommentIndex] = useState(0);

  const igId = getInstagramId(article.link || "");

  // Carousel logic for comments
  useEffect(() => {
    if (!article.comments || article.comments.length <= 1) return;

    const interval = setInterval(() => {
      setActiveCommentIndex((prev) => (prev + 1) % article.comments.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [article.comments]);

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
    <main className="min-h-screen bg-background text-zinc-950 font-sans selection:bg-[#9B5DE0]/10 overflow-x-hidden pb-20">
      <article className="max-w-4xl mx-auto px-6 pt-12">
        <div className="flex items-center justify-between mb-12">
          <motion.div
            whileTap={{
              scale: 0.94,
              boxShadow: "inset -8px 8px 12px rgba(0, 0, 0, 0.7), inset 4px -4px 6px rgba(0, 0, 0, 0.4), 0px 0px 0px rgba(0,0,0,0)"
            }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="rounded-full tactile-pill-niche"
          >
            <Link href="/news" className="group z-50 flex items-center justify-center w-12 h-12 rounded-full outline-none">
              <ArrowLeft className="w-5 h-5 transition-transform" />
            </Link>
          </motion.div>

          <div className="flex items-center gap-6">
            <motion.a
              href={article.link || "https://instagram.com/unkedition"}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{
                scale: 0.94,
                boxShadow: "inset -6px 6px 10px rgba(0, 0, 0, 0.7), inset 3px -3px 5px rgba(0, 0, 0, 0.4), 0px 0px 0px rgba(0,0,0,0)"
              }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="w-10 h-10 rounded-full tactile-pill-niche flex items-center justify-center p-2.5 outline-none"
            >
              <img
                src="https://i.postimg.cc/mhfHSKnp/ig-icon.png"
                alt="View on Instagram"
                className="w-full h-full object-contain brightness-0 grayscale transition-all opacity-40 group-hover:opacity-100"
              />
            </motion.a>
          </div>
        </div>

        {/* MAIN IMAGE ABOVE HEADLINE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="tactile-insert relative aspect-[21/9] mb-12"
        >
          {article.image === 'https://i.postimg.cc/SKRXS9MK/035.png' && article.id !== 5 ? (
            <div className="w-full h-full bg-[#D6CFE2]/20 flex items-center justify-center">
              <div className="w-24 h-24 opacity-5 brightness-0 grayscale">
                <img src="https://i.postimg.cc/qMjGMbsj/circus2.png" alt="" className="w-full h-full object-contain" />
              </div>
            </div>
          ) : (
            <img
              src={article.image || "https://i.postimg.cc/SKRXS9MK/035.png"}
              alt={article.title.replace(/<b>|<\/b>/g, '')}
              className="w-full h-full object-cover transition-all duration-700 grayscale-0"
            />
          )}
        </motion.div>

        {/* HEADLINE */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-[var(--font-montserrat)] font-black uppercase leading-[1.0] tracking-tighter mb-4 max-w-3xl">
            {renderTitle(article.title)}
          </h1>
          {article.subtitle && (
            <p className="text-[#6D467B] text-sm md:text-base font-black uppercase tracking-widest mb-8 drop-shadow-[1px_1px_0px_rgba(0,0,0,0.1)]">
              {article.subtitle}
            </p>
          )}
        </motion.header>

        {/* METADATA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex items-center justify-between py-6 border-y border-black/5 mb-16"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-8">
               <img 
                 src={CATEGORY_GROUPS.find(g => g.categories.includes(article.category || ""))?.img || CATEGORY_GROUPS[2].img} 
                 alt="Category" 
                 className="w-full h-full object-contain" 
               />
            </div>
            <div>
              <p className="text-[10px] font-black tracking-widest uppercase text-zinc-900">
                {CATEGORY_GROUPS.find(g => g.categories.includes(article.category || ""))?.label || article.category}
              </p>
              <p className="text-[10px] font-black tracking-widest uppercase text-[#6D467B]">
                {article.date.split(' ').slice(0, 2).join(' ')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl tactile-pill-niche">
            <span className="text-sm font-black text-[#6D467B] tracking-tight">
              {formatViews(article.views)}
            </span>
            <svg className="w-4 h-4 text-[#6D467B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        </motion.div>


        <div className="prose prose-zinc max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="space-y-8 text-lg md:text-xl text-zinc-800 leading-relaxed font-[var(--font-archivo)] max-w-3xl"
          >
            {article.body && article.body.map((para: string, idx: number) => (
              <p key={idx}>{para}</p>
            ))}
          </motion.div>

          {igId && (
            <motion.div
              key={igId}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="mt-20 flex flex-col items-center w-full"
            >
              <div className="w-full max-w-[400px] md:max-w-[500px] rounded-xl overflow-hidden shadow-[20px_20px_40px_rgba(0,0,0,0.08)] border border-black/5 bg-[#CFC9BD] p-2">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={`https://www.instagram.com/reel/${igId}/?utm_source=ig_embed&amp;utm_campaign=loading`}
                  data-instgrm-version="14"
                  style={{ width: '100%', margin: '0', padding: '0', border: '0' }}
                >
                </blockquote>
              </div>

              {/* Featured Comments Section */}
              {article.comments && article.comments.length > 0 && (
                <div className="w-full mt-4 mb-2 overflow-hidden">
                  <div className="relative h-32 max-w-2xl mx-auto flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {article.comments.map((c: any, i: number) => {
                        if (i !== activeCommentIndex) return null;

                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-0 flex items-center gap-4 justify-center"
                          >
                            <div className="shrink-0 w-10 h-10 rounded-full bg-[#6D467B] flex items-center justify-center shadow-lg border-2 border-white">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex flex-col items-start text-left max-w-[80%]">
                              <p className="text-[10px] font-black tracking-widest uppercase text-zinc-400 mb-1 ml-1">
                                {c.user}
                              </p>
                              <div className="px-6 py-4 rounded-3xl rounded-tl-none shadow-[4px_4px_20px_rgba(0,0,0,0.05)] border border-black/5 bg-[#E8E6DE] relative">
                                <p className="text-sm md:text-base font-medium leading-relaxed text-zinc-800 italic">
                                  {c.comment}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>

        <div className="mt-4 pt-6 border-t border-black/5 flex flex-wrap justify-end items-center gap-3">
          {article.tags && article.tags.split(',').map((tag: string, idx: number) => {
            const tagText = tag.trim().toUpperCase();
            return (
              <motion.div
                key={idx}
                whileTap={{
                  scale: 0.94,
                  boxShadow: "inset -6px 6px 10px rgba(0, 0, 0, 0.7), inset 3px -3px 5px rgba(0, 0, 0, 0.4), 0px 0px 0px rgba(0,0,0,0)"
                }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="rounded-full tactile-pill-niche"
              >
                <Link
                  href={`/news?tag=${encodeURIComponent(tagText)}`}
                  className="px-4 py-2 flex items-center justify-center rounded-full text-[9px] font-black tracking-[0.2em] uppercase text-zinc-600 cursor-pointer outline-none"
                >
                  {tagText}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </article>

      <NewsFooter />

      <Script
        src="https://platform.instagram.com/en_US/embeds.js"
        strategy="afterInteractive"
      />
    </main>
  );
}
