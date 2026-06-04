"use client";

import React from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Share2,
} from "lucide-react";
import { TextHoverEffect } from "./TextHoverEffect";

import brihaspathiLogo from "@/app/images/sollutionimages/logos/highbtlogo-tm-1.png";

/* ================= CONSTANT ================= */

const BRAND = "#07518a";

/* ================= TYPES ================= */

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

/* ================= COMPONENT ================= */

export default function HoverFooter() {
  /* ================= FOOTER LINKS (ORDERED) ================= */

  const footerLinks: FooterSection[] = [
    {
      /* 🔹 FIRST COLUMN */
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Services", href: "https://www.brihaspathi.com/services" },
        { label: "Solutions", href: "/solutions" },
        { label: "FAQ", href: "/faq" },
        { label: "Get in Touch", href: "/contact" },
        {label:"Escalation Matrix" , href:"/escalation-matrix"},
        {label:"Blogs" , href:"/blogs"}
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Who We Are", href: "/who-we-are" },
        { label: "Board of Directors", href: "/about/Board_of_directors" },
        { label: "Our Team", href: "/our-team" },
        { label: "Our Journey", href: "/ourjourney" },
        { label: "Chairman & Managing Director", href: "/about/our-cmd" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Smart Bus Solution", href: "/solutions/smart-bus-solution" },
        {
          label: "AI VMS – Video Management System",
          href: "/solutions/ai-vms-video-management-system",
        },
        { label: "Solar EPC", href: "/solutions/solar-epc" },
        {
          label: "Smart Biometric & Facial Recognition",
          href: "/solutions/smart-biometric-facial-recognition",
        },
        { label: "ERP Software System", href: "/solutions/erp-software-system" },
        { label: "View All Solutions", href: "/explore-solutions" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Our Events", href: "/our-events" },
        { label: "News", href: "/news" },
        { label: "Our Projects", href: "/our-projects" },
        { label: "Government Projects", href: "/govt-projects" },
        { label: "Media", href: "/media" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Press Release", href: "/press-release" },
        { label: "CSR Initiatives", href: "/resources/csr" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms and Conditions", href: "/terms-and-conditions" },
      ],
    },
  ];

  /* ================= CONTACT ================= */

  const contactInfo = [
    {
      icon: <Mail size={18} color={BRAND} />,
      text: "info@brihaspathi.com",
      href: "mailto:info@brihaspathi.com",
    },
    {
      icon: <Phone size={18} color={BRAND} />,
      text: "+91 98858 88835",
      href: "tel:+91988588835",
    },
    {
      icon: <MapPin size={18} color={BRAND} />,
      text: "Hyderabad, India",
    },
  ];

  /* ================= SOCIAL ================= */

  const socialLinks = [
    {
      icon: <Facebook size={20} />,
      label: "Facebook",
      href: "https://www.facebook.com/BrihaspathiTechnology",
    },
    {
      icon: <Instagram size={20} />,
      label: "Instagram",
      href: "https://www.instagram.com/brihaspathi_tech_official/",
    },
    {
      icon: <Twitter size={20} />,
      label: "Twitter",
      href: "https://x.com/Brihaspathitec",
    },
    {
      icon: <Share2 size={20} />,
      label: "Pinterest",
      href: "https://in.pinterest.com/brihaspathitechnologieslimited/",
    },
    {
      icon: <Youtube size={20} />,
      label: "YouTube",
      href: "https://www.youtube.com/@brihaspathi",
    },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      href: "https://lnkd.in/ge8Gkz9q",
    },
  ];

  /* ================= RENDER ================= */

  return (
    <footer className="relative bg-white border-t border-[#07518a]/15 mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Image
              src={brihaspathiLogo}
              alt="Brihaspathi Logo"
              width={220}
              height={80}
              className="object-contain"
              style={{ width: "auto", height: "auto" }}
            />
            <p className="text-sm leading-relaxed text-[#07518a] max-w-md">
              Brihaspathi delivers intelligent surveillance, smart mobility,
              AI-driven analytics, and secure digital infrastructure solutions
              for governments, enterprises, and smart cities.
            </p>
          </div>

          {/* Footer Columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4
                className="text-lg font-semibold mb-5"
                style={{ color: BRAND }}
              >
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-[#07518a] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ================= HOVER TEXT ================= */}
        <div className="hidden lg:flex h-[26rem] -mt-48-mb-32">
          <TextHoverEffect
            text="Brihaspathi"
            duration={0.5}
            className="w-full"
          />
        </div>

        <hr className="border-t border-[#07518a]/20 my-10" />

        {/* ================= BOTTOM ================= */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          {/* Contact */}
          <div className="flex flex-col sm:flex-row gap-6">
            {contactInfo.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                {item.icon}
                {item.href ? (
                  <a
                    href={item.href}
                    className="hover:text-[#07518a] transition-colors"
                  >
                    {item.text}
                  </a>
                ) : (
                  <span>{item.text}</span>
                )}
              </div>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-5">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-gray-500 hover:text-[#07518a] transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Legal links + Copyright */}
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-gray-500">
            <a
              href="/privacy-policy"
              className="hover:text-[#07518a] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-and-conditions"
              className="hover:text-[#07518a] transition-colors"
            >
              Terms and Conditions
            </a>
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Brihaspathi Technologies Limited. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
