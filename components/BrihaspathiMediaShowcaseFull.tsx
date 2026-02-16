"use client";

const news1 = "/news/1.jpeg";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

/* =========================
   Types & Data (included)
========================= */
type ItemCategory = "article" | "video" | "post";

interface MediaItem {
  title: string;
  url: string;
  platform: string;
  date?: string;
  image?: string; // optional image/thumbnail
  category: ItemCategory;
  relatedUrl?: string; // optional secondary link (e.g., YouTube/LinkedIn)
}

const brihaspathiMedia: MediaItem[] = [
  // Articles
  {
    title:
      "With over 12 lakh CCTVs installed, Brihaspathi Technologies is making a difference in public safety and surveillance across India",
    url: "https://www.ndtv.com/videos/embed-player/?id=933079&mute=1&autostart=1&mutestart=true&pWidth=100&pHeight=100' width='500' height='600' ",
    platform: "NDTV",
    date: "April 30, 2025",
    category: "article",
  },
  {
    title:
      "Brihaspathi Technologies Limited Employees Pay Tribute to Padma Shri Daripalli Ramaiah by Planting Over 600 Saplings",
    url: "https://indtoday.com/brihaspathi-technologies-limited-employees-pay-tribute-to-padma-shri-daripalli-ramaiah-by-planting-over-600-saplings/",
    platform: "IND TODAY",
    date: "Apr 16, 2025",
    category: "article",
  },
  {
    title:
      "Startup Digest: Pine Labs files draft papers for ₹2,600 crore IPO, GIVA raises ₹530 crore and more",
    url: "https://www.cnbctv18.com/business/startup/startup-digest-pine-labs-files-draft-papers-for-rs-2600-crore-ipo-giva-raises-rs-530-crore-and-more-19627535.htm",
    platform: "CNBC TV18",
    date: "June 26, 2025",
    category: "article",
  },

  {
    title:
      "Brihaspathi Technologies Raises $10 Million Funding, Plans IPO Next Year",
    url: "https://www.ndtvprofit.com/business/brihaspathi-technologies-raises-10-million-funding-plans-ipo-next-year",
    platform: "NDTV",
    date: "27 Jun 2025",
    category: "article",
  },
  {
    title:
      "Brihaspathi Technologies Limited The Indian Company Turning AI into Real-World Security",
    url: "https://republicbytes.com/brihaspathi-technologies-limited-the-indian-company-turning-ai-into-real-world-security",
    platform: "PUBLIC BYTES",
    date: "Sep 29, 2025",
    category: "article",
  },
  {
    title: "Brihaspathi Tech raises $10M, bags MSRTC deal; ready for IPO",
    url: "https://www.thehansindia.com/business/brihaspathi-tech-raises-10m-bags-msrtc-deal-ready-for-ipo-983046",
    platform: "HANSINDIA",
    date: "27 June 2025",
    category: "article",
  },

  // Post + mixed
  {
    title: "Power of Women",
    image:
      "https://media.licdn.com/dms/image/v2/D5622AQE8S1m5teqe_Q/feedshare-shrink_1280/B56Zc1JBLXHgAk-/0/1748943246715?e=1762387200&v=beta&t=MJOWvhwie2RJGnb58Q2GmgsHJmXg3ORJK2scjI6PiT8",
    url: "https://www.linkedin.com/posts/brihaspathi-technologies_timespowerwomen-womenempowerment2025-breakingbarriers-activity-7339563193515548672-xzgi?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD0s5osBFRIpzZKGDMrpQR7BkKopqNbbDa4",
    platform: "TV9 TELUGU",
    relatedUrl: "https://www.youtube.com/watch?v=AvxqkXx31HI",
    category: "post",
  },

  // Videos
  {
    title: "12 Lakh CC Cameras in India Installed by Brihaspathi Technologies",
    image:
      "https://media.licdn.com/dms/image/v2/D5622AQFCDioLQad3pA/feedshare-shrink_2048_1536/B56ZgXNztmHMAo-/0/1752736153132?e=1762387200&v=beta&t=xo2lTTCofwN5DUW_-hvRucxS3Xmn7-SjhUY9eARtObo",
    url: "https://youtu.be/eZ6RPwVYxX4?si=gjZ6C1lhUc58-t3_",
    platform: "ETV video",
    date: "Jul 16, 2025",
    category: "video",
  },
  {
    title:
      "₹7,000 Salary to ₹700 Crores: Brihaspathi Technologies MD Rajasekhar Papolu’s Inspirational Journey",
    url: "https://youtu.be/RzeD1gsg9gI?si=bwa4anzsXBqeIO6q",
    platform: "SUMAN TV",
    date: "Dec 16, 2024",
    category: "video",
  },
  {
    title:
      "Brihaspathi Technology limted | Rajasekhar P MD Brihaspathi Technologies Limited",
    url: "https://youtu.be/la_vwP7oVXw?si=XR5S88jXF1rSo0mD",
    platform: "G16 Media",
    date: "Jun 26, 2025",
    category: "video",
  },
  {
    title: "Future of Cloud-based Surveillance Ecosystem",
    url: "https://youtu.be/954ztbKPJnM?si=iXppNSjfis5ofyyj",
    platform: "JIO PODCAST",
    date: "Aug 22, 2025",
    category: "video",
  },
  {
    title:
      "తనదైన రంగంలో దూసుకుపోతున్న బృహస్పతి సంస్థ Brihaspathi Technologies Limited |",
    url: "https://youtu.be/Z_YT4ChZuf0?si=Z2RTSZs7T0VN6mk4",
    platform: "TV5",
    date: "Jun 29, 2025",
    category: "video",
  },
  {
    title: "FATHERS DAY",
    url: "https://youtube.com/shorts/Ky_0tszpVqo?si=XrmtF9HzV6qHLe_5",
    platform: "HYBIZ",
    date: "Jun 16, 2025",
    category: "video",
  },
  {
    title:
      "AI సెక్యూరిటీ కెమెరాలు తీసుకొస్తాం..Brihaspathi Technologies Rajasekhar Papolu, Managing Director",
    url: "https://youtu.be/GV8dBQCETjs?si=eBAcGnTkbAfNCddF",
    platform: "VAARTHA  BREAKING NEWS",
    date: "Jun 26, 2025",
    category: "video",
  },
];

/* =========================
   Helpers
========================= */
const YT_RE = /(?:youtube\.com|youtu\.be)/i;
const VIMEO_RE = /vimeo\.com/i;
const DIRECT_VIDEO_RE = /\.(mp4|webm|ogg)(\?|#|$)/i;

function isYouTube(url: string) {
  return YT_RE.test(url);
}
function isVimeo(url: string) {
  return VIMEO_RE.test(url);
}
function isDirectVideo(url: string) {
  return DIRECT_VIDEO_RE.test(url);
}
function toYouTubeEmbed(url: string) {
  try {
    const u = new URL(url);
    const id = u.hostname.includes("youtu.be")
      ? u.pathname.slice(1)
      : u.searchParams.get("v") || u.pathname.split("/").filter(Boolean).pop();
    return id ? `https://www.youtube.com/embed/${id}?rel=0` : url;
  } catch {
    return url;
  }
}
function toVimeoEmbed(url: string) {
  try {
    const u = new URL(url);
    const id = u.pathname.split("/").filter(Boolean).pop();
    return id ? `https://player.vimeo.com/video/${id}` : url;
  } catch {
    return url;
  }
}
function hostFrom(url: string) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/* =========================
   UI bits
========================= */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-black/70 text-white text-[10px] font-medium px-2 py-0.5 backdrop-blur-sm">
      {children}
    </span>
  );
}

function MediaVisual({ item }: { item: MediaItem }) {
  // YouTube/Vimeo (iframe)
  if (item.category === "video" && (isYouTube(item.url) || isVimeo(item.url))) {
    const src = isYouTube(item.url)
      ? toYouTubeEmbed(item.url)
      : toVimeoEmbed(item.url);
    return (
      <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-xl">
        <iframe
          src={src}
          title={item.title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  // Direct file video
  if (item.category === "video" && isDirectVideo(item.url)) {
    return (
      <div className="relative w-full overflow-hidden rounded-xl">
        <video
          src={item.url}
          controls
          playsInline
          className="block w-full rounded-xl"
          style={{ aspectRatio: "16/9" }}
        />
      </div>
    );
  }

  // Image (article/post or video with thumbnail)
  if (item.image) {
    return (
      <div className="relative w-full h-48 sm:h-52 md:h-56 rounded-xl overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
    );
  } else if (item.url) {
    return (
      <div className="relative w-full h-48 sm:h-52 md:h-56 rounded-xl overflow-hidden">
        <iframe
          src={item.url}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        ></iframe>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
    );
  }

  // Fallback gradient block
  return (
    <div className="relative w-full h-48 sm:h-52 md:h-56 rounded-xl overflow-hidden bg-gradient-to-br from-[#07518a]" />
  );
}

function Card({ item, idx }: { item: MediaItem; idx: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.2) }}
      className="group rounded-2xl ring-1 ring-gray-200 bg-white hover:shadow-lg transition overflow-hidden"
    >
      <div className="p-3 pb-0">
        <MediaVisual item={item} />
      </div>

      <div className="p-5 pt-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Chip>
            {item.category === "video"
              ? "Video"
              : item.category === "post"
              ? "Post"
              : "Article"}
          </Chip>
          <Chip>{item.platform || hostFrom(item.url)}</Chip>
          {item.date && <Chip>{item.date}</Chip>}
        </div>

        <h3 className="text-base md:text-lg font-semibold text-gray-900 leading-snug">
          {item.title}
        </h3>

        <div className="mt-4 flex items-center gap-3">
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#07518a] text-white text-xs font-semibold px-4 py-2 hover:bg-[#07518a] transition"
          >
            Open Link
          </a>

          {item.relatedUrl && (
            <a
              href={item.relatedUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-800 text-xs font-semibold px-4 py-2 hover:bg-gray-200 transition"
            >
              Related
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* =========================
   Page Component (with data)
========================= */
export default function BrihaspathiMediaShowcaseFull() {
  const [tab, setTab] = useState<"all" | ItemCategory>("all");
  const filtered = useMemo(
    () =>
      tab === "all"
        ? brihaspathiMedia
        : brihaspathiMedia.filter((m) => m.category === tab),
    [tab]
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-10 mt-40">
      <header className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
          In the News & Media
        </h2>
        <p className="text-gray-600">
          Coverage, videos, and social highlights featuring Brihaspathi
          Technologies.
        </p>
      </header>

      {/* Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(["all", "article", "video", "post"] as const).map((key) => {
          const active = tab === key;
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={[
                "rounded-full px-4 py-2 text-sm font-medium ring-1 transition",
                active
                  ? "bg-[#07518a] text-white ring-[#07518a]"
                  : "bg-white text-gray-700 ring-gray-300 hover:bg-gray-50",
              ].join(" ")}
              aria-pressed={active}
            >
              {key === "all"
                ? "All"
                : key === "article"
                ? "Articles"
                : key === "video"
                ? "Videos"
                : "Posts"}
            </button>
          );
        })}
      </div>

      <LayoutGroup>
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial={false}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <Card key={`${item.title}-${i}`} item={item} idx={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </section>
  );
}


