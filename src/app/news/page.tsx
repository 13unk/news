"use client";

import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, Clock, Share2, Bookmark, ChevronLeft, ChevronRight, X, Search } from "lucide-react";
import NewsFooter from "@/components/NewsFooter";
import { useSearchParams } from "next/navigation";

import newsData from "../../data/news.json";

const newsItems = newsData;

const CATEGORY_GROUPS = [
  { id: "MUNDOS", categories: ["POLÍTICA", "SOCIEDAD"], img: "https://i.postimg.cc/xT0RQDzx/circus5.png", label: "TELÉFONO ROJO", color: "#e20039" },
  { id: "ESTADIO", categories: ["FÚTBOL", "DEPORTE"], img: "https://i.postimg.cc/bNzTPctM/circus4.png", label: "FURBO", color: "#2E8B57" },
  { id: "TODO", categories: [], img: "https://i.postimg.cc/nc01cR42/circus1.png", label: "TODO", color: "#9B5DE0" },
  { id: "SONIDO", categories: ["MÚSICA"], img: "https://i.postimg.cc/qMjGMbsj/circus2.png", label: "SONIDO", color: "#FFD500" },
  { id: "FARÁNDULA", categories: ["GOSSIP", "INFLUENCERS"], img: "https://i.postimg.cc/rF8JTXrh/circus6.png", label: "FARÁNDULA", color: "#ff96c5" }
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
      duration: 0.2
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
      return <span key={i} className="text-[#6A4378]">{content}</span>;
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

const UI_Normalize = (tag: string) => tag.trim().toUpperCase();

const Loose_Normalize = (tag: string) => {
  return tag
    .trim()
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

export default function NewsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <NewsContent />
    </Suspense>
  );
}

function NewsContent() {
  const searchParams = useSearchParams();
  const [selectedGroup, setSelectedGroup] = useState("TODO");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState("");

  // Handle initial tag from query param
  useEffect(() => {
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      const normalized = UI_Normalize(tagParam);
      setSelectedTags(prev => prev.includes(normalized) ? prev : [...prev, normalized]);
    }
  }, [searchParams]);

  // Extract and process tags
  const tagData = useMemo(() => {
    const groupItems = selectedGroup === "TODO" 
      ? newsItems 
      : newsItems.filter(item => {
          const group = CATEGORY_GROUPS.find(g => g.id === selectedGroup);
          return group?.categories.includes(item.category || "") || false;
        });

    const uniqueTags = new Set<string>();
    const displayNames: Record<string, string> = {}; 
    
    groupItems.forEach(item => {
      if (item.tags) {
        item.tags.split(',').forEach(t => {
          const raw = t.trim();
          const loose = Loose_Normalize(raw);
          const ui = UI_Normalize(raw);
          if (loose) {
            uniqueTags.add(loose);
            if (!displayNames[loose]) displayNames[loose] = ui;
          }
        });
      }
    });

    const processedItems = groupItems.map(item => ({
      tags: item.tags ? item.tags.split(',').map(t => Loose_Normalize(t)) : [],
      title: Loose_Normalize(item.title.replace(/<b>|<\/b>/g, ''))
    }));

    return Array.from(uniqueTags)
      .map(loose => {
        const matchCount = processedItems.filter(p => {
          const hasInTags = p.tags.includes(loose);
          const hasInTitle = p.title.split(/[^A-Z0-9]/).includes(loose);
          return hasInTags || hasInTitle;
        }).length;

        return { 
          name: displayNames[loose], 
          count: matchCount, 
          looseKey: loose 
        };
      })
      .sort((a, b) => b.count - a.count);
  }, [selectedGroup]);

  const toggleTag = (tag: string) => {
    const ui = UI_Normalize(tag);
    setSelectedTags(prev => 
      prev.includes(ui) ? prev.filter(t => t !== ui) : [...prev, ui]
    );
  };

  const displayedNews = useMemo(() => {
    return [...newsItems].reverse().filter(item => {
      // Category filter
      let matchesCategory = true;
      if (selectedGroup !== "TODO") {
        const group = CATEGORY_GROUPS.find(g => g.id === selectedGroup);
        matchesCategory = group?.categories.includes(item.category || "") || false;
      }

      // Tag filter (OR logic)
      let matchesTags = true;
      if (selectedTags.length > 0) {
        const itemTags = item.tags ? item.tags.split(',').map(t => Loose_Normalize(t)) : [];
        const itemTitleWords = Loose_Normalize(item.title.replace(/<b>|<\/b>/g, '')).split(/[^A-Z0-9]/);
        const selectedLoose = selectedTags.map(t => Loose_Normalize(t));
        
        matchesTags = selectedLoose.some(t => 
          itemTags.includes(t) || itemTitleWords.includes(t)
        );
      }

      return matchesCategory && matchesTags;
    });
  }, [selectedGroup, selectedTags]);

  return (
    <main className="min-h-screen bg-background text-zinc-950 font-sans selection:bg-[#9B5DE0]/10 overflow-x-hidden">
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
                      className={`w-full h-full object-contain transition-all duration-500 ${!isActive ? "grayscale" : ""}`}
                      style={isActive ? { filter: `drop-shadow(0 0 20px ${group.color}4d)` } : {}}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-1.5 min-h-[20px]">
                    <div className={`px-4 py-1.5 rounded-xl text-[8px] md:text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-300 ${
                      isActive 
                        ? "tactile-pill-niche" 
                        : "text-zinc-500 hover:bg-[#f4f4f5] border border-transparent hover:border-black/5"
                    }`}>
                      <span className={isActive ? "tactile-etched" : ""}>{group.label}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ADVANCED FILTERS COMPACT TOGGLE */}
        {/* ADVANCED FILTERS SKEUOMORPHIC SLIDER */}
        <div className="w-full mb-8 mt-6 flex justify-end">
          <div 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="group flex items-center justify-between gap-4 pl-7 pr-2 py-1.5 rounded-full tactile-pill-niche cursor-pointer select-none scale-90 origin-right outline-none"
          >
            <span className="tactile-etched text-[#0E0509] text-[10px] sm:text-[11px] font-black tracking-tight flex-shrink-0">
              FILTROS AVANZADOS
            </span>
            
            <div className="w-14 h-[26px] tactile-track flex items-center p-0">
              <motion.div 
                animate={{ x: selectedTags.length > 0 ? 30 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="w-[26px] h-[26px] tactile-knob"
              />
            </div>
          </div>
        </div>

        {/* TAG SELECTION SIDEBAR */}
        <AnimatePresence>
          {isFiltersOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFiltersOpen(false)}
                className="fixed inset-0 z-[999] bg-black/10 backdrop-blur-[2px]"
              />
              
              {/* Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 35, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-full max-w-[450px] z-[1000] bg-background shadow-[-20px_0_40px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col border-l border-black/5"
              >
                <div className="flex-1 overflow-y-auto overflow-x-hidden px-10 py-16">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="tactile-etched text-xl font-black tracking-tighter uppercase">Filtros</h2>
                    <button 
                      onClick={() => setIsFiltersOpen(false)}
                      className="w-10 h-10 rounded-full tactile-pill-niche flex items-center justify-center active:scale-90 transition-transform"
                    >
                      <X className="w-4 h-4 tactile-etched" />
                    </button>
                  </div>

                  {/* INTEGRATED SEARCH BAR & CHIPS */}
                  <div className="mb-12">
                    <div className="relative flex items-center gap-3 h-14 pl-4 pr-0 rounded-[18px] tactile-pill-niche cursor-text mb-6 overflow-hidden">
                      <Search className="w-4 h-4 tactile-etched shrink-0 ml-1" />
                      <div className="relative flex gap-2 items-center flex-1 overflow-x-auto scrollbarHide whitespace-nowrap pr-4">
                        <AnimatePresence>
                          {selectedTags.map(tag => (
                            <motion.button
                              key={tag}
                              layout="position"
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0, transition: { duration: 0.15, ease: "backIn" } }}
                              whileTap={{ 
                                y: 3,
                                scale: 0.96,
                                boxShadow: "inset -4px 4px 6px rgba(0, 0, 0, 0.7), inset 2px -2px 4px rgba(0, 0, 0, 0.4), 0px 0px 0px rgba(0,0,0,0)"
                              }}
                              transition={{ type: "spring", stiffness: 500, damping: 20 }}
                              onClick={(e) => { e.stopPropagation(); toggleTag(tag); }}
                              className="flex shrink-0 whitespace-nowrap items-center gap-1.5 px-3 py-1.5 rounded-full tactile-pill-niche text-[9px] font-black tracking-wider text-black outline-none group/chip"
                            >
                              <span className="tactile-etched">{tag}</span>
                              <X className="w-2.5 h-2.5 opacity-60 tactile-etched" />
                            </motion.button>
                          ))}
                        </AnimatePresence>
                        <input
                          id="tag-search-input"
                          type="text"
                          value={tagSearch}
                          onChange={(e) => setTagSearch(e.target.value)}
                          placeholder={selectedTags.length === 0 ? "BUSCANDO..." : ""}
                          className="flex-1 bg-transparent border-none outline-none text-[10px] font-bold text-[#0E0509] tracking-[0.1em] uppercase min-w-[100px] placeholder:text-zinc-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pb-24">
                    {tagData
                      .filter(tag => tag.name.toUpperCase().includes(tagSearch.toUpperCase()))
                      .map((tag) => {
                      const isActive = selectedTags.includes(tag.name);
                      return (
                        <motion.button
                          key={tag.name}
                          onClick={() => toggleTag(tag.name)}
                          whileTap={{ 
                            y: 4,
                            scale: 0.96,
                            boxShadow: "inset -6px 6px 10px rgba(0, 0, 0, 0.7), inset 3px -3px 5px rgba(0, 0, 0, 0.4), 0px 0px 0px rgba(0,0,0,0)"
                          }}
                          transition={{ type: "spring", stiffness: 500, damping: 20 }}
                          className={`group relative flex items-center justify-center p-3 rounded-xl transition-all duration-300 text-center tactile-pill-niche outline-none ${
                            isActive 
                              ? "opacity-100" 
                              : "opacity-60 grayscale"
                          }`}
                        >
                          <span className={`text-[9px] font-bold tracking-tight uppercase leading-tight tactile-etched ${isActive ? 'text-[#6A4378]' : 'text-[#0E0509]'}`}>
                            {tag.name}
                          </span>
                          {isActive && (
                            <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-[#6A4378] shadow-[0_0_8px_rgba(106,67,120,0.4)]" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-10 bg-background border-t border-black/5 flex justify-center">
                  <motion.button 
                    onClick={() => setSelectedTags([])}
                    whileTap={{ 
                      y: 4,
                      scale: 0.98,
                      boxShadow: "inset -6px 6px 10px rgba(0, 0, 0, 0.7), inset 3px -3px 5px rgba(0, 0, 0, 0.4), 0px 0px 0px rgba(0,0,0,0)"
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="py-4 px-10 rounded-full tactile-pill-niche tactile-etched text-[10px] font-black tracking-[0.2em] uppercase outline-none"
                  >
                    Borrar Todo
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* NEWS GRID */}
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`${selectedGroup}-${selectedTags.join('-')}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pt-0 max-w-7xl mx-auto"
            >
              {displayedNews.map((news) => {
                const group = CATEGORY_GROUPS.find(g => 
                  g.categories.includes(news.category || "")
                ) || CATEGORY_GROUPS[2];

                const articleUrl = news.slug && news.dateUrl 
                  ? `/news/${news.dateUrl}/${news.slug}`
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
                      whileHover="hover"
                      whileTap="tap"
                      className={`group tactile-niche flex flex-col pt-6 px-6 pb-6 ${articleUrl ? 'cursor-pointer' : 'cursor-default'} outline-none`}
                    >
                    {/* Hover Background Overlay (Removed for pure matte look) */}

                    <motion.div 
                      variants={{
                        tap: { 
                          y: 4, 
                          scale: 0.97,
                          boxShadow: "inset -8px 8px 12px rgba(0, 0, 0, 0.8), inset 4px -4px 6px rgba(0, 0, 0, 0.5), 0px 0px 0px rgba(0,0,0,0)"
                        }
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      className="tactile-insert relative z-10 aspect-[2/1] mb-5" 
                      style={{ backgroundColor: '#A988A7' }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        {news.image && news.image !== 'https://i.postimg.cc/SKRXS9MK/035.png' ? (
                          <motion.img 
                            variants={{ tap: { opacity: 0.6 } }}
                            src={news.image} 
                            alt="" 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <motion.div 
                            variants={{ tap: { opacity: 0.6 } }}
                            className="w-12 h-12 opacity-30 mix-blend-soft-light grayscale brightness-0"
                          >
                            <img src={group.img} alt="" className="w-full h-full object-contain" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>

                    <div className="flex flex-col flex-1">
                        <div className="tactile-etched text-[1.1rem] font-[var(--font-archivo)] font-semibold mb-3 leading-[1.2] tracking-[-0.02em] uppercase line-clamp-4 min-h-[4.8em]">
                          {renderTitle(news.title)}
                        </div>
                      
                      <div className="mt-auto pt-5 flex items-center justify-between tactile-divider relative gap-2">
                         <span className="tactile-etched text-[13px] font-bold tracking-[0.05em] uppercase w-1/3 text-left leading-none">
                           {news.date.split(' ').slice(0, 2).join(' ')}
                         </span>
                         
                         <div className="w-8 h-8 flex items-center justify-center">
                            <img src={group.img} alt="" className="w-full h-full object-contain" />
                         </div>

                         <div className="w-1/3 flex items-center justify-end gap-1.5 transition-all leading-none">
                           <span className="tactile-etched text-[13px] font-bold tracking-[0.05em] uppercase">
                             {formatViews((news as any).views)}
                           </span>
                           <svg className="tactile-etched text-[#0E0509] w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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

      </div>

      <NewsFooter />

      <Script 
        src="https://platform.instagram.com/en_US/embeds.js" 
        strategy="afterInteractive"
      />
    </main>
  );
}
