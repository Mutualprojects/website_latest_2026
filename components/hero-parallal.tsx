"use client";

import React, { useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Link from "next/link";

/* ================= TYPES ================= */

export type HeroProduct = {
  title: string;
  link: string;
  thumbnail: string;
};

type HeroParallaxProps = {
  products: HeroProduct[];
};

/* ================= HERO PARALLAX ================= */

export const HeroParallax: React.FC<HeroParallaxProps> = ({ products }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  /* ---------- RESPONSIVE CONTROLS ---------- */
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  const cardsPerRow = isMobile ? 3 : 5;
  const translateAmount = isMobile ? 300 : 1000;

  /* ---------- SAFE ROW SPLIT ---------- */
  const rows = useMemo(() => {
    return [
      products.slice(0, cardsPerRow),
      products.slice(cardsPerRow, cardsPerRow * 2),
      products.slice(cardsPerRow * 2, cardsPerRow * 3),
    ];
  }, [products, cardsPerRow]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* ---------- SPRING CONFIG ---------- */
  const springConfig = {
    stiffness: 280,
    damping: 32,
    bounce: 0,
  };

  /* ---------- TRANSFORMS ---------- */
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, translateAmount]),
    springConfig
  );

  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -translateAmount]),
    springConfig
  );

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [12, 0]),
    springConfig
  );

  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [10, 0]),
    springConfig
  );

  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [-400, 300]),
    springConfig
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.3, 1]),
    springConfig
  );

  return (
    <section
      ref={ref}
      className="
        relative h-[260vh] md:h-[300vh]
        overflow-hidden
        py-32 md:py-40
        antialiased
        [perspective:1000px]
        [transform-style:preserve-3d]
    
      "
    >
      <Header />

      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
      >
        {/* ROW 1 */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-12 md:space-x-20 mb-16">
          {rows[0].map((product) => (
            <ProductCard
              key={product.title}
              product={product}
              translate={translateX}
            />
          ))}
        </motion.div>

        {/* ROW 2 */}
        <motion.div className="flex flex-row space-x-12 md:space-x-20 mb-16">
          {rows[1].map((product) => (
            <ProductCard
              key={product.title}
              product={product}
              translate={translateXReverse}
            />
          ))}
        </motion.div>

        {/* ROW 3 */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-12 md:space-x-20">
          {rows[2].map((product) => (
            <ProductCard
              key={product.title}
              product={product}
              translate={translateX}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ================= HEADER ================= */

export const Header: React.FC = () => {
  return (
 <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-32">
  <h1 className="text-3xl md:text-7xl font-extrabold text-[#07518a] leading-tight">
    Brihaspathi <br /> In the News
  </h1>

  <p className="max-w-3xl mt-6 text-base md:text-xl text-neutral-600">
    Brihaspathi Technologies has been widely featured across leading national
    and regional newspapers for its achievements in technology innovation,
    manufacturing expansion, funding milestones, and large-scale government
    projects.
  </p>

  <p className="max-w-3xl mt-4 text-sm md:text-base text-neutral-500">
    This section highlights verified media coverage, press releases, and public
    announcements that reflect our growth journey, industry impact, and
    recognition across India.
  </p>
</div>


  );
};

/* ================= PRODUCT CARD ================= */

type ProductCardProps = {
  product: HeroProduct;
  translate: MotionValue<number>;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  translate,
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -16 }}
      className="
        group relative
        h-64 sm:h-80 md:h-96
        w-[18rem] sm:w-[24rem] md:w-[30rem]
        flex-shrink-0
        rounded-xl
        overflow-hidden
      
      "
    >
      <Link href={product.link} className="block h-full w-full">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </Link>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300" />

      {/* Title */}
      <h2 className="absolute bottom-4 left-4 text-white text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity">
        {product.title}
      </h2>
    </motion.div>
  );
};
