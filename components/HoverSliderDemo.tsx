"use client";

import * as React from "react";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "./animated-slideshow";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ----------- IMAGES ----------- */
import ecommunication from "./Serviceimages/260.jpg";
import ssoftware from "./Serviceimages/software.jpg";
import it from "./Serviceimages/ethernet-switch-1.jpg";
import security from "./Serviceimages/security.jpg";
import home_from from "./Serviceimages/home-automation.jpg";

/* ----------- SLIDES ----------- */
const SLIDES = [
  { id: "1", title: "E-Communication", imageUrl: ecommunication },
  { id: "2", title: "Software Services", imageUrl: ssoftware },
  { id: "3", title: "IT & Telecom Services", imageUrl: it },
  { id: "4", title: "Security Services", imageUrl: security },
  { id: "5", title: "Home Automation & IoT", imageUrl: home_from },
];

export function HoverSliderDemo() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
      className="w-full"
    >
      <HoverSlider className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 text-[#07518a]">
        
        {/* SECTION TITLE */}
        <h3 className="mb-10 text-center text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide">
          Our Services
        </h3>

        {/* CONTENT */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
          
          {/* LEFT TEXT LIST */}
          <div className="flex flex-col space-y-6 sm:space-y-8 text-center lg:text-left">
            {SLIDES.map((slide, index) => (
              <TextStaggerHover
                key={slide.id}
                index={index}
                text={slide.title}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight cursor-pointer"
              />
            ))}
          </div>

          {/* RIGHT IMAGE */}
          <HoverSliderImageWrap
            className="
              w-full 
              max-w-xs 
              sm:max-w-sm 
              md:max-w-md 
              lg:max-w-lg 
              h-64 
              sm:h-72 
              md:h-80 
              lg:h-96 
              rounded-xl 
              overflow-hidden 
              shadow-xl
            "
          >
            {SLIDES.map((slide, index) => (
              <HoverSliderImage
                key={slide.id}
                index={index}
                src={slide.imageUrl.src}
                alt={slide.title}
                className="object-cover"
              />
            ))}
          </HoverSliderImageWrap>

        </div>
      </HoverSlider>
    </motion.section>
  );
}
