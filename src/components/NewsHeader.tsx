"use client";

import Link from "next/link";

export default function NewsHeader() {
  return (
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
        <Link href="/" className="pointer-events-auto">
          <img alt="UNK Logo" className="h-10 md:h-24 w-auto object-contain transform scale-125 md:scale-150 transition-transform brightness-[0.8] drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]" src="https://i.postimg.cc/2jKR5Cpd/unk-logo.png" style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))' }} />
        </Link>
      </div>

      {/* Right Block */}
      <div className="flex flex-1 items-start justify-end h-full relative z-10 w-1/4 md:w-1/3">
        <img alt="PSY-OP EDITION" className="h-10 md:h-24 w-auto object-contain brightness-[0.8] drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]" src="https://i.postimg.cc/gcTF0G9q/PSY-OP.png" style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))' }} />
      </div>
    </header>
  );
}
