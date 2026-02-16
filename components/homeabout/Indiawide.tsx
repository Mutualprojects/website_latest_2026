"use client";

import React from "react";
import { motion } from "framer-motion";
import india from "../heroimages/91527425_India.jpg";

/* ------------------ MOTION VARIANTS ------------------ */

const leftVariant = {
  hidden: { opacity: 0, x: -120 },
  visible: { opacity: 1, x: 0 },
};

const rightVariant = {
  hidden: { opacity: 0, x: 120 },
  visible: { opacity: 1, x: 0 },
};

/* ------------------ COMPONENT ------------------ */

export default function Indiawide() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-14 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07518a]">
            India-Wide Presence
          </h2>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Delivering technology, security, and digital solutions across
            multiple states with a strong nationwide footprint.
          </p>
        </motion.div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* LEFT CONTENT */}
          <motion.div
            variants={leftVariant}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.35 }}
            className="space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#07518a]">
              Nationwide Operations & Support
            </h3>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              With operations spanning across India, we empower government,
              enterprise, and infrastructure projects with scalable and
              future-ready solutions. Our presence ensures faster deployment,
              localized expertise, and long-term operational support.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                "20+ States Covered",
                "15,000+ Clients",
                "24/7 Support Network",
                "Govt & Enterprise Projects",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm sm:text-base font-medium text-gray-700"
                >
                  <span className="h-2 w-2 rounded-full bg-[#07518a]" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            variants={rightVariant}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.35 }}
            className="relative group"
          >
            {/* BACKGROUND LAYERS */}
            <div className="absolute inset-0 rounded-[2.5rem] rotate-6 bg-[#07518a]/10 group-hover:rotate-3 transition-transform duration-500" />
            <div className="absolute inset-0 rounded-[2.5rem] -rotate-6 bg-[#07518a]/5 group-hover:-rotate-3 transition-transform duration-500" />

            {/* IMAGE CARD */}
            <div className="relative rounded-[2.5rem] overflow-hidden bg-white shadow-xl group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-4">
              
              {/* IMAGE CONTAINER */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={india.src}
                  alt="India Map Coverage"
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* OVERLAY TEXT */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h4 className="text-base sm:text-lg font-semibold">
                  Pan-India Deployment
                </h4>
                <p className="text-xs sm:text-sm opacity-90">
                  Seamless reach across urban & rural regions
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
