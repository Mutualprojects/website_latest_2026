// demo.tsx
import React from "react";
import type { StaticImageData } from "next/image";
import Component from "@/components/homeabout/stacking-card";

// URL-safe filenames (no spaces or &) so images work in dev and production build
import AdvancedSurveillanceSecuritySolutions from "./capabilities/advanced-surveillance-and-security-solutions.jpg";
import AIVideoAnalyticsIntelligentMonitoring from "./capabilities/ai-video-analytics-and-intelligent-monitoring.jpg";
import BiometricIdentityManagementSystems from "./capabilities/biometric-and-identity-management-systems.jpg";
import SoftwareProductsDigitalPlatforms from "./capabilities/software-products-and-digital-platforms.jpg";
import SmartMobilityTransportSolutions from "./capabilities/smart-mobility-and-transport-solutions.jpg";
import RenewableEnergySmartUrbanInfrastructure from "./capabilities/renewable-energy-and-smart-urban-infrastructure.jpg";

const projects: {
  title: string;
  description: string;
  link: string | StaticImageData;
  color: string;
}[] = [
  {
    title: "Advanced Surveillance & Security Solutions",
    description:
      "We deliver end-to-end surveillance and security ecosystems built for cities, enterprises, and critical infrastructure. Our solutions span AI-enabled CCTV, thermal cameras, access control, command & control centers, election monitoring, and border security—providing real-time situational awareness, proactive threat detection, and centralized operations for enhanced safety and compliance.",
    link: AdvancedSurveillanceSecuritySolutions,
    color: "#5196fd",
  },
  {
    title: "AI Video Analytics & Intelligent Monitoring",
    description:
      "Our AI-powered video analytics transform raw video feeds into actionable intelligence. From face recognition and ANPR to intrusion detection, fall detection, crowd analytics, and vehicle tracking, our solutions integrate with VMS and command centers to enable faster response, smarter decisions, and higher operational efficiency.",
    link: AIVideoAnalyticsIntelligentMonitoring,
    color: "#8f89ff",
  },
  {
    title: "Biometric & Identity Management Systems",
    description:
      "We build secure, scalable biometric and identity platforms integrated with Aadhaar and AI-based facial recognition. Enable contactless attendance, access control, and identity verification across government departments, schools, hostels, and enterprises—ensuring transparency, fraud prevention, and real-time reporting.",
    link: BiometricIdentityManagementSystems,
    color: "#13006c",
  },
  {
    title: "Software Products & Digital Platforms",
    description:
      "We engineer modern digital platforms—from CMS-driven websites and enterprise dashboards to automation systems and secure portals. Using Next.js, React, Node.js, FastAPI, and Strapi CMS, we deliver scalable, high-performance applications that streamline operations, improve user experience, and accelerate digital transformation.",
    link: SoftwareProductsDigitalPlatforms,
    color: "#fd521a",
  },
  {
    title: "Smart Mobility & Transport Solutions",
    description:
      "We enable intelligent mobility through Smart Bus and Vehicle Surveillance Solutions that combine AI cameras, GPS, MDVR, passenger information systems, Wi-Fi, and analytics. These systems enhance passenger safety, fleet visibility, compliance monitoring, and data-driven transport management for operators.",
    link: SmartMobilityTransportSolutions,
    color: "#ed649e",
  },
  {
    title: "Renewable Energy & Smart Urban Infrastructure",
    description:
      "We deliver solar rooftop EPC solutions and Solar Smart Poles that blend renewable energy with surveillance, lighting, connectivity, and public communication. Our smart infrastructure reduces carbon footprint while strengthening urban safety and operational efficiency for smart cities, government, and enterprises.",
    link: RenewableEnergySmartUrbanInfrastructure,
    color: "#0a6ab8",
  },
];

function ComponentDemo() {
  return <Component projects={projects} />;
}

export { ComponentDemo as Ourcapabilities };
