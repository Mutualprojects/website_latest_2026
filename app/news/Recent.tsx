'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';
import { ChevronLeft, ChevronRight, X, ArrowUpRight, Eye } from 'lucide-react';

// =============================
// ARTICLE IMAGES
// =============================
import imgRajasekhar from './Screenshot 2026-02-26 174646.png';
import imgBorderSecurity from './Screenshot 2026-02-26 174746.png';
import imgSpotlighting from './Screenshot 2026-02-26 174907.png';
import telanganatoday from './nesbanners/Screenshot 2026-02-27 102238.png';
import techobserve from './nesbanners/Screenshot 2026-02-27 102501.png';
import mediaberief from './nesbanners/Screenshot 2026-02-27 102313.png';
import apn from './nesbanners/Screenshot 2026-02-27 102429.png';
import bombay from './nesbanners/Screenshot 2026-02-27 102404.png';
import csxo from './nesbanners/Screenshot 2026-02-27 102133.png';
import main_image from './Screenshot 2026-05-12 183649.png';
import women_2026 from './press/Times Power Woman Post Event june 2026.jpg.jpeg';
import Et_some from './press/WhatsApp Image 2026-06-22 at 10.07.32 AM (1).jpeg';
import imgEtExcellence2026 from './Screenshot from 2026-08-15 19-52-29.png';
import imgSecurityBackbone2026 from './Screenshot from 2026-08-15 19-54-33.png';
// =============================
// PRESS LOGOS
// =============================
import apnLogo from './press/apnnews.png';
import cxoLogo from './press/cxo.png';
import bombayTimesLogo from './press/download (1).png';
import techObserverLogo from './press/download (2).png';
import economicTimesLogo from './press/logo1.png';
import mediaBriefLogo from './press/mediabrieflogoapril2018.jpg.webp';
import telanganaTodayLogo from './press/tt-logo-1.png';
import Et from './press/et.png';

// =============================
// BRAND TOKENS
// =============================
const BRAND = {
  primary: '#07518a',
  primaryDark: '#053d68',
  primaryLight: '#0a7acc',
  accent: '#c9a449',       // refined gold — entrepreneurial / editorial feel
  accentLight: '#e2c074',
  ink: '#0f1b2a',
  paper: '#fbfaf7',         // warm off-white, premium magazine paper
  mute: '#6b7785',
};

// =============================
// INTERFACE
// =============================
export interface ArticleData {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  link: string;
  pressName: string;
  pressIcon: StaticImageData;
  category?: string;
}

// =============================
// ARTICLES DATA
// =============================
export const articlesData: ArticleData[] = [
  {
    id: 1,
    title: 'Celebrating Progress and Inspiring Entrepreneurial Spirit',
    description: 'Brihaspathi Technologies Ltd presented the 6th ET Excellence Telangana Awards 2026 in Hyderabad. Graced by Governor Shiv Pratap Shukla and actor Sonu Sood, CMD Rajasekhar Papolu shared how Brihaspathi expanded to 400 employees, emphasizing that business success is measured by job creation, youth empowerment, and nationwide social impact.',
    image: imgEtExcellence2026,
    link: '#',
    pressName: 'Economic Times',
    pressIcon: Et,
    category: 'Awards',
  },
  {
    id: 2,
    title: "One Company, Many Frontlines: Building India's Security Backbone",
    description: "Brihaspathi Technologies has established itself as India’s security backbone across public infrastructure. Key deployments include statewide bus station CCTV for MSRTC, election webcasting in Bihar and Assam, NEET-UG exam surveillance, Kolkata Metro, RRTS corridors, and IOCL refineries, supported by a new manufacturing facility at Tuniki Bollaram, Telangana.",
    image: imgSecurityBackbone2026,
    link: '#',
    pressName: 'Economic Times',
    pressIcon: Et,
    category: 'Security',
  },
  {
    id: 3,
    title: 'Spotlighting Merit and Awarding Entrepreneurial Spirit',
    description: 'Covers the 5th edition of ET Excellence Telangana awards in Hyderabad. Brihaspathi Technologies served as Presenting Sponsor.',
    image: imgSpotlighting,
    link: '#',
    pressName: 'Economic Times',
    pressIcon: Et,
    category: 'Awards',
  },
  {
    id: 4,
    title: 'Rajasekhar: Driving Converged Technology for a Secure and Sustainable India',
    description: "Profiles Rajasekhar driving India's digital transformation through AI-driven security systems and renewable energy expansion.",
    image: imgRajasekhar,
    link: '#',
    pressName: 'Leadership Feature',
    pressIcon: Et,
    category: 'Leadership',
  },

  {
    id: 5,
    title: 'Advancing Border Security Through Intelligent Surveillance Systems',
    description: 'Highlights AI intrusion detection, thermal imaging, anti-drone systems and 75,000+ camera integrations.',
    image: imgBorderSecurity,
    link: '#',
    pressName: 'Security & Defence',
    pressIcon: Et,
    category: 'Security',
  },

  {
    id: 6,
    title: 'Budget 2026 Quotes: Rajasekhar Papolu, Chairman & Managing Director',
    description: "Union Budget signals India's digital growth entering a mature phase driven by AI and deep-tech innovation.",
    image: csxo,
    link: 'https://www.cxodigitalpulse.com/budget-2026-quotes-rajasekhar-papolu-chairman-managing-director-brihaspathi-technologies/',
    pressName: 'CXO Digital Pulse',
    pressIcon: cxoLogo,
    category: 'Policy',
  },
  {
    id: 7,
    title: "How Brihaspathi Technologies Is Shaping India's Security, Software and Solar Ecosystem",
    description: 'Founded in 2006, Brihaspathi has grown into a multi-domain solutions provider across government and enterprise sectors.',
    image: telanganatoday,
    link: 'https://telanganatoday.com/how-brihaspathi-technologies-is-shaping-indias-security-software-and-solar-ecosystem',
    pressName: 'Telangana Today',
    pressIcon: telanganaTodayLogo,
    category: 'Feature',
  },
  {
    id: 8,
    title: 'Curiosity and Integrity Will Endure Beyond Any Technological Cycle',
    description: 'Authored by Rajasekhar Papolu for Mediabrief highlighting leadership and innovation vision.',
    image: mediaberief,
    link: 'https://mediabrief.com/brief26-rajasekhar-papolu-of-brihaspathi-technologies/',
    pressName: 'Media Brief',
    pressIcon: mediaBriefLogo,
    category: 'Opinion',
  },

  {
    id: 9,
    title: 'Advancing Border Security Through Intelligent Surveillance Systems',
    description: 'Highlights AI intrusion detection, thermal imaging, anti-drone systems and 75,000+ camera integrations.',
    image: women_2026,
    link: '#',
    pressName: 'Security & Defence',
    pressIcon: Et,
    category: 'Security',
  },

  {
    id: 10,
    title: 'BUILT FOR BHARAT, ENGINEERED TO SCALE: BRIHASPATHI TECHNOLOGIES POWERS INDIA’S INTELLIGENT INFRASTRUCTURE',
    description: 'An ET Newsmakers feature highlighting Brihaspathi Technologies Limited and its Chairman and Managing Director, Rajasekhar Papolu. The article details the company’s evolution into a major player in AI-led surveillance, security technology, and smart mobility solutions.',
    image: Et_some,
    link: '#',
    pressName: 'Security & Defence',
    pressIcon: Et,
    category: 'Security',
  },

  {
    id: 11,
    title: 'Advancing Border Security Through Intelligent Surveillance Systems',
    description: 'Highlights AI intrusion detection, thermal imaging, anti-drone systems and 75,000+ camera integrations.',
    image: main_image,
    link: '#',
    pressName: 'Security & Defence',
    pressIcon: Et,
    category: 'Security',
  },
  {
    id: 12,
    title: 'The Most Promising Leaders To Watch in 2026',
    description: 'Rajasekhar led ICCC deployments consolidating surveillance, traffic management and emergency systems.',
    image: bombay,
    link: 'https://www.bombaytimes.com/lifestyle/viral/the-most-promising-leaders-to-watch-in-2026-redefining-leadership-for-a-changing-world/',
    pressName: 'Bombay Times',
    pressIcon: techObserverLogo,
    category: 'Leadership',
  },
  {
    id: 13,
    title: 'Brihaspathi Technologies Secures ₹106 Crore MSRTC Surveillance Project',
    description: 'Awarded ₹106 crore project to install 6,300 surveillance cameras across Maharashtra bus stops.',
    image: apn,
    link: 'https://www.apnnews.com/brihaspathi-technologies-limited-secures-%E2%82%B9106-crore-msrtc-surveillance-project-with-6300-cameras-to-be-installed-at-bus-stops/',
    pressName: 'APN News',
    pressIcon: apnLogo,
    category: 'Contracts',
  },
  {
    id: 14,
    title: 'Brihaspathi Wins ₹106 Crore MSRTC CCTV Contract',
    description: 'Won major smart-city surveillance contract to deploy 6,300 CCTV cameras strengthening public safety infrastructure.',
    image: techobserve,
    link: 'https://techobserver.in/news/egov/smart-cities/cctv/brihaspathi-wins-106-crore-msrtc-contract-to-install-6300-cctv-cameras-at-bus-stops-319688/',
    pressName: 'Tech Observer',
    pressIcon: bombayTimesLogo,
    category: 'Contracts',
  },
  {
    id: 15,
    title: 'Brihaspathi Technologies Secures $10 Million Funding and Plans IPO by FY27',
    description: 'Hyderabad-based firm raises capital from FIIs to establish a 72,000 sq. ft. CCTV manufacturing facility and eyes public listing.',
    image: imgRajasekhar,
    link: 'https://timesofindia.indiatimes.com/city/hyderabad/hyderabad-based-brihaspathi-technologies-raises-10-million-funding/articleshow/111306354.cms',
    pressName: 'Times of India',
    pressIcon: Et,
    category: 'Funding',
  },
  {
    id: 16,
    title: 'Brihaspathi Technologies raises $10M, wins MSRTC project',
    description: 'Capital infusion supports expansion into AI-enabled surveillance and public safety infrastructure across Maharashtra.',
    image: csxo,
    link: 'https://varindia.com/news/brihaspathi-technologies-raises-10m-wins-msrtc-project-plans-ipo',
    pressName: 'VARINDIA',
    pressIcon: cxoLogo,
    category: 'Expansion',
  },
  {
    id: 17,
    title: "Protecting Rhinos and Securing Elections: Brihaspathi Tech's Wide-Ranging Role",
    description: 'An in-depth look at how Rajasekhar Papolu is leading national projects from exam monitoring to wildlife protection.',
    image: imgSpotlighting,
    link: 'https://newsmeter.in/hyderabad/protecting-rhinos-securing-elections-supporting-neet-brihaspathi-techs-wide-ranging-role-714567',
    pressName: 'NewsMeter',
    pressIcon: telanganaTodayLogo,
    category: 'Interview',
  },
];

// =============================
// MODAL — FULL PAGE EDITORIAL
// =============================
function ArticleModal({
  article,
  articles,
  onClose,
  onNext,
  onPrev,
}: {
  article: ArticleData | null;
  articles: ArticleData[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = article ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [article]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onNext, onPrev]);

  if (!article) return null;

  const currentIndex = articles.findIndex((a) => a.id === article.id);
  const total = articles.length;
  const hasPrev = total > 1;
  const hasNext = total > 1;
  const hasLink = article.link && article.link !== '#';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 lg:p-10"
      style={{
        background: 'rgba(7, 15, 28, 0.78)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      onClick={onClose}
    >
      {/* ===== Floating Chevron — PREV ===== */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        disabled={!hasPrev}
        className="hidden md:flex absolute left-3 lg:left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 rounded-full items-center justify-center transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed hover:scale-110 group/nav"
        style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.25)',
          backdropFilter: 'blur(8px)',
          color: '#fff',
        }}
        aria-label="Previous article"
      >
        <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover/nav:-translate-x-0.5" strokeWidth={2} />
      </button>

      {/* ===== Floating Chevron — NEXT ===== */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        disabled={!hasNext}
        className="hidden md:flex absolute right-3 lg:right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 rounded-full items-center justify-center transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed hover:scale-110 group/nav"
        style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.25)',
          backdropFilter: 'blur(8px)',
          color: '#fff',
        }}
        aria-label="Next article"
      >
        <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover/nav:translate-x-0.5" strokeWidth={2} />
      </button>

      {/* ===== Close X (top-right of viewport) ===== */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:rotate-90"
        style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.25)',
          backdropFilter: 'blur(8px)',
          color: '#fff',
        }}
        aria-label="Close"
      >
        <X className="w-5 h-5" strokeWidth={2} />
      </button>

      {/* ===== Modal Card — Full Page ===== */}
      <div
        key={article.id}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full max-w-7xl rounded-2xl md:rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl"
        style={{
          background: BRAND.paper,
          animation: 'modalIn 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* ===== IMAGE COLUMN (Left) ===== */}
        <div className="relative w-full lg:w-[58%] h-[38vh] sm:h-[42vh] lg:h-full flex-shrink-0 bg-black overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
          {/* dark vignette for depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.45) 100%)',
            }}
          />

          {/* Category chip (top-left of image) */}
          {article.category && (
            <div className="absolute top-5 left-5 md:top-7 md:left-7 flex items-center gap-2">
              <span
                className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mr-2"
                  style={{ background: BRAND.accent }}
                />
                {article.category}
              </span>
            </div>
          )}

          {/* Edition / Counter (bottom-left of image) — editorial touch */}
          <div className="absolute bottom-5 left-5 md:bottom-7 md:left-7 text-white">
            <div
              className="text-[10px] uppercase tracking-[0.3em] mb-1 font-semibold"
              style={{ color: BRAND.accentLight }}
            >
              Edition
            </div>
            <div
              className="text-2xl md:text-3xl font-bold tabular-nums"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {String(currentIndex + 1).padStart(2, '0')}
              <span className="text-base font-normal opacity-60"> / {String(total).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* ===== CONTENT COLUMN (Right) ===== */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-[var(--paper)]" style={{ ['--paper' as never]: BRAND.paper }}>
          <div className="flex-1 flex flex-col px-6 sm:px-10 md:px-14 py-8 md:py-12 lg:py-14">

            {/* Top kicker bar */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${BRAND.accent}, transparent)` }} />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.35em]"
                style={{ color: BRAND.accent }}
              >
                Press Feature
              </span>
              <div className="h-px flex-1" style={{ background: `linear-gradient(to left, ${BRAND.accent}, transparent)` }} />
            </div>

            {/* Press logo + name */}
            <div className="flex items-center gap-4 mb-8">
              <div
                className="relative w-32 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white"
                style={{ border: `1px solid ${BRAND.primary}15`, boxShadow: '0 2px 8px rgba(7,81,138,0.06)' }}
              >
                <Image src={article.pressIcon} alt={article.pressName} fill className="object-contain p-1.5" />
              </div>
              <div>
                <div
                  className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-0.5"
                  style={{ color: BRAND.mute }}
                >
                  Featured In
                </div>
                <div
                  className="text-sm font-bold"
                  style={{ color: BRAND.ink }}
                >
                  {article.pressName}
                </div>
              </div>
            </div>

            {/* Title */}
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold leading-[1.15] mb-6 tracking-tight"
              style={{
                color: BRAND.primaryDark,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {article.title}
            </h2>

            {/* Gold accent rule */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-[3px]" style={{ background: BRAND.accent }} />
              <div className="w-2 h-2 rotate-45" style={{ background: BRAND.accent }} />
            </div>

            {/* Description / Lede */}
            <p
              className="text-base md:text-lg leading-[1.75] mb-10 max-w-2xl"
              style={{ color: BRAND.mute, fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic' }}
            >
              {article.description}
            </p>

            {/* Spacer pushes CTA + meta to bottom on tall screens */}
            <div className="flex-grow" />

            {/* CTA Row — Read Article button (only when link exists) */}
            {hasLink && (
              <div className="mb-8">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/cta inline-flex items-center gap-3 px-7 py-4 rounded-full text-sm font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:gap-4"
                  style={{
                    background: BRAND.primaryDark,
                    color: '#fff',
                    boxShadow: '0 10px 30px -10px rgba(7,81,138,0.5)',
                  }}
                >
                  Read Full Article
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/cta:rotate-45"
                    style={{ background: BRAND.accent }}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} style={{ color: BRAND.primaryDark }} />
                  </span>
                </a>
              </div>
            )}

            {/* Footer meta — mobile-friendly chevrons + dot indicator */}
            <div className="pt-6 mt-auto border-t flex items-center justify-between gap-4" style={{ borderColor: `${BRAND.primary}15` }}>
              {/* Mobile chevron pair */}
              <div className="flex md:hidden items-center gap-2">
                <button
                  onClick={onPrev}
                  disabled={!hasPrev}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30 hover:scale-105"
                  style={{ background: BRAND.primaryDark, color: '#fff' }}
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
                </button>
                <button
                  onClick={onNext}
                  disabled={!hasNext}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30 hover:scale-105"
                  style={{ background: BRAND.primaryDark, color: '#fff' }}
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>

              {/* Dot indicators (desktop) */}
              <div className="hidden md:flex items-center gap-1.5 flex-1 justify-start overflow-hidden">
                {articles.slice(0, 12).map((a, i) => (
                  <span
                    key={a.id}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === currentIndex ? '24px' : '6px',
                      height: '6px',
                      background: i === currentIndex ? BRAND.accent : `${BRAND.primary}25`,
                    }}
                  />
                ))}
                {articles.length > 12 && (
                  <span className="text-[10px] ml-1" style={{ color: BRAND.mute }}>
                    +{articles.length - 12}
                  </span>
                )}
              </div>

              {/* Right-side meta */}
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: BRAND.mute }}>
                <span>Brihaspathi</span>
                <span style={{ color: BRAND.accent }}>•</span>
                <span>Press Room</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// =============================
// ARTICLE CARD
// =============================
function ArticleCard({
  article,
  index,
  onClick,
}: {
  article: ArticleData;
  index: number;
  onClick: () => void;
}) {
  return (
    <article
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`Read more about ${article.title}`}
      className="group bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-col transition-all duration-500 hover:-translate-y-2"
      style={{
        animationDelay: `${index * 80}ms`,
        border: `1px solid ${BRAND.primary}10`,
        boxShadow: '0 4px 20px -8px rgba(7,81,138,0.08)',
      }}
    >
      {/* Thumbnail */}
      <div className="relative w-full overflow-hidden" style={{ height: '230px' }}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Category badge */}
        {article.category && (
          <span
            className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-white"
            style={{
              background: 'rgba(7,15,28,0.55)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span
              className="inline-block w-1 h-1 rounded-full mr-1.5"
              style={{ background: BRAND.accent, verticalAlign: 'middle' }}
            />
            {article.category}
          </span>
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(7,15,28,0.35)' }}
        >
          <span
            className="text-white text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 px-5 py-2.5 rounded-full"
            style={{ background: BRAND.primaryDark, border: `1px solid ${BRAND.accent}` }}
          >
            <Eye className="w-3.5 h-3.5" strokeWidth={2.5} />
            Read Story
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Press row */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="relative w-20 h-9 rounded-md overflow-hidden bg-white flex-shrink-0"
            style={{ border: `1px solid ${BRAND.primary}10` }}
          >
            <Image src={article.pressIcon} alt={article.pressName} fill className="object-contain p-1" />
          </div>
          <div className="min-w-0 flex-1">
            <div
              className="text-[9px] uppercase tracking-[0.25em] font-semibold mb-0.5"
              style={{ color: BRAND.accent }}
            >
              Featured In
            </div>
            <div
              className="text-[11px] font-bold truncate"
              style={{ color: BRAND.ink }}
            >
              {article.pressName}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-lg font-bold leading-snug mb-3 transition-colors duration-300 line-clamp-2"
          style={{ color: BRAND.primaryDark, fontFamily: "'DM Sans', sans-serif" }}
        >
          {article.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed flex-grow line-clamp-3"
          style={{ color: BRAND.mute }}
        >
          {article.description}
        </p>

        {/* Footer */}
        <div
          className="mt-5 pt-4 flex items-center justify-between"
          style={{ borderTop: `1px solid ${BRAND.primary}10` }}
        >
          <span
            className="text-[10px] font-bold uppercase tracking-[0.25em] flex items-center gap-1.5 transition-all duration-300 group-hover:gap-2.5"
            style={{ color: BRAND.primaryDark }}
          >
            Read More
            <ArrowUpRight
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45"
              strokeWidth={2.5}
            />
          </span>
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ background: `${BRAND.accent}15`, border: `1px solid ${BRAND.accent}40` }}
          >
            <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} style={{ color: BRAND.accent }} />
          </span>
        </div>
      </div>
    </article>
  );
}

// =============================
// MAIN COMPONENT
// =============================
export default function Recent() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', ...(Array.from(new Set(articlesData.map((a) => a.category).filter(Boolean))) as string[])];

  const filtered =
    filter === 'All' ? articlesData : articlesData.filter((a) => a.category === filter);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return prev < filtered.length - 1 ? prev + 1 : 0;
    });
  }, [filtered.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return filtered.length - 1;
      return prev > 0 ? prev - 1 : filtered.length - 1;
    });
  }, [filtered.length]);

  const selectedArticle = selectedIndex !== null ? filtered[selectedIndex] : null;

  return (
    <>
      <section
        className="w-full pt-[10px] pb-20 md:pb-28 font-sans relative overflow-hidden"
        style={{ background: BRAND.paper }}
      >
        {/* Subtle background ornaments — entrepreneurial editorial feel */}
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{ background: `linear-gradient(to right, transparent, ${BRAND.accent}40, transparent)` }}
        />
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-[0.04] pointer-events-none"
          style={{ background: BRAND.primary, filter: 'blur(80px)' }}
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-[0.05] pointer-events-none"
          style={{ background: BRAND.accent, filter: 'blur(80px)' }}
        />

        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative mt-[10px]">

          {/* ===== Header ===== */}
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: BRAND.primary }} />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.4em]"
                style={{ color: BRAND.primary }}
              >
                Media · Press · Recognition
              </span>
              <div className="w-8 h-px" style={{ background: BRAND.primary }} />
            </div>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight"
              style={{ color: BRAND.primary, fontFamily: "'DM Sans', sans-serif" }}
            >
              The <em style={{ color: BRAND.primary, fontStyle: 'italic' }}>Press Room</em>
            </h2>
            <p
              className="mt-6 text-base md:text-lg leading-relaxed"
              style={{ color: BRAND.primary, fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic' }}
            >
              Stories, milestones, and recognitions of Brihaspathi Technologies across India's most respected publications.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="w-16 h-px" style={{ background: BRAND.primary }} />
              <div className="w-2 h-2 rotate-45" style={{ background: BRAND.primary }} />
              <div className="w-16 h-px" style={{ background: BRAND.primary }} />
            </div>
          </div>

          {/* ===== Filter Pills ===== */}
          <div className="flex flex-wrap gap-2 justify-center mb-14">
            {categories.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => { setFilter(cat); setSelectedIndex(null); }}
                  className="px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300"
                  style={
                    active
                      ? {
                        background: BRAND.primaryDark,
                        color: '#fff',
                        border: `1px solid ${BRAND.primaryDark}`,
                        boxShadow: `0 6px 20px -6px ${BRAND.primary}80`,
                      }
                      : {
                        background: 'transparent',
                        color: BRAND.primaryDark,
                        border: `1px solid ${BRAND.primary}25`,
                      }
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* ===== Featured Hero Card ===== */}
          {filter === 'All' && articlesData.length > 0 && (
            <div
              onClick={() => setSelectedIndex(0)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => e.key === 'Enter' && setSelectedIndex(0)}
              className="mb-14 rounded-3xl overflow-hidden cursor-pointer group relative flex flex-col lg:flex-row bg-white"
              style={{
                minHeight: '420px',
                border: `1px solid ${BRAND.primary}10`,
                boxShadow: '0 30px 60px -30px rgba(7,81,138,0.25)',
              }}
            >
              <div className="relative w-full lg:w-3/5 h-72 lg:h-auto flex-shrink-0 overflow-hidden">
                <Image
                  src={articlesData[0].image}
                  alt={articlesData[0].title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                <div
                  className="absolute inset-0 hidden lg:block"
                  style={{ background: `linear-gradient(to right, transparent 55%, ${BRAND.paper} 100%)` }}
                />
                <div
                  className="absolute inset-0 lg:hidden"
                  style={{ background: `linear-gradient(to bottom, transparent 50%, ${BRAND.paper} 100%)` }}
                />

                {/* Editorial badge top-left */}
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-white"
                    style={{
                      background: 'rgba(7,15,28,0.55)',
                      border: `1px solid ${BRAND.accent}`,
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: BRAND.accent }} />
                    Featured Story
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14 lg:w-2/5 relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px" style={{ background: BRAND.accent }} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: BRAND.accent }}>
                    Cover Story
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="relative w-24 h-10 rounded-md overflow-hidden bg-white flex-shrink-0"
                    style={{ border: `1px solid ${BRAND.primary}15` }}
                  >
                    <Image src={articlesData[0].pressIcon} alt={articlesData[0].pressName} fill className="object-contain p-1" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: BRAND.mute }}>
                    {articlesData[0].pressName}
                  </span>
                </div>

                <h3
                  className="text-2xl md:text-3xl font-bold leading-[1.2] mb-5 transition-colors duration-300"
                  style={{ color: BRAND.primaryDark, fontFamily: "'DM Sans', sans-serif" }}
                >
                  {articlesData[0].title}
                </h3>

                <div className="w-12 h-[3px] mb-5" style={{ background: BRAND.accent }} />

                <p
                  className="text-base leading-relaxed mb-8"
                  style={{ color: BRAND.mute, fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic' }}
                >
                  {articlesData[0].description}
                </p>

                <span
                  className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] group-hover:gap-4 transition-all duration-300 w-fit"
                  style={{ color: BRAND.primaryDark }}
                >
                  Read Cover Story
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45"
                    style={{ background: BRAND.accent }}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} style={{ color: BRAND.primaryDark }} />
                  </span>
                </span>
              </div>
            </div>
          )}

          {/* ===== Grid ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 xl:gap-8">
            {filtered.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                index={index}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </div>

        </div>
      </section>

      <ArticleModal
        article={selectedArticle}
        articles={filtered}
        onClose={() => setSelectedIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}