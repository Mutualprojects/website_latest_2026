"use client";

import React from "react";

// import BannerSection from "../components/BannerSection";
import Who from "../components/who";

import { CardSwap, Card } from "./components";
import { LayeredText } from "./components/layered-text";
// import SpaceWebsite from "../../lifeat-brihaspathi/components/SpaceWebsite";

import { Skiper38 } from "./components/Skiper38";

export default function Page() {
  return (
    <div className="w-full overflow-hidden">

      <Skiper38 />
      {/* <BannerSection /> */} 
      

      

      {/* ================= MAIN SPLIT SECTION ================= */}
      <main
        className="
          relative min-h-screen w-full
          bg-gray-200
          overflow-hidden
          flex flex-col md:flex-row
        "
      >
        {/* LEFT 50% — LAYERED TEXT */}
        <section
          className="
            w-full md:w-1/2
            flex items-center justify-center
            px-4 sm:px-8 lg:px-16
          "
        >
          <LayeredText className="w-full text-center md:text-left" />
        </section>

        {/* RIGHT 50% — CARD SWAP */}
        <section
          className="
            w-full md:w-1/2
            flex items-center justify-center
            relative
            min-h-[420px] sm:min-h-[480px] md:min-h-full
          "
        >
          <CardSwap
            width={520}
            height={360}
            delay={5500}
            pauseOnHover
            easing="elastic"
          >
            {/* CARD 1 */}
            <Card>
              <div className="flex h-full flex-col justify-between p-6 sm:p-8">
                <div>
                  <span className="text-xs sm:text-sm uppercase tracking-widest text-sky-300">
                    Who We Are
                  </span>
                  <h2 className="mt-3 text-xl sm:text-2xl font-semibold">
                    Technology With Purpose
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
                    BTL exists to simplify complexity and create meaningful
                    impact through technology. Every solution is designed to be
                    practical, resilient, and scalable so that our customers
                    can operate with confidence in high-stakes environments.
                  </p>
                </div>
              </div>
            </Card>

            {/* CARD 2 */}
            <Card>
              <div className="flex h-full flex-col justify-between p-6 sm:p-8">
                <div>
                  <span className="text-xs sm:text-sm uppercase tracking-widest text-sky-300">
                    How We Measure
                  </span>
                  <h2 className="mt-3 text-xl sm:text-2xl font-semibold">
                    Impact Over Output
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
                    We measure success not only in deployments completed, but
                    in risks reduced, time saved, and trust earned with every
                    engagement.
                  </p>
                </div>
              </div>
            </Card>

            {/* CARD 3 */}
            <Card>
              <div className="flex h-full flex-col justify-between p-6 sm:p-8">
                <div>
                  <span className="text-xs sm:text-sm uppercase tracking-widest text-sky-300">
                    Our Commitment
                  </span>
                  <h2 className="mt-3 text-xl sm:text-2xl font-semibold">
                    Confidence at Scale
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
                    We build resilient systems that reduce uncertainty,
                    accelerate decisions, and help organizations perform with
                    confidence where reliability matters most.
                  </p>
                </div>
              </div>
            </Card>

          </CardSwap>
        </section>

      </main>

      {/* ================= NEXT SECTION ================= */}
      <Who />

    </div>
  );
}
