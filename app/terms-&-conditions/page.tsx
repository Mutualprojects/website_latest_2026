"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import banerimage from "./3053.jpg";

const terms = [
  {
    number: "01",
    title: "Delivery & Warranty",
    body: `Goods must be delivered to our stores/warehouse by the specified date. In case goods are required to be delivered at client location, an advance intimation to that effect shall be made. Any delay in delivering goods to the destination may result in penalties. Product warranty is 3 years from the date of supply or installation whichever is later. Supplier must provide warranty service promptly upon request.`,
  },
  {
    number: "02",
    title: "Delivery Terms",
    body: `Goods must be delivered to the specified destination. Any delay in delivering goods to the destination may result in penalties as deemed appropriate by Brihaspathi Technologies.`,
  },
  {
    number: "03",
    title: "Payment",
    body: `Payment will be made within 28 days Credit as agreed with the Vendor. Invoices should be submitted along with the goods for processing.`,
  },
  {
    number: "04",
    title: "Part Shipments",
    body: `No part shipments are accepted unless explicitly agreed upon in writing prior to dispatch.`,
  },
  {
    number: "05",
    title: "Invoice Submission",
    body: `The invoice must be submitted along with goods delivery for the payment process to be initiated promptly.`,
  },
  {
    number: "06",
    title: "E-Way Bill & Bank Details",
    body: `E-way bill and bank account details must be submitted along with the invoice copy without fail for every consignment.`,
  },
  {
    number: "07",
    title: "Quality Assurance",
    body: `Goods must meet agreed-upon specifications and quality standards. Brihaspathi Technologies reserves the right to cancel the PO if quality standards are not met.`,
  },
  {
    number: "08",
    title: "Cancellation",
    body: `Brihaspathi Technologies reserves the right to cancel the Purchase Order if terms and conditions as specified herein are not met by the Supplier.`,
  },
  {
    number: "09",
    title: "Confidentiality",
    body: `Supplier must maintain the confidentiality of all proprietary information shared during the course of this agreement and shall not disclose the same to any third party.`,
  },
  {
    number: "10",
    title: "Governing Law",
    body: `These terms and conditions are governed by the laws of Telangana, India. Any disputes arising from these terms will be subject to the jurisdiction of the courts in Telangana.`,
  },
  {
    number: "11",
    title: "Dispute Resolution",
    body: null,
    bullets: [
      `Any disputes arising out of or in connection with this Agreement shall be resolved amicably between the parties.`,
      `In the event that the Parties are unable to resolve any dispute arising out of or in connection with this Agreement, such dispute shall be referred to arbitration in accordance with the provisions of the Indian Arbitration and Conciliation Act, 1996 or any statutory modification or re-enactment thereof for the time being in force.`,
      `A Sole arbitrator shall be appointed by mutual consent of both the Parties. The arbitration shall be conducted in English, and the seat and the venue of Arbitration shall be Hyderabad, Telangana.`,
      `The Arbitration award shall be final and binding on the parties to the reference.`,
    ],
  },
];

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#07518a] font-sans pb-20">
      {/* Navigation Header */}
     

      {/* Hero section with image */}
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
        <Image
          src={banerimage}
          alt="Terms and Conditions banner"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(7,81,138,0.82)] via-[rgba(7,81,138,0.45)] to-black/15 z-10" />
        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-start justify-end p-6 sm:p-8 md:p-12 lg:p-14">
          <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/30 rounded-full px-4 py-1 text-xs font-bold tracking-wider uppercase text-white/90 backdrop-blur-sm mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5bc4f5]" />
            Legal Document
          </span>
          <h1 className="text-[clamp(34px,5.5vw,58px)] font-black tracking-tighter text-white leading-[1.02] mb-3 drop-shadow-lg">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-white/70 max-w-md leading-relaxed">
            Please read the following terms carefully before proceeding with
            any purchase order or supply agreement with Brihaspathi Technologies.
          </p>
        </div>
        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-30" />
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Intro card */}
        <div className="bg-[#f0f8ff] border border-[#c2dff5] rounded-xl p-5 md:p-6 my-8 flex flex-col sm:flex-row gap-3 items-start">
          <div className="w-9 h-9 rounded-lg bg-[#07518a] flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none stroke-2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <p className="text-sm text-[#07518a]/85 leading-relaxed">
            These terms and conditions govern all Purchase Orders issued by{" "}
            <strong className="font-bold text-[#07518a]">Brihaspathi Technologies</strong>.
            By accepting a Purchase Order, the Supplier agrees to comply with all the terms
            listed below. These terms supersede any contrary terms in the Supplier's
            documents unless agreed otherwise in writing.
          </p>
        </div>

        {/* Terms list */}
        <div className="flex flex-col gap-0.5">
          {terms.map((term, idx) => (
            <React.Fragment key={term.number}>
              <div className="border border-[#dceef9] rounded-xl bg-white overflow-hidden hover:shadow-md hover:border-[#b0d7f0] transition-all">
                <div className="flex">
                  {/* Number bar */}
                  <div className="w-[52px] md:w-[72px] flex-shrink-0 flex flex-col items-center justify-start py-6 px-2 md:px-3 bg-[#f5faff] border-r border-[#dceef9]">
                    <span className="text-2xl font-black text-[#07518a] tracking-tight opacity-20">
                      {term.number}
                    </span>
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-[rgba(7,81,138,0.15)] to-transparent rounded-full mt-2 min-h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 py-5 md:py-6 px-5 md:px-6">
                    <div className="flex items-center gap-2 flex-wrap text-sm md:text-base font-extrabold text-[#07518a] tracking-tight mb-2">
                      {term.title}
                      <span className="text-[10px] font-bold tracking-wide uppercase text-[#07518a] bg-[#e0f0fb] border border-[#b8d9f0] rounded-full px-2 py-0.5">
                        Clause {term.number}
                      </span>
                    </div>

                    {term.body && (
                      <p className="text-sm text-[#07518a]/80 leading-relaxed">
                        {term.body}
                      </p>
                    )}

                    {term.bullets && (
                      <div className="flex flex-col gap-2 mt-1">
                        {term.bullets.map((bullet, i) => (
                          <div key={i} className="flex gap-3 items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#07518a]/45 mt-1.5" />
                            <p className="text-sm text-[#07518a]/80 leading-relaxed">
                              {bullet}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {idx < terms.length - 1 && (
                <div className="h-px bg-gradient-to-r from-transparent via-[#dceef9] to-transparent my-1" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}