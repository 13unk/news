"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Script from "next/script";
import { ArrowLeft, Search } from "lucide-react";
import NewsFooter from "@/components/NewsFooter";

import newsData from "../../../../data/news.json";
import { slugify, formatDateForUrl } from "../../page";

// Extract unique tags and sort them alphabetically
const allTagsRaw = newsData
  .map(n => n.tags ? n.tags.split(',') : [])
  .flat()
  .map(t => t.trim());

const uniqueTags = ["TODAS", ...Array.from(new Set(allTagsRaw.map(t => t.toUpperCase())))
  .sort((a, b) => a.localeCompare(b))];

const tagMap = Array.from(new Set(allTagsRaw)).reduce((acc, tag) => {
  acc[slugify(tag)] = tag.toUpperCase();
  return acc;
}, { "todas": "TODAS" } as Record<string, string>);

const CATEGORY_GROUPS = [
  { id: "MUNDOS", categories: ["POLÍTICA", "SOCIEDAD"], img: "https://i.postimg.cc/xT0RQDzx/circus5.png", label: "TELÉFONO ROJO" },
  { id: "ESTADIO", categories: ["FÚTBOL", "DEPORTE"], img: "https://i.postimg.cc/bNzTPctM/circus4.png", label: "FURBO" },
  { id: "TODO", categories: [], img: "https://i.postimg.cc/nc01cR42/circus1.png", label: "TODO" },
  { id: "SONIDO", categories: ["MÚSICA"], img: "https://i.postimg.cc/qMjGMbsj/circus2.png", label: "SONIDO" },
  { id: "FARÁNDULA", categories: ["GOSSIP", "INFLUENCERS"], img: "https://i.postimg.cc/rF8JTXrh/circus6.png", label: "FARÁNDULA" }
];

const renderTitle = (title: string) => {
  const regex = /(<b>.*?<\/b>|\n)/g;
  const parts = title.split(regex);
  
  return parts.map((part, i) => {
    if (part === '\n') return <br key={i} />;
    if (part.startsWith('<b>') && part.endsWith('</b>')) {
      const content = part.substring(3, part.length - 4);
      return <span key={i} className="text-[#5e3e6a]">{content}</span>;
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

export default function TagPage() {
  const params = useParams();
  const router = useRouter();
  const currentTagNameSlug = params.tagName as string;
  const [tagSearch, setTagSearch] = useState("");
  
  const activeTagName = tagMap[currentTagNameSlug] || "";

  const displayedNews = useMemo(() => {
    return [...newsData].reverse().filter(item => {
      if (activeTagName === "TODAS") return true; 
      if (!item.tags) return false;
      const tagsArray = item.tags.split(',').map(t => t.trim().toUpperCase());
      return tagsArray.includes(activeTagName);
    });
  }, [activeTagName]);

  const filteredTags = useMemo(() => {
    return uniqueTags.filter(tag => 
      tag.toLowerCase().includes(tagSearch.toLowerCase())
    );
  }, [tagSearch]);

  const handleTagClick = (tag: string) => {
    const slug = tag.toLowerCase().replace(/\s+/g, '-');
    router.push(`/tag/${slug}`, { scroll: false });
  };

  return (
    <main className="min-h-screen bg-background text-zinc-950 font-sans selection:bg-[#5e3e6a]/10 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <Link href="/" className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-zinc-400 hover:text-[#5e3e6a] transition-colors group/back mb-16">
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          VOLVER
        </Link>

        {/* 50/50 DUAL PANE LAYOUT */}
        <div className="flex flex-col md:flex-row gap-16">
          
          {/* LEFT: NEWS GRID (2 Columns) */}
          <div className="w-full md:w-1/2">
            <div className="flex items-center justify-between mb-8 border-b border-black/5 pb-4">
               <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-900">
                 NOTICIAS / {activeTagName}
               </h2>
               <span className="text-[10px] font-bold text-zinc-400">{displayedNews.length}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout" initial={false}>
                {displayedNews.map((news) => {
                  const articleUrl = news.slug && news.dateUrl 
                    ? `/${news.dateUrl}/${news.slug}`
                    : null;
                  const group = CATEGORY_GROUPS.find(g => 
                    g.categories.includes(news.category || "")
                  ) || CATEGORY_GROUPS[2];
                  
                  const ArticleWrapper = ({ children }: { children: React.ReactNode }) => {
                    if (articleUrl) {
                      return <Link href={articleUrl}>{children}</Link>;
                    }
                    return <>{children}</>;
                  };

                  return (
                    <ArticleWrapper key={news.id}>
                      <motion.article 
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="group tactile-niche flex flex-col pt-6 px-6 pb-6 cursor-pointer"
                      >
                        <div className="tactile-insert relative aspect-[2/1] mb-6" style={{ backgroundColor: '#A988A7' }}>
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-12 h-12 opacity-30 mix-blend-soft-light grayscale brightness-0">
                              <img src={group.img} alt="" className="w-full h-full object-contain" />
                            </div>
                          </div>
                        </div>
                        
                          <h3 className="tactile-etched text-[1.1rem] font-[var(--font-archivo)] font-semibold mb-3 leading-[1.2] tracking-[-0.02em] uppercase line-clamp-4 min-h-[4.8em]">
                            {renderTitle(news.title)}
                          </h3>
                          
                          <div className="mt-auto pt-5 flex items-center justify-between tactile-divider relative gap-2">
                            <span className="tactile-etched text-[13px] font-bold tracking-[0.05em] uppercase w-1/3 text-left leading-none">
                              {news.date.split(' ').slice(0, 2).join(' ')}
                            </span>
                            
                            <div className="w-8 h-8 opacity-70 flex items-center justify-center">
                              <div 
                                className="tactile-icon-mask w-full h-full"
                                style={{ 
                                  maskImage: `url(${group.img})`,
                                  WebkitMaskImage: `url(${group.img})` 
                                }}
                              />
                            </div>

                            <span className="tactile-etched text-[13px] font-bold tracking-[0.05em] uppercase w-1/3 text-right leading-none">
                              {news.date.split(' ')[2]}
                            </span>
                        </div>
                      </motion.article>
                    </ArticleWrapper>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: TAGS EXPLORER */}
          <div className="w-full md:w-1/2">
             <div className="sticky top-24">
                <div className="flex items-center justify-between mb-8 border-b border-black/5 pb-4">
                  <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-900">
                    ETIQUETAS
                  </h2>
                </div>

                {/* NEOMORPHIC SEARCH BAR */}
                <div className="relative mb-8 group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#5e3e6a] transition-colors">
                    <Search className="w-4 h-4" />
                  </div>
                  <input 
                    type="text"
                    placeholder="BUSCAR ETIQUETA..."
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 rounded-full carved bg-transparent text-[10px] font-black tracking-[0.2em] uppercase focus:outline-none transition-all placeholder:text-zinc-300"
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[8px] font-bold text-zinc-300">A-Z</div>
                </div>

                <div className="flex flex-wrap gap-2 justify-start content-start">
                  <AnimatePresence>
                    {filteredTags.map((tag) => {
                      const isActive = tag === activeTagName;
                      return (
                        <motion.button
                          key={tag}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          onClick={() => handleTagClick(tag)}
                          className={`px-3 py-1.5 rounded-full carved text-[8px] md:text-[9px] font-black tracking-[0.15em] uppercase transition-all flex items-center justify-center ${
                            isActive 
                              ? "text-[#5e3e6a] scale-105 border-2 border-[#5e3e6a] shadow-[0_0_15px_rgba(94,62,106,0.15)]" 
                              : "text-zinc-500 opacity-60 hover:opacity-100 hover:scale-105 border-2 border-transparent"
                          }`}
                        >
                          <span>{tag}</span>
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>
                </div>
             </div>
          </div>

        </div>

        <NewsFooter />
      </div>

      <Script 
        src="https://platform.instagram.com/en_US/embeds.js" 
        strategy="afterInteractive"
      />
    </main>
  );
}
