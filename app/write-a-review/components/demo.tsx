


import React from "react";
import { ContainerScroll } from "./ContainerScroll";
import Image from "next/image";
import { motion } from "framer-motion";
import PlaceReviewsComponent from "./PlaceReviewsComponent";


import HeroContent from "./HeroContent";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">

      {/* 🔥 HERO SECTION */}
      <HeroContent/>

      {/* 🚀 SCROLL SECTION */}
      {/* <div className="pb-12">
        <ContainerScroll
          titleComponent={
            <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900">
              Powerful Review Experience <br />
              <span className="text-gray-500 text-xl md:text-2xl font-medium">
                Built for Modern Businesses
              </span>
            </h1>
          }
        >
          <div className="w-full px-4 md:px-10">
            <PlaceReviewsComponent

              placeId="ChIJ63LyU-6YyzsRqboLfDlPDp0"
                 apiKey="AIzaSyCXQg-HCTqAQhOaQy_bCQsPOoPkedcmcRA"
            />
          </div>
        </ContainerScroll>
      </div> */}
    </div>
  );
}