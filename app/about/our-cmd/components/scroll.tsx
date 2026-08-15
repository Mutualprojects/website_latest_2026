import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * AwardsHorizontalScroll
 * ----------------------
 * Top 3 awards (by order) scroll horizontally in a pinned, full-screen row.
 * Scroll distance is derived ONLY from those 3 panels — the rows below
 * never affect the pin. Remaining awards render below as ALTERNATING rows:
 * row 1 = photo | content, row 2 = content | photo, and so on (zig-zag).
 *
 * Requires: npm i gsap
 */

const API_BASE = typeof window !== "undefined" ? "/strapi" : "http://183.82.117.36:2334";
const API_URL = "/strapi/api/md-components?populate=*";
const BRAND = "#07518a";
const SCROLL_COUNT = 3; // how many panels scroll horizontally

/* ---------- Types ---------- */

interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

interface MediaImage {
  id: number;
  name: string;
  alternativeText: string | null;
  url: string;
  formats?: {
    large?: ImageFormat;
    medium?: ImageFormat;
    small?: ImageFormat;
    thumbnail?: ImageFormat;
  };
}

interface AwardItem {
  id: number;
  title: string;
  description: string;
  oreder: number;
  images: MediaImage[];
}

interface ApiResponse {
  data: AwardItem[];
}

/* ---------- Helpers ---------- */

function resolveImage(image?: MediaImage): string {
  if (!image) return "";
  const fmt = image.formats?.large ?? image.formats?.medium ?? image.formats?.small ?? null;
  const path = fmt?.url ?? image.url;
  return path.startsWith("http") ? path : `/strapi${path}`;
}

/* ---------- Component ---------- */

export default function AwardsHorizontalScroll() {
  const [items, setItems] = useState<AwardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Fetch data
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const json: ApiResponse = await res.json();
        if (active) {
          const sorted = (json.data ?? [])
            .slice()
            .sort((a, b) => (b.oreder ?? 0) - (a.oreder ?? 0));
          setItems(sorted);
        }
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Split: first 3 (by order) scroll horizontally, rest become alternating rows
  const scrollItems = items.slice(0, SCROLL_COUNT);
  const rowItems = items.slice(SCROLL_COUNT);

  // GSAP horizontal scroll + animations (only for the scroll panels)
  useEffect(() => {
    if (!scrollItems.length) return;
    const root = rootRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!root || !track) return;

    let mm: gsap.MatchMedia | null = null;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".awh-panel");

      // Scroll distance is exactly (panels - 1) screens — derived ONLY from
      // the scroll panels, so the rows below can never influence it.
      const getScrollAmount = () =>
        Math.max(0, (panels.length - 1) * window.innerWidth);

      const scrollTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          pin: true,
          scrub: 1,
          end: () => "+=" + getScrollAmount(),
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) progress.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      mm = gsap.matchMedia();
      mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        panels.forEach((panel) => {
          const wrap = panel.querySelector<HTMLElement>(".awh-photo-wrap");
          const content = panel.querySelector<HTMLElement>(".awh-content");

          if (wrap) {
            gsap.from(wrap, {
              opacity: 0,
              scale: 0.9,
              yPercent: 8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left center",
                end: "center center",
                scrub: true,
              },
            });
            gsap.fromTo(
              wrap,
              { xPercent: -5 },
              {
                xPercent: 5,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              }
            );
          }

          if (content) {
            gsap.from(content.children, {
              opacity: 0,
              y: 44,
              duration: 0.7,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left 62%",
                toggleActions: "play none none reverse",
              },
            });
          }
        });
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm?.revert();
      ctx.revert();
    };
  }, [items]);

  // Reveal animation for the alternating rows
  useEffect(() => {
    if (!rowItems.length) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".awr-row");
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        rows.forEach((row) => {
          const media = row.querySelector<HTMLElement>(".awr-media");
          const content = row.querySelector<HTMLElement>(".awr-content");
          const reversed = row.classList.contains("awr-row--reverse");

          if (media) {
            gsap.from(media, {
              opacity: 0,
              x: reversed ? 60 : -60,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            });
          }
          if (content) {
            gsap.from(content.children, {
              opacity: 0,
              y: 32,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            });
          }
        });
      });
    });

    return () => ctx.revert();
  }, [items]);

  if (loading) return <div className="awh-state">Loading awards…<Styles /></div>;
  if (error) return <div className="awh-state">Error: {error}<Styles /></div>;
  if (!items.length) return <div className="awh-state">No awards found.<Styles /></div>;

  return (
    <>
      {/* ===== Pinned horizontal scroll — top 3 by order (UNCHANGED) ===== */}
      {scrollItems.length > 0 && (
        <div ref={rootRef} className="awh-viewport" aria-label="Awards & Recognition">
          <div
            ref={trackRef}
            className="awh-track"
            style={{ width: `${scrollItems.length * 100}vw` }}
          >
            {scrollItems.map((item, i) => (
              <section key={item.id} className="awh-panel">
                <div className="awh-image-side">
                  <figure className="awh-photo-wrap">
                    <span className="awh-tape awh-tape--tl" aria-hidden="true" />
                    <span className="awh-tape awh-tape--br" aria-hidden="true" />
                    {item.images?.[0] ? (
                      <img
                        src={resolveImage(item.images[0])}
                        alt={item.images[0].alternativeText ?? item.title}
                        className="awh-img"
                      />
                    ) : (
                      <div className="awh-img-placeholder" />
                    )}
                  </figure>
                </div>

                <div className="awh-content">
                  <span className="awh-eyebrow">
                    <em className="awh-num">{String(i + 1).padStart(2, "0")}</em>
                    Recognition
                  </span>
                  <h2 className="awh-title">{item.title}</h2>
                  <p className="awh-desc">{item.description}</p>
                </div>
              </section>
            ))}
          </div>

          <div className="awh-progress-track" aria-hidden="true">
            <div ref={progressRef} className="awh-progress-fill" />
          </div>
        </div>
      )}

      {/* ===== Alternating rows — everything after the first 3 ===== */}
      {rowItems.length > 0 && (
        <section className="awr-section" aria-label="More Recognition">
          <div className="awr-head">
            <span className="awr-eyebrow">More Recognition</span>
            <h2 className="awr-heading">Awards &amp; Honors</h2>
          </div>

          <div className="awr-list">
            {rowItems.map((item, i) => (
              <article
                key={item.id}
                className={`awr-row ${i % 2 === 1 ? "awr-row--reverse" : ""}`}
              >
                <div className="awr-media">
                  <figure className="awr-photo-wrap">
                    <span className="awr-tape awr-tape--tl" aria-hidden="true" />
                    <span className="awr-tape awr-tape--br" aria-hidden="true" />
                    {item.images?.[0] ? (
                      <img
                        src={resolveImage(item.images[0])}
                        alt={item.images[0].alternativeText ?? item.title}
                        className="awr-img"
                        loading="lazy"
                      />
                    ) : (
                      <div className="awr-placeholder" />
                    )}
                  </figure>
                </div>

                <div className="awr-content">
                  <span className="awr-eyebrow awr-eyebrow--row">
                    <em className="awr-num">
                      {String(i + SCROLL_COUNT + 1).padStart(2, "0")}
                    </em>
                    Recognition
                  </span>
                  <h3 className="awr-title">{item.title}</h3>
                  <p className="awr-desc">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <Styles />
    </>
  );
}

/* ---------- Styles ---------- */

function Styles() {
  return (
    <style>{`
      .awh-viewport {
        position: relative;
        overflow: hidden;
        background: #ffffff;
        color: ${BRAND};
        font-family: 'Inter', system-ui, sans-serif;
      }
      .awh-track {
        display: flex;
        height: 100vh;
        will-change: transform;
      }
      .awh-panel {
        width: 100vw;
        flex: 0 0 100vw;
        height: 100vh;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        gap: clamp(1.5rem, 4vw, 5rem);
        padding: clamp(1.5rem, 4vw, 5rem);
        box-sizing: border-box;
      }

      .awh-image-side {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 0;
      }
      .awh-photo-wrap {
        position: relative;
        display: inline-flex;
        margin: 0;
        max-width: 78%;
        max-height: 76vh;
        will-change: transform;
      }
      .awh-img {
        max-width: 100%;
        max-height: 76vh;
        width: auto;
        height: auto;
        object-fit: contain;
        display: block;
        border-radius: 4px;
        box-shadow: 0 26px 60px rgba(7, 81, 138, 0.22);
      }
      .awh-img-placeholder {
        width: 360px;
        height: 260px;
        max-width: 100%;
        border-radius: 4px;
        background: #eef4f9;
      }
      .awh-tape {
        position: absolute;
        width: clamp(58px, 6vw, 104px);
        height: clamp(20px, 2.2vw, 32px);
        background:
          linear-gradient(135deg, rgba(221, 210, 182, 0.78), rgba(232, 224, 203, 0.58));
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.16);
        z-index: 3;
        pointer-events: none;
      }
      .awh-tape--tl { top: -12px; left: -10px; transform: rotate(-8deg); }
      .awh-tape--br { bottom: -12px; right: -10px; transform: rotate(-8deg); }

      .awh-content {
        display: grid;
        gap: clamp(0.9rem, 1.5vw, 1.4rem);
        align-content: center;
        max-width: 540px;
        min-width: 0;
      }
      .awh-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.25em;
        font-size: clamp(0.7rem, 0.9vw, 0.85rem);
        font-weight: 700;
        color: ${BRAND};
      }
      .awh-num {
        font-style: normal;
        letter-spacing: 0;
        font-size: 1.05rem;
        line-height: 1;
        color: #ffffff;
        background: ${BRAND};
        padding: 0.35rem 0.6rem;
        border-radius: 8px;
        box-shadow: 0 6px 16px rgba(7, 81, 138, 0.30);
      }
      .awh-title {
        font-weight: 900;
        font-size: clamp(1.6rem, 3.2vw, 3rem);
        line-height: 1.08;
        margin: 0;
        letter-spacing: -0.02em;
        color: ${BRAND};
      }
      .awh-desc {
        font-size: clamp(0.95rem, 1.15vw, 1.15rem);
        line-height: 1.7;
        margin: 0;
        color: ${BRAND};
        opacity: 0.82;
      }

      .awh-progress-track {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 4px;
        background: rgba(7, 81, 138, 0.10);
        z-index: 5;
      }
      .awh-progress-fill {
        height: 100%;
        width: 100%;
        transform: scaleX(0);
        transform-origin: left center;
        background: ${BRAND};
      }

      .awh-state {
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #ffffff;
        color: ${BRAND};
        font-family: 'Inter', system-ui, sans-serif;
      }

      /* ===== Alternating rows section ===== */
      .awr-section {
        background: #ffffff;
        color: ${BRAND};
        font-family: 'Inter', system-ui, sans-serif;
        padding: clamp(3rem, 7vw, 6rem) clamp(1.25rem, 5vw, 5rem);
      }
      .awr-head {
        max-width: 1200px;
        margin: 0 auto clamp(2.5rem, 5vw, 4.5rem);
        text-align: center;
        display: grid;
        gap: 0.75rem;
        justify-items: center;
      }
      .awr-eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.25em;
        font-size: clamp(0.7rem, 0.9vw, 0.85rem);
        font-weight: 700;
        color: ${BRAND};
        opacity: 0.7;
      }
      .awr-heading {
        font-weight: 900;
        font-size: clamp(1.8rem, 3.4vw, 3rem);
        line-height: 1.1;
        letter-spacing: -0.02em;
        margin: 0;
        color: ${BRAND};
      }

      .awr-list {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        gap: clamp(3rem, 7vw, 6rem);
      }

      /* Each row: photo on one side, content on the other */
      .awr-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        gap: clamp(1.5rem, 4vw, 4.5rem);
      }
      /* Reversed rows: content first, photo second */
      .awr-row--reverse .awr-media { order: 2; }
      .awr-row--reverse .awr-content { order: 1; }

      .awr-media {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 0;
      }
      .awr-photo-wrap {
        position: relative;
        display: inline-flex;
        margin: 0;
        max-width: 100%;
      }
      .awr-img {
        width: 100%;
        max-height: 460px;
        object-fit: cover;
        display: block;
        border-radius: 6px;
        box-shadow: 0 22px 50px rgba(7, 81, 138, 0.20);
      }
      .awr-placeholder {
        width: 100%;
        aspect-ratio: 4 / 3;
        border-radius: 6px;
        background: #eef4f9;
      }
      .awr-tape {
        position: absolute;
        width: clamp(58px, 6vw, 104px);
        height: clamp(20px, 2.2vw, 32px);
        background:
          linear-gradient(135deg, rgba(221, 210, 182, 0.78), rgba(232, 224, 203, 0.58));
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.16);
        z-index: 3;
        pointer-events: none;
      }
      .awr-tape--tl { top: -12px; left: -10px; transform: rotate(-8deg); }
      .awr-tape--br { bottom: -12px; right: -10px; transform: rotate(-8deg); }

      .awr-content {
        display: grid;
        gap: clamp(0.9rem, 1.5vw, 1.4rem);
        align-content: center;
        min-width: 0;
      }
      .awr-eyebrow--row {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        opacity: 1;
      }
      .awr-num {
        font-style: normal;
        letter-spacing: 0;
        font-size: 1.05rem;
        line-height: 1;
        color: #ffffff;
        background: ${BRAND};
        padding: 0.35rem 0.6rem;
        border-radius: 8px;
        box-shadow: 0 6px 16px rgba(7, 81, 138, 0.30);
      }
      .awr-title {
        font-weight: 900;
        font-size: clamp(1.5rem, 2.8vw, 2.6rem);
        line-height: 1.1;
        margin: 0;
        letter-spacing: -0.02em;
        color: ${BRAND};
      }
      .awr-desc {
        font-size: clamp(0.95rem, 1.15vw, 1.15rem);
        line-height: 1.7;
        margin: 0;
        color: ${BRAND};
        opacity: 0.82;
      }

      /* ---- Responsive: horizontal panels stack on tablet/phone ---- */
      @media (max-width: 900px) {
        .awh-panel {
          grid-template-columns: 1fr;
          grid-template-rows: minmax(0, 1fr) auto;
          align-items: stretch;
          gap: clamp(1rem, 3vw, 1.75rem);
          padding: clamp(1.25rem, 4vw, 2.5rem);
        }
        .awh-image-side { order: 1; }
        .awh-content { order: 2; max-width: none; align-content: start; gap: 0.6rem; }
        .awh-photo-wrap { max-width: 92%; max-height: 46vh; }
        .awh-img { max-height: 46vh; }
        .awh-tape { width: clamp(46px, 14vw, 70px); height: clamp(16px, 4vw, 24px); }
        .awh-desc {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Rows stack: photo on top, content below — regardless of reverse */
        .awr-row,
        .awr-row--reverse {
          grid-template-columns: 1fr;
          gap: clamp(1.25rem, 4vw, 2rem);
        }
        .awr-row--reverse .awr-media,
        .awr-row .awr-media { order: 1; }
        .awr-row--reverse .awr-content,
        .awr-row .awr-content { order: 2; }
        .awr-img { max-height: 360px; }
      }

      /* ---- Phones ---- */
      @media (max-width: 600px) {
        .awr-section { padding: clamp(2.5rem, 8vw, 3.5rem) 1.1rem; }
        .awr-img { max-height: 280px; }
      }
      @media (max-width: 480px) {
        .awh-photo-wrap, .awh-img { max-height: 40vh; }
        .awh-desc { -webkit-line-clamp: 3; }
      }
    `}</style>
  );
}