"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Twitter,
  Youtube,
  Linkedin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Rajasekhar Papolu",
    title: "Chairman & Managing Director",
    description:
      "With a Computer Science Engineering background, Chairman & Managing Director Rajasekhar Papolu drives vision and growth. He integrates AI, advances software development, strengthening presence in India. His sales-and-services expands opportunities in software and security systems. Skilled in sales, business development, and project management, he champions innovation and excellence.",
    imageUrl: "/teams/cmd.png",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "https://www.linkedin.com/in/rajas2121/",
  },
  {
    name: "Hymavathi Papolu",
    title: "Director – Administration",
    description:
      "Hymavathi Papolu, Director of Administration, is a seasoned leader in organizational management. She blends expertise in accounting, finance, and operations to streamline processes and boost efficiency. By applying strategic financial practices and disciplined resource management, she ensures smooth Finance and Accounts performance, driving operational excellence, accountability, and sustainable, ongoing growth.",
    imageUrl: "/teams/HYMAVATHI.jpg",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "https://www.linkedin.com/in/hyma-p-464b65145/",
  },
  {
    name: "K. Venkatesham",
    title: "Director – Operations",
    description:
      "Dr. K. Venkatesham is a distinguished former IPS officer (Maharashtra Cadre, 1988 batch) with over three decades of leadership in public service, strategic operations, and technology-driven governance. He has held key positions including Commissioner of Police (Pune & Nagpur) and Additional Director General – Special Operations, driving major initiatives in law enforcement, cybercrime, and citizen-centric services.In his current role at Brihaspathi Technologies Limited, he leads operational strategy and execution, leveraging his expertise in large-scale program management and technology integration. He has been closely associated with multi-state initiatives such as the 108 Ambulance Network and other government programs, consistently delivering efficiency, scalability, and measurable impact.A recipient of the President’s Police Medal for Distinguished Service, Dr. Venkatesham is widely respected for his leadership, integrity, and commitment to excellence.",
    imageUrl: "/teams/K.Venkatesham.jpeg",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "https://www.linkedin.com/in/k-venkatesham-dr-6b5530232?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    name: "Murali Krishna Arasala",
    title: "Executive Director",
    description:
      "Since 2009, Murali Krishna has leveraged his MCA to excel as Chief Administration Officer, orchestrating daily operations and cross-department coordination. He oversees facilities, resources, and compliance, and leads tendering, documentation, and bid management across e-procurement platforms. Meticulous with Tender/RFP/EOI norms and tools like Tender Tiger, he drives reliable, efficient execution.",
    imageUrl: "/teams/Murali.jpg",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "https://www.linkedin.com/in/murali-krishna-b66564365/",
  },
  {
    name: "Mantha Pratima",
    title: "Non-Executive Director",
    description:
      "A seasoned professional with 18+ years of experience in administration and education management. She has led institutional operations and governance across multiple organizations. Currently holding leadership roles in real estate, technology, and education sectors, she focuses on operational excellence, strategic planning, and sustainable organizational growth",
    imageUrl: "/mantha-prtima.jpg",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "https://www.linkedin.com/in/murali-krishna-b66564365/",
  }, {
    name: "Shailendra Tummalapalli",
    title: "Non-Executive Director",
    description:
      "Since 2009, Murali Krishna has leveraged his MCA to excel as Chief Administration Officer, orchestrating daily operations and cross-department coordination. He oversees facilities, resources, and compliance, and leads tendering, documentation, and bid management across e-procurement platforms. Meticulous with Tender/RFP/EOI norms and tools like Tender Tiger, he drives reliable, efficient execution.",
    imageUrl: "/shailendra.jpg",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "https://www.linkedin.com/in/murali-krishna-b66564365/",
  }, {
    name: "Priya Rao",
    title: "Independent-Director",
    description:
      "An accomplished executive with 21+ years of experience in operations, governance, and property management. She leads strategic portfolio optimization and serves as an Independent Director across multiple organizations. Certified by IICA and holding a PGDM from NMIMS, she excels in driving operational efficiency, leadership excellence, and sustainable business growth.",
    imageUrl: "/priya-rao.jpg",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "https://www.linkedin.com/in/murali-krishna-b66564365/",
  },


  {
    name: "Devendra Singh",
    title: "Independent-Director",
    description:
      "Devendrasingh Rajput is a veteran healthcare leader and Certified Independent Director with over 25 years of global experience. Formerly a CXO at Indira IVF and Apollo Health, he specializes in managing ₹1000Cr+ P&Ls, M&A, and digital transformation. He excels at driving corporate governance and long-term shareholder value.",
    imageUrl: "/Devendra.jpg",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "http://www.linkedin.com/in/devendrasingh-rajput-b453a414",
  },


];


export interface TestimonialCarouselProps {
  className?: string;
}

export function TestimonialCarousel({ className }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((index) => (index + 1) % testimonials.length);
  const handlePrevious = () =>
    setCurrentIndex(
      (index) => (index - 1 + testimonials.length) % testimonials.length
    );

  const currentTestimonial = testimonials[currentIndex];

  const socialIcons = [
    // { icon: Github, url: currentTestimonial.githubUrl, label: "GitHub" },
    // { icon: Twitter, url: currentTestimonial.twitterUrl, label: "Twitter" },
    // { icon: Youtube, url: currentTestimonial.youtubeUrl, label: "YouTube" },
    { icon: Linkedin, url: currentTestimonial.linkedinUrl, label: "LinkedIn" },
  ];

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
      {/* Desktop layout */}
      <div className='hidden md:flex relative items-center'>
        {/* Avatar */}
        <div className='w-[470px] h-[470px] rounded-3xl overflow-hidden bg-gray-200 dark:bg-neutral-800 flex-shrink-0'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentTestimonial.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className='w-full h-full'
            >
              <Image
                src={currentTestimonial.imageUrl}
                alt={currentTestimonial.name}
                width={470}
                height={470}
                className='w-full h-full object-cover'
                draggable={false}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card */}
        <div className='bg-white dark:bg-card rounded-3xl shadow-2xl p-8 ml-[-80px] z-10 max-w-xl flex-1'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentTestimonial.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className='mb-6'>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
                  {currentTestimonial.name}
                </h2>

                <p className='text-sm font-medium text-gray-700 dark:text-gray-500'>
                  {currentTestimonial.title}
                </p>
              </div>

              <p className='text-black dark:text-white text-base leading-relaxed mb-8'>
                {currentTestimonial.description}
              </p>

              <div className='flex space-x-4'>
                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                  <Link
                    key={label}
                    href={url || "#"}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-12 h-12 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center transition-colors hover:bg-gray-800 dark:hover:bg-gray-200 hover:scale-105 cursor-pointer'
                    aria-label={label}
                  >
                    <IconComponent className='w-5 h-5 text-white dark:text-gray-900' />
                  </Link>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile layout */}
      <div className='md:hidden max-w-sm mx-auto text-center bg-transparent'>
        {/* Avatar */}
        <div className='w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-3xl overflow-hidden mb-6'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentTestimonial.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className='w-full h-full'
            >
              <Image
                src={currentTestimonial.imageUrl}
                alt={currentTestimonial.name}
                width={400}
                height={400}
                className='w-full h-full object-cover'
                draggable={false}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card content */}
        <div className='px-4'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentTestimonial.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                {currentTestimonial.name}
              </h2>

              <p className='text-sm font-medium text-gray-600 dark:text-gray-300 mb-4'>
                {currentTestimonial.title}
              </p>

              <p className='text-black dark:text-white text-sm leading-relaxed mb-6'>
                {currentTestimonial.description}
              </p>

              <div className='flex justify-center space-x-4'>
                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                  <Link
                    key={label}
                    href={url || "#"}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-12 h-12 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center transition-colors hover:bg-gray-800 dark:hover:bg-gray-200 cursor-pointer'
                    aria-label={label}
                  >
                    <IconComponent className='w-5 h-5 text-white dark:text-gray-900' />
                  </Link>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className='flex justify-center items-center gap-6 mt-8'>
        {/* Previous */}
        <button
          onClick={handlePrevious}
          aria-label='Previous testimonial'
          className='w-12 h-12 rounded-full bg-gray-100 dark:bg-card border border-gray-300 dark:border-card/40 shadow-md flex items-center justify-center hover:bg-gray-200 dark:hover:bg-card/80 transition-colors cursor-pointer'
        >
          <ChevronLeft className='w-6 h-6 text-gray-700 dark:text-gray-50' />
        </button>

        {/* Dots */}
        <div className='flex gap-2'>
          {testimonials.map((_, testimonialIndex) => (
            <button
              key={testimonialIndex}
              onClick={() => setCurrentIndex(testimonialIndex)}
              className={cn(
                "w-3 h-3 rounded-full transition-colors cursor-pointer",
                testimonialIndex === currentIndex
                  ? "bg-gray-900 dark:bg-white"
                  : "bg-gray-400 dark:bg-gray-600"
              )}
              aria-label={`Go to testimonial ${testimonialIndex + 1}`}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={handleNext}
          aria-label='Next testimonial'
          className='w-12 h-12 rounded-full bg-gray-100 dark:bg-card border border-gray-300 dark:border-card/40 shadow-md flex items-center justify-center hover:bg-gray-200 dark:hover:bg-card/80 transition-colors cursor-pointer'
        >
          <ChevronRight className='w-6 h-6 text-gray-700 dark:text-gray-50' />
        </button>
      </div>
    </div>
  );
}
