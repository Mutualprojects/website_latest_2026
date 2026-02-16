"use client";

import React from "react";
import Image from "next/image";

/* ================= BRAND ================= */
const BRAND = "#07518a";

/* ================= IMAGES ================= */
import C1 from "@/components/certifiactions/1.png";
import C2 from "@/components/certifiactions/2.png";
import C3 from "@/components/certifiactions/3.png";
import C4 from "@/components/certifiactions/4.png";
import C5 from "@/components/certifiactions/5.png";
import C6 from "@/components/certifiactions/6.png";
import C7 from "@/components/certifiactions/7.png";
import C8 from "@/components/certifiactions/8.png";
import C9 from "@/components/certifiactions/9.png";
import C10 from "@/components/certifiactions/10.png";
import C11 from "@/components/certifiactions/11.png";
import C12 from "@/components/certifiactions/12.png";
import C13 from "@/components/certifiactions/13.png";
import C14 from "@/components/certifiactions/14.png";
import C15 from "@/components/certifiactions/15.png";
import C16 from "@/components/certifiactions/16.png";
import C17 from "@/components/certifiactions/17.png";
import C18 from "@/components/certifiactions/18.png";
import C19 from "@/components/certifiactions/19.png";
import C20 from "@/components/certifiactions/20.png";
import C21 from "@/components/certifiactions/21.png";
import C22 from "@/components/certifiactions/22.png";
import C23 from "@/components/certifiactions/23.png";
import C24 from "@/components/certifiactions/24.png";
import C25 from "@/components/certifiactions/25.png";
import C26 from "@/components/certifiactions/26.png";
import C27 from "@/components/certifiactions/27.png";
import C28 from "@/components/certifiactions/28.png";
import C29 from "@/components/certifiactions/29.png";

/* ================= DATA ================= */
const CERT_LOGOS = [
  C1, C2, C3, C4, C5, C6, C7, C8, C9, C10,
  C11, C12, C13, C14, C15, C16, C17, C18, C19, C20,
  C21, C22, C23, C24, C25, C26, C27, C28, C29,
];

/* ================= COMPONENT ================= */
export default function CertificationsSection() {
  return (
    <section className="relative w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT — TEXT / TRUST STORY */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 mb-4">
            <span
              className="h-1 w-6 rounded-full"
              style={{ backgroundColor: BRAND }}
            />
            <span
              className="text-xs uppercase tracking-widest font-semibold"
              style={{ color: BRAND }}
            >
              Compliance & Trust
            </span>
          </div>

          <h2
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
            style={{ color: BRAND }}
          >
            Globally Certified. <br />
            <span className="text-slate-900">
              Nationally Trusted.
            </span>
          </h2>

          <p className="mt-6 text-base md:text-lg leading-relaxed text-slate-600">
            Brihaspathi Technologies adheres to the most stringent global
            benchmarks. Our certifications form the foundation of our promise
            to <strong>Secure, Automate, and Connect</strong>—ensuring every
            solution we deliver meets international standards of quality,
            security, and compliance.
          </p>

          <ul className="mt-6 space-y-4 text-slate-700 text-sm md:text-base">
            <li>
              <strong style={{ color: BRAND }}>
                ISO 9001:2015 —
              </strong>{" "}
              Certified Quality Management System ensuring consistency across
              every product manufactured at our Siddipet facility.
            </li>
            <li>
              <strong style={{ color: BRAND }}>
                ISO 27001 —
              </strong>{" "}
              International standard for Information Security Management,
              safeguarding the data of <strong>15,000+ global clients</strong>.
            </li>
            <li>
              <strong style={{ color: BRAND }}>
                CE & FCC Compliance —
              </strong>{" "}
              TrinAI and Technorack platforms meet European and American safety
              and electromagnetic standards.
            </li>
            <li>
              <strong style={{ color: BRAND }}>
                MSME & Startup India —
              </strong>{" "}
              Recognized for indigenous innovation under the Make in India
              initiative.
            </li>
            <li>
              <strong style={{ color: BRAND }}>
                Aadhaar Integrated Partner —
              </strong>{" "}
              Authorized for secure biometric and facial recognition systems.
            </li>
          </ul>
        </div>

        {/* RIGHT — CERTIFICATION LOGOS */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
            {CERT_LOGOS.map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition"
              >
                <Image
                  src={logo}
                  alt={`Certification ${idx + 1}`}
                  className="object-contain"
                  width={120}
                  height={120}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
