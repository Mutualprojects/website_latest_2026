"use client";

import * as React from "react";
import { motion, MotionConfig, HTMLMotionProps } from "motion/react";

// Utility
export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/* --------------------------------------
   Types
-------------------------------------- */
interface TextStaggerHoverProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  index: number;
}

interface HoverSliderImageProps extends HTMLMotionProps<"img"> {
  index: number;
  src: string;
  alt: string;
}

interface HoverSliderContextValue {
  activeSlide: number;
  changeSlide: (index: number) => void;
  totalSlides: number;
}

/* --------------------------------------
   Split text → characters
-------------------------------------- */
function splitText(text: string) {
  return {
    characters: text
      .split(" ")
      .map((w) => w + " ")
      .flatMap((w) => w.split("")),
  };
}

/* --------------------------------------
   Context setup
-------------------------------------- */
const HoverSliderContext = React.createContext<
  HoverSliderContextValue | undefined
>(undefined);

function useHoverSliderContext() {
  const ctx = React.useContext(HoverSliderContext);
  if (!ctx) throw new Error("useHoverSliderContext must be inside <HoverSlider>");
  return ctx;
}

/* --------------------------------------
   Provider with AUTO-SLIDE
-------------------------------------- */
export const HoverSlider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { autoSlide?: boolean }
>(function HoverSlider(
  { children, className, autoSlide = true, ...props },
  ref
) {
  const [activeSlide, setActiveSlide] = React.useState(0);

  const totalSlides = React.Children.count(children);

  // Auto-slide every 3 seconds
  React.useEffect(() => {
    if (!autoSlide) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides, autoSlide]);

  return (
    <HoverSliderContext.Provider
      value={{
        activeSlide,
        changeSlide: setActiveSlide,
        totalSlides,
      }}
    >
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    </HoverSliderContext.Provider>
  );
});

/* --------------------------------------
   Text Animation
-------------------------------------- */
export const TextStaggerHover = React.forwardRef<
  HTMLSpanElement,
  TextStaggerHoverProps
>(function TextStaggerHover({ text, index, className, ...props }, ref) {
  const { activeSlide, changeSlide } = useHoverSliderContext();
  const { characters } = splitText(text);

  const isActive = activeSlide === index;

  return (
    <span
      ref={ref}
      onMouseEnter={() => changeSlide(index)}
      className={cn("inline-block cursor-pointer", className)}
      {...props}
    >
      {characters.map((char, i) => (
        <span key={i} className="relative inline-block overflow-hidden">
          <MotionConfig
            transition={{
              delay: i * 0.03,
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94] as const,
            }}
          >
            <motion.span
              initial={{ y: "0%" }}
              animate={isActive ? { y: "-110%" } : { y: "0%" }}
              className="inline-block opacity-40"
            >
              {char}
            </motion.span>

            <motion.span
              className="absolute left-0 top-0 inline-block"
              initial={{ y: "110%" }}
              animate={isActive ? { y: "0%" } : { y: "110%" }}
            >
              {char}
            </motion.span>
          </MotionConfig>
        </span>
      ))}
    </span>
  );
});

/* --------------------------------------
   Image reveal variants
-------------------------------------- */
export const clipPathVariants = {
  visible: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
  hidden: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
};

/* --------------------------------------
   Image wrapper grid
-------------------------------------- */
export const HoverSliderImageWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function Wrapper({ children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "grid overflow-hidden [&>*]:col-start-1 [&>*]:row-start-1 [&>*]:size-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

/* --------------------------------------
   Slider Image
-------------------------------------- */
export const HoverSliderImage = React.forwardRef<
  HTMLImageElement,
  HoverSliderImageProps
>(function HoverSliderImage(
  { index, src, alt, className, ...props },
  ref
) {
  const { activeSlide } = useHoverSliderContext();

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      className={cn("object-cover w-full h-full", className)}
      variants={clipPathVariants}
      animate={activeSlide === index ? "visible" : "hidden"}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] as const }}
      {...props}
    />
  );
});
