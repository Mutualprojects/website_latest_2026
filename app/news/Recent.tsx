'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';

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
import main_image from './Screenshot 2026-05-12 183649.png'
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
// ARTICLES DATA (15 English Articles)
// =============================
export const articlesData: ArticleData[] = [


 
  {
    id: 1,
    title: 'Spotlighting Merit and Awarding Entrepreneurial Spirit',
    description: 'Covers the 5th edition of ET Excellence Telangana awards in Hyderabad. Brihaspathi Technologies served as Presenting Sponsor.',
    image: imgSpotlighting,
    link: '#',
    pressName: 'Economic Times',
    pressIcon: Et,
    category: 'Awards',
  },
  {
    id: 2,
    title: 'Rajasekhar: Driving Converged Technology for a Secure and Sustainable India',
    description: "Profiles Rajasekhar driving India's digital transformation through AI-driven security systems and renewable energy expansion.",
    image: imgRajasekhar,
    link: '#',
    pressName: 'Leadership Feature',
    pressIcon: Et,
    category: 'Leadership',
  },
  {
    id: 3,
    title: 'Advancing Border Security Through Intelligent Surveillance Systems',
    description: 'Highlights AI intrusion detection, thermal imaging, anti-drone systems and 75,000+ camera integrations.',
    image: imgBorderSecurity,
    link: '#',
    pressName: 'Security & Defence',
    pressIcon: Et,
    category: 'Security',
  },

  {
    id: 4,
    title: 'Budget 2026 Quotes: Rajasekhar Papolu, Chairman & Managing Director',
    description: "Union Budget signals India's digital growth entering a mature phase driven by AI and deep-tech innovation.",
    image: csxo,
    link: 'https://www.cxodigitalpulse.com/budget-2026-quotes-rajasekhar-papolu-chairman-managing-director-brihaspathi-technologies/',
    pressName: 'CXO Digital Pulse',
    pressIcon: cxoLogo,
    category: 'Policy',
  },

  {
    id: 5,
    title: "How Brihaspathi Technologies Is Shaping India's Security, Software and Solar Ecosystem",
    description: 'Founded in 2006, Brihaspathi has grown into a multi-domain solutions provider across government and enterprise sectors.',
    image: telanganatoday,
    link: 'https://telanganatoday.com/how-brihaspathi-technologies-is-shaping-indias-security-software-and-solar-ecosystem',
    pressName: 'Telangana Today',
    pressIcon: telanganaTodayLogo,
    category: 'Feature',
  },
  {
    id: 6,
    title: 'Curiosity and Integrity Will Endure Beyond Any Technological Cycle',
    description: 'Authored by Rajasekhar Papolu for Mediabrief highlighting leadership and innovation vision.',
    image: mediaberief,
    link: 'https://mediabrief.com/brief26-rajasekhar-papolu-of-brihaspathi-technologies/',
    pressName: 'Media Brief',
    pressIcon: mediaBriefLogo,
    category: 'Opinion',
  },
   {
    id: 16,
    title: 'Advancing Border Security Through Intelligent Surveillance Systems',
    description: 'Highlights AI intrusion detection, thermal imaging, anti-drone systems and 75,000+ camera integrations.',
    image: main_image,
    link: '#',
    pressName: 'Security & Defence',
    pressIcon: Et,
    category: 'Security',
  },
  {
    id: 7,
    title: 'The Most Promising Leaders To Watch in 2026',
    description: 'Rajasekhar led ICCC deployments consolidating surveillance, traffic management and emergency systems.',
    image: bombay,
    link: 'https://www.bombaytimes.com/lifestyle/viral/the-most-promising-leaders-to-watch-in-2026-redefining-leadership-for-a-changing-world/',
    pressName: 'Bombay Times',
    pressIcon: techObserverLogo,
    category: 'Leadership',
  },
  {
    id: 8,
    title: 'Brihaspathi Technologies Secures ₹106 Crore MSRTC Surveillance Project',
    description: 'Awarded ₹106 crore project to install 6,300 surveillance cameras across Maharashtra bus stops.',
    image: apn,
    link: 'https://www.apnnews.com/brihaspathi-technologies-limited-secures-%E2%82%B9106-crore-msrtc-surveillance-project-with-6300-cameras-to-be-installed-at-bus-stops/',
    pressName: 'APN News',
    pressIcon: apnLogo,
    category: 'Contracts',
  },
  {
    id: 9,
    title: 'Brihaspathi Wins ₹106 Crore MSRTC CCTV Contract',
    description: 'Won major smart-city surveillance contract to deploy 6,300 CCTV cameras strengthening public safety infrastructure.',
    image: techobserve,
    link: 'https://techobserver.in/news/egov/smart-cities/cctv/brihaspathi-wins-106-crore-msrtc-contract-to-install-6300-cctv-cameras-at-bus-stops-319688/',
    pressName: 'Tech Observer',
    pressIcon: bombayTimesLogo,
    category: 'Contracts',
  },


  {
    id: 10,
    title: 'Brihaspathi Technologies Secures $10 Million Funding and Plans IPO by FY27',
    description: 'Hyderabad-based firm raises capital from FIIs to establish a 72,000 sq. ft. CCTV manufacturing facility and eyes public listing.',
    image: imgRajasekhar,
    link: 'https://timesofindia.indiatimes.com/city/hyderabad/hyderabad-based-brihaspathi-technologies-raises-10-million-funding/articleshow/111306354.cms',
    pressName: 'Times of India',
    pressIcon: Et,
    category: 'Funding',
  },
  {
    id: 11,
    title: 'Brihaspathi Technologies raises $10M, wins MSRTC project',
    description: 'Capital infusion supports expansion into AI-enabled surveillance and public safety infrastructure across Maharashtra.',
    image: csxo,
    link: 'https://varindia.com/news/brihaspathi-technologies-raises-10m-wins-msrtc-project-plans-ipo',
    pressName: 'VARINDIA',
    pressIcon: cxoLogo,
    category: 'Expansion',
  },
  {
    id: 12,
    title: 'Protecting Rhinos and Securing Elections: Brihaspathi Tech\'s Wide-Ranging Role',
    description: 'An in-depth look at how Rajasekhar Papolu is leading national projects from exam monitoring to wildlife protection.',
    image: imgSpotlighting,
    link: 'https://newsmeter.in/hyderabad/protecting-rhinos-securing-elections-supporting-neet-brihaspathi-techs-wide-ranging-role-714567',
    pressName: 'NewsMeter',
    pressIcon: telanganaTodayLogo,
    category: 'Interview',
  },
  {
    id: 13,
    title: 'Brihaspathi Strengthens Make in India Vision with New Facility',
    description: 'Details on the new manufacturing plant in Tuniki Bollaram, Telangana, and the focus on indigenous technology production.',
    image: imgBorderSecurity,
    link: 'https://smestreet.in/technology/brihaspathi-strengthens-make-in-india-vision-with-new-facility/',
    pressName: 'SMEStreet',
    pressIcon: Et,
    category: 'Manufacturing',
  },
  {
    id: 14,
    title: 'Hyd firm secures INR 106 cr surveillance contract',
    description: 'Awarded major contract by MSRTC to deploy IP-enabled video surveillance across 658 bus stands in Maharashtra.',
    image: apn,
    link: 'http://www.uniindia.com/news/south/brihaspathi-technologies-secures-106-cr-contract/3056789.html',
    pressName: 'United News of India',
    pressIcon: apnLogo,
    category: 'Contracts',
  },
  {
    id: 15,
    title: 'Powering India\'s ICCC Revolution',
    description: 'Transforming digital security infrastructure through Integrated Command and Control Centres for smart cities.',
    image: techobserve,
    link: 'https://www.tribuneindia.com/news/business/brihaspathi-technologies-powering-indias-iccc-revolution-580123',
    pressName: 'The Tribune',
    pressIcon: techObserverLogo,
    category: 'Innovation',
  },
];

// =============================
// MODAL COMPONENT
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
    if (article) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
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
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < total - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(7,81,138,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      {/* Prev Arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        disabled={!hasPrev}
        className="absolute left-3 md:left-6 z-20 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
        style={{ background: hasPrev ? '#07518a' : '#aac4db', color: '#fff', border: '2px solid #fff' }}
        aria-label="Previous article"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        disabled={!hasNext}
        className="absolute right-3 md:right-6 z-20 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
        style={{ background: hasNext ? '#07518a' : '#aac4db', color: '#fff', border: '2px solid #fff' }}
        aria-label="Next article"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Modal Card */}
      <div
        key={article.id}
        className="relative bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
        style={{ animation: 'modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Side */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto min-h-[260px] flex-shrink-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          {article.category && (
            <span
              className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white"
              style={{ background: 'linear-gradient(135deg,#07518a,#0a7acc)' }}
            >
              {article.category}
            </span>
          )}
          {/* Counter badge */}
          <span
            className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: 'rgba(7,81,138,0.75)', backdropFilter: 'blur(4px)' }}
          >
            {currentIndex + 1} / {total}
          </span>
        </div>

        {/* Content Side */}
        <div className="flex flex-col p-8 overflow-y-auto md:w-1/2">
          {/* Press logo */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative w-28 h-12 rounded-lg overflow-hidden border border-gray-100 bg-white shadow-sm flex-shrink-0">
              <Image
                src={article.pressIcon}
                alt={article.pressName}
                fill
                className="object-contain p-1"
              />
            </div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {article.pressName}
            </span>
          </div>

          <h2
            className="text-xl md:text-2xl font-extrabold mb-4 leading-tight"
            style={{ color: '#07518a', fontFamily: "'Georgia', serif" }}
          >
            {article.title}
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed mb-8 flex-grow">
            {article.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-auto">
            {article.link !== '#' ? (
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg,#07518a,#0a7acc)' }}
              >
                Read Full Article
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            ) : (
              <span className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-bold text-gray-400 bg-gray-100 cursor-not-allowed">
                Coming Soon
              </span>
            )}

            {/* Prev button inside modal */}
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
              style={{ background: '#07518a', color: '#fff' }}
              aria-label="Previous"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              Prev
            </button>

            {/* Next button inside modal */}
            <button
              onClick={onNext}
              disabled={!hasNext}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
              style={{ background: '#07518a', color: '#fff' }}
              aria-label="Next"
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl text-sm font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 transition"
            >
              Close
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {articles.map((a, i) => (
              <span
                key={a.id}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === currentIndex ? '20px' : '8px',
                  height: '8px',
                  background: i === currentIndex ? '#07518a' : '#cbd9e8',
                }}
              />
            ))}
          </div>
        </div>

        {/* Close X */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:bg-white transition z-10"
          aria-label="Close"
        >
          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
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
      className="group bg-white rounded-2xl overflow-hidden shadow-md cursor-pointer flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{ animationDelay: `${index * 80}ms` }}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`Read more about ${article.title}`}
    >
      {/* Thumbnail */}
      <div className="relative w-full overflow-hidden" style={{ height: '220px' }}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="bg-white/95 text-[#07518a] text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Quick View
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="relative w-24 h-10 rounded-lg overflow-hidden border border-gray-100 bg-white shadow-sm flex-shrink-0">
            <Image
              src={article.pressIcon}
              alt={article.pressName}
              fill
              className="object-contain p-1"
            />
          </div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider truncate">
            {article.pressName}
          </span>
        </div>

        <h3
          className="text-base font-bold leading-snug mb-2 group-hover:text-[#0a7acc] transition-colors duration-200"
          style={{ color: '#07518a', fontFamily: "'Georgia', serif" }}
        >
          {article.title}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed flex-grow line-clamp-3">
          {article.description}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-[#07518a] font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200">
            View Article
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <svg className="w-5 h-5 text-gray-200 group-hover:text-[#07518a] transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
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

  const categories = ['All', ...Array.from(new Set(articlesData.map((a) => a.category).filter(Boolean))) as string[]];

  const filtered =
    filter === 'All' ? articlesData : articlesData.filter((a) => a.category === filter);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    if (selectedIndex < filtered.length - 1) setSelectedIndex(selectedIndex + 1);
  }, [selectedIndex, filtered.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
  }, [selectedIndex]);

  const selectedArticle = selectedIndex !== null ? filtered[selectedIndex] : null;

  return (
    <>
      <section className="w-full py-20 font-sans" style={{ background: 'linear-gradient(160deg, #f0f6fc 0%, #e8f2fa 50%, #f8fafc 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#0a7acc] mb-3">
              Media Coverage
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#07518a] leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Recent News &amp; Press
            </h2>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="w-12 h-0.5 bg-[#07518a] rounded-full" />
              <div className="w-3 h-3 rounded-full border-2 border-[#07518a]" />
              <div className="w-12 h-0.5 bg-[#07518a] rounded-full" />
            </div>
            <p className="mt-4 text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
              Stay updated with the latest stories, recognitions, and milestones from Brihaspathi Technologies across leading publications.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setSelectedIndex(null); }}
                className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 border"
                style={
                  filter === cat
                    ? { background: 'linear-gradient(135deg,#07518a,#1a8fd1)', color: '#fff', borderColor: 'transparent', transform: 'scale(1.05)' }
                    : { background: '#fff', color: '#07518a', borderColor: '#cbd9e8' }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Hero Card */}
          {filter === 'All' && articlesData.length > 0 && (
            <div
              className="mb-10 rounded-3xl overflow-hidden shadow-xl cursor-pointer group relative flex flex-col md:flex-row"
              style={{ minHeight: '320px' }}
              onClick={() => setSelectedIndex(0)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => e.key === 'Enter' && setSelectedIndex(0)}
            >
              <div className="relative w-full md:w-3/5 h-64 md:h-auto flex-shrink-0">
                <Image
                  src={articlesData[0].image}
                  alt={articlesData[0].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, white 100%)' }} />
              </div>
              <div className="flex flex-col justify-center bg-white p-8 md:p-10 md:w-2/5">
                <span
                  className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white w-fit"
                  style={{ background: 'linear-gradient(135deg,#07518a,#1a8fd1)' }}
                >
                  Featured
                </span>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="relative w-24 h-10 rounded-lg overflow-hidden border border-gray-100 bg-white shadow-sm flex-shrink-0">
                    <Image src={articlesData[0].pressIcon} alt={articlesData[0].pressName} fill className="object-contain p-1" />
                  </div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{articlesData[0].pressName}</span>
                </div>
                <h3
                  className="text-xl md:text-2xl font-extrabold text-[#07518a] leading-snug mb-3 group-hover:text-[#0a7acc] transition-colors"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {articlesData[0].title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">{articlesData[0].description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-[#07518a] group-hover:gap-3 transition-all duration-200">
                  Read Full Story
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {(filter === 'All' ? filtered.slice(1) : filtered).map((article, index) => {
              const realIndex = filter === 'All' ? index + 1 : index;
              return (
                <ArticleCard
                  key={article.id}
                  article={article}
                  index={index}
                  onClick={() => setSelectedIndex(realIndex)}
                />
              );
            })}
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