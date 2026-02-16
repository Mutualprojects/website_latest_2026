"use client";

import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

/* ------------------------------------------------------
   Utility Helpers
------------------------------------------------------ */
const cn = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(" ");

const splitIntoRows = (arr: string[], rows: number): string[][] => {
  const out: string[][] = Array.from({ length: rows }, () => []);
  arr.forEach((v, i) => out[i % rows].push(v));
  return out;
};

const dedupe = (arr: string[]) => Array.from(new Set(arr));

/* ------------------------------------------------------
   IMPORT ALL IMAGES (your EXACT folder structure)
------------------------------------------------------ */

/* BANKS */
import B1 from "./Sector-Clients/Banks/1.png.png";
import B2 from "./Sector-Clients/Banks/2.png.png";
import B3 from "./Sector-Clients/Banks/3.png.png";
import B4 from "./Sector-Clients/Banks/4.png.png";
import B5 from "./Sector-Clients/Banks/5.png.png";
import B6 from "./Sector-Clients/Banks/6.png.png";
import B7 from "./Sector-Clients/Banks/7.png.png";
import B8 from "./Sector-Clients/Banks/8.png.png";
import B9 from "./Sector-Clients/Banks/9.png.png";
import B10 from "./Sector-Clients/Banks/10.png.png";
import B11 from "./Sector-Clients/Banks/11.png.png";

/* CORPORATES */
import C1 from "./Sector-Clients/corporates/1.png.png";
import C2 from "./Sector-Clients/corporates/2.png.png";
import C3 from "./Sector-Clients/corporates/3.png.png";
import C4 from "./Sector-Clients/corporates/4.png.png";
import C5 from "./Sector-Clients/corporates/5.png.png";
import C6 from "./Sector-Clients/corporates/6.png.png";

/* GOVERNMENT */
import G1 from "./Sector-Clients/Government/1.png.png";
import G2 from "./Sector-Clients/Government/2.png.png";
import G3 from "./Sector-Clients/Government/3.png.png";
import G4 from "./Sector-Clients/Government/4.png.png";
import G5 from "./Sector-Clients/Government/5.png.png";
import G6 from "./Sector-Clients/Government/6.png.png";
import G7 from "./Sector-Clients/Government/7.png.png";
import G8 from "./Sector-Clients/Government/8.png.png";
import G9 from "./Sector-Clients/Government/9.png.png";
import G10 from "./Sector-Clients/Government/10.png.png";
import G11 from "./Sector-Clients/Government/11.png.png";
import G12 from "./Sector-Clients/Government/12.png.png";
import G13 from "./Sector-Clients/Government/13.png.png";
import G14 from "./Sector-Clients/Government/14.png.png";
import G15 from "./Sector-Clients/Government/15.png.png";
import G16 from "./Sector-Clients/Government/16.png.png";

/* HOSPITALS */
import H1 from "./Sector-Clients/hospitals/1.png.png";
import H2 from "./Sector-Clients/hospitals/2.png.png";
import H3 from "./Sector-Clients/hospitals/3.png.png";
import H4 from "./Sector-Clients/hospitals/4.png.png";
import H5 from "./Sector-Clients/hospitals/5.png.png";
import H6 from "./Sector-Clients/hospitals/6.png.png";

/* INDUSTRIES */
import I1 from "./Sector-Clients/Industries/1.png.png";
import I2 from "./Sector-Clients/Industries/2.png.png";
import I3 from "./Sector-Clients/Industries/3.png.png";
import I4 from "./Sector-Clients/Industries/4.png.png";
import I5 from "./Sector-Clients/Industries/5.png.png";
import I6 from "./Sector-Clients/Industries/6.png.png";
import I7 from "./Sector-Clients/Industries/7.png.png";
import I8 from "./Sector-Clients/Industries/8.png.png";
import I9 from "./Sector-Clients/Industries/9.png.png";
import I10 from "./Sector-Clients/Industries/10.png.png";
import I11 from "./Sector-Clients/Industries/11.png.png";
import I12 from "./Sector-Clients/Industries/12.png.png";
import I13 from "./Sector-Clients/Industries/13.png.png";
import I14 from "./Sector-Clients/Industries/14.png.png";
import I15 from "./Sector-Clients/Industries/15.png.png";
import I16 from "./Sector-Clients/Industries/16.png.png";

/* REAL ESTATE */
import R1 from "./Sector-Clients/Realestate/1.png.png";
import R2 from "./Sector-Clients/Realestate/2.png.png";
import R3 from "./Sector-Clients/Realestate/3.png.png";
import R4 from "./Sector-Clients/Realestate/4.png.png";
import R5 from "./Sector-Clients/Realestate/5.png.png";
import R6 from "./Sector-Clients/Realestate/6.png.png";
import R7 from "./Sector-Clients/Realestate/7.png.png";
import R8 from "./Sector-Clients/Realestate/8.png.png";
import R9 from "./Sector-Clients/Realestate/9.png.png";

/* SCHOOLS */
import S1 from "./Sector-Clients/Schools/1.png.png";
import S2 from "./Sector-Clients/Schools/2.png.png";
import S3 from "./Sector-Clients/Schools/3.png.png";
import S4 from "./Sector-Clients/Schools/4.png.png";
import S5 from "./Sector-Clients/Schools/5.png.png";
import S6 from "./Sector-Clients/Schools/6.png.png";

/* TEMPLES */
import T1 from "./Sector-Clients/temples/1.png.png";
import T2 from "./Sector-Clients/temples/2.png.png";
import T3 from "./Sector-Clients/temples/3.png.png";
import T4 from "./Sector-Clients/temples/4.png.png";

/* UNIVERSITIES */
import U1 from "./Sector-Clients/University/1.png.png";
import U2 from "./Sector-Clients/University/2.png.png";
import U3 from "./Sector-Clients/University/3.png.png";
import U4 from "./Sector-Clients/University/4.png.png";
import U5 from "./Sector-Clients/University/5.png.png";

/* ------------------------------------------------------
   Build Arrays
------------------------------------------------------ */

const SECTOR_LOGOS = [
  { images: [B1.src, B2.src, B3.src, B4.src, B5.src, B6.src, B7.src, B8.src, B9.src, B10.src, B11.src] },
  { images: [C1.src, C2.src, C3.src, C4.src, C5.src, C6.src] },
  { images: [G1.src, G2.src, G3.src, G4.src, G5.src, G6.src, G7.src, G8.src, G9.src, G10.src, G11.src, G12.src, G13.src, G14.src, G15.src, G16.src] },
  { images: [H1.src, H2.src, H3.src, H4.src, H5.src, H6.src] },
  { images: [I1.src, I2.src, I3.src, I4.src, I5.src, I6.src, I7.src, I8.src, I9.src, I10.src, I11.src, I12.src, I13.src, I14.src, I15.src, I16.src] },
  { images: [R1.src, R2.src, R3.src, R4.src, R5.src, R6.src, R7.src, R8.src, R9.src] },
  { images: [S1.src, S2.src, S3.src, S4.src, S5.src, S6.src] },
  { images: [T1.src, T2.src, T3.src, T4.src] },
  { images: [U1.src, U2.src, U3.src, U4.src, U5.src] },
];

/* ------------------------------------------------------
   Icon Row (Marquee)
------------------------------------------------------ */
interface IconRowProps {
  icons: string[];
  broken: Set<string>;
  markBroken: (src: string) => void;
  direction?: "left" | "right";
  speedSeconds?: number;
  sizePx?: number;
  gapPx?: number;
}

const IconRow: React.FC<IconRowProps> = ({
  icons,
  broken,
  markBroken,
  direction = "left",
  speedSeconds = 12,
  sizePx = 80,
  gapPx = 35,
}) => {
  const safeIcons = useMemo(() => icons.filter((i) => !broken.has(i)), [icons, broken]);

  if (!safeIcons.length) return null;

  return (
    <div
      className="cmh-row relative w-full overflow-hidden"
      style={
        {
          "--speed": `${speedSeconds}s`,
          "--gap": `${gapPx}px`,
          "--icon": `${sizePx}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "cmh-track flex items-center",
          direction === "left" ? "cmh-animate-left" : "cmh-animate-right"
        )}
      >
        <div className="cmh-lane flex items-center">
          {safeIcons.map((src, i) => (
            <LazyLoadImage
              key={`row1-${i}`}
              src={src}
              width={sizePx}
              height={sizePx}
              effect="blur"
              onError={() => markBroken(src)}
              className="cmh-icon"
            />
          ))}
        </div>

        <div className="cmh-lane flex items-center" aria-hidden="true">
          {safeIcons.map((src, i) => (
            <LazyLoadImage
              key={`row2-${i}`}
              src={src}
              width={sizePx}
              height={sizePx}
              effect="blur"
              onError={() => markBroken(src)}
              className="cmh-icon"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------ */

const ClientsMarqueeHero = ({
  brandHex = "#07518a",
  ctaHref = "/case-studies",
  ctaLabel = "View case studies",
}) => {
  const allIcons = useMemo(() => dedupe(SECTOR_LOGOS.flatMap((s) => s.images)), []);
  const ROWS = useMemo(() => splitIntoRows(allIcons, 4), [allIcons]);

  const [broken, setBroken] = useState<Set<string>>(new Set());
  const markBroken = useCallback((src: string) => {
    setBroken((prev) => new Set(prev).add(src));
  }, []);

  return (
    <section className="w-full py-16 relative bg-white">
      <div className="text-center px-6">

        <span className="inline-block px-4 py-1 border rounded-full text-sm mb-4" style={{ borderColor: brandHex, color: brandHex }}>
          Our Clients
        </span>

        <h1
          className="text-5xl font-extrabold"
          style={{
            backgroundImage: `linear-gradient(90deg, ${brandHex}, ${brandHex})`,
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Trusted Across Sectors
        </h1>

        <p className="mt-4 text-gray-700 text-lg max-w-3xl mx-auto">
          We serve{" "}
          <span style={{ color: brandHex }}>banks</span>,{" "}
          <span style={{ color: brandHex }}>government</span>,{" "}
          <span style={{ color: brandHex }}>corporates</span>,{" "}
          <span style={{ color: brandHex }}>schools</span>,{" "}
          <span style={{ color: brandHex }}>universities</span>, and{" "}
          <span style={{ color: brandHex }}>industries</span> across India.
        </p>

        <Link
          href={ctaHref}
          className="inline-block px-6 py-3 mt-8 rounded-full text-white"
          style={{ backgroundColor: brandHex }}
        >
          {ctaLabel}
        </Link>

        {/* LOGO ROWS */}
        <div className="mt-12 space-y-10">
          {ROWS.map((row, i) => (
            <IconRow
              key={i}
              icons={row}
              broken={broken}
              markBroken={markBroken}
              direction={i % 2 === 0 ? "left" : "right"}
              sizePx={120}
              gapPx={20}
              speedSeconds={14}
            />
          ))}
        </div>
      </div>

      <style>{`
      
      
        .cmh-track {
          display: flex;
          will-change: transform;
        }
        .cmh-lane {
          display: flex;
          gap: var(--gap);
          padding-right: var(--gap);
        }
        .cmh-icon {
          width: var(--icon);
          height: var(--icon);
          object-fit: contain;
        }

        @keyframes move-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%);}
        }
        @keyframes move-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0);}
        }

        .cmh-animate-left {
          animation: move-left var(--speed) linear infinite;
        }
        .cmh-animate-right {
          animation: move-right var(--speed) linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ClientsMarqueeHero;
