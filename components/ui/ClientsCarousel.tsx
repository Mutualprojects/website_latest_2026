"use client";

import { useEffect, useMemo, useState } from "react";
import Image, { StaticImageData } from "next/image";

/* ================= BANKS ================= */
import B1 from "../Sector-Clients/Banks/1.png.png";
import B2 from "../Sector-Clients/Banks/2.png.png";
import B3 from "../Sector-Clients/Banks/3.png.png";
import B4 from "../Sector-Clients/Banks/4.png.png";
import B5 from "../Sector-Clients/Banks/5.png.png";
import B6 from "../Sector-Clients/Banks/6.png.png";
import B7 from "../Sector-Clients/Banks/7.png.png";
import B8 from "../Sector-Clients/Banks/8.png.png";
import B9 from "../Sector-Clients/Banks/9.png.png";
import B10 from "../Sector-Clients/Banks/10.png.png";
import B11 from "../Sector-Clients/Banks/11.png.png";

/* ================= CORPORATES ================= */
import C1 from "../Sector-Clients/corporates/1.png.png";
import C2 from "../Sector-Clients/corporates/2.png.png";
import C3 from "../Sector-Clients/corporates/3.png.png";
import C4 from "../Sector-Clients/corporates/4.png.png";
import C5 from "../Sector-Clients/corporates/5.png.png";
import C6 from "../Sector-Clients/corporates/6.png.png";

/* ================= HOSPITALS ================= */
import H1 from "../Sector-Clients/hospitals/1.png.png";
import H2 from "../Sector-Clients/hospitals/2.png.png";
import H3 from "../Sector-Clients/hospitals/3.png.png";
import H4 from "../Sector-Clients/hospitals/4.png.png";
import H5 from "../Sector-Clients/hospitals/5.png.png";
import H6 from "../Sector-Clients/hospitals/6.png.png";

/* ================= INDUSTRIES ================= */
import I1 from "../Sector-Clients/Industries/1.png.png";
import I2 from "../Sector-Clients/Industries/2.png.png";
import I3 from "../Sector-Clients/Industries/3.png.png";
import I4 from "../Sector-Clients/Industries/4.png.png";
import I5 from "../Sector-Clients/Industries/5.png.png";
import I6 from "../Sector-Clients/Industries/6.png.png";
import I7 from "../Sector-Clients/Industries/7.png.png";
import I8 from "../Sector-Clients/Industries/8.png.png";
import I9 from "../Sector-Clients/Industries/9.png.png";
import I10 from "../Sector-Clients/Industries/10.png.png";
import I11 from "../Sector-Clients/Industries/11.png.png";
import I12 from "../Sector-Clients/Industries/12.png.png";
import I13 from "../Sector-Clients/Industries/13.png.png";
import I14 from "../Sector-Clients/Industries/14.png.png";
import I15 from "../Sector-Clients/Industries/15.png.png";
import I16 from "../Sector-Clients/Industries/16.png.png";

/* ================= REAL ESTATE ================= */
import R1 from "../Sector-Clients/Realestate/1.png.png";
import R2 from "../Sector-Clients/Realestate/2.png.png";
import R3 from "../Sector-Clients/Realestate/3.png.png";
import R4 from "../Sector-Clients/Realestate/4.png.png";
import R5 from "../Sector-Clients/Realestate/5.png.png";
import R6 from "../Sector-Clients/Realestate/6.png.png";
import R7 from "../Sector-Clients/Realestate/7.png.png";
import R8 from "../Sector-Clients/Realestate/8.png.png";
import R9 from "../Sector-Clients/Realestate/9.png.png";

/* ================= SCHOOLS ================= */
import S1 from "../Sector-Clients/Schools/1.png.png";
import S2 from "../Sector-Clients/Schools/2.png.png";
import S3 from "../Sector-Clients/Schools/3.png.png";
import S4 from "../Sector-Clients/Schools/4.png.png";
import S5 from "../Sector-Clients/Schools/5.png.png";
import S6 from "../Sector-Clients/Schools/6.png.png";

/* ================= TEMPLES ================= */
import T1 from "../Sector-Clients/temples/1.png.png";
import T2 from "../Sector-Clients/temples/2.png.png";
import T3 from "../Sector-Clients/temples/3.png.png";
import T4 from "../Sector-Clients/temples/4.png.png";

/* ================= UNIVERSITY ================= */
import U1 from "../Sector-Clients/University/1.png.png";
import U2 from "../Sector-Clients/University/2.png.png";
import U3 from "../Sector-Clients/University/3.png.png";
import U4 from "../Sector-Clients/University/4.png.png";
import U5 from "../Sector-Clients/University/5.png.png";

/* ================= LOGOS ARRAY ================= */
const logos: StaticImageData[] = [
  B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11,
  C1, C2, C3, C4, C5, C6,
  H1, H2, H3, H4, H5, H6,
  I1, I2, I3, I4, I5, I6, I7, I8, I9, I10, I11, I12, I13, I14, I15, I16,
  R1, R2, R3, R4, R5, R6, R7, R8, R9,
  S1, S2, S3, S4, S5, S6,
  T1, T2, T3, T4,
  U1, U2, U3, U4, U5,
];

const LOGOS_PER_VIEW = 7;

export default function ClientsCarousel() {
  const total = logos.length;

  const [index, setIndex] = useState<number>(total);
  const [animate, setAnimate] = useState<boolean>(true);

  const extended = useMemo(() => [...logos, ...logos, ...logos], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (index >= total * 2) {
      const t1 = setTimeout(() => {
        setAnimate(false);
        setIndex(total);
      }, 700);

      const t2 = setTimeout(() => {
        setAnimate(true);
      }, 750);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [index, total]);

  const goTo = (i: number) => {
    setIndex(total + i);
  };

  const activeDot = ((index - total) % total + total) % total;

  return (
    <section className="w-full py-12 bg-transparent mr-28">
      <div className="max-w-7xl mx-auto px-4">
        {/* Carousel */}
        <div className="overflow-hidden bg-transparent rounded-2xl">
          <div
            className={`flex ${animate ? "transition-transform duration-700 ease-in-out" : ""}`}
            style={{
              transform: `translateX(-${(index * 100) / LOGOS_PER_VIEW}%)`,
            }}
          >
            {extended.map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center justify-center"
                style={{ width: `${100 / LOGOS_PER_VIEW}%` }}
              >
                <div className="relative h-[100px] w-[200px]">
                  <Image src={logo} alt="Client Logo" fill className="object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots (single line, NO scrollbar) */}
        <div
          className="
            mt-2 flex justify-center gap-2
            overflow-x-auto whitespace-nowrap
            [scrollbar-width:none] [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {logos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 flex-none ${
                activeDot === i ? "bg-[#07518a] w-6" : "bg-gray-300 w-2"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
