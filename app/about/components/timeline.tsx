"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10  "
      ref={containerRef}
    >
     <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 ">
  {/* Modern Sub-heading / Tagline */}
  <div className="flex items-center space-x-2 mb-4">
    <div className="h-[2px] w-8 bg-[#07518a]"></div>
    <span className="text-[#07518a] font-bold uppercase tracking-widest text-xs">
      Our Corporate Evolution
    </span>
  </div>

  {/* Main Heading: High Contrast and Bold */}
  <h2 className="text-3xl md:text-5xl mb-6 text-black dark:text-white max-w-4xl font-black tracking-tight leading-tight">
    20+ Years of <span className="text-[#07518a]">Technological Sovereignty</span>
  </h2>

  {/* Description: Professional and Mission-Oriented */}
  <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-xl max-w-2xl leading-relaxed">
    From our foundational roots in 2006 to becoming a national leader in 
    <span className="font-bold text-black dark:text-white"> AI Surveillance, IoT Ecosystems, and Renewable Resources</span>. 
    Explore the strategic milestones that define our journey as the Guru of Tomorrow's Technology.
  </p>
</div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 ">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-[#07538a]">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full  ">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold ">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-[#07518a] rounded-full "
          />
        </div>
      </div>
    </div>
  );
};
