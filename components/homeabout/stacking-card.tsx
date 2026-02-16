'use client';

import { ReactLenis } from 'lenis/react';
import {
  useTransform,
  motion,
  useScroll,
  MotionValue,
} from 'motion/react';
import { useRef, forwardRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import {
  Thermometer,
  Lock,
  LayoutDashboard,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

/* ================= TYPES ================= */

interface ProjectData {
  title: string;
  description: string;
  link: StaticImageData | string;
}

interface CardProps {
  title: string;
  description: string;
  url: StaticImageData | string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  i: number;
}

/* ================= CARD ================= */

export const Card = ({
  title,
  description,
  url,
  progress,
  range,
  targetScale,
  i,
}: CardProps) => {
  const container = useRef(null);
  const [imgError, setImgError] = useState(false);

  const imgSrc = typeof url === 'string' ? url : url.src;

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-[72vh] flex items-center justify-center sticky top-0 px-4 md:px-8"
    >
      <motion.div
        style={{
          scale,
          top: `calc(2.8vh + ${i * 20}px)`,
        }}
        className="
          relative
          w-full
          max-w-[1500px]
          2xl:max-w-[1700px]
          h-[380px]
          md:h-[420px]
          xl:h-[460px]
          bg-white
          rounded-[20px]
          shadow-[0_18px_60px_rgba(0,0,0,0.06)]
          border border-gray-200
          overflow-hidden
          origin-top
          font-[var(--font-edm)]
        "
      >
        {/* Top Accent Border */}
        <div className="absolute top-0 left-0 w-full h-[4px] bg-[#07518a]" />

        <div className="flex flex-col lg:flex-row h-full">

          {/* ================= LEFT PANEL ================= */}
          <div className="hidden lg:flex w-[55%] px-8 xl:px-10 py-8 flex-col justify-center">

            {/* Main Heading (Reduced + Thicker) */}
            <h2 className="
              text-xl
              xl:text-2xl
              2xl:text-3xl
              font-bold
              tracking-tight
              text-gray-900
              leading-snug
            ">
              {title}
            </h2>

            {/* Description */}
            <p className="
              mt-3
              text-gray-600
              text-sm
              xl:text-base
              leading-relaxed
              max-w-xl
            ">
              {description}
            </p>

            {/* Features 2x2 */}
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">

              <div className="flex items-center gap-3">
                <LayoutDashboard size={16} className="text-[#07518a]" />
                <span className="text-sm font-medium text-gray-800">
                  Smart Monitoring
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Thermometer size={16} className="text-[#07518a]" />
                <span className="text-sm font-medium text-gray-800">
                  Thermal Detection
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Lock size={16} className="text-[#07518a]" />
                <span className="text-sm font-medium text-gray-800">
                  Access Control
                </span>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck size={16} className="text-[#07518a]" />
                <span className="text-sm font-medium text-gray-800">
                  Secure Architecture
                </span>
              </div>

            </div>

            {/* CTA */}
            <div className="mt-6">
              <button
                className="
                  flex items-center gap-2
                  px-5 py-2.5
                  bg-[#07518a]
                  text-white
                  rounded-full
                  text-sm
                  font-semibold
                  hover:bg-[#063d66]
                  transition
                "
              >
                Explore solution
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="relative w-full lg:w-[45%] h-full min-h-[250px] shrink-0">

            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{ scale: imageScale }}
            >
              {imgError ? (
                <img
                  src={imgSrc}
                  alt={title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <Image
                  src={url}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority={i === 0}
                  unoptimized
                  onError={() => setImgError(true)}
                />
              )}
            </motion.div>

            {/* Mobile Overlay */}
            <div className="lg:hidden absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-md space-y-3">

              <h2 className="text-sm font-bold text-gray-900">
                {title}
              </h2>

              <div className="flex justify-between">
                <LayoutDashboard size={16} className="text-[#07518a]" />
                <Thermometer size={16} className="text-[#07518a]" />
                <Lock size={16} className="text-[#07518a]" />
                <ShieldCheck size={16} className="text-[#07518a]" />
              </div>

            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
};

/* ================= ROOT ================= */

interface ComponentRootProps {
  projects: ProjectData[];
}

const Component = forwardRef<HTMLElement, ComponentRootProps>(
  ({ projects }, ref) => {
    const container = useRef(null);

    const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start start', 'end end'],
    });

    return (
      <ReactLenis root>
        <main ref={container} className="bg-[#f8fafb] font-[var(--font-edm)]">

          <section className="pb-[8vh] pt-8">
            {projects.map((project, i) => {
              const rangeStart = i * (1 / projects.length);
              const targetScale = 1 - (projects.length - i) * 0.04;

              return (
                <Card
                  key={`p_${i}`}
                  i={i}
                  url={project.link}
                  title={project.title}
                  description={project.description}
                  progress={scrollYProgress}
                  range={[rangeStart, 1]}
                  targetScale={targetScale}
                />
              );
            })}
          </section>

        </main>
      </ReactLenis>
    );
  }
);

Component.displayName = 'EnterpriseCapabilities';

export default Component;
