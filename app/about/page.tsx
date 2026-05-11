
import DemoPage from '@/components/aboutdemo'
import AnimatedCapabilitiesOrbit from '@/components/AnimatedCapabilitiesOrbit'
import { Process, Work } from '@/components/homeabout/Achiementsdemo'
import BTPL from '@/components/homeabout/Soline'
import React from 'react'

import AboutHero from './About'
import MissionVisionPhilosophy from './MissionVisionPhilosophy'
import BrihaspathiDeployments from './BrihaspathiDeployments'
import ValuesSection from './ValuesSection'
import { TimelineDemo } from './components/TimelineDemo'
import OurJourney from './our-journeys/page'
import Testimonials from '@/components/Testimonials'
import { TestimonialCarousel } from '@/components/homeabout/bard'
import WhatWeDoSection from '@/components/homeabout/WhatWeDoSection'
import { HeroParallax } from '@/components/hero-parallal'
import HeroParallaxNews from '@/components/About-parallel'
import { EventParallax } from '@/components/eventparallax'
import EventHeroParallax, { EVENTS_DATA } from '@/components/EventHeroParallax'
import { TeamHoverGrid } from '../our-team/TeamHoverGrid'
import TeamShowcase from '../our-team/TeamShowcase'
import { ORG_GROUPS } from '../our-team/org-groups'
import GsapScrollShowcase from '../our-team/GsapScrollShowcase'
import HeroReveal from '@/components/ui/HeroReveal'
import { Skiper30 } from './components/Skiper30'
import { Skiper39 } from './components/Skiper39'
import Company3DViewer from '@/components/Company3DViewer'
import AIDemoEmbed from '../who-we-are/components/AIDemoEmbed'
import SpaceWebsite from '@/components/SpaceWebsite'
import IndiaBranchesMap from '@/components/homeabout/Indiabranch'
import TeamCarousel from '../our-team/TeamCarousel'
import AboutEnterpriseScroll from '@/components/AboutHeroSection'




function page() {
  return (
    <div>
      {/* <AboutEnterpriseScroll/> */}
      {/* <SpaceWebsite/> */}
      <AboutHero />
      {/* <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh] overflow-hidden bg-black">
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/your-poster.jpg" // optional poster image
      >
        <source
          src="https://ik.imagekit.io/cbrrjodcw/Smoothly_transition_from_1080p_202601061032.mp4?tr=orig"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div> */}
      <IndiaBranchesMap />

      <TestimonialCarousel />
      {/* <GsapScrollShowcase  group={ORG_GROUPS[0]}   titleText="FAFFA"/>
<TeamShowcase group={ORG_GROUPS[0]}/>  */}
      {/* <HeroReveal/> */}



      {/* <Skiper30/> */}
      {/* <Skiper39/> */}


      <Process />
      <div className="w-full bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          {/* HEADER */}
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#07518a]">
              What We Do
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black leading-tight">
              Secure, Automate, and{" "}
              <span className="text-[#07518a]">Connect</span>{" "}
              — End to End
            </h2>

            <p className="mt-5 text-sm sm:text-base md:text-lg text-gray-600">
              Integrated technology solutions designed to deliver safety,
              efficiency, and intelligence at enterprise and city scale.
            </p>
          </div>

          {/* SERVICES GRID */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {/* CARD */}
            {[
              {
                title: "E-Security & Surveillance",
                desc: "CCTV, video analytics, access control, and fire safety integrations.",
              },
              {
                title: "Home & Building Automation",
                desc: "Smart lighting, HVAC, voice/app control, and energy optimization.",
              },
              {
                title: "AI-Driven Software",
                desc: "Analytics dashboards, workflow automation, and intelligent alerting.",
              },
              {
                title: "IoT & ELV Systems",
                desc: "Controllers, structured cabling, PA/BGM, and sensor-based systems.",
              },
              {
                title: "IT & Telecom Infrastructure",
                desc: "Networking, IP telephony, cloud connectivity, and datacenter setups.",
              },
              {
                title: "Professional Services",
                desc: "Consulting, deployment, monitoring, and complete AMC solutions.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="
            group relative rounded-2xl border border-gray-200
            bg-white p-6 sm:p-8
            transition-all duration-300
            hover:-translate-y-2 hover:shadow-xl
          "
              >
                {/* Accent bar */}
                <div className="mb-4 h-1 w-10 rounded-full bg-[#07518a] transition-all duration-300 group-hover:w-16" />

                <h3 className="text-lg sm:text-xl font-bold text-black mb-3">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {item.desc}
                </p>

                {/* Hover glow */}
                <div
                  className="
              pointer-events-none absolute inset-0 rounded-2xl
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
            "
                  style={{
                    background:
                      "radial-gradient(600px circle at top left, rgba(7,81,138,0.08), transparent 40%)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <WhatWeDoSection/> */}
      <TeamCarousel />
      <OurJourney />

      {/* 
<div className="card card-sm bg-base-200 max-w-60 shadow">
  <figure className="hover-gallery">
    <img src="https://img.daisyui.com/images/stock/daisyui-hat-1.webp" />
    <img src="https://img.daisyui.com/images/stock/daisyui-hat-2.webp" />
    <img src="https://img.daisyui.com/images/stock/daisyui-hat-3.webp" />
    <img src="https://img.daisyui.com/images/stock/daisyui-hat-4.webp" />
  </figure>
  <div className="card-body">
    <h2 className="card-title flex justify-between">
      daisyUI Hat
      <span className="font-normal">$25</span>
    </h2>
    <p>High Quality classic cap hat with stitch logo</p>
  </div>
</div> */}

      <ValuesSection />
      <BrihaspathiDeployments />
      <MissionVisionPhilosophy />
      <AnimatedCapabilitiesOrbit />

      {/* <BTPL/> */}
      {/* <Achievements/> */}
    </div>
  )
}

export default page