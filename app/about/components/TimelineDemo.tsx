"use client";

import React from "react";
import { Timeline } from "../components/timeline";
import Image from "next/image";

/* ================= IMAGES ================= */

import img2006 from "./journey_images/team-members-engaged-computer-work-with-gears-icons-symbolizing-innovation.png";
import img2012 from "./journey_images/flat-illustration-man-monitoring-security-cameras-ensuring-safety-surveillance.png";
import img2014 from "./journey_images/cartoon-man-robot-with-sign-that-says-radio.png";
import img2019 from "./journey_images/elephant-silhouette-with-panorama.png";
import img2021 from "./journey_images/iot-internet-things-devices-connectivity-concepts-network-flat-style-with-people.png";
import img2022 from "./journey_images/team-members-engaged-computer-work-with-gears-icons-symbolizing-innovation.png";
import img2024 from "./journey_images/vote-ballot-box-people-putting-pepper-vote-into-box-election-concept-democracy-freedom-speech-justice-voting-opinion-referendum-poll-choice-event-vector-illustration.png";

import imgntonl from "./journey_images/91527425_India.jpg";
import bank_survilence from "./journey_images/security-system-surveillance-cameras-background-with-cityscape-blue-sky-realistic-vector.png";
import industry from "./journey_images/labor-substitution-abstract-concept-vector-illustration.png";
import border from "./journey_images/soldiers-performance-combat-mission-silhouette-soldiers-are-fighting-battle.png";
import smart_survilence from "./journey_images/cc-camera-technology-design-vector-illustration-eps10-graphic.png";
import Examination_Surveillance from "./journey_images/guard-service-man-sitting-control-panel-watching-surveillance-camera-videos-monitors-cctv-control-room-vector-illustration-security-system-worker-spying-supervision-concept.png";
import img2026Ai from "./journey_images/business-teamwork-people-finding-new-solutions-generating-generating-ideas.png";
import img2026Tech from "./journey_images/iot-internet-things-devices-connectivity-concepts-network-flat-style-with-people.png";

/* ================= CONSTANTS ================= */

const BRAND = "#07518a";

/* ================= COMPONENT ================= */

export function TimelineDemo() {
  const data = [
    {
      title: "2026 — AI Video Analytics & AI Solutions",
      content: (
        <div className="flex flex-col lg:flex-row w-full gap-8">
          <div className="flex flex-col sm:flex-row gap-6 flex-1">
            <div className="relative w-full sm:w-[280px] flex-shrink-0">
              <Image
                src={img2026Ai}
                alt="AI and innovation solutions"
                className="rounded-xl object-cover"
                style={{ height: "260px", width: "100%" }}
              />
            </div>
            <div className="relative w-full sm:w-[280px] flex-shrink-0">
              <Image
                src={img2026Tech}
                alt="AI and IoT technology"
                className="rounded-xl object-cover"
                style={{ height: "260px", width: "100%" }}
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold mb-3" style={{ color: BRAND }}>
              AI Video Analytics & AI Solutions
            </p>
            <p className="text-sm leading-relaxed text-neutral-800">
              Today we focus on intelligent video analytics, AI-driven insights, and
              software-led solutions that make surveillance smarter and operations
              more efficient across security, retail, and smart infrastructure.
            </p>
            <ul className="list-disc ml-5 text-sm text-neutral-800 mt-3 space-y-1">
              <li>AI-powered video analytics and object detection</li>
              <li>Cloud and edge AI solutions</li>
              <li>Integration with IoT and smart city platforms</li>
            </ul>
          </div>
        </div>
      ),
    },

    {
      title: "2025",
      content: (
        <div>
          <Image
            src={Examination_Surveillance}
            alt="Examination Surveillance"
            className="rounded-lg"
            style={{ height: "300px", width: "400px" }}
          />
          <p className="font-semibold mb-3" style={{ color: BRAND }}>
            Examination Surveillance
          </p>
          <p className="text-sm leading-relaxed text-neutral-800">
            We expanded into nationwide education surveillance to support
            high-stakes examinations with secure monitoring systems.
          </p>
          <ul className="list-disc ml-5 text-sm text-neutral-800 mt-3 space-y-1">
            <li>65,000+ cameras for NEET examinations (NTA)</li>
            <li>8,500+ cameras for Telangana State Board exams</li>
            <li>4,500+ cameras for MHCET exams in Maharashtra</li>
          </ul>
        </div>
      ),
    },

    {
      title: "2024",
      content: (
        <div>
          <Image
            src={img2024}
            alt="Election Webcasting"
            className="rounded-lg"
            style={{ height: "300px", width: "400px" }}
          />
          <p className="font-semibold mb-4" style={{ color: BRAND }}>
            Election Webcasting
          </p>
          <p className="text-sm leading-relaxed text-neutral-800">
            Deployed over 100,000 cameras across India for real-time election
            monitoring during the General Elections.
          </p>
        </div>
      ),
    },

    {
      title: "2023",
      content: (
        <div>
          <Image
            src={border}
            alt="Border Surveillance"
            className="rounded-lg"
            style={{ height: "300px", width: "400px" }}
          />
          <p className="font-semibold mb-4" style={{ color: BRAND }}>
            Border Security Force (BSF)
          </p>
          <p className="text-sm leading-relaxed text-neutral-800">
            Installed 674 surveillance cameras across sensitive international
            border locations.
          </p>
        </div>
      ),
    },

    {
      title: "2022",
      content: (
        <div>
          <Image
            src={industry}
            alt="Manufacturing"
            className="rounded-lg"
            style={{ height: "300px", width: "400px" }}
          />
          <p className="font-semibold mb-4" style={{ color: BRAND }}>
            Advancing into Manufacturing
          </p>
          <p className="text-sm leading-relaxed text-neutral-800">
            Transitioned into in-house manufacturing aligned with Make in India.
          </p>
        </div>
      ),
    },

    {
      title: "2020",
      content: (
        <div>
          <Image
            src={bank_survilence}
            alt="Bank Surveillance"
            className="rounded-lg"
            style={{ height: "300px", width: "400px" }}
          />
          <p className="font-semibold mb-4" style={{ color: BRAND }}>
            Banking Surveillance
          </p>
          <p className="text-sm leading-relaxed text-neutral-800">
            Strengthened security across banks and ATMs with intelligent CCTV.
          </p>
        </div>
      ),
    },

    {
      title: "2019",
      content: (
        <div>
          <Image
            src={img2019}
            alt="Kaziranga"
            className="rounded-lg"
            style={{ height: "300px", width: "400px" }}
          />
          <p className="font-semibold mb-4" style={{ color: BRAND }}>
            Kaziranga National Park
          </p>
          <p className="text-sm leading-relaxed text-neutral-800">
            Deployed thermal & ANPR systems for wildlife protection.
          </p>
        </div>
      ),
    },

    {
      title: "2016",
      content: (
        <div>
          <Image
            src={imgntonl}
            alt="Nationwide"
            className="rounded-lg"
            style={{ height: "300px", width: "300px" }}
          />
          <p className="font-semibold mb-4" style={{ color: BRAND }}>
            Nationwide Surveillance
          </p>
          <p className="text-sm leading-relaxed text-neutral-800">
            Expanded large-scale surveillance deployments across India.
          </p>
        </div>
      ),
    },

    {
      title: "2014",
      content: (
        <div>
          <Image
            src={img2014}
            alt="Radio Surveillance"
            className="rounded-lg"
            style={{ height: "300px", width: "500px" }}
          />
          <p className="font-semibold mb-4" style={{ color: BRAND }}>
            Radio-Based Surveillance
          </p>
          <p className="text-sm leading-relaxed text-neutral-800">
            Enabled monitoring in remote sand mines using radio communication.
          </p>
        </div>
      ),
    },

    {
      title: "2012",
      content: (
        <div>
          <Image
            src={smart_survilence}
            alt="City Surveillance"
            className="rounded-lg"
            style={{ height: "300px", width: "400px" }}
          />
          <p className="font-semibold mb-4" style={{ color: BRAND }}>
            City Surveillance (Smart City)
          </p>
          <p className="text-sm leading-relaxed text-neutral-800">
            Implemented CCTV systems for urban safety and command centers.
          </p>
        </div>
      ),
    },

    {
      title: "2006",
      content: (
        <div>
          <Image
            src={img2006}
            alt="Web Development"
            className="rounded-lg"
            style={{ height: "300px", width: "300px" }}
          />
          <p className="font-semibold mb-4" style={{ color: BRAND }}>
            Web Development & Digital Marketing
          </p>
          <p className="text-sm leading-relaxed text-neutral-800">
            Started with scalable web platforms and digital branding solutions.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full">
      <Timeline data={data} />
    </section>
  );
}

export default TimelineDemo;
