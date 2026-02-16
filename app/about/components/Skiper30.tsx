"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Routebutton";

/* ================= IMAGES ================= */
export const images = [
  "/teams/whatsapp-image-2025-10-07-12-17-36-pm.jpg",
  "/teams/Saketh.jpg",
  "/teams/IMG_20251125_053029.jpg",
  "/teams/venu-gopal.jpg",
  "/teams/mayuram-barooah.jpg",
  "/teams/Sasank.png",
  "/teams/me.jpg",
  "/teams/whatsapp-image-2025-11-05-3-38-58-pm.jpg",
  "/teams/Sandeep.jpg",
  "/teams/arvind-durgam.jpg",
  "/teams/rajendra-photo.jpg",
  "/teams/Sagar.jpg",
  "/teams/ashish-bandabuche-sr-purchase-manager.jpg",
  "/teams/Ramu.jpg",
  "/teams/ganesh-headshot.jpg",
  "/teams/reshal-hr-manager.jpg",
  "/teams/prasad-general-manager.jpg",
  "/teams/whatsapp-image-2025-10-07-11-44-22-am-1.jpg",
  "/teams/kiran-general-manager.jpg",
  "/teams/sukesh-accounts-manager.jpg",
  "/teams/accounts-team-photo-rambabu.jpg",
  "/teams/2.jpg",
  "/teams/whatsapp-image-2025-10-14-11-35-20-am.jpg",
  "/teams/vikranth-brand-manager.jpg",
  "/teams/3.jpg",
  "/teams/whatsapp-image-2025-10-07-11-44-22-am-2.jpg",
  "/teams/hemanth-key-account-manager.jpg",
  "/teams/jack-key-account-manager.jpg",
  "/teams/whatsapp-image-2025-09-25-11-14-32-03cf16cf.jpg",
  "/teams/Praveen.jpg",
  "/teams/1.jpg",
];

/* ================= HELPERS ================= */
const distributeImages = (arr: string[], columns: number) => {
  const result: string[][] = Array.from({ length: columns }, () => []);
  arr.forEach((img, index) => {
    result[index % columns].push(img);
  });
  return result;
};

const Skiper30 = () => {
  const router = useRouter();
  const galleryRef = useRef<HTMLDivElement>(null);
  const [vh, setVh] = useState(0);

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  const yValues = [
    useTransform(scrollYProgress, [0, 1], [0, vh * 2.8]),
    useTransform(scrollYProgress, [0, 1], [0, vh * 4]),
    useTransform(scrollYProgress, [0, 1], [0, vh * 2.2]),
    useTransform(scrollYProgress, [0, 1], [0, vh * 3.4]),
  ];

  const columns = distributeImages(images, 4);

  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => setVh(window.innerHeight);

    resize();
    requestAnimationFrame(raf);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="w-full bg-[#eee] text-black">
      {/* ================= INTRO ================= */}
      <section className="flex h-screen flex-col items-center justify-center text-center px-6 bg-[#F4F8FC]">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#07518A]">
          People Powering a Safer, Smarter India
        </h1>

        <p className="mt-6 max-w-3xl text-base md:text-lg text-[#475569] leading-relaxed">
          Since 2006, Brihaspathi Technologies has been driven by people who believe
          in responsibility, innovation, and national-scale impact.
        </p>

        <p className="mt-4 max-w-3xl text-base md:text-lg text-[#475569] leading-relaxed">
          From smart surveillance and IoT innovation to manufacturing and large-scale
          public infrastructure, our people are at the heart of every solution.
        </p>

        <span className="mt-12 text-xs uppercase tracking-widest text-[#0A6AB8] opacity-70">
          Scroll down to explore our team
        </span>
      </section>

      {/* ================= IMAGE SECTION ================= */}
      <section
        ref={galleryRef}
        className="relative flex min-h-[320vh] gap-4 bg-white px-4 py-16 overflow-hidden"
      >
        {columns.map((imgs, index) => (
          <Column key={index} images={imgs} y={yValues[index]} />
        ))}
      </section>

      {/* ================= OUTRO ================= */}
      <section className="flex h-screen flex-col items-center justify-center text-center px-6 bg-white">
        <h2 className="text-2xl md:text-3xl font-medium text-[#07518A] tracking-tight">
          One Team. Shared Responsibility. Lasting Impact.
        </h2>

        <p className="mt-6 max-w-2xl text-sm md:text-base text-[#475569] leading-relaxed">
          Across borders, industries, and challenges, our teams work with a single
          commitment — to deliver secure, reliable, and future-ready solutions.
        </p>

        <div className="mt-10">
          <Button onClick={() => router.push("/about/our-team")} />
        </div>

        <p className="mt-4 text-sm uppercase tracking-widest text-[#0A6AB8] opacity-70">
          Scroll up to explore our leadership & teams
        </p>
      </section>
    </main>
  );
};

/* ================= COLUMN ================= */
type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      style={{ y }}
      className="flex flex-col gap-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
    >
      {images.map((src, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -6, scale: 1.03 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-xl"
        >
          <img
            src={src}
            alt="team member"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export { Skiper30 };
