"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function NavButton({ label }: { label: string }) {
  return (
    <button 
      className="px-5 py-2 md:px-7 md:py-3 tactile-pill-niche text-[0.65rem] md:text-[0.7rem] font-bold uppercase tracking-[0.2em] shrink-0 snap-center transition-all active:scale-95"
      style={{ backgroundColor: '#6D467B' }}
    >
      <span className="tactile-etched" style={{ color: '#CFC9BD' }}>{label}</span>
    </button>
  );
}

export default function NewsNav() {
  return (
    <div className="relative w-full max-w-[100vw] overflow-hidden">
      <div className="mb-6 mt-6 md:mb-12 md:mt-12 flex items-center justify-start md:justify-center gap-2 md:gap-4 w-full overflow-x-auto snap-x snap-mandatory scrollbarHide py-2 px-4 md:px-0 relative z-20">
          <NavButton label="RELATOS" />
          
          <Link 
            href="/news" 
            className="px-5 py-2 md:px-7 md:py-3 tactile-pill-niche transition-all shrink-0 snap-center relative -top-0.5 active:scale-95"
            style={{ backgroundColor: '#6D467B' }}
          >
              <span className="tactile-etched text-[0.65rem] md:text-[0.7rem] font-black uppercase tracking-[0.2em] whitespace-nowrap" style={{ color: '#CFC9BD' }}>
                  PRENSA
              </span>
          </Link>

          <Link 
            href="/" 
            className="px-6 py-2 md:px-10 md:py-4 tactile-pill-niche text-[0.7rem] md:text-[0.85rem] font-bold uppercase tracking-[0.3em] shrink-0 snap-center active:scale-95"
            style={{ backgroundColor: '#6D467B' }}
          >
              <span className="tactile-etched" style={{ color: '#CFC9BD' }}>HOME OF THE UNKLASSIFIABLE</span>
          </Link>

          <NavButton label="ARTILUGIOS" />
          <NavButton label="BOTÍN" />
      </div>
    </div>
  );
}
