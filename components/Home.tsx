"use client";

import Whybrihaspathi from "@/components/WhyChooseBrihaspathi";
// import Weserve from "@/components/Weserve"; // hidden for now
import ClientsMarqueeHero from "@/components/ClientsMarqueeHero";
import CertificationsGrid5 from "@/components/Certificatiions";
import { HoverSliderDemo } from "@/components/HoverSliderDemo";
import { SplineSceneBasic } from "@/components/Aidemo";
import DemoOnep from "@/components/homeabout/Demo";
import { ScrollingFeatureShowcase } from "@/components/Intractive";
import DemoOne from "@/components/homeabout/heroaboutdemo";
import IndustriesSection from "@/components/homeabout/IndustriesSection";
import Indiawide from "@/components/homeabout/Indiawide";
import { Achievements, Process, Work } from "@/components/homeabout/Achiementsdemo";
import { Ourcapabilities } from "@/components/homeabout/our-capabilities";
import CoreCapabilitiesIntro from "@/components/CoreCapabilitiesIntro";
import Clientvideo from "@/components/homeabout/Clientvideo";
import HeroCarousel from "./HeroCarousel";
// import SolutionSection from "@/components"; // Updated import


export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}

      {/* <HeroCarousel/> */}
      <SplineSceneBasic />

      {/* Our Expertise: header + capability cards (Advanced Surveillance & Security Solutions, etc.) */}
      <section className="relative bg-[#f8fafb]">
        <CoreCapabilitiesIntro />
        <Ourcapabilities />
        {/* Fade to white when scrolling to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 pointer-events-none bg-gradient-to-t from-white to-transparent" aria-hidden />
      </section>

      {/* Why Choose Us */}
      <Whybrihaspathi />

      {/* Demo/Showcase */}
      <DemoOnep />
      
      {/* Achievements */}
      <Achievements />
      
      {/* Hover Slider */}
      {/* <HoverSliderDemo /> */}
      
      {/* Industries */}
      <IndustriesSection />
      
      {/* India Wide */}
      <Indiawide />
      
      {/* Client Video */}
      <Clientvideo />
      
      {/* We Serve - hidden for now */}
      {/* <Weserve /> */}
      
      {/* Clients */}
      <ClientsMarqueeHero />
      
      {/* Certifications */}
      <CertificationsGrid5 />
    </div>
  );
}