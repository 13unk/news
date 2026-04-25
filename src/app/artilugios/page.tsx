"use client";

import NewsHeader from "@/components/NewsHeader";
import NewsNav from "@/components/NewsNav";
import NewsFooter from "@/components/NewsFooter";

export default function ArtilugiosPage() {
  return (
    <div className="bg-[var(--background)] text-[#1b1b1b] font-sans min-h-screen">
      <NewsHeader />
      <main className="pt-48 pb-20 flex flex-col items-center">
        <NewsNav />
        <div className="max-w-4xl w-full px-6 py-20 text-center">
          <h1 className="text-4xl font-black uppercase tracking-widest text-[#5e3e6a] mb-8">
            Artilugios
          </h1>
          <p className="text-xl opacity-70">
            Sección de herramientas y dispositivos experimentales. Solo para personal autorizado.
          </p>
        </div>
        <NewsFooter />
      </main>
    </div>
  );
}
