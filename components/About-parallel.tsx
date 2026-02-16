"use client";

import React, { useMemo } from "react";
import { HeroParallax } from "@/components/hero-parallal";

/* =========================================================
   IMAGE DATA (REFERENCE YOU PROVIDED)
   ========================================================= */

const HEIGHTS = [220, 260, 300, 340, 380, 420];

const latestNewsImages = [
  "https://ik.imagekit.io/tsuss6ulm/Samarth%20Rashtra,%20P-8,%20Nov%2021.jpg",
  "https://ik.imagekit.io/tsuss6ulm/Nai%20Soch%20Express,%20P-2,%20Nov%2024.jpg",
  "https://ik.imagekit.io/tsuss6ulm/Taasir,%20P-3,%20Nov%2022.jpg",
  "https://ik.imagekit.io/tsuss6ulm/Hamara%20Samaj,%20P-3,%20Nov%2022.jpg",
  "https://ik.imagekit.io/tsuss6ulm/Sanmarg,%20P-2,%20Nov%2024.jpg",
  "https://ik.imagekit.io/tsuss6ulm/Jagriti%20Times,%20P-3,%20Nov%2024.jpg",
  "https://ik.imagekit.io/tsuss6ulm/Sampurn%20Bharat,%20P-2,%20Nov%2024.jpg",
  "https://ik.imagekit.io/tsuss6ulm/Satta%20Ki%20Khoj,%20P-2,%20Nov%2024.jpg",
  "https://ik.imagekit.io/tsuss6ulm/Mithila%20Gaurav,%20P-3,%20Nov%2022.jpg",
  "https://ik.imagekit.io/tsuss6ulm/Bihar%20Din%20Raat,%20P-8,%20Nov%2021.jpg",
];

/* =========================================================
   BASE IMAGEKIT SET (1–96)
   ========================================================= */

function buildBaseImages(count = 96) {
  const baseURL = "https://ik.imagekit.io/waxuvuasch/news";
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
  const allImages = [
    ...latestNewsImages,
    ...buildBaseImages(),
  ];

  return allImages.map((url, index) => ({
    title: `News ${index + 1}`,
    link: "#", // optional, can be replaced
    thumbnail: url,
  }));
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function HeroParallaxNews() {
  const products = useMemo(() => buildHeroProducts(), []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <HeroParallax products={products} />
    </div>
  );
}
