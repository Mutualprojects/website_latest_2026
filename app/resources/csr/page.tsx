"use client";

import React from "react";
import { motion } from "framer-motion";
import { CSRPageLayout } from "./CSRPageLayout";

const BRAND = "#07518a";

const initiatives = [
  {
    id: "book-distribution",
    title: "Book Distribution (FY 2024–25)",
    content: (
      <>
        <p>
          In FY 2024–25, we proudly contributed <strong>₹13.95 Lakhs</strong> towards the distribution of books to needy and underprivileged individuals.
        </p>
        <p>
          This initiative reflects our commitment to making education accessible and empowering communities through knowledge. By supporting students with essential learning resources, we aim to remove barriers to education and help build brighter, more confident futures.
        </p>
        <p className="text-[#07518a] font-semibold italic mt-6">
          Investing in education. Inspiring change. Creating impact.
        </p>
      </>
    ),
  },
  {
    id: "vision-care",
    title: "Vision Care Support (FY 2025–26)",
    content: (
      <>
        <p>
          In FY 2025–26, we contributed <strong>₹25 Lakhs</strong> towards critical eye treatment for a patient in need, helping restore vision and improve quality of life.
        </p>
        <p>
          Through timely healthcare support, we continue our commitment to making a meaningful difference where it matters most.
        </p>
        <p className="text-[#07518a] font-semibold italic mt-6">
          Restoring sight. Renewing hope. Creating impact.
        </p>
      </>
    ),
  },
  {
    id: "educational-sponsorship",
    title: "Educational Sponsorship (FY 2025–26)",
    content: (
      <>
        <p>
          In FY 2025–26, we proudly extended our support through the sponsorship of education for <strong>20 deserving students</strong>, reinforcing our commitment to empowering young minds through access to quality education.
        </p>
        <p>
          By providing financial assistance, we aim to reduce educational barriers and enable students to focus on their academic growth with confidence and stability. This initiative reflects our belief that investing in education is one of the most powerful ways to create long-term social impact.
        </p>
        <p>
          Through this sponsorship program, we continue to nurture aspirations, support talent, and contribute to building a brighter and more inclusive future.
        </p>
        <p className="text-[#07518a] font-semibold italic mt-6">
          Empowering Students. Enabling Dreams. Building Tomorrow.
        </p>
      </>
    ),
  },
  {
    id: "public-safety",
    title: "Supporting Public Safety (FY 2025–26)",
    content: (
      <>
        <p>
          In FY 2025–26, we contributed <strong>₹2 Lakhs</strong> to the Hyderabad City Security Council as part of our Corporate Social Responsibility commitment.
        </p>
        <p>
          This contribution reflects our dedication to strengthening public safety initiatives and supporting collaborative efforts that enhance security awareness, community protection, and urban resilience. We believe that safe and secure cities form the foundation for sustainable growth and community well-being.
        </p>
        <p>
          Through this initiative, we reaffirm our commitment to responsible corporate citizenship and meaningful community engagement.
        </p>
        <p className="text-[#07518a] font-semibold italic mt-6">
          Supporting Safety. Strengthening Communities. Building Trust.
        </p>
      </>
    ),
  },
];

export default function CSRPage() {
  return (
    <CSRPageLayout
      title="CSR Initiatives"
      subtitle="Our commitment to education, healthcare, and community well-being."
    >
      <div className="space-y-14 sm:space-y-18">
        {initiatives.map((initiative, index) => (
          <motion.section
            key={initiative.id}
            id={initiative.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="border-b border-gray-200 pb-12 last:border-0 last:pb-0"
          >
            <h2
              className="text-xl sm:text-2xl font-semibold mb-6"
              style={{ color: BRAND }}
            >
              {initiative.title}
            </h2>
            <div className="prose prose-lg prose-neutral max-w-none prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4 prose-strong:text-gray-800">
              {initiative.content}
            </div>
          </motion.section>
        ))}
      </div>
    </CSRPageLayout>
  );
}
