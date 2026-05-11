"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Revie_image from "./customers-giving-feedback-laptop-man-holding-review-star-his-head-five-stars-rating-clients-choosing-satisfaction-level-reputation-quality-rating-concept.png";

export default function HeroContent() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: `
        linear-gradient(0deg, transparent 0%, transparent 58%, rgba(104,104,104,0.05) 58%, rgba(104,104,104,0.05) 92%, transparent 92%, transparent 100%),
        linear-gradient(45deg, transparent 0%, transparent 34%, rgba(104,104,104,0.05) 34%, rgba(104,104,104,0.05) 77%, transparent 77%, transparent 100%),
        linear-gradient(0deg, transparent 0%, transparent 33%, rgba(104,104,104,0.05) 33%, rgba(104,104,104,0.05) 53%, transparent 53%, transparent 100%),
        linear-gradient(90deg, rgb(255,255,255), rgb(255,255,255))
        `,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-16">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text-center md:text-left"
        >
          {/* Google Style Heading */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>{" "}
            <br />
            <span className="text-gray-900">Reviews that</span>
            <br />
            <span className="text-gray-900">Build Trust</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-gray-600 max-w-xl text-lg">
            Brihaspathi Technologies helps you display real customer feedback
            in a modern and engaging way to boost credibility and conversions.
          </p>

          {/* CTA */}
          {/* <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md">
              Get Started
            </button>

            <button className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition">
              Live Demo
            </button>
          </div> */}

          {/* Rating */}
          <div className="mt-6 text-sm text-gray-500">
            ⭐ 4.8 Rating • Trusted by 2000+ users
          </div>
        </motion.div>

        {/* RIGHT IMAGE (NO CARD) */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full"
        >
          <div className="relative w-full h-[320px] md:h-[480px]">
            <Image
              src={Revie_image}
              alt="Customer Reviews"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}