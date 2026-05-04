import React from "react";
import Link from "next/link";

export default function ChassisControl() {
  return (
    <div className="absolute top-0 left-0 z-[150] flex flex-col pointer-events-none">
      {/* Metallic Plate */}
      <div
        className="relative flex flex-col"
        style={{
          clipPath: 'polygon(0 40px, 40px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)',
          width: 'var(--chassis-corner-width)',
          height: 'var(--chassis-corner-height)',
          background: `
            linear-gradient(135deg, #f4f4f5 0%, #a1a1aa 45%, #71717a 100%),
            repeating-linear-gradient(0deg, rgba(0,0,0,0.01) 0px, rgba(0,0,0,0.01) 1px, transparent 1px, transparent 2px)
          `,
          backgroundBlendMode: 'overlay'
        }}
      >
        {/* Bevel Highlights */}
        <div className="absolute inset-0 pointer-events-none" style={{ clipPath: 'polygon(0 40px, 40px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)', borderTop: '3px solid rgba(255,255,255,0.7)', borderLeft: '3px solid rgba(255,255,255,0.3)' }} />

        {/* Navigation Controls Cluster */}
        <div className="flex-1 flex flex-col justify-center px-4 md:px-12 pt-4 md:pt-10 pb-4 pointer-events-auto overflow-hidden">
          <div className="flex items-center justify-between gap-2 md:gap-4">
            {/* HOME */}
            <Link href="/" className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className="w-8 h-8 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:scale-110 active:scale-95 transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-[8px] font-black tracking-[0.3em] text-black/50 uppercase leading-none">Home</span>
            </Link>

            {/* GO */}
            <Link href="/go" className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className="w-8 h-8 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:scale-110 active:scale-95 transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-black">
                  <path d="M6 11H3V7h3v4zm15-4h-3v4h3V7zM8 4h8v2H8V4zm0 14h2v-2H8v2zm6 0h2v-2h-2v2zm-2-2h-2v-2h2v2zm6-4h-2v-2h2v2zM6 12h2v-2H6v2zm6 0h2v-2h-2v2zm-4 4h8v-2H8v2z" />
                </svg>
              </div>
              <span className="text-[8px] font-black tracking-[0.3em] text-black/50 uppercase leading-none">Go</span>
            </Link>

            {/* SHOP */}
            <Link href="/botin" className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className="w-8 h-8 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:scale-110 active:scale-95 transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <span className="text-[8px] font-black tracking-[0.3em] text-black/50 uppercase leading-none">Shop</span>
            </Link>

            {/* PRENSA */}
            <Link href="/news" className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className="w-8 h-8 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:scale-110 active:scale-95 transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                  <path d="M18 14h-8" />
                  <path d="M15 18h-5" />
                  <path d="M10 6h8v4h-8V6Z" />
                </svg>
              </div>
              <span className="text-[8px] font-black tracking-[0.3em] text-black/50 uppercase leading-none">Prensa</span>
            </Link>

            {/* TV */}
            <Link href="/tv" className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className="w-8 h-8 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:scale-110 active:scale-95 transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
                  <polyline points="17 2 12 7 7 2" />
                </svg>
              </div>
              <span className="text-[8px] font-black tracking-[0.3em] text-black/50 uppercase leading-none">TV</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Recessed Social Pocket Cluster */}
      <div className="mt-4 md:mt-8 ml-4 md:ml-12 pointer-events-auto">
        <div
          className="px-4 py-2 md:px-8 md:py-4 bg-[#cfc9bd] w-fit rounded-[15px] md:rounded-[20px] shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.7)] border border-black/5 flex items-center justify-center"
        >
          <div className="flex items-center gap-6 opacity-30">
            <a href="https://instagram.com/unkedition" target="_blank" className="hover:opacity-100 hover:scale-110 transition-all">
              <img src="https://i.postimg.cc/mhfHSKnp/ig-icon.png" alt="IG" className="w-5 h-5 grayscale brightness-0" />
            </a>
            <a href="https://youtube.com/@unkedition" target="_blank" className="hover:opacity-100 hover:scale-110 transition-all">
              <img src="https://i.postimg.cc/w38mknrf/yt-icon.png" alt="YT" className="w-5 h-5 grayscale brightness-0" />
            </a>
            <a href="https://discord.com/invite/HFvzdY9YwT" target="_blank" className="hover:opacity-100 hover:scale-110 transition-all">
              <img src="https://i.postimg.cc/hhWd0NY3/dc-icon.png" alt="DC" className="w-5 h-5 grayscale brightness-0" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
