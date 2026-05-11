"use client";

import React, { useMemo } from "react";
import { HeroParallax } from "@/components/hero-parallal";
import { articlesData } from "@/app/news/Recent";

/* =========================================================
   BASE IMAGEKIT SET (Filtered for English-like content)
   ========================================================= */

function buildBaseImages(count = 40) {
  const baseURL = "https://ik.imagekit.io/waxuvuasch/news";
  // We'll use a subset that typically contains more English/Clean layouts
  // or just provide the known English ones.
  return Array.from({ length: count }, (_, i) => {
    const id = i + 1;
    const ext = id <= 82 ? "jpeg" : "jpg";
    return `${baseURL}/${id}.${ext}`;
  });
}

/* =========================================================
   HERO PARALLAX PRODUCTS
   ========================================================= */

function buildHeroProducts() {
  // Using English articles from Recent.tsx
  const englishArticles = articlesData.map((article) => ({
    title: article.title,
    link: article.link,
    thumbnail: article.image.src,
  }));

  const remainingCount = Math.max(0, 40 - englishArticles.length);

  const baseImages = buildBaseImages(remainingCount).map((url, index) => ({
    title: `Archive Report ${index + 1}`,
    link: "#",
    thumbnail: url,
  }));

  return [
    ...englishArticles,
    ...baseImages,
  ].slice(0, 40);
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function HeroParallaxNews() {
  const products = useMemo(() => buildHeroProducts(), []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      <HeroParallax products={products} />
    </div>
  );
}
