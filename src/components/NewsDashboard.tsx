"use client";

import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, Clock, Share2, Bookmark, ChevronLeft, ChevronRight, X, Search, Flame, Calendar, Sparkles } from "lucide-react";
import NewsFooter, { Developer } from "@/components/NewsFooter";
import { useSearchParams, useParams } from "next/navigation";

import newsData from "../data/news.json";

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

const getCategoryIcon = (category?: string) => {
  if (!category) return null;
  const group = CATEGORY_GROUPS.find(g => g.categories.includes(category.toUpperCase()));
  return group ? group.img : null;
};

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

const UI_Normalize = (tag: string) => tag.trim().toUpperCase();

const Loose_Normalize = (tag: string) => {
  return tag
    .trim()
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
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

const isVideo = (src?: string) => {
  if (!src) return false;
  return src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov') || src.startsWith('/videos/');
};

export default function NewsDashboard() {
  return (
    <Suspense fallback={<div className="h-fit" />}>
      <NewsContent />
    </Suspense>
  );
}

function NewsContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const [selectedGroup, setSelectedGroup] = useState("TODO");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const [sortBy, setSortBy] = useState<"newest" | "visits" | "oldest">("newest");
  const [activeTicket, setActiveTicket] = useState<any>(null);
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null);

  const handleSetTicket = (news: any) => {
    if (activeTicket?.id === news?.id) {
      setActiveTicket(null);
    } else {
      setActiveTicket(news);
      if (news) setSelectedDev(null);
    }
  };

  const handleDevClick = (dev: Developer | null) => {
    setSelectedDev(dev);
    if (dev) setActiveTicket(null);
  };

  // Handle closing ticket with Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveTicket(null);
        setSelectedDev(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Handle initial deep link
  useEffect(() => {
    if (params?.date && params?.slug && !activeTicket) {
      const article = newsItems.find(item =>
        formatDateForUrl(item.date) === params.date &&
        slugify(item.title) === params.slug
      );
      if (article) {
        setActiveTicket(article);
      }
    }
  }, [params]);

  // Sync URL with active ticket
  useEffect(() => {
    if (activeTicket) {
      const url = `/news/${formatDateForUrl(activeTicket.date)}/${slugify(activeTicket.title)}`;
      window.history.pushState(null, '', url);
    } else {
      // Only push /news if we were on a sub-url
      if (window.location.pathname !== '/news') {
        window.history.pushState(null, '', '/news');
      }
    }
  }, [activeTicket]);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedGroup, selectedTags, sortBy]);

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
    let filtered = [...newsItems].filter(item => {
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

    // Sorting logic
    if (sortBy === "newest") {
      filtered.sort((a, b) => b.id - a.id);
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => a.id - b.id);
    } else if (sortBy === "visits") {
      filtered.sort((a, b) => ((b as any).views || 0) - ((a as any).views || 0));
    }

    return filtered;
  }, [selectedGroup, selectedTags, sortBy]);

  const paginatedNews = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return displayedNews.slice(start, start + itemsPerPage);
  }, [displayedNews, currentPage]);

  const totalPages = Math.ceil(displayedNews.length / itemsPerPage);

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 0));

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Auto-scroll to ticket when opened
  useEffect(() => {
    if (activeTicket) {
      const timer = setTimeout(() => {
        const element = document.getElementById('ticket-output');
        if (element) {
          const rect = element.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetY = rect.top + scrollTop - 180;

          // Custom slow smooth scroll implementation
          const startTime = performance.now();
          const startScrollY = window.scrollY;
          const duration = 1500; // 1.5 seconds for a very slow, premium feel

          const animateScroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (easeInOutCubic)
            const ease = progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(0, startScrollY + (targetY - startScrollY) * ease);

            if (progress < 1) {
              requestAnimationFrame(animateScroll);
            }
          };

          requestAnimationFrame(animateScroll);
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [activeTicket]);

  const paperScraps = mounted && typeof document !== 'undefined' ? (
    <div className="absolute inset-0 pointer-events-none hidden lg:block z-0 opacity-80">
      {tagData.map((tag, i) => {
        const itemsPerRow = 15;
        const row = Math.floor(i / itemsPerRow);
        const col = i % itemsPerRow;

        const jitterY = Math.sin(i * 123) * 15;
        const sideJitterX = Math.cos(i * 321) * 10;
        const bottomJitterX = Math.cos(i * 321) * 15;

        const topPos = 50 + (row * 60) + jitterY;

        const chassisHeightEstimate = 1350;
        const isBelowChassis = topPos > chassisHeightEstimate;

        const isVisibleCol = isBelowChassis || [0, 1, 2, 12, 13, 14].includes(col);

        if (!isVisibleCol) return null;

        const isLeftSide = [0, 1, 2].includes(col);
        const isRightSide = [12, 13, 14].includes(col);
        const rotation = (i % 2 === 0 ? 1 : -1) * (2 + Math.abs(Math.sin(i) * 12));

        let leftPerc = 0;
        let rightPerc = 0;
        let transform = `rotate(${rotation}deg)`;

        const step = 6.8;

        if (isLeftSide) {
          leftPerc = 1.5 + (col * step) + (sideJitterX / 10);
        } else if (isRightSide) {
          rightPerc = 1.5 + ((14 - col) * step) + (sideJitterX / 10);
        } else {
          leftPerc = 1.5 + (col * step) + (bottomJitterX / 10);
          transform += " translateX(-50%)";
        }

        return (
          <div
            key={`tag-${tag.name}-${i}`}
            onClick={() => toggleTag(tag.name)}
            className="absolute bg-[#F4F3F0] px-4 py-2.5 shadow-[2px_6px_18px_rgba(0,0,0,0.15),_inset_0_0_20px_rgba(0,0,0,0.03)] border border-[#e5e5e5] flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer select-none"
            style={{
              top: `${topPos}px`,
              ...(isLeftSide ? { left: `${leftPerc}%` } : isRightSide ? { right: `${rightPerc}%` } : { left: `${leftPerc}%` }),
              transform: transform,
              zIndex: 10 + (i % 20)
            }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-3.5 bg-white/40 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.1)] -rotate-3 border border-white/30" />
            <span className={`tactile-etched text-[11px] font-black tracking-widest uppercase relative z-10 transition-colors duration-300 ${selectedTags.includes(tag.name) ? 'text-[#c00100] opacity-100' : 'text-[#111111] opacity-50'}`}>
              {tag.name}
            </span>
          </div>
        );
      })}
    </div>
  ) : null;

  return (
    <main className="relative text-zinc-950 font-sans selection:bg-[#5e3e6a]/10 overflow-x-hidden">

      {mounted && typeof document !== 'undefined' && createPortal(paperScraps, document.getElementById('out-of-bounds-portal')!)}

      <div className="max-w-[1600px] mx-auto px-6 pb-20 relative z-10">
        <section className="mb-12 mt-12 md:mt-24">
          <div className="flex items-center justify-between gap-2 md:gap-4 max-w-4xl mx-auto px-4">
            {CATEGORY_GROUPS.map((group) => {
              const isActive = selectedGroup === group.id;
              const isCenter = group.id === "TODO";

              return (
                <button
                  key={group.id}
                  onClick={() => setSelectedGroup(group.id)}
                  className={`relative transition-all duration-500 flex flex-col items-center gap-2 group/cat ${isActive ? "scale-105" : "opacity-40 hover:opacity-100 hover:scale-105"
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
                    <div className={`px-4 py-1.5 rounded-xl text-[8px] md:text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-300 ${isActive
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

        <div className="w-full mb-16 mt-6 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0">
          <div className="flex items-center gap-4 tactile-pill-niche pl-6 pr-2 py-1 select-none scale-90 origin-left">
            <span className="tactile-etched text-[#0E0509] text-[9px] font-black tracking-widest uppercase">
              ORDENAR POR:
            </span>
            <div className="flex items-center gap-1.5">
              {[
                { id: "newest", icon: Clock, label: "MÁS NUEVO" },
                { id: "visits", icon: Flame, label: "MÁS VISITAS" },
                { id: "oldest", icon: Calendar, label: "MÁS ANTIGUO" }
              ].map((opt) => {
                const isActive = sortBy === opt.id;
                const Icon = opt.icon;
                return (
                  <motion.button
                    key={opt.id}
                    onClick={() => setSortBy(opt.id as any)}
                    whileTap={{ scale: 0.94 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative group/opt ${isActive ? "tactile-track" : "hover:bg-black/5"
                      }`}
                  >
                    <Icon className={`w-4 h-4 transition-all duration-300 ${isActive ? "tactile-etched text-[#0E0509]" : "text-zinc-500 opacity-60 group-hover/opt:opacity-100"
                      }`} />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center gap-12 min-h-[600px] max-w-[1250px] mx-auto">
          <div className="flex-1">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`${selectedGroup}-${selectedTags.join('-')}-${currentPage}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-0 justify-center"
              >
                {paginatedNews.map((news) => {
                  const group = CATEGORY_GROUPS.find(g =>
                    g.categories.includes(news.category || "")
                  ) || CATEGORY_GROUPS[2];

                  return (
                    <div
                      key={news.id}
                      onClick={() => handleSetTicket(news)}
                      className="outline-none"
                    >
                      <motion.article
                        variants={itemVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="group tactile-niche flex flex-col pt-6 px-6 pb-6 cursor-pointer outline-none"
                      >
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
                          <div className="tactile-etched text-[0.95rem] font-[var(--font-archivo)] font-semibold mb-3 leading-[1.2] tracking-[-0.02em] uppercase line-clamp-4 min-h-[4.8em]">
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
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-6 py-8">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`w-16 h-16 rounded-full flex items-center justify-center group cursor-pointer outline-none border-[4px] border-black/40 shadow-[inset_0_4px_8px_rgba(0,0,0,0.8)] transition-all ${currentPage === 0 ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}
              style={{ background: 'linear-gradient(180deg, #6d4d8a 0%, #3b284e 100%)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cfc9bd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-75 group-active:scale-90 group-active:opacity-60 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] group-active:drop-shadow-none">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>

            <div className="h-20 w-1 bg-black/10 mx-auto rounded-full relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full bg-[#5e3e6a]"
                animate={{ height: `${((currentPage + 1) / totalPages) * 100}%` }}
              />
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage >= totalPages - 1}
              className={`w-16 h-16 rounded-full flex items-center justify-center group cursor-pointer outline-none border-[4px] border-black/40 shadow-[inset_0_4px_8px_rgba(0,0,0,0.8)] transition-all ${currentPage >= totalPages - 1 ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}
              style={{ background: 'linear-gradient(180deg, #6d4d8a 0%, #3b284e 100%)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cfc9bd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-75 group-active:scale-90 group-active:opacity-60 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] group-active:drop-shadow-none">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </div>

      </div>

      {mounted && createPortal(
        <div className="relative overflow-hidden w-full -mt-32 pb-20">
          <AnimatePresence mode="wait">
            {activeTicket && (
              <motion.div
                key={activeTicket.id}
                initial={{ y: "-110%", opacity: 0 }}
                animate={{
                  y: ["-110%", "-70%", "-72%", "-40%", "-42%", "-10%", "-12%", "0%"],
                  opacity: 1,
                  rotate: [0, -0.5, 0.5, -0.3, 0.3, 0],
                }}
                exit={{
                  y: "110%",
                  opacity: 0,
                  transition: { duration: 0.6, ease: "backIn" }
                }}
                transition={{
                  y: {
                    duration: 1.2,
                    times: [0, 0.25, 0.3, 0.55, 0.6, 0.85, 0.9, 1],
                    ease: "easeInOut"
                  },
                  opacity: { duration: 0.2 },
                  rotate: { duration: 1.2, ease: "linear" }
                }}
                className="relative mx-auto w-full max-w-4xl z-10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)] rounded-none flex flex-col border border-black/5 selection:bg-black/10 serrated-edge"
              >
                <div className="flex-1 px-8 md:px-12 py-16 text-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-10 flex flex-col items-center"
                  >
                    <div className="w-12 h-12 mb-4 opacity-80 contrast-125 grayscale invert">
                      <img src="/Logo.png" alt="" className="w-full h-full object-contain brightness-0" />
                    </div>
                    <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500">
                      UNK EDITION
                    </p>
                    <div className="w-full border-t border-dashed border-black/20 mt-6" />
                  </motion.div>

                  <div className="flex flex-col items-center mb-10">
                    <div className="flex items-center justify-between w-full mb-6 text-[9px] font-mono text-zinc-400 uppercase tracking-widest border-b border-black/5 pb-4">
                      <div className="flex items-center gap-2 flex-1 justify-start">
                        {getCategoryIcon(activeTicket.category) && (
                          <img src={getCategoryIcon(activeTicket.category)!} className="w-5 h-5 grayscale contrast-125 brightness-0" alt="" />
                        )}
                        <span className="font-bold text-black">{activeTicket.category}</span>
                      </div>

                      <div className="flex-1 text-center font-bold">
                        {activeTicket.date}
                      </div>

                      <div className="flex-1 text-right">
                        {formatViews(activeTicket.views)} VISITAS
                      </div>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-[#0E0509] leading-none mb-6">
                      {renderTitle(activeTicket.title)}
                    </h2>

                    {activeTicket.subtitle && (
                      <p className="text-sm md:text-base font-mono text-zinc-500 uppercase leading-relaxed max-w-xl">
                        {activeTicket.subtitle}
                      </p>
                    )}
                  </div>

                  <div className={`relative w-full mb-6 overflow-hidden border border-black/10 ${activeTicket.video ? 'h-auto' : 'aspect-[21/9] grayscale contrast-125'}`}>
                    {activeTicket.video ? (
                      <video
                        src={activeTicket.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-auto block"
                      />
                    ) : (
                      <img
                        src={activeTicket.image || "https://i.postimg.cc/SKRXS9MK/035.png"}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_bottom,transparent_50%,black_50%)] bg-[length:100%_4px]" />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap justify-center gap-2 mt-2 mb-12">
                    {activeTicket.tags && activeTicket.tags.split(',').map((tag: string, idx: number) => (
                      <span key={idx} className="text-[9px] font-mono border border-black/20 px-2 py-0.5 text-zinc-400 uppercase tracking-widest">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="prose prose-zinc max-w-none mb-12 text-center">
                    <div className="space-y-8 text-sm md:text-base text-[#0E0509] leading-[1.8] font-mono uppercase max-w-2xl mx-auto">
                      {activeTicket.body && activeTicket.body.map((para: string, idx: number) => (
                        <p key={idx}>
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>

                  {activeTicket.link && (
                    <div className="mb-16 flex flex-col items-center gap-4">
                      <div className="w-full border-t border-dashed border-black/10 mb-8" />
                      <a
                        href={activeTicket.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col items-center transition-transform active:scale-95 outline-none"
                      >
                        <div className="w-16 h-16 flex items-center justify-center grayscale brightness-0 opacity-80 group-hover:opacity-100 transition-opacity">
                          <svg viewBox="0 0 24 24" className="w-full h-full fill-current text-black">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.247 2.242 1.308 3.607.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.061 1.365-.333 2.632-1.308 3.607-.975.975-2.242 1.247-3.607 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.365-.061-2.632-.333-3.607-1.308-.975-.975-1.247-2.242-1.308-3.607-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.247 3.607-1.308 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.353 2.612 6.773 6.972 6.973 1.28.058 1.688.072 4.948.072s3.668-.014 4.948-.072c4.351-.2 6.77-2.612 6.97-6.973.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.2-4.353-2.612-6.773-6.972-6.973C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                          </svg>
                        </div>
                      </a>
                    </div>
                  )}

                  <div className="w-full border-t border-dashed border-black/20 mb-12" />

                  <div className="flex flex-col items-center gap-6 opacity-80">
                    <div className="flex items-end h-24 w-full grayscale opacity-100 overflow-hidden bg-white px-1">
                      {[...Array(160)].map((_, i) => {
                        const pattern = [1, 2, 1, 1, 3, 1, 2, 1, 4, 1, 1, 2, 1, 3, 2, 1];
                        const weight = pattern[i % pattern.length];
                        const isBlack = (i % 2 === 0);
                        return (
                          <div
                            key={i}
                            className={isBlack ? "bg-black" : "bg-transparent"}
                            style={{ flex: `${weight} 0 0`, height: '100%' }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>,
        document.getElementById('ticket-output')!
      )}

      <NewsFooter
        externalSelectedDev={selectedDev}
        onDevClick={handleDevClick}
      />

      <Script
        src="https://platform.instagram.com/en_US/embeds.js"
        strategy="afterInteractive"
      />
    </main>
  );
}
