"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface NavButtonProps {
  label: string;
  href?: string;
  locked?: boolean;
  isLarge?: boolean;
}

function UnifiedNavButton({ label, href, locked, isLarge }: NavButtonProps) {
  const [isLocked, setIsLocked] = useState(false);

  const handleLock = () => {
    if (locked) {
      if (isLocked) return;
      setIsLocked(true);
      setTimeout(() => {
        setIsLocked(false);
      }, 500);
    }
  };

  const Content = (
    <motion.div
      onClick={!href ? handleLock : undefined}
      initial={{
        boxShadow: "inset -4px -4px 10px rgba(0,0,0,0.4), inset 4px 4px 8px rgba(255,255,255,0.2), 4px 4px 12px rgba(0,0,0,0.3)",
      }}
      whileTap={(isLocked && locked) ? {} : {
        scale: 0.98,
        boxShadow: "inset -6px 6px 8px rgba(0, 0, 0, 0.5), inset 3px -3px 5px rgba(0, 0, 0, 0.4), 0px 0px 0px rgba(0,0,0,0)",
      }}
      transition={{ type: "spring", stiffness: 600, damping: 20 }}
      className={`${isLarge ? 'px-6 py-2.5 md:px-10 md:py-4' : 'px-5 py-2 md:px-7 md:py-3'} rounded-full flex items-center justify-center transition-all duration-300 outline-none border-none w-full ${(isLocked && locked) ? 'grayscale opacity-60' : 'cursor-pointer'
        }`}
      style={{ backgroundColor: '#5e3e6a' }}
    >
      <span className={`tactile-etched ${isLarge ? 'text-[0.7rem] md:text-[0.85rem] tracking-[0.3em]' : 'text-[0.65rem] md:text-[0.7rem] tracking-[0.2em]'} font-bold uppercase whitespace-nowrap`} style={{ color: '#CFC9BD' }}>
        {label}
      </span>
    </motion.div>
  );

  return (
    <div className="tactile-pill-niche p-1 shrink-0 snap-center">
      {href ? (
        <Link href={href} className="w-full block">
          {Content}
        </Link>
      ) : (
        Content
      )}
    </div>
  );
}

export default function NewsNav() {
  return (
    <div className="relative w-full max-w-[100vw] overflow-hidden">
      <div className="mb-6 mt-6 md:mb-12 md:mt-12 flex items-center justify-start md:justify-center gap-2 md:gap-4 w-full overflow-x-auto snap-x snap-mandatory scrollbarHide py-2 px-4 md:px-0 relative z-20">
        <UnifiedNavButton label="RELATOS" locked={true} />
        <UnifiedNavButton label="PRENSA" href="/news" />
        <UnifiedNavButton label="HOME OF THE UNKLASSIFIABLE" href="/" isLarge={true} />
        <UnifiedNavButton label="ARTILUGIOS" href="/artilugios" />
        <UnifiedNavButton label="BOTÍN" href="/botin" />
      </div>
    </div>
  );
}
