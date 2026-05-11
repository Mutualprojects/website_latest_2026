'use client';

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

// ─────────────────────────────────────────────────────────────
// BRAND CONSTANTS — Brihaspathi Technologies
// ─────────────────────────────────────────────────────────────
const BRAND = {
  name: 'Brihaspathi Technologies Limited',
  logo: 'https://www.brihaspathi.com/_next/image?url=%2Fhighbtlogo-tm-1.png&w=384&q=75',
  address: 'Shangrila Plaza, 501, #508-510, Park View Enclave, Banjara Hills, Hyderabad, Telangana 500034',
  mapsUrl:
    'https://www.google.com/maps/place/Brihaspathi+Technologies+Limited/@17.4256371,78.4201696,17z',
  writeReviewUrl:
    'https://www.google.com/maps/place/Brihaspathi+Technologies+Limited/@17.4256371,78.4201696,17z/data=!4m8!3m7!1s0x3bcb98ee53f272eb:0x9d0e4f397c0bbaa9!8m2!3d17.4256371!4d78.4201696!9m1!1b1!16s%2Fg%2F1tdzdfx0#lrd=0x3bcb98ee53f272eb:0x9d0e4f397c0bbaa9,3',
};

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface AuthorAttribution { displayName: string; uri: string; photoUri: string; }
interface LocalizedText { text: string; languageCode: string; }
interface Review {
  name: string; relativePublishTimeDescription: string; rating: number;
  text: LocalizedText; originalText: LocalizedText;
  authorAttribution: AuthorAttribution; publishTime: string;
  flagContentUri: string; googleMapsUri: string;
}
interface PlaceData {
  rating: number; userRatingCount?: number;
  displayName: { text: string; languageCode: string };
  reviews: Review[];
}
export interface PlaceReviewsProps { placeId: string; apiKey: string; className?: string; }

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
const PALETTES = [
  { bg: 'bg-blue-100', fg: 'text-blue-700' }, { bg: 'bg-emerald-100', fg: 'text-emerald-700' },
  { bg: 'bg-violet-100', fg: 'text-violet-700' }, { bg: 'bg-rose-100', fg: 'text-rose-700' },
  { bg: 'bg-amber-100', fg: 'text-amber-700' }, { bg: 'bg-sky-100', fg: 'text-sky-700' },
  { bg: 'bg-pink-100', fg: 'text-pink-700' },
];
const avatarPalette = (n: string) => PALETTES[n.charCodeAt(0) % PALETTES.length];
const initials = (n: string) => n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
const badgeClasses = (r: number) =>
  r === 5 ? 'bg-green-50 text-green-800'
  : r >= 3 ? 'bg-yellow-50 text-yellow-800'
  : 'bg-red-50 text-red-800';

// ─────────────────────────────────────────────────────────────
// STAR ROW (display only)
// ─────────────────────────────────────────────────────────────
const StarRow: React.FC<{ rating: number; size?: number }> = ({ rating, size = 18 }) => (
  <span className="inline-flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {[1,2,3,4,5].map(i => (
      <svg key={i} width={size} height={size} viewBox="0 0 24 24" className="shrink-0">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={i <= rating ? '#3B49DF' : '#D1D5F0'} />
      </svg>
    ))}
  </span>
);

// ─────────────────────────────────────────────────────────────
// INTERACTIVE STAR PICKER
// ─────────────────────────────────────────────────────────────
const LABELS = ['', 'Terrible', 'Poor', 'Average', 'Good', 'Excellent'];

const StarPicker: React.FC<{ value: number; onChange: (v: number) => void }> = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0);
  const [popped, setPopped] = useState(0);
  const active = hovered || value;

  const handleClick = (i: number) => {
    onChange(i);
    setPopped(i);
    setTimeout(() => setPopped(0), 320);
  };

  return (
    <div className="text-center">
      <div className="flex gap-1.5 justify-center mb-2">
        {[1,2,3,4,5].map(i => (
          <button
            key={i}
            className={`p-0 bg-transparent border-none cursor-pointer transition-transform duration-150 hover:scale-125 ${popped === i ? 'animate-ping' : ''}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => handleClick(i)}
            aria-label={`Rate ${i} star${i > 1 ? 's' : ''}`}
          >
            <svg width={36} height={36} viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={i <= active ? '#3B49DF' : '#D1D5F0'}
                className="transition-fill duration-150" />
            </svg>
          </button>
        ))}
      </div>
      <p className={`text-sm font-semibold font-sans min-h-5 transition-colors duration-150 ${active ? 'text-blue-600' : 'text-slate-400'}`}>
        {active ? LABELS[active] : 'Tap a star to rate'}
      </p>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// AVATAR
// ─────────────────────────────────────────────────────────────
const Avatar: React.FC<{ name: string; photoUri?: string; size?: number }> = ({ name, photoUri, size = 50 }) => {
  const [err, setErr] = useState(false);
  const { bg, fg } = avatarPalette(name);
  const sizeClass = size === 48 ? 'w-12 h-12' : size === 50 ? 'w-12.5 h-12.5' : 'w-14 h-14';
  
  if (photoUri && !err) {
    return (
      <img 
        src={photoUri} 
        alt={name} 
        onError={() => setErr(true)} 
        className={`${sizeClass} rounded-full object-cover shrink-0 border-2 border-slate-200`} 
      />
    );
  }
  return (
    <div 
      aria-label={name} 
      className={`${sizeClass} rounded-full ${bg} ${fg} flex items-center justify-center font-bold shrink-0 tracking-wide select-none font-sans border-2 border-slate-200`}
      style={{ fontSize: `${size * 0.31}px` }}
    >
      {initials(name)}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// RATING BAR
// ─────────────────────────────────────────────────────────────
const RatingBar: React.FC<{ label: number; pct: number; count: number; active: boolean; onClick: () => void }> = ({
  label, pct, count, active, onClick,
}) => (
  <button 
    onClick={onClick} 
    className={`flex items-center gap-2.5 bg-transparent border-none cursor-pointer py-0.5 w-full transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-45'}`}
  >
    <span className="w-2.5 text-xs text-slate-400 text-right shrink-0 font-sans font-semibold">
      {label}
    </span>
    <div className="flex-1 h-1.75 bg-slate-200 rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all duration-700 ease-out ${active ? 'bg-blue-600' : 'bg-indigo-300'}`}
        style={{ width: `${pct}%` }}
      />
    </div>
    <span className="text-xs text-slate-400 w-4.5 text-left shrink-0 font-sans">
      {count}
    </span>
  </button>
);

// ─────────────────────────────────────────────────────────────
// SKELETON CARD
// ─────────────────────────────────────────────────────────────
const SkeletonCard: React.FC = () => (
  <div className="bg-white rounded-2xl p-6 border border-slate-200">
    <div className="animate-pulse">
      <div className="h-5 w-32 bg-slate-200 rounded mb-5" />
      <div className="h-3.5 w-[88%] bg-slate-200 rounded mb-2.5" />
      <div className="h-3.5 w-[72%] bg-slate-200 rounded mb-2.5" />
      <div className="h-3.5 w-[55%] bg-slate-200 rounded mb-6.5" />
      <div className="h-px bg-slate-200 mb-5" />
      <div className="flex gap-3 items-center">
        <div className="w-12 h-12 bg-slate-200 rounded-full shrink-0" />
        <div className="flex-1">
          <div className="h-3.5 w-[42%] bg-slate-200 rounded mb-2.5" />
          <div className="h-2.5 w-[58%] bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// REVIEW CARD
// ─────────────────────────────────────────────────────────────
const ReviewCard: React.FC<{ review: Review; index: number }> = ({ review, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const txt = review.text?.text || '';
  const isLong = txt.length > 180;
  const display = isLong && !expanded ? txt.slice(0, 180) + '…' : txt;
  const badgeClass = badgeClasses(review.rating);

  return (
    <article
      className={`transition-all duration-200 hover:-translate-y-1 bg-white rounded-2xl p-6 border border-slate-200 flex flex-col animate-fade-in`}
      style={{ animationDelay: `${0.03 + index * 0.05}s` }}
    >
      {/* Stars */}
      <div className="mb-3.5">
        <StarRow rating={review.rating} size={19} />
      </div>

      {/* Text */}
      <p className="text-sm text-slate-600 leading-relaxed font-sans flex-1 mb-1">
        "{display}"
      </p>
      {isLong && (
        <button 
          onClick={() => setExpanded(v => !v)} 
          className="bg-transparent border-none py-0.5 pb-2.5 text-xs text-blue-600 cursor-pointer font-semibold text-left font-sans"
        >
          {expanded ? 'Show less ↑' : 'Read more ↓'}
        </button>
      )}

      {/* Divider */}
      <div className="h-px bg-slate-200 my-3.5" />

      {/* Author */}
      <div className="flex items-center gap-3">
        <Avatar name={review.authorAttribution.displayName} photoUri={review.authorAttribution.photoUri} size={48} />
        <div className="flex-1 min-w-0">
          <p className="m-0 font-bold text-sm text-slate-800 whitespace-nowrap overflow-hidden text-ellipsis font-sans">
            {review.authorAttribution.displayName}
          </p>
          <p className="m-0 text-xs text-slate-400 font-sans whitespace-nowrap overflow-hidden text-ellipsis">
            {review.relativePublishTimeDescription}
          </p>
        </div>
        <span className={`${badgeClass} px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 font-sans`}>
          {review.rating}.0★
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 mt-3.5 pt-3.5 border-t border-slate-200">
        <button
          onClick={() => { setLiked(v => !v); setLikes(l => liked ? l - 1 : l + 1); }}
          className={`px-3.5 py-1.5 rounded-full cursor-pointer border text-xs font-sans transition-all duration-150 ${
            liked 
              ? 'bg-blue-50 border-blue-500 text-blue-600 font-semibold' 
              : 'bg-transparent border-slate-200 text-slate-400 font-normal'
          } hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600`}
        >
          {liked ? '✓ Helpful' : '+ Helpful'}{likes > 0 ? ` (${likes})` : ''}
        </button>
        <a href={review.googleMapsUri} target="_blank" rel="noopener noreferrer"
          className="text-xs text-blue-600 no-underline ml-auto font-sans">
          View ↗
        </a>
        <a href={review.flagContentUri} target="_blank" rel="noopener noreferrer"
          className="text-xs text-slate-400 no-underline font-sans">
          Flag
        </a>
      </div>
    </article>
  );
};

// ─────────────────────────────────────────────────────────────
// WRITE A REVIEW CARD
// ─────────────────────────────────────────────────────────────
const WriteReviewCard: React.FC = () => {
  const [rating, setRating] = useState(0);
  return (
    <div className="animate-fade-in bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-dashed border-indigo-200 p-6 flex flex-col items-center gap-4 text-center">
      <div className="w-13.5 h-13.5 rounded-full bg-blue-600 flex items-center justify-center">
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </div>

      <div>
        <p className="text-base font-bold text-slate-800 font-sans mb-1.5">
          Share Your Experience
        </p>
        <p className="text-xs text-slate-500 font-sans leading-relaxed">
          Visited Brihaspathi Technologies? Let others know what you think.
        </p>
      </div>

      <StarPicker value={rating} onChange={setRating} />

      <a
        href={BRAND.writeReviewUrl} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg py-3 px-4 text-sm font-bold font-sans no-underline w-full hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-150"
      >
        <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
        Write a Review on Google
      </a>

      <p className="text-xs text-slate-400 font-sans">
        Opens Google Maps · Takes ~1 minute
      </p>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
type SortMode = 'newest' | 'highest' | 'lowest';

export const PlaceReviewsComponent: React.FC<PlaceReviewsProps> = ({ placeId, apiKey, className = '' }) => {
  const [placeData, setPlaceData] = useState<PlaceData | null>(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [filterStar, setFilterStar] = useState(0);
  const [sortMode, setSortMode]     = useState<SortMode>('newest');
  const [showAll, setShowAll]       = useState(false);

  useEffect(() => {
    if (!placeId || !apiKey) { setError('Missing placeId or apiKey'); setLoading(false); return; }
    (async () => {
      try {
        setLoading(true); setError(null);
        const { data } = await axios.get<PlaceData>(
          `https://places.googleapis.com/v1/places/${placeId}`,
          {
            headers: {
              'X-Goog-Api-Key': apiKey,
              'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews',
            },
          }
        );
        setPlaceData(data);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          setError(`API ${e.response?.status ?? ''}: ${e.response?.data?.error?.message || e.message}`);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally { setLoading(false); }
    })();
  }, [placeId, apiKey]);

  const distribution = useMemo(() => {
    if (!placeData) return {} as Record<number, { pct: number; count: number }>;
    const counts: Record<number, number> = { 5:0, 4:0, 3:0, 2:0, 1:0 };
    placeData.reviews.forEach(r => counts[r.rating]++);
    const total = placeData.reviews.length;
    return Object.fromEntries(
      Object.entries(counts).map(([k, v]) => [k, { count: v, pct: total ? Math.round((v / total) * 100) : 0 }])
    ) as Record<number, { pct: number; count: number }>;
  }, [placeData]);

  const filtered = useMemo(() => {
    if (!placeData) return [];
    let list = [...placeData.reviews];
    if (filterStar > 0) list = list.filter(r => r.rating === filterStar);
    if (sortMode === 'highest') list.sort((a, b) => b.rating - a.rating);
    else if (sortMode === 'lowest') list.sort((a, b) => a.rating - b.rating);
    else list.sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime());
    return list;
  }, [placeData, filterStar, sortMode]);

  const visible = showAll ? filtered : filtered.slice(0, 5);
  const avg = placeData?.rating ?? 0;
  const totalReviews = placeData?.userRatingCount ?? placeData?.reviews?.length ?? 0;

  // ── LOADING ──
  if (loading) return (
    <div className={`font-sans ${className} w-full min-h-screen bg-slate-50`}>
      {/* Banner skeleton */}
      <div className="bg-blue-700 py-9 px-5vw">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="animate-pulse w-16 h-16 rounded-xl bg-white/20" />
          <div>
            <div className="animate-pulse h-5 w-64 bg-white/20 rounded mb-2.5" />
            <div className="animate-pulse h-3.5 w-44 bg-white/15 rounded" />
          </div>
        </div>
      </div>
      <div className="p-7 px-5vw">
        {/* Stats skeleton */}
        <div className="bg-white rounded-2xl p-7 border border-slate-200 mb-5">
          <div className="flex gap-6 items-center flex-wrap mb-5">
            <div className="animate-pulse h-18 w-22.5 rounded-xl bg-slate-200" />
            <div className="flex-1 min-w-35">
              {[85, 60, 38, 22, 10].map((w, i) => (
                <div key={i} className="animate-pulse h-1.75 rounded-full bg-slate-200 mb-2.25" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
        </div>
        {/* Card skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    </div>
  );

  // ── ERROR ──
  if (error || !placeData) return (
    <div className={`font-sans ${className} w-full min-h-screen bg-slate-50 flex items-center justify-center`}>
      <div className="bg-white rounded-2xl p-13 text-center max-w-md border border-slate-200">
        <p className="text-4xl mb-4">⚠️</p>
        <p className="font-bold text-lg text-slate-800 font-sans mb-2.5">
          Couldn't load reviews
        </p>
        <p className="text-sm text-slate-500 font-sans mb-7 leading-relaxed">
          {error || 'No data available. Please check your API key and Place ID.'}
        </p>
        <button onClick={() => window.location.reload()} className="px-8 py-3 bg-blue-600 text-white border-none rounded-lg cursor-pointer font-semibold text-sm font-sans hover:bg-blue-700 transition-colors">
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className={`font-sans ${className} w-full min-h-screen bg-slate-50`}>
      {/* ══════════════════════════════════════════
          TOP BANNER
      ══════════════════════════════════════════ */}
      <div className="bg-gray py-6 px-5vw">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Brand */}
          <div className="flex items-center gap-4.5">
            <div className=" rounded-xl p-2.5 border border-white/22 shrink-0">
              <img src='https://brihaspathi.com/_next/image?url=%2Fhighbtlogo-tm-1.png&w=384&q=75'
                className="h-10 object-contain block"
                onError={e => (e.currentTarget.style.display = 'none')} />
            </div>
            <div>
              <h1 className="text-base md:text-lg lg:text-xl font-bold text-black font-sans mb-1.25 leading-tight">
                {BRAND.name}
              </h1>
              <p className="text-xs md:text-sm text-black font-sans">
                📍 {BRAND.address}
              </p>
            </div>
          </div>

          {/* Write Review CTA */}
          <a
            href={BRAND.writeReviewUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-blue-600 py-3 px-6 rounded-lg font-bold text-sm no-underline font-sans whitespace-nowrap shrink-0 hover:-translate-y-0.5 transition-transform"
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            Write a Review
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════ */}
      <div className="p-5 md:p-8 lg:p-10 px-5vw pb-10 md:pb-16 lg:pb-20">

        {/* ── STATS CARD ── */}
        <div className="animate-fade-in bg-white rounded-2xl p-5 md:p-8 border border-slate-200 mb-5">
          <div className="flex flex-col lg:flex-row lg:items-start gap-7 justify-between">
            {/* Left: Score + Bars */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="text-center">
                <p className="m-0 text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-slate-800 leading-none tracking-tight">
                  {avg.toFixed(1)}
                </p>
                <div className="mt-2"><StarRow rating={Math.round(avg)} size={17} /></div>
                <p className="mt-1.5 text-xs text-slate-400 font-sans">
                  {totalReviews.toLocaleString()} reviews
                </p>
              </div>
              <div className="flex flex-col gap-1.5 min-w-42.5">
                {[5,4,3,2,1].map(n => (
                  <RatingBar key={n} label={n}
                    pct={distribution[n]?.pct ?? 0}
                    count={distribution[n]?.count ?? 0}
                    active={filterStar === 0 || filterStar === n}
                    onClick={() => { setFilterStar(filterStar === n ? 0 : n); setShowAll(false); }}
                  />
                ))}
              </div>
            </div>

            {/* Right: Chips + Summary */}
            <div className="max-w-xs">
              <p className="text-sm font-serif italic text-slate-600 leading-relaxed mb-4">
                "India's trusted name in IT solutions, CCTV, solar, and smart security — serving 7500+ clients since 2006."
              </p>
              <div className="flex gap-2 flex-wrap">
                {[
                  { icon: '🏅', label: 'Est. 2006' },
                  { icon: '👥', label: '7500+ Clients' },
                  { icon: '✅', label: 'Verified' },
                  { icon: '📍', label: 'Hyderabad' },
                ].map(({ icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-1.25 bg-slate-100 border border-slate-200 rounded-lg py-1.25 px-2.75 text-xs font-sans text-slate-600 font-semibold">
                    {icon} {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-200 my-5.5" />

          {/* Filters + Sort row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
            <div className="flex items-center gap-2 flex-wrap overflow-x-auto pb-1 sm:pb-0 -mx-1 px-1 sm:overflow-visible sm:mx-0 sm:px-0">
              <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase shrink-0 font-sans">
                Filter
              </span>
              {[0,5,4,3,2,1].map(star => (
                <button key={star}
                  onClick={() => { setFilterStar(star); setShowAll(false); }}
                  className={`px-3.75 py-1.5 rounded-full shrink-0 border text-sm font-sans transition-all duration-150 ${
                    filterStar === star 
                      ? 'bg-blue-50 border-blue-600 text-blue-600 font-bold' 
                      : 'bg-transparent border-slate-200 text-slate-400 font-normal'
                  } hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600`}
                >
                  {star === 0 ? 'All' : `${star} ★`}
                </button>
              ))}
            </div>
            <select value={sortMode} onChange={e => { setSortMode(e.target.value as SortMode); setShowAll(false); }}
              className="text-sm text-slate-500 bg-slate-100 border border-slate-200 rounded-lg py-2 px-3.5 font-sans outline-none cursor-pointer">
              <option value="newest">Newest first</option>
              <option value="highest">Highest rated</option>
              <option value="lowest">Lowest rated</option>
            </select>
          </div>
        </div>

        {/* Result label */}
        {filterStar > 0 && (
          <div className="flex items-center justify-between mb-3.5">
            <p className="text-xs text-slate-400 font-sans">
              Showing <strong className="text-slate-800">{filtered.length}</strong> review{filtered.length !== 1 ? 's' : ''} for <strong className="text-blue-600">{filterStar} ★</strong>
            </p>
            <button onClick={() => { setFilterStar(0); setShowAll(false); }}
              className="bg-transparent border-none cursor-pointer text-sm text-blue-600 font-semibold font-sans">
              Clear ×
            </button>
          </div>
        )}

        {/* ── CARDS ── */}
        {visible.length === 0 ? (
          <div className="text-center py-18 bg-white rounded-2xl border border-slate-200">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-base font-sans text-slate-500">No reviews match this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <WriteReviewCard />
            {visible.map((review, i) => (
              <ReviewCard key={review.name} review={review} index={i} />
            ))}
          </div>
        )}

        {/* Show more / fewer */}
        {filtered.length > 5 && (
          <button onClick={() => setShowAll(v => !v)}
            className="w-full mt-4.5 py-3.75 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-500 tracking-wide uppercase font-sans hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 transition-colors">
            {showAll ? '↑ Show fewer reviews' : `↓ Show all ${filtered.length} reviews`}
          </button>
        )}

        {/* Footer */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
          <img src={BRAND.logo} alt={BRAND.name} className="h-6 object-contain opacity-45"
            onError={e => (e.currentTarget.style.display = 'none')} />
          <span className="text-xs text-slate-400 font-sans">
            Powered by Google Places API · Reviews verified
          </span>
          <a href={BRAND.mapsUrl} target="_blank" rel="noopener noreferrer"
            className="text-xs text-blue-600 no-underline font-sans font-semibold">
            View on Google Maps ↗
          </a>
        </div>

      </div>
    </div>
  );
};

export default PlaceReviewsComponent;