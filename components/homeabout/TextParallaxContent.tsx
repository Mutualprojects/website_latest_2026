"use client";

import React, { ReactNode, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image, { StaticImageData } from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* IMAGES */
/* ------------------------------------------------------------------ */
import india_image from "./scroll/125521.jpg";
import scrollsecond from "./scroll/home1.jpg";
import scrollthird from "./scroll/home2.jpg";

import strength from "./scroll/check.png";
import trust from "./scroll/trust.png";
import future from "./scroll/think_12430364.png";

/* ------------------------------------------------------------------ */

interface TextParallaxContentProps {
  imgUrl: StaticImageData;
  subheading: string;
  heading: string;
  children: ReactNode;
}

interface ExampleContentProps {
  title: string;
  paragraphOne: string;
  paragraphTwo: string;
  icon: StaticImageData;
}

/* ------------------------------------------------------------------ */

const IMG_PADDING = 12;

const TextParallaxContentExample = () => {
  return (
    <div className="bg-white">
      {/* ================= SECTION 1 ================= */}
      <TextParallaxContent
        imgUrl={india_image}
        subheading="AI • IoT • Surveillance Intelligence"
        heading="Intelligence at National Scale"
      >
        <ExampleContent
          icon={strength}
          title="Our Core Strength"
          paragraphOne="
            We don’t just deploy cameras — we deploy intelligence across India.
            Brihaspathi Technologies is nationally recognized for delivering
            AI-powered video analytics and mission-critical security solutions
            that operate reliably at massive scale.
          "
          paragraphTwo="
            From smart city surveillance and integrated command & control centers
            to advanced AI analytics such as ANPR, facial recognition, intrusion
            detection, crowd analysis, and real-time monitoring, our platforms
            transform raw video into actionable intelligence that enhances public
            safety, operational efficiency, and data-driven decision-making.
          "
        />
      </TextParallaxContent>

      {/* ================= SECTION 2 ================= */}
      <TextParallaxContent
        imgUrl={scrollsecond}
        subheading="Elections • Borders • National Infrastructure"
        heading="Trusted When Failure Is Not an Option"
      >
        <ExampleContent
          icon={trust}
          title="Scale, Proof & Trust"
          paragraphOne="
            When the nation demands absolute reliability, governments and
            large-scale enterprises choose Brihaspathi Technologies.
            Our systems are deployed in environments where downtime,
            inaccuracies, or delays are simply unacceptable.
          "
          paragraphTwo="
            From General Elections and national examinations to border security,
            critical infrastructure, and high-risk public deployments, our
            platforms operate under extreme scale and pressure — delivering
            consistent performance, regulatory compliance, and operational trust
            when it matters most.
          "
        />
      </TextParallaxContent>

      {/* ================= SECTION 3 ================= */}
      <TextParallaxContent
        imgUrl={scrollthird}
        subheading="AI Security • Solar EPC • Make in India"
        heading="Engineering the Future — Secure, Smart, Sustainable"
      >
        <ExampleContent
          icon={future}
          title="Future-Ready Vision"
          paragraphOne="
            The future of national infrastructure must be intelligent,
            secure, and sustainable — and we are engineering exactly that.
            Our solutions seamlessly integrate AI security, smart energy,
            and digital infrastructure into a unified ecosystem.
          "
          paragraphTwo="
            Backed by Make-in-India manufacturing and long-term R&D commitment,
            Brihaspathi Technologies is not building short-term products —
            we are building foundational technology platforms designed to
            scale, adapt, and serve the nation over the next 10–20 years.
          "
        />
      </TextParallaxContent>
    </div>
  );
};


export default TextParallaxContentExample;

/* ------------------------------------------------------------------ */
/* PARALLAX WRAPPER */
/* ------------------------------------------------------------------ */

const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  children,
}: TextParallaxContentProps) => {
  return (
    <div className="px-3">
      {/* Desktop Parallax */}
      <div className="relative hidden md:block h-[200vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy subheading={subheading} heading={heading} />
      </div>

      {/* Mobile Image */}
      <div className="relative md:hidden rounded-2xl overflow-hidden">
        <Image
          src={imgUrl}
          alt={heading}
          className="h-[70vh] w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-6 px-6 text-white">
          <p className="mb-2 text-sm uppercase tracking-wide">
            {subheading}
          </p>
          <h2 className="text-3xl font-bold leading-tight">
            {heading}
          </h2>
        </div>
      </div>

      {children}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* STICKY IMAGE (DESKTOP ONLY) */
/* ------------------------------------------------------------------ */

const StickyImage = ({ imgUrl }: { imgUrl: StaticImageData }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        backgroundImage: `url(${imgUrl.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      className="sticky rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-black/70"
        style={{ opacity }}
      />
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* OVERLAY COPY (DESKTOP ONLY) */
/* ------------------------------------------------------------------ */

const OverlayCopy = ({
  subheading,
  heading,
}: {
  subheading: string;
  heading: string;
}) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
      <p className="mb-3 text-xl">{subheading}</p>
      <h1 className="text-center text-6xl font-bold max-w-4xl">
        {heading}
      </h1>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* CONTENT SECTION */
/* ------------------------------------------------------------------ */

const ExampleContent = ({
  title,
  paragraphOne,
  paragraphTwo,
  icon,
}: ExampleContentProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.from(ref.current.children, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, []);

  return (
    <div
      ref={ref}
      className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 py-24"
    >
      <div className="md:col-span-4 flex flex-col gap-4">
        <h3 className="text-3xl font-bold">{title}</h3>
        <Image src={icon} alt={title} width={200} />
      </div>

      <div className="md:col-span-8">
        <p className="mb-4 text-lg text-neutral-600">
          {paragraphOne}
        </p>
        <p className="text-lg text-neutral-600">
          {paragraphTwo}
        </p>
      </div>
    </div>
  );
};
