"use client";

import React, { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Search, Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MarqueeProduct {
  id: string | number;
  title: string;
  category?: string;
  image: string;
  href?: string;
}

export interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  description: string;
  ctaText?: string;
  images?: string[];
  products?: MarqueeProduct[];
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  onCtaClick?: () => void;
  className?: string;
}

const ActionButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#07518a] font-bold text-sm shadow-xl transition-all hover:bg-slate-100 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30 uppercase tracking-wider cursor-pointer"
  >
    {children}
    <ArrowUpRight className="h-4 w-4" />
  </motion.button>
);

export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  description,
  ctaText,
  images = [],
  products = [],
  searchQuery = "",
  onSearchChange,
  onCtaClick,
  className,
}) => {
  const FADE_IN_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  // Convert plain image strings to MarqueeProduct objects if provided
  const productList: MarqueeProduct[] = useMemo(() => {
    if (products.length > 0) return products;
    return images.map((src, i) => ({
      id: i,
      title: `Product Showcase ${i + 1}`,
      category: "Enterprise",
      image: src,
      href: "#",
    }));
  }, [products, images]);

  // Duplicate items for a continuous, seamless loop
  const marqueeItems = useMemo(() => {
    if (productList.length === 0) return [];
    let base = [...productList];
    while (base.length < 8) {
      base = [...base, ...productList];
    }
    return [...base, ...base];
  }, [productList]);

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-[#07518a] text-white py-14 md:py-20 px-4 flex flex-col items-center justify-between border-b border-slate-100",
        className
      )}
    >
      {/* Background subtle mesh grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 20%, #ffffff 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <div className="z-10 flex flex-col items-center max-w-4xl mx-auto text-center relative">
        {/* Tagline */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_VARIANTS}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur-md shadow-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          {tagline}
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]"
        >
          {typeof title === "string" ? (
            title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={FADE_IN_VARIANTS}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))
          ) : (
            title
          )}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="show"
          variants={FADE_IN_VARIANTS}
          transition={{ delay: 0.3 }}
          className="mt-5 max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed font-normal"
        >
          {description}
        </motion.p>

        {/* Search Input Bar */}
        {onSearchChange !== undefined && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={FADE_IN_VARIANTS}
            transition={{ delay: 0.4 }}
            className="w-full max-w-xl mt-8 relative"
          >
            <div className="relative flex items-center">
              <Search
                className="absolute left-4 h-5 w-5 text-slate-400"
                aria-hidden
              />
              <input
                type="text"
                placeholder="Search products by title, feature, or keyword…"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-full py-3.5 pl-12 pr-12 text-sm md:text-base text-slate-900 placeholder-slate-400 bg-white shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-4 rounded-full bg-slate-100 hover:bg-slate-200 px-3 py-1 text-xs font-bold text-slate-600 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Call to Action Button */}
        {ctaText && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={FADE_IN_VARIANTS}
            transition={{ delay: 0.5 }}
          >
            <ActionButton onClick={onCtaClick}>{ctaText}</ActionButton>
          </motion.div>
        )}
      </div>

      {/* Animated Product Image Marquee */}
      {marqueeItems.length > 0 && (
        <div className="w-full mt-10 md:mt-14 overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <motion.div
            className="flex gap-5 w-max py-3 px-2"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              ease: "linear",
              duration: 35,
              repeat: Infinity,
            }}
          >
            {marqueeItems.map((prod, index) => {
              const cardMarkup = (
                <div
                  className="relative group w-56 sm:w-64 h-40 sm:h-48 rounded-2xl overflow-hidden bg-white shadow-xl border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:z-20 flex flex-col justify-between"
                  style={{
                    rotate: `${index % 2 === 0 ? -2 : 2.5}deg`,
                  }}
                >
                  {/* Image container */}
                  <div className="relative w-full h-full bg-[#f4f8fb] flex items-center justify-center p-3 overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Category badge floating top left */}
                    {prod.category && (
                      <span className="absolute top-2.5 left-2.5 bg-[#07518a] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                        {prod.category}
                      </span>
                    )}
                  </div>

                  {/* Bottom bar with Product Title */}
                  <div className="bg-slate-900/90 text-white px-3.5 py-2 flex items-center justify-between gap-2 backdrop-blur-md">
                    <span className="text-xs font-bold truncate text-slate-100">
                      {prod.title}
                    </span>
                    <span className="text-[10px] font-semibold text-sky-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 whitespace-nowrap">
                      View <ArrowUpRight className="h-3 w-3 inline" />
                    </span>
                  </div>
                </div>
              );

              return prod.href && prod.href !== "#" ? (
                <Link key={`${prod.id}-${index}`} href={prod.href} className="block cursor-pointer">
                  {cardMarkup}
                </Link>
              ) : (
                <div key={`${prod.id}-${index}`}>{cardMarkup}</div>
              );
            })}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default AnimatedMarqueeHero;
