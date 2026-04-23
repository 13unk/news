"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import NewsHeader from "@/components/NewsHeader";
import NewsNav from "@/components/NewsNav";
import NewsFooter from "@/components/NewsFooter";
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
    <div className="bg-[var(--background)] text-[#1b1b1b] font-sans overflow-x-hidden selection:bg-[#c00100] selection:text-white min-h-screen">
      {/* HEADER */}
      <NewsHeader />

      <main className="pt-24 md:pt-48 pb-20 min-h-screen flex flex-col items-center overflow-x-hidden">
        {/* Navigation Selector */}
        <NewsNav />

        {/* Dynamic Content Wrapper */}
        <div className="w-full flex flex-col items-center">
          {/* Investigation Board Section */}
          <section className="relative w-full max-w-6xl px-4 py-20 flex flex-col items-center tactile-niche my-10">
            <div className="relative z-10 w-full flex flex-col gap-10">
              {/* Row 1 */}
              <div className="flex justify-center gap-8 w-full">
                <div className={`w-[18%] aspect-[4/3] ${styles.investigationPanel} rotate-2`}>
                  <div className={styles.thumbtackPin}></div>
                  <img alt="Transmission A1" src="https://i.postimg.cc/bwqKCr11/project6.png" />
                </div>
                <div className={`w-[18%] aspect-[4/3] ${styles.investigationPanel} -rotate-1`} style={{ boxShadow: '0 0 15px 5px rgba(147, 51, 234, 0.4)', border: '2px solid rgba(147, 51, 234, 0.6)' }}>
                  <div className={styles.thumbtackPin}></div>
                  <img alt="Active Transmission" src="https://i.postimg.cc/FHh2Wz0c/project1.png" style={{ filter: 'none', opacity: 1 }} />
                </div>
                <div className={`w-[18%] aspect-[4/3] ${styles.investigationPanel} rotate-3`}>
                  <div className={styles.thumbtackPin}></div>
                  <img alt="Record Archive" src="https://i.postimg.cc/bwqKCr11/project6.png" />
                </div>
                <div className={`w-[18%] aspect-[4/3] ${styles.investigationPanel} -rotate-2`}>
                  <div className={styles.thumbtackPin}></div>
                  <img alt="System Monitoring" src="https://i.postimg.cc/bwqKCr11/project6.png" />
                </div>
              </div>
              {/* Row 2 */}
              <div className="flex justify-center gap-8 w-full">
                <div className={`w-[16%] aspect-[4/3] ${styles.investigationPanel} -rotate-2`}>
                  <div className={styles.thumbtackPin}></div>
                  <img alt="Signal Sensor" src="https://i.postimg.cc/bwqKCr11/project6.png" />
                </div>
                <div className={`w-[16%] aspect-[4/3] ${styles.investigationPanel} rotate-1`}>
                  <div className={styles.thumbtackPin}></div>
                  <img alt="Node Activity" src="https://i.postimg.cc/bwqKCr11/project6.png" />
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
                  <img alt="Archive Tape" src="https://i.postimg.cc/bwqKCr11/project6.png" />
                </div>
                <div className={`w-[16%] aspect-[4/3] ${styles.investigationPanel} rotate-1`}>
                  <div className={styles.thumbtackPin}></div>
                  <img alt="Terminal Interface" src="https://i.postimg.cc/bwqKCr11/project6.png" />
                </div>
              </div>
              {/* Row 3 */}
              <div className="flex justify-center gap-8 w-full">
                <div className={`w-[18%] aspect-[4/3] ${styles.investigationPanel} rotate-1`}>
                  <div className={styles.thumbtackPin}></div>
                  <img alt="Monitor Array" src="https://i.postimg.cc/bwqKCr11/project6.png" />
                </div>
                <div className={`w-[18%] aspect-[4/3] ${styles.investigationPanel} -rotate-2`}>
                  <div className={styles.thumbtackPin}></div>
                  <img alt="Secure Lock" src="https://i.postimg.cc/bwqKCr11/project6.png" />
                </div>
                <div className={`w-[18%] aspect-[4/3] ${styles.investigationPanel} rotate-3`}>
                  <div className={styles.thumbtackPin}></div>
                  <img alt="Network Map" src="https://i.postimg.cc/bwqKCr11/project6.png" />
                </div>
                <div className={`w-[18%] aspect-[4/3] ${styles.investigationPanel} -rotate-1`}>
                  <div className={styles.thumbtackPin}></div>
                  <img alt="End Transmission" src="https://i.postimg.cc/bwqKCr11/project6.png" />
                </div>
              </div>
            </div>
          </section>
        </div>

        <NewsFooter />
      </main>
    </div>
  );
}