"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import HeadphoneScroll from "@/components/HeadphoneScroll";
import { motion, useScroll, useTransform } from "framer-motion";

import {
  getSolution,
  Section,
  SubPoint,
  Component,
  FeatureList,
} from "../data";

/* ================= ANIMATION VARIANTS ================= */

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
};

const slideInRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
};

/* ================= RENDER HELPERS ================= */

function RenderSubPoints({ subPoints }: { subPoints?: SubPoint[] }) {
  if (!subPoints) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="whileInView"
      className="w-full bg-gradient-to-br from-slate-50 to-white py-16 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {subPoints.map((point, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative flex gap-5">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-[#07518a] text-white flex items-center justify-center font-bold text-lg shadow-lg">
                    {idx + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">
                    {point.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#07518a] group-hover:w-full transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function RenderComponents({ components }: { components?: Component[] }) {
  if (!components) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="whileInView"
      className="w-full bg-white py-16 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((comp, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col items-center text-center"
            >
              {comp.icon && (
                <div className="mb-5 p-4 bg-[#07518a]/10 rounded-2xl">
                  <Image
                    src={comp.icon}
                    alt={comp.name}
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>
              )}

              <h4 className="font-bold text-gray-900 text-lg mb-3">
                {comp.name}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {comp.description}
              </p>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#07518a] group-hover:w-2/3 transition-all duration-300 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function RenderFeatureLists({ featureLists }: { featureLists?: FeatureList[] }) {
  if (!featureLists) return null;

  return (
    <div className="w-full bg-gradient-to-br from-[#07518a] to-[#053d6b] py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-10">
        {featureLists.map((list, idx) => (
          <motion.div
            key={idx}
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="relative overflow-hidden bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/20"
          >
            <div className="relative">
              <h4 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 text-white">
                <span className="w-1.5 h-10 bg-white rounded-full" />
                {list.title}
              </h4>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {list.items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 text-white/90"
                  >
                    <div className="flex-shrink-0 w-2 h-2 mt-2 bg-white rounded-full" />
                    <span className="text-sm md:text-base">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ================= IMAGE CONTENT SECTION WITH ALTERNATING LAYOUT ================= */

function RenderImageContentSection({ section, index }: { section: Section; index: number }) {
  const isEven = index % 2 === 0;
  const bgStyle = isEven
    ? { borderRadius: '67% 33% 28% 72% / 59% 52% 48% 41%' }
    : { borderRadius: '15% 85% 53% 47% / 55% 41% 59% 45%' };

  return (
    <div className="w-full bg-[#e6e7e5] py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-16`}>

          {/* Bubbly Content Background */}
          <motion.div
            variants={isEven ? slideInLeft : slideInRight}
            initial="initial"
            whileInView="whileInView"
            className="w-full lg:w-1/2"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 3 }}
              viewport={{ once: true }}
              className="relative w-full min-h-[400px] max-w-[500px] mx-auto flex items-center justify-center p-8 md:p-12"
              style={{
                ...bgStyle,
                boxShadow: `inset 20px 20px 20px rgba(0,0,0,0.05),
                           25px 35px 20px rgba(0,0,0,0.05),
                           25px 20px 20px rgba(0,0,0,0.05),
                           inset 25px 30px 30px rgba(255,255,255,0.9)`,
                background: '#07518a',
              }}
            >
              {/* Shine Effects */}
              <div
                className="absolute w-[35px] h-[35px] bg-white/80 rounded-full"
                style={{ top: '50px', left: '80px' }}
              />
              <div
                className="absolute w-[15px] h-[15px] bg-white/80 rounded-full"
                style={{ top: '90px', left: '110px' }}
              />

              {/* Text Content Inside Bubble */}
              <div className="relative flex flex-col items-center justify-center text-center gap-4 z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg">
                  <span className="text-2xl font-black text-[#07518a]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {section.title}
                </h3>

                {section.description && (
                  <p className="text-base text-white/90 leading-relaxed max-w-md">
                    {section.description}
                  </p>
                )}

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-2"
                >
                  {/* <div className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#07518a] rounded-full font-bold cursor-pointer transition-all hover:bg-white/90 shadow-lg">
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div> */}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Side - Normal with Rounded Corners */}
          <motion.div
            variants={isEven ? slideInRight : slideInLeft}
            initial="initial"
            whileInView="whileInView"
            className="w-full lg:w-1/2"
          >
            {section.image && (
              <div className="relative w-full aspect-[4/3] max-w-[600px] mx-auto rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ================= SECTION COMPONENT ================= */

function RenderSection({ section, isNested = false, index = 0 }: { section: Section; isNested?: boolean; index?: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.section
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, margin: "-100px" }}
      className={`${isNested ? 'py-10' : 'py-0'} w-full`}
    >
      <div className={`${isNested ? 'bg-gray-50 rounded-3xl p-8 md:p-10' : ''}`}>

        {/* Image + Content Section with Alternating Layout */}
        {!isNested && section.image && (
          <RenderImageContentSection section={section} index={index} />
        )}

        {/* Regular Section Header (when no image or nested) */}
        {!isNested && !section.image && (
          <div className={`w-full ${isEven ? 'bg-gradient-to-r from-white to-slate-50' : 'bg-gradient-to-r from-slate-50 to-white'} py-16 px-6 md:px-12 lg:px-20`}>
            <div className="max-w-7xl mx-auto">
              <motion.div
                variants={fadeInUp}
                className="max-w-4xl"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {section.title}
                </h2>

                {section.description && (
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed mt-4">
                    {section.description}
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        )}

        {isNested && (
          <>
            <motion.h3
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
            >
              {section.title}
            </motion.h3>

            {section.description && (
              <motion.p
                variants={fadeInUp}
                className="text-base md:text-lg text-gray-600 leading-relaxed mb-6"
              >
                {section.description}
              </motion.p>
            )}

            {section.image && (
              <motion.div
                variants={fadeIn}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden mb-8 shadow-lg"
              >
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            )}
          </>
        )}

        {/* Content Types - Full Width */}
        <RenderSubPoints subPoints={section.subPoints} />
        <RenderComponents components={section.components} />
        <RenderFeatureLists featureLists={section.featureLists} />

        {/* Nested Subsections */}
        {section.subsections && section.subsections.length > 0 && !isNested && (
          <div className="w-full bg-white py-12 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto space-y-10">
              {section.subsections.map((sub, idx) => (
                <RenderSection key={idx} section={sub} isNested={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}

/* ================= MAIN PAGE ================= */

export default function SolutionDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const solution = getSolution(slug);

  if (!solution) notFound();

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* HERO BANNER - 80vh Full Width */}
      <motion.div
        style={{ opacity }}
        className="relative h-[80vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#07518a] via-[#064a7d] to-[#053d6b]"
      >
        {/* Background Image */}
        {solution.mainbanner && (
          <>
            <div className="absolute inset-0">
              <Image
                src={solution.mainbanner}
                alt="Solution Banner"
                fill
                className="object-cover opacity-20"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-[#07518a]/80" />
          </>
        )}

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 md:px-8 max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {solution.icon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6 md:mb-8 inline-block"
              >
                <div className="p-5 bg-white/10 backdrop-blur-md rounded-2xl">
                  <Image
                    src={solution.icon}
                    alt="Solution Icon"
                    width={80}
                    height={80}
                    className="brightness-0 invert"
                  />
                </div>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-tight leading-tight px-4"
            >
              {solution.title}
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-1.5 bg-white/80 mx-auto rounded-full"
            />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-white/80 text-xs font-medium uppercase tracking-wide">Scroll</span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-3 bg-white rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      
      <div className="w-full">
        {solution.subsections?.map((section, idx) => (
          <RenderSection key={idx} section={section} index={idx} />
        ))}
      </div>

      {/* BACK NAVIGATION - FULL WIDTH */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/solutions"
              className="inline-flex items-center gap-3 bg-[#07518a] text-white px-10 py-4 rounded-full font-bold text-base hover:bg-[#064a7d] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to All Solutions</span>
            </Link>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}