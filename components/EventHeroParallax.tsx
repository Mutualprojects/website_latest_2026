"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Link from "next/link";

/* ================= TYPES ================= */

export type EventImage = {
  title: string;
  link: string;
  thumbnail: string;
};

/** A single image plus an optional responsive srcSet for crisp rendering. */
export type ImageSource = {
  url: string;
  srcSet?: string;
};

type EventItem = {
  title: string;
  description?: string;
  // Accepts plain URLs (backward compatible) or rich {url, srcSet} sources.
  images: (string | ImageSource)[];
};

type SizeBP = { w: string; h: string };

type EventParallaxProps = {
  events: EventItem[];
  sizes?: {
    mobile?: SizeBP;
    tablet?: SizeBP;
    desktop?: SizeBP;
    large?: SizeBP;
    xl?: SizeBP;
    xxl?: SizeBP;
    gap?: {
      mobile?: string;
      tablet?: string;
      desktop?: string;
      large?: string;
      xl?: string;
    };
  };
};

/* ================= DEFAULT RESPONSIVE SIZES ================= */
/* Scales from small phones -> tablets -> laptops -> Mac/large -> 2xl screens */

const DEFAULT_SIZES = {
  mobile: { w: "w-[9rem]", h: "h-28" },          // < 640px
  tablet: { w: "sm:w-[11rem]", h: "sm:h-40" },   // >= 640px
  desktop: { w: "md:w-[13rem]", h: "md:h-48" },  // >= 768px
  large: { w: "lg:w-[15rem]", h: "lg:h-56" },    // >= 1024px
  xl: { w: "xl:w-[17rem]", h: "xl:h-64" },       // >= 1280px
  xxl: { w: "2xl:w-[19rem]", h: "2xl:h-72" },    // >= 1536px
  gap: {
    mobile: "space-x-4",
    tablet: "sm:space-x-5",
    desktop: "md:space-x-6",
    large: "lg:space-x-7",
    xl: "xl:space-x-8",
  },
};

/* Matches the card widths above so the browser picks the right srcSet image. */
const IMG_SIZES =
  "(min-width:1536px) 19rem, (min-width:1280px) 17rem, (min-width:1024px) 15rem, (min-width:768px) 13rem, (min-width:640px) 11rem, 9rem";

/* ================= FLATTEN TO UNIQUE PRODUCTS ================= */

type Product = EventImage & { _key: string; srcSet?: string };

function flattenUnique(events: EventItem[]): Product[] {
  return events.flatMap((event) =>
    event.images.map((img, index) => {
      const src: ImageSource = typeof img === "string" ? { url: img } : img;
      return {
        title: event.title,
        link: "#",
        thumbnail: src.url,
        srcSet: src.srcSet,
        _key: `${event.title}-${index}`,
      };
    })
  );
}

/* ================= BREAKPOINT HOOK ================= */

type Breakpoint = "mobile" | "tablet" | "desktop" | "xl";

function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 640) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else if (w < 1536) setBp("desktop");
      else setBp("xl");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return bp;
}

/* ================= EVENT PARALLAX ================= */

export const EventParallax: React.FC<EventParallaxProps> = ({
  events,
  sizes,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const s = {
    mobile: { ...DEFAULT_SIZES.mobile, ...(sizes?.mobile ?? {}) },
    tablet: { ...DEFAULT_SIZES.tablet, ...(sizes?.tablet ?? {}) },
    desktop: { ...DEFAULT_SIZES.desktop, ...(sizes?.desktop ?? {}) },
    large: { ...DEFAULT_SIZES.large, ...(sizes?.large ?? {}) },
    xl: { ...DEFAULT_SIZES.xl, ...(sizes?.xl ?? {}) },
    xxl: { ...DEFAULT_SIZES.xxl, ...(sizes?.xxl ?? {}) },
    gap: { ...DEFAULT_SIZES.gap, ...(sizes?.gap ?? {}) },
  };

  const bp = useBreakpoint();

  // Enough cards per row so EVERY row overflows the screen on both edges
  // (no bare left/right gap, no matter the tilt or scroll position).
  const cardsPerRow =
    bp === "mobile" ? 7 : bp === "tablet" ? 9 : bp === "desktop" ? 10 : 12;

  const translateAmount =
    bp === "mobile" ? 200 : bp === "tablet" ? 350 : bp === "desktop" ? 550 : 700;

  const unique = useMemo(() => flattenUnique(events), [events]);

  // Build exactly 3 rows, each fully filled by cycling through the unique
  // images with a per-row offset so adjacent rows don't look identical.
  const rows = useMemo(() => {
    if (unique.length === 0) return [] as Product[][];
    const make = (offset: number) =>
      Array.from({ length: cardsPerRow }, (_, i) => {
        const src = unique[(i + offset) % unique.length];
        return { ...src, _key: `${src._key}-r${offset}-${i}` };
      });
    return [make(0), make(cardsPerRow), make(cardsPerRow * 2)];
  }, [unique, cardsPerRow]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Softer spring => smooth, gliding parallax instead of a snappy follow.
  const spring = { stiffness: 90, damping: 30, mass: 0.6, restDelta: 0.001 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, translateAmount]),
    spring
  );

  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -translateAmount]),
    spring
  );

  // Subtler tilt than before => no harsh diagonal corner gaps.
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [8, 0]),
    spring
  );

  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [5, 0]),
    spring
  );

  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [-120, 120]),
    spring
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.4, 1]),
    spring
  );

  const sizeClass = [
    s.mobile.w, s.mobile.h,
    s.tablet.w, s.tablet.h,
    s.desktop.w, s.desktop.h,
    s.large.w, s.large.h,
    s.xl.w, s.xl.h,
    s.xxl.w, s.xxl.h,
  ].join(" ");

  const gapClass = [
    s.gap.mobile, s.gap.tablet, s.gap.desktop, s.gap.large, s.gap.xl,
  ].join(" ");

  return (
    <section
      ref={ref}
      className="
        relative h-[150vh] w-full
        overflow-hidden
        antialiased
        [perspective:1000px]
        [transform-style:preserve-3d]
      "
    >
      <EventHeader />

      {/* Wider-than-viewport plane so the tilt never exposes a white corner */}
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="-mx-[10vw] w-[120vw] will-change-transform"
      >
        {rows.map((row, rowIndex) => {
          const reverse = rowIndex % 2 === 0; // alternate direction per row
          return (
            <motion.div
              key={`row-${rowIndex}`}
              className={`flex ${
                reverse ? "flex-row-reverse space-x-reverse" : "flex-row"
              } ${gapClass} mb-6 md:mb-8 lg:mb-10`}
            >
              {row.map((item) => (
                <EventCard
                  key={item._key}
                  product={item}
                  translate={reverse ? translateX : translateXReverse}
                  sizeClass={sizeClass}
                />
              ))}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

/* ================= HEADER (no top white space) ================= */

const EventHeader = () => {
  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-8 md:pt-10 md:pb-10 lg:pt-12">
      <p className="uppercase tracking-[0.3em] text-xs sm:text-sm text-[#07518a] mb-2 sm:mb-3">
        Life at Brihaspathi
      </p>

      <h1 className="text-2xl sm:text-4xl md:text-6xl xl:text-7xl font-extrabold text-black leading-tight">
        Our Events & <br /> Celebrations
      </h1>

      <p className="max-w-2xl mt-4 sm:mt-6 text-sm sm:text-base md:text-lg xl:text-xl text-neutral-600">
        Moments that define our culture — celebrations, milestones,
        recognitions, and shared achievements across Brihaspathi Technologies.
      </p>
    </div>
  );
};

/* ================= CARD ================= */

type EventCardProps = {
  product: Product;
  translate: MotionValue<number>;
  sizeClass: string;
};

const EventCard: React.FC<EventCardProps> = ({
  product,
  translate,
  sizeClass,
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -12 }}
      className={`
        group relative flex-shrink-0
        rounded-xl overflow-hidden bg-gray-200 shadow-md
        ${sizeClass}
      `}
    >
      <Link href={product.link} className="block h-full w-full">
        <img
          src={product.thumbnail}
          srcSet={product.srcSet}
          sizes={IMG_SIZES}
          alt={product.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </Link>

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300" />

      <h2 className="absolute bottom-3 left-3 right-3 truncate text-white text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity">
        {product.title}
      </h2>
    </motion.div>
  );
};

/* ================= STRAPI IMAGE HELPERS ================= */

/** Prefixes a Strapi media path with the local /strapi proxy route. */
function buildStrapiUrl(url?: string): string {
  return url ? `/strapi${url}` : "";
}

/**
 * Builds a responsive srcSet string from all available Strapi formats,
 * so the browser can pick the sharpest image that fits each card.
 */
function buildSrcSet(formats: any): string | undefined {
  if (!formats) return undefined;
  const parts: string[] = [];
  for (const key of ["thumbnail", "small", "medium", "large"]) {
    const fmt = formats[key];
    if (fmt?.url && fmt?.width) {
      parts.push(`${buildStrapiUrl(fmt.url)} ${fmt.width}w`);
    }
  }
  return parts.length ? parts.join(", ") : undefined;
}

/**
 * Picks a QUALITY Strapi image (large > medium > small > original),
 * only falling back to the tiny thumbnail if nothing else exists.
 * Also returns a srcSet covering every available format.
 */
function pickQualityImage(media: any): ImageSource {
  if (!media) return { url: "" };
  const f = media.formats ?? media.attributes?.formats;

  const best =
    f?.large?.url ??
    f?.medium?.url ??
    f?.small?.url ??
    media.url ??
    media.attributes?.url ??
    f?.thumbnail?.url ??
    "";

  return {
    url: buildStrapiUrl(best),
    srcSet: buildSrcSet(f),
  };
}

/* ================= DEMO / DATA-FETCHING EXPORT ================= */

export default function EventParallaxDemo() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function fetchEvents() {
      try {
        const res = await fetch("/strapi/api/events?populate=*&pagination[pageSize]=50");
        if (!res.ok) throw new Error("Failed to fetch events");
        const json = await res.json();

        if (active && json.data) {
          const fetchedEvents: EventItem[] = json.data.map((item: any) => {
            const mainImg = pickQualityImage(item.mainImage);
            const galleryImgs: ImageSource[] = (item.eventGallery ?? [])
              .map((g: any) => pickQualityImage(g))
              .filter((img: ImageSource) => Boolean(img.url));

            const allImages: ImageSource[] = (mainImg.url
              ? [mainImg, ...galleryImgs]
              : galleryImgs
            ).filter((img) => Boolean(img.url));

            return {
              title: item.eventTitle || "Untitled",
              description: item.eventDescription || "",
              images: allImages,
            };
          });

          setEvents(fetchedEvents);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchEvents();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative w-full bg-white overflow-hidden">
      {!loading && events.length > 0 && <EventParallax events={events} />}
    </section>
  );
}