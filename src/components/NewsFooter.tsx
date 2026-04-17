import React from "react";

export default function NewsFooter() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-6 mt-16 mb-8 pt-0 border-t border-black/5 flex justify-start items-start font-mono">
      {/* Left: Credits */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-16 pt-4 text-left">
        <p className="text-zinc-600 text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase whitespace-nowrap">
          © 2026 UNK EDITION
        </p>
        <div className="flex gap-6 md:gap-12">
          {[
            { name: "KURTO", url: "https://instagram.com/kurtogath" },
            { name: "DARIO", url: "https://instagram.com/darioxgd" },
            { name: "TRESILLO", url: "https://instagram.com/tresilllo" }
          ].map(dev => (
            <a 
              key={dev.name} 
              href={dev.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 text-[9px] sm:text-[10px] font-black tracking-[0.3em] uppercase transition-colors hover:text-black whitespace-nowrap"
            >
              {dev.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
