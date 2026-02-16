"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Calendar } from "lucide-react";

const BRAND = "#07518a";

const FAQ_ITEMS = [
  {
    id: "1",
    question: "What services does Brihaspathi Technologies Limited offer?",
    answer:
      "Brihaspathi Technologies Limited offers AI-powered surveillance and video management systems, smart biometric and facial recognition, smart bus solutions, solar EPC, system integration and turnkey delivery, command and control centre engineering, IT and digital infrastructure, AI video analytics, and software products and services for governments, enterprises, and smart cities.",
  },
  {
    id: "2",
    question:
      "Is Brihaspathi Technologies Limited experienced in handling large-scale government and corporate projects?",
    answer:
      "Yes. We have extensive experience delivering large-scale government and corporate projects across India, including surveillance, ELV systems, smart city solutions, and renewable energy. Our track record includes 15+ years of operations and thousands of successful installations.",
  },
  {
    id: "3",
    question:
      "Do you provide after-sales support and maintenance for your products?",
    answer:
      "Yes. We provide comprehensive after-sales support and maintenance for our products and solutions, including technical support, preventive maintenance, and timely upgrades to ensure optimal performance and longevity.",
  },
  {
    id: "4",
    question:
      "Can Brihaspathi Technologies customize software and hardware solutions for specific business needs?",
    answer:
      "Yes. We offer customized software and hardware solutions tailored to specific business needs. Our solution engineering and consulting teams work with you to design and implement solutions that fit your requirements and workflows.",
  },
  {
    id: "5",
    question: "Where are your service locations and offices located?",
    answer:
      "We have a registered office and corporate office in Hyderabad, and presence across multiple cities in India including Delhi, Bengaluru, Lucknow, Chennai, Navi Mumbai, Patna, Kolkata, Guwahati, Bhopal, Kurnool, Chandigarh, and others to serve clients nationwide.",
  },
  {
    id: "6",
    question:
      "How can I get a quote or schedule a demo for your products and solutions?",
    answer:
      "You can get a quote or schedule a demo by contacting us via the Contact page, email (info@brihaspathi.com), or phone (+91 90634 70204). Our team will respond promptly to arrange a demo or provide a tailored quote.",
  },
];

export default function FAQPage() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const allIds = FAQ_ITEMS.map((item) => item.id);
  const allExpanded = allIds.every((id) => openIds.has(id));

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    if (allExpanded) setOpenIds(new Set());
    else setOpenIds(new Set(allIds));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="relative border-b border-[#07518a]/15 bg-[#f8fafb] py-16 sm:py-20"
        style={{ color: BRAND }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-base text-gray-600">
            Quick answers about our services, support, and how to work with us.
          </p>
        </div>
      </section>

      {/* FAQ list */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <p className="text-sm font-medium text-gray-500">
            Total FAQs: {FAQ_ITEMS.length}
          </p>
          <button
            type="button"
            onClick={expandAll}
            className="text-sm font-semibold transition-colors hover:opacity-80"
            style={{ color: BRAND }}
          >
            {allExpanded ? "Collapse All" : "Expand All"}
          </button>
        </div>

        <ul className="mt-2 divide-y divide-gray-200">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openIds.has(item.id);
            return (
              <li key={item.id} className="border-gray-200">
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:bg-gray-50/50"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-gray-900">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`mt-1 h-5 w-5 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    style={{ color: BRAND }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pl-0 pr-10 text-sm leading-relaxed text-gray-600">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* Still have questions? CTA */}
        <div
          className="mt-16 rounded-2xl border border-[#07518a]/20 bg-[#f8fafb] p-8 text-center sm:p-10"
          style={{ borderColor: `${BRAND}20` }}
        >
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Still have questions?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600">
            Connect with our experts for detailed information about our
            products, services, or enterprise partnerships.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: BRAND }}
            >
              <MessageCircle className="h-4 w-4" />
              Contact Us
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border-2 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-[#07518a]/5"
              style={{ borderColor: BRAND, color: BRAND }}
            >
              <Calendar className="h-4 w-4" />
              Schedule a Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
