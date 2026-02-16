"use client";

import React from "react";
import { motion } from "framer-motion";

const BRAND = "#07518a";
const BANNER_IMAGE = "/355737.jpg";

interface CSRPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function CSRPageLayout({ title, subtitle, children }: CSRPageLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-neutral-50 to-white">
      <section
        className="relative min-h-[40vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${BANNER_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/70 to-white/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07518a]/85 via-[#07518a]/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-18 lg:py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-white max-w-3xl"
          >
            <div className="text-xs tracking-[0.3em] uppercase mb-3 text-blue-100">
              CSR Initiative
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-blue-100 text-base sm:text-lg leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg prose-neutral max-w-none
            prose-headings:font-semibold prose-headings:text-[#07518a]
            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
            prose-strong:text-gray-800"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
