import React from "react";
import HeroScrollVideo from "../../components/homeabout/scrol-animated-video";
import PrestigiousProjects from "./PrestigiousProjects";
import GovernmentCaseStudyCards from "./GovernmentCaseStudyCards";

export default function Clientvideo() {
  return (
    <main>
   <HeroScrollVideo
  title="Prestigious and Major Projects"
  subtitle="Trusted Across India"
  meta="Since 2006"
  media="https://ik.imagekit.io/tszzqq5h6/compressed-video.mp4?tr=orig"
  overlay={{
    caption: "Trusted by India • Since 2006",
    heading: "Our Prestigious Clients",
    paragraphs: [
      "For over 20 years, Brihaspathi Technologies has been the trusted technology partner for governments, defense forces, public institutions, and leading enterprises across India.",
      "From securing national elections and international borders to powering smart cities, transport corporations, banks, and critical infrastructure, our solutions operate where reliability is non-negotiable.",
      "With 15,000+ clients, 2 million+ cameras installed, and mission-critical deployments nationwide, we deliver technology that safeguards people, assets, and nations."
    ],
  }}
/>
      <section style={{ minHeight: "" }} />
      <GovernmentCaseStudyCards/>
    </main>
  );
}