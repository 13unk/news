"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Home.module.css";

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState((4 * 3600) + (21 * 60) + 58);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#f9f9f9] text-[#1b1b1b] font-sans overflow-x-hidden selection:bg-[#c00100] selection:text-white min-h-screen">
      {/* HEADER */}
      <header className="absolute top-0 w-full bg-surface/80 backdrop-blur-md flex justify-between items-start px-4 md:px-8 z-[100] pt-6 md:pt-10">
        {/* Social Icons */}
        <div className="flex flex-1 items-center h-full pt-0 relative z-10 w-1/4 md:w-1/3">
          <div className="flex gap-2 md:gap-3">
            <a href="https://instagram.com/unkedition" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 hover:opacity-80 transition-opacity">
              <img alt="Instagram" className="h-full w-full object-contain" src="https://i.postimg.cc/mhfHSKnp/ig-icon.png"/>
            </a>
            <a href="https://youtube.com/@unkedition" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 hover:opacity-80 transition-opacity">
              <img alt="YouTube" className="h-full w-full object-contain" src="https://i.postimg.cc/w38mknrf/yt-icon.png"/>
            </a>
            <a href="https://discord.com/invite/HFvzdY9YwT" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 hover:opacity-80 transition-opacity">
              <img alt="Discord" className="h-full w-full object-contain" src="https://i.postimg.cc/hhWd0NY3/dc-icon.png"/>
            </a>
          </div>
        </div>

        {/* Central Branding */}
        <div className="absolute inset-0 flex items-start justify-center pointer-events-none pt-4 md:pt-14">
          <img id="main-logo" alt="UNK Logo" className="h-10 md:h-24 w-auto object-contain pointer-events-auto transform scale-125 md:scale-150 transition-transform brightness-[0.8] drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]" src="https://i.postimg.cc/2jKR5Cpd/unk-logo.png" style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))' }} />
        </div>

        {/* Right Block */}
        <div className="flex flex-1 items-start justify-end h-full relative z-10 w-1/4 md:w-1/3">
          <img alt="PSY-OP EDITION" className="h-10 md:h-24 w-auto object-contain brightness-[0.8] drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]" src="https://i.postimg.cc/gcTF0G9q/PSY-OP.png" style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))' }} />
        </div>
      </header>

      <main className="pt-24 md:pt-48 pb-20 min-h-screen flex flex-col items-center overflow-x-hidden">
        {/* Navigation Selector */}
        <div className="relative w-full max-w-[100vw] overflow-hidden">
            <div className="mb-6 mt-6 md:mb-12 md:mt-12 flex items-center justify-start md:justify-center gap-2 md:gap-4 w-full overflow-x-auto snap-x snap-mandatory scrollbarHide py-2 px-4 md:px-0">
                <button className="px-5 py-2 md:px-7 md:py-3 rounded-full carved text-[0.65rem] md:text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#5e5e5e] shrink-0 snap-center">
                    TV
                </button>
                <Link href="/news" className="px-5 py-2 md:px-7 md:py-3 rounded-full carved text-[0.65rem] md:text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#5e5e5e] shrink-0 snap-center hover:scale-105 active:scale-95 transition-transform">
                    NEWS
                </Link>
                <Link href="/home" className="px-6 py-2 md:px-10 md:py-4 rounded-full border-2 border-zinc-900 bg-white shadow-md hover:shadow-xl transition-all shrink-0 snap-center relative -top-0.5">
                    <span className="text-[0.7rem] md:text-[0.85rem] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-black whitespace-nowrap">
                        HOME OF THE UNKLASSIFIABLE
                    </span>
                </Link>
                <button className="px-5 py-2 md:px-7 md:py-3 rounded-full carved text-[0.65rem] md:text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#5e5e5e] shrink-0 snap-center">
                    TOOLS
                </button>
                <button className="px-5 py-2 md:px-7 md:py-3 rounded-full carved text-[0.65rem] md:text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#5e5e5e] shrink-0 snap-center">
                    SHOP
                </button>
            </div>
        </div>

        {/* Dynamic Content Wrapper */}
        <div className="w-full flex flex-col items-center">
            {/* Investigation Board Section */}
            <section className={`relative w-full max-w-6xl px-4 py-20 flex flex-col items-center ${styles.tacticalSurface} border border-outline/10 overflow-visible shadow-[inset_0_8px_16px_rgba(0,0,0,0.05),inset_0_-4px_8px_rgba(0,0,0,0.02)]`}>
                <div className="relative z-10 w-full flex flex-col gap-10">
                    {/* Row 1 */}
                    <div className="flex justify-center gap-8 w-full">
                        <div className={`w-[18%] aspect-[4/3] ${styles.investigationPanel} rotate-2`}>
                            <div className={styles.thumbtackPin}></div>
                            <img alt="Transmission A1" src="https://i.postimg.cc/bwqKCr11/project6.png"/>
                        </div>
                        <div className={`w-[18%] aspect-[4/3] ${styles.investigationPanel} -rotate-1`} style={{boxShadow: '0 0 15px 5px rgba(147, 51, 234, 0.4)', border: '2px solid rgba(147, 51, 234, 0.6)'}}>
                            <div className={styles.thumbtackPin}></div>
                            <img alt="Active Transmission" src="https://i.postimg.cc/FHh2Wz0c/project1.png" style={{filter: 'none', opacity: 1}}/>
                        </div>
                        <div className={`w-[18%] aspect-[4/3] ${styles.investigationPanel} rotate-3`}>
                            <div className={styles.thumbtackPin}></div>
                            <img alt="Record Archive" src="https://i.postimg.cc/bwqKCr11/project6.png"/>
                        </div>
                        <div className={`w-[18%] aspect-[4/3] ${styles.investigationPanel} -rotate-2`}>
                            <div className={styles.thumbtackPin}></div>
                            <img alt="System Monitoring" src="https://i.postimg.cc/bwqKCr11/project6.png"/>
                        </div>
                    </div>
                    {/* Row 2 */}
                    <div className="flex justify-center gap-8 w-full">
                        <div className={`w-[16%] aspect-[4/3] ${styles.investigationPanel} -rotate-2`}>
                            <div className={styles.thumbtackPin}></div>
                            <img alt="Signal Sensor" src="https://i.postimg.cc/bwqKCr11/project6.png"/>
                        </div>
                        <div className={`w-[16%] aspect-[4/3] ${styles.investigationPanel} rotate-1`}>
                            <div className={styles.thumbtackPin}></div>
                            <img alt="Node Activity" src="https://i.postimg.cc/bwqKCr11/project6.png"/>
                        </div>
                        <div className={`w-[16%] aspect-[4/3] ${styles.investigationPanel} rotate-2`}>
                            <div className={styles.thumbtackPin}></div>
                            <div className={styles.timerContainer}>
                                <span className={`font-mono text-xl md:text-2xl font-black tracking-widest text-[#9333ea] ${styles.glowText}`}>
                                  {formatTime(timeLeft)}
                                </span>
                            </div>
                        </div>
                        <div className={`w-[16%] aspect-[4/3] ${styles.investigationPanel} -rotate-3`}>
                            <div className={styles.thumbtackPin}></div>
                            <img alt="Archive Tape" src="https://i.postimg.cc/bwqKCr11/project6.png"/>
                        </div>
                        <div className={`w-[16%] aspect-[4/3] ${styles.investigationPanel} rotate-1`}>
                            <div className={styles.thumbtackPin}></div>
                            <img alt="Terminal Interface" src="https://i.postimg.cc/bwqKCr11/project6.png"/>
                        </div>
                    </div>
                    {/* Row 3 */}
                    <div className="flex justify-center gap-8 w-full">
                        <div className={`w-[18%] aspect-[4/3] ${styles.investigationPanel} rotate-1`}>
                            <div className={styles.thumbtackPin}></div>
                            <img alt="Monitor Array" src="https://i.postimg.cc/bwqKCr11/project6.png"/>
                        </div>
                        <div className={`w-[18%] aspect-[4/3] ${styles.investigationPanel} -rotate-2`}>
                            <div className={styles.thumbtackPin}></div>
                            <img alt="Secure Lock" src="https://i.postimg.cc/bwqKCr11/project6.png"/>
                        </div>
                        <div className={`w-[18%] aspect-[4/3] ${styles.investigationPanel} rotate-3`}>
                            <div className={styles.thumbtackPin}></div>
                            <img alt="Network Map" src="https://i.postimg.cc/bwqKCr11/project6.png"/>
                        </div>
                        <div className={`w-[18%] aspect-[4/3] ${styles.investigationPanel} -rotate-1`}>
                            <div className={styles.thumbtackPin}></div>
                            <img alt="End Transmission" src="https://i.postimg.cc/bwqKCr11/project6.png"/>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        {/* Historial de Drops */}
        <section className="w-full max-w-6xl mt-32 flex flex-col items-center px-4 md:px-12 border-y border-outline/5 py-8 overflow-hidden">
            <div className="flex flex-col w-full">
                <div className="mb-8 self-center">
                    <div className="px-6 py-1.5 rounded-full border shadow-sm bg-black border-black">
                        <span className="text-[0.65rem] font-bold tracking-[0.3em] text-white uppercase">HISTORIAL DE DROPS</span>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-4 w-full overflow-hidden">
                    <div className="flex items-end justify-center gap-4 py-2 flex-wrap md:flex-nowrap w-full max-w-5xl">
                        {[...Array(12)].map((_, i) => (
                           <div key={i} className="flex-shrink-0 w-14 flex flex-col items-center justify-center gap-1.5">
                               <div className="w-10 h-10 flex items-center justify-center">
                                   <img alt="Drop Item" className="w-full h-full object-contain" src="https://i.postimg.cc/C5PFh8G7/drop3.png"/>
                               </div>
                               <span className="text-[7px] text-[#5e5e5e] tracking-widest uppercase text-center">UPCOMING</span>
                           </div>
                        ))}
                    </div>
                    {/* Add Button */}
                    <button className={`flex-shrink-0 w-14 h-12 flex items-center justify-start pl-3 bg-black shadow-lg text-white hover:bg-gray-800 transition-all ml-4 ${styles.animatePulseIntense} ${styles.shapeArrow}`}>
                        <span className="text-2xl mb-0.5">+</span>
                    </button>
                </div>
            </div>
        </section>

        {/* Combined News and Footer Branding */}
        <section className="w-full max-w-6xl mt-24 mb-32 flex flex-col md:flex-row items-center justify-between gap-16 px-4 md:px-12 overflow-hidden">
            {/* News Section */}
            <div className="flex flex-col flex-[2] w-full">
                <div className="mb-8 self-start ml-4">
                    <Link href="/news" className="px-6 py-1 rounded-full border shadow-sm bg-black border-black hover:bg-zinc-800 transition-colors">
                        <span className="text-[0.65rem] font-bold tracking-[0.2em] text-white uppercase">NEWS</span>
                    </Link>
                </div>
                <div className={`relative h-48 ${styles.perspectiveNews} ${styles.maskFadeX} overflow-hidden w-full`}>
                    {/* Rows of news cards */}
                    <div className="absolute top-0 left-0 w-max scale-75 origin-top-left opacity-40">
                        <div className="flex flex-nowrap w-max">
                            <div className={`flex gap-2 pr-2 shrink-0 ${styles.animateScrollRight}`} style={{animationDuration: '160s'}}>
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="h-16 w-32 bg-white border border-outline/10 rounded-md overflow-hidden shrink-0">
                                        <img alt="News card" className="w-full h-full object-cover" src={`https://i.postimg.cc/${i % 3 === 0 ? 'W4CCBWTs/card4.png' : i % 3 === 1 ? 'wBZZCfg6/card5.png' : 'HxnvG7Ls/card6.png'}`}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-2 left-0 w-max scale-90 origin-top-left opacity-70">
                        <div className="flex flex-nowrap w-max">
                            <div className={`flex gap-4 pr-4 shrink-0 ${styles.animateScrollLeft}`} style={{animationDuration: '160s'}}>
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="h-20 w-36 bg-white border border-outline/10 rounded-md overflow-hidden shrink-0">
                                        <img alt="News card" className="w-full h-full object-cover" src={`https://i.postimg.cc/${i % 3 === 0 ? 'W4CCBWTs/card4.png' : i % 3 === 1 ? 'wBZZCfg6/card5.png' : 'HxnvG7Ls/card6.png'}`}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-4 left-0 w-max scale-100 origin-top-left opacity-100">
                        <div className="flex flex-nowrap w-max">
                            <div className={`flex gap-6 pr-6 shrink-0 ${styles.animateScrollRight}`} style={{animationDuration: '160s'}}>
                                {[...Array(15)].map((_, i) => (
                                    <div key={i} className="h-24 w-44 bg-white border border-outline/20 shadow-md rounded-md overflow-hidden shrink-0">
                                        <img alt="News card" className="w-full h-full object-cover" src={`https://i.postimg.cc/${i % 3 === 0 ? 'W4CCBWTs/card4.png' : i % 3 === 1 ? 'wBZZCfg6/card5.png' : 'HxnvG7Ls/card6.png'}`}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer Branding */}
            <div className="flex-shrink-0 flex items-center justify-center flex-1">
                <img alt="Footer Branding" className="w-48 md:w-64 opacity-90 mix-blend-multiply" src="https://i.postimg.cc/dVvKb4c7/footer.png" style={{filter: 'contrast(1.1) grayscale(0.2)'}}/>
            </div>
        </section>
      </main>
    </div>
  );
}
