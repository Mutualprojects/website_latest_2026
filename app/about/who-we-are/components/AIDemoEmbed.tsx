"use client";

import React from "react";

interface AIDemoEmbedProps {
  src: string;
  title?: string;
}

export default function AIDemoEmbed({
  src,
  title = "AI Demo",
}: AIDemoEmbedProps) {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <h2 className="text-3xl font-semibold text-[#07518a] mb-6">
          {title}
        </h2>

        {/* Responsive iframe */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 shadow-lg">
          <iframe
            src={src}
            title={title}
            className="absolute inset-0 w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"
          />
        </div>
      </div>
    </section>
  );
}
