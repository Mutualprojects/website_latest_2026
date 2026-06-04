"use client";

import React, { useRef, useMemo, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import newsConceptImg from "./tiny-people-read-breaking-news-online-using-laptop-breaking-news-concept.png";

/* ================= TYPES ================= */

export type HeroProduct = {
  title: string;
  link: string;
  thumbnail: string;
};

type HeroParallaxProps = {
  products: HeroProduct[];
};

/* ================= PRODUCT CARD ================= */

type ProductCardProps = {
  product: HeroProduct;
  translate: MotionValue<number>;
  onClick: () => void;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  translate,
  onClick,
}) => (
  <motion.div
    style={{ x: translate }}
    whileHover={{ y: -16, transition: { duration: 0.3, ease: "easeOut" } }}
    onClick={onClick}
    className="
      group relative flex-shrink-0 cursor-pointer
      w-64 sm:w-72 md:w-80 lg:w-96
      h-48 sm:h-56 md:h-64
      rounded-2xl overflow-hidden
      shadow-2xl ring-1 ring-black/10
      hover:ring-[#07518a]/40
      bg-neutral-900
      transition-shadow duration-300
    "
  >
    {/* Uniform image: fills card, top-anchored crop */}
    <img
      src={product.thumbnail}
      alt={product.title}
      loading="lazy"
      className="
        absolute inset-0 h-full w-full
        object-cover object-top
        transition-transform duration-500 group-hover:scale-110
      "
    />

    {/* Overlay */}
    <div className="
      absolute inset-0
      bg-gradient-to-t from-black/80 via-black/20 to-transparent
      opacity-50 group-hover:opacity-90
      transition-opacity duration-300
    " />

    {/* Card content — slides up on hover */}
    <div className="
      absolute inset-0 flex flex-col justify-end p-5 gap-2
      opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0
      transition-all duration-300
    ">
      <span className="
        inline-flex w-fit items-center px-3 py-1
        rounded-full bg-white/10 backdrop-blur-md border border-white/20
        text-[9px] text-white font-bold uppercase tracking-widest
      ">
        Media Report
      </span>
      <h2 className="text-white text-sm md:text-base font-bold leading-tight line-clamp-2 drop-shadow-md">
        {product.title}
      </h2>
      <div className="flex items-center gap-1 text-white/60 text-xs font-medium">
        <span>View Full Coverage</span>
        <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  </motion.div>
);

/* ================= DAISY UI MODAL ================= */

type MediaModalProps = {
  product: HeroProduct | null;
  onClose: () => void;
};

export const MediaModal: React.FC<MediaModalProps> = ({ product, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (product) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [product]);

  // Close on native dialog close (Escape key)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box bg-white border-none rounded-[2.5rem] p-0 overflow-hidden max-w-5xl w-full shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)]">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-100 bg-neutral-50/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#07518a] shadow-[0_0_10px_#07518a44]" />
            <span className="text-neutral-900 text-xs font-black uppercase tracking-[0.25em] line-clamp-1 max-w-md">
              {product?.title}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {product && (
              <a
                href={product.thumbnail}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#07518a]/5 hover:bg-[#07518a]/10 rounded-2xl transition-all border border-[#07518a]/10 active:scale-90 group"
                title="Open original"
              >
                <svg className="w-5 h-5 text-[#07518a] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            )}
            <form method="dialog">
              <button className="p-3 bg-neutral-100 hover:bg-neutral-200 rounded-2xl transition-all border border-neutral-200 active:scale-90 group">
                <svg className="w-5 h-5 text-neutral-600 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* ── Scrollable Image Area ── */}
        <div className="w-full max-h-[75vh] overflow-y-auto bg-[#f8fafc] flex items-start justify-center custom-scrollbar-modal">
          {product && (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-auto block shadow-inner"
            />
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-10 py-8 bg-neutral-50/80 border-t border-neutral-100 flex flex-col items-center gap-4">
          <p className="text-[#07518a] text-lg md:text-xl font-extrabold tracking-tight text-center leading-tight max-w-2xl">
            {product?.title}
          </p>
          <div className="px-5 py-2 bg-[#07518a]/5 rounded-full border border-[#07518a]/10">
            <p className="text-[#07518a] text-[10px] uppercase tracking-[0.4em] font-black">
              Official Media Report
            </p>
          </div>
        </div>
      </div>

      {/* Click-outside-to-close */}
      <form method="dialog" className="modal-backdrop bg-black/60 backdrop-blur-sm">
        <button>close</button>
      </form>
    </dialog>
  );
};

/* ================= HERO PARALLAX ================= */

export const HeroParallax: React.FC<HeroParallaxProps> = ({ products }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [selectedProduct, setSelectedProduct] = React.useState<HeroProduct | null>(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const cardsPerRow = isMobile ? 3 : 5;
  const translateAmount = isMobile ? 300 : 1200;

  const rows = useMemo(() => {
    const result: HeroProduct[][] = [];
    for (let i = 0; i < products.length; i += cardsPerRow) {
      result.push(products.slice(i, i + cardsPerRow));
    }
    return result;
  }, [products, cardsPerRow]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const spring = { stiffness: 300, damping: 30, bounce: 0 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, translateAmount]), spring);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -translateAmount]), spring);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), spring);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), spring);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-600, 200]), spring);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.1], [0.1, 1]), spring);

  const handleClose = useCallback(() => setSelectedProduct(null), []);

  return (
    <>
      <section
        ref={ref}
        className="
          relative h-[400vh] md:h-[550vh]
          overflow-hidden pt-10 pb-40 md:pt-20 md:pb-60 antialiased
          [perspective:1000px] [transform-style:preserve-3d]
          bg-gradient-to-br from-slate-50 via-white to-blue-50/20
        "
      >
        <Header />

        {/* Floating Scroll Button */}
        <div className="relative mx-auto max-w-7xl px-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-20 right-6 w-14 h-14 bg-[#07518a] rounded-full flex items-center justify-center shadow-2xl pointer-events-auto cursor-pointer hover:bg-[#064170] transition-colors group z-20"
          >
            <svg className="w-6 h-6 text-white group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>

        <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
          {rows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              className={`
                flex mb-20 md:mb-32 gap-12 md:gap-24
                ${rowIndex % 2 === 0 ? "flex-row-reverse" : "flex-row"}
              `}
            >
              {row.map((product) => (
                <ProductCard
                  key={product.title}
                  product={product}
                  translate={rowIndex % 2 === 0 ? translateX : translateXReverse}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* DaisyUI Modal — rendered outside the parallax section */}
      <MediaModal product={selectedProduct} onClose={handleClose} />
    </>
  );
};

/* ================= HEADER ================= */

export const Header: React.FC = () => (
  <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-20 md:pt-20 md:pb-32">
    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
      {/* Left Side: Content */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[2px] w-12 bg-[#07518a]" />
          <span className="text-[#07518a] font-bold text-xs uppercase tracking-[0.4em]">
            Media Intelligence
          </span>
        </div>

        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-[#07518a] leading-[0.95] tracking-tighter mb-8">
          Brihaspathi <br />
          <span className="text-transparent [--stroke:#07518a]"
            style={{ WebkitTextStroke: "1.5px #07518a" }}>
            the News
          </span>
        </h1>

        {/* Brand Icon Badge */}
        {/* <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center w-14 h-14 bg-neutral-900 rounded-2xl shadow-xl mb-10 rotate-3 hover:rotate-0 transition-transform duration-300"
        >

        </motion.div> */}

        <div className="space-y-8">
          <p className="text-lg md:text-xl text-neutral-600 font-medium leading-relaxed">
            Brihaspathi Technologies has been widely featured across leading national
            and regional newspapers for its achievements in technology innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 pt-4 border-t border-neutral-100">
            <div className="flex-1">
              <span className="block text-[10px] text-neutral-400 uppercase font-bold mb-1">Featured in</span>
              <span className="text-sm font-bold text-neutral-800">200 Media Houses</span>
            </div>
            <div className="flex-1 border-l sm:border-l sm:pl-6 border-neutral-100">
              <span className="block text-[10px] text-neutral-400 uppercase font-bold mb-1">Coverage</span>
              <span className="text-sm font-bold text-neutral-800">Global & Pan india</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Side: Illustration */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, x: 30 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="w-full md:w-1/2"
      >
        <img 
          src={newsConceptImg.src} 
          alt="Media Intelligence Concept"
          className="w-full h-auto mix-blend-multiply transition-transform duration-500 hover:scale-105"
        />
      </motion.div>
    </div>
  </div>
);