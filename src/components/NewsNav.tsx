"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function NavButton({ label }: { label: string }) {
  const [isLocked, setIsLocked] = useState(false);

  const handleLock = () => {
    if (isLocked) return;
    setIsLocked(true);
    setTimeout(() => {
      setIsLocked(false);
    }, 500);
  };

  return (
    <div className="tactile-pill-niche p-1 shrink-0 snap-center">
      <motion.button 
        onClick={handleLock}
        disabled={isLocked}
        initial={{ 
          boxShadow: "inset -4px -4px 10px rgba(0,0,0,0.4), inset 4px 4px 8px rgba(255,255,255,0.2), 4px 4px 12px rgba(0,0,0,0.3)",
        }}
        whileTap={isLocked ? {} : { 
          scale: 0.98,
          boxShadow: "inset -6px 6px 8px rgba(0, 0, 0, 0.5), inset 3px -3px 5px rgba(0, 0, 0, 0.4), 0px 0px 0px rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 600, damping: 20 }}
        className={`px-5 py-2 md:px-7 md:py-3 rounded-full text-[0.65rem] md:text-[0.7rem] font-bold uppercase tracking-[0.2em] outline-none border-none transition-all duration-300 ${
          isLocked ? 'grayscale opacity-60' : 'cursor-pointer'
        }`}
        style={{ backgroundColor: '#5e3e6a' }}
      >
        <span className="tactile-etched" style={{ color: '#CFC9BD' }}>{label}</span>
      </motion.button>
    </div>
  );
}

export default function NewsNav() {
  return (
    <div className="relative w-full max-w-[100vw] overflow-hidden">
      <div className="mb-6 mt-6 md:mb-12 md:mt-12 flex items-center justify-start md:justify-center gap-2 md:gap-4 w-full overflow-x-auto snap-x snap-mandatory scrollbarHide py-2 px-4 md:px-0 relative z-20">
          <NavButton label="RELATOS" />
          
          <div className="tactile-pill-niche p-1 shrink-0 snap-center relative -top-0.5">
            <Link href="/news">
              <motion.div
                initial={{ 
                  boxShadow: "inset -4px -4px 10px rgba(0,0,0,0.4), inset 4px 4px 8px rgba(255,255,255,0.2), 4px 4px 12px rgba(0,0,0,0.3)",
                }}
                whileTap={{ 
                  scale: 0.98,
                  boxShadow: "inset -6px 6px 8px rgba(0, 0, 0, 0.5), inset 3px -3px 5px rgba(0, 0, 0, 0.4), 0px 0px 0px rgba(0,0,0,0)",
                }}
                transition={{ type: "spring", stiffness: 600, damping: 20 }}
                className="px-5 py-2 md:px-7 md:py-3 rounded-full flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: '#5e3e6a' }}
              >
                <span className="tactile-etched text-[0.65rem] md:text-[0.7rem] font-black uppercase tracking-[0.2em] whitespace-nowrap" style={{ color: '#CFC9BD' }}>
                    PRENSA
                </span>
              </motion.div>
            </Link>
          </div>

          <div className="tactile-pill-niche p-1 shrink-0 snap-center">
            <Link href="/">
              <motion.div
                initial={{ 
                  boxShadow: "inset -4px -4px 10px rgba(0,0,0,0.4), inset 4px 4px 8px rgba(255,255,255,0.2), 4px 4px 12px rgba(0,0,0,0.3)",
                }}
                whileTap={{ 
                  scale: 0.98,
                  boxShadow: "inset -6px 6px 8px rgba(0, 0, 0, 0.5), inset 3px -3px 5px rgba(0, 0, 0, 0.4), 0px 0px 0px rgba(0,0,0,0)",
                }}
                transition={{ type: "spring", stiffness: 600, damping: 20 }}
                className="px-6 py-2 md:px-10 md:py-4 rounded-full flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: '#5e3e6a' }}
              >
                <span className="tactile-etched text-[0.7rem] md:text-[0.85rem] font-bold uppercase tracking-[0.3em] whitespace-nowrap" style={{ color: '#CFC9BD' }}>
                  HOME OF THE UNKLASSIFIABLE
                </span>
              </motion.div>
            </Link>
          </div>

          <NavButton label="ARTILUGIOS" />
          <NavButton label="BOTÍN" />
      </div>
    </div>
  );
}
