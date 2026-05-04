"use client";

import NewsHeader from "@/components/NewsHeader";

import NewsFooter from "@/components/NewsFooter";

export default function ArtilugiosPage() {
  return (
    <div className="text-[#1b1b1b] font-sans">
      <NewsHeader />
      <main className="pt-48 pb-20 flex flex-col items-center">

        <div className="max-w-4xl w-full px-6 py-20 text-center">
        </div>
        <NewsFooter />
      </main>
    </div>
  );
}
