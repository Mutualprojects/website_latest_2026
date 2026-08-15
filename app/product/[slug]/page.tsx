"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, Variants, useScroll, useTransform, MotionValue } from "framer-motion";
import axios from "axios";
import {
  CheckCircle2,
  Shield,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Cpu,
  Building2,
  Info,
} from "lucide-react";

/**
 * AI Visitor Management System — product detail page.
 * Single-brand-color system built on Brihaspathi's #07518a — no gradients,
 * no decorative color blends. Data is fetched live from the Strapi CMS.
 */

const STRAPI_ORIGIN = "http://183.82.117.36:2334";
const PRODUCTS_ENDPOINT = `${STRAPI_ORIGIN}/api/products`;

const BRAND = "#07518a";
const BRAND_DARK = "#053d6a";
const BRAND_TINT = "#eaf2f8";

/* ─────────────────────────── Types ─────────────────────────── */

interface RichTextChild {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

interface RichTextNode {
  type: string;
  format?: string;
  children?: RichTextChild[];
}

interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  formats?: {
    large?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    small?: StrapiImageFormat;
    thumbnail?: StrapiImageFormat;
  };
}

interface Category {
  id: number;
  title: string;
  slug: string;
  type: string;
}

interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  schema?: {
    "@graph"?: Array<{
      "@type": string;
      featureList?: string[];
    }>;
  };
}

interface StepItem {
  id: number;
  step_title: string;
  description?: string | null;
}

interface StepsBlock {
  __component: "sections.steps-section";
  id: number;
  title: string;
  steps: StepItem[];
}

interface TextBlock {
  __component: "sections.text-section";
  id: number;
  heading: string;
  content: RichTextNode[];
}

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

interface FaqBlock {
  __component: "sections.faq-section";
  id: number;
  title: string;
  items: FaqItem[];
}

type ContentBlock = StepsBlock | TextBlock | FaqBlock;

interface Product {
  id: number;
  title: string;
  description: string;
  slug: string;
  image: StrapiImage[];
  category: Category | null;
  seo: Seo | null;
  berief_product: ContentBlock[]; // field name matches the CMS schema
}

/* ─────────────────────── Rich text renderer ─────────────────────── */

function RichText({ nodes }: { nodes: RichTextNode[] }) {
  return (
    <>
      {nodes.map((node, i) => {
        if (node.type === "paragraph") {
          const children = node.children ?? [];
          const isEmpty = children.every((child) => !child.text?.trim());
          if (isEmpty) return null;
          return (
            <p key={i} className="mb-3 text-lg leading-relaxed text-slate-700">
              {children.map((child, j) => renderLeaf(child, j))}
            </p>
          );
        }
        if (node.type === "list") {
          return (
            <ul key={i} className="mb-4 space-y-2">
              {(node.children ?? []).map((item, j) => {
                const itemChildren =
                  (item as unknown as { children?: RichTextChild[] }).children ?? [];
                return (
                  <li key={j} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 flex-shrink-0"
                      style={{ color: BRAND }}
                    />
                    <span className="text-base text-slate-700">
                      {itemChildren.map((child, k) => renderLeaf(child, k))}
                    </span>
                  </li>
                );
              })}
            </ul>
          );
        }
        return null;
      })}
    </>
  );
}

function renderLeaf(node: RichTextChild, key: number) {
  let el: React.ReactNode = node.text ?? "";
  if (node.bold) {
    el = (
      <strong key={key} className="font-semibold text-slate-900">
        {el}
      </strong>
    );
  }
  if (node.italic) el = <em key={key}>{el}</em>;
  if (node.underline) el = <u key={key}>{el}</u>;
  return <React.Fragment key={key}>{el}</React.Fragment>;
}

/* ─────────────────────────── Animation wrappers ─────────────────────────── */

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

function FadeUp({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────── Layout atoms ─────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest"
      style={{ color: BRAND }}
    >
      {children}
    </div>
  );
}

function ScrollWord({ children, progress, range }: { children: React.ReactNode; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
}

function SectionHeading({ title }: { title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "start 50%"] 
  });
  
  const words = title.split(" ");

  return (
    <div ref={containerRef} className="mb-10 space-y-3">
      <div className="flex items-center gap-3">
        <motion.span
          initial={{ height: 0 }}
          whileInView={{ height: "2.25rem" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-1.5 rounded-full"
          style={{ backgroundColor: BRAND }}
          aria-hidden
        />
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl flex flex-wrap">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            return (
              <ScrollWord key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </ScrollWord>
            );
          })}
        </h2>
      </div>
    </div>
  );
}

/* ─────────────────────────── Sections ─────────────────────────── */

function StepsSection({ block }: { block: StepsBlock }) {
  return (
    <section aria-labelledby={`steps-${block.id}`}>
      <FadeUp>
        <SectionHeading title={block.title} />
      </FadeUp>
      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2"
      >
        {block.steps.map((step) => (
          <motion.li
            variants={fadeUpVariant}
            key={step.id}
            className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-colors duration-200 hover:border-[#07518a]"
          >
            <span
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
              style={{ backgroundColor: BRAND_TINT }}
              aria-hidden
            >
              <Building2 className="h-5 w-5" style={{ color: BRAND }} />
            </span>
            <div>
              <p className="text-lg font-semibold text-slate-900">
                {step.step_title}
              </p>
              {step.description && (
                <p className="mt-1 text-sm text-slate-600">{step.description}</p>
              )}
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}


function FaqSection({ block }: { block: FaqBlock }) {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section aria-labelledby="faqs">
      <FadeUp>
        <SectionHeading title={block.title || "FAQs"} />
      </FadeUp>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="max-w-4xl space-y-3"
      >
        {block.items.map((item) => {
          const isOpen = openId === item.id;
          return (
            <motion.div
              variants={fadeUpVariant}
              key={item.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors duration-200 hover:border-[#07518a]"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 group"
                style={{ outlineColor: isOpen ? BRAND : undefined }}
                aria-expanded={isOpen}
              >
                <span className="text-lg font-semibold text-slate-900 group-hover:text-[#07518a] transition-colors">
                  {item.question}
                </span>
                {isOpen ? (
                  <ChevronUp
                    className="h-5 w-5 flex-shrink-0"
                    style={{ color: BRAND }}
                  />
                ) : (
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-slate-400 group-hover:text-[#07518a] transition-colors" />
                )}
              </button>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-slate-100 px-6 pb-5 pt-4"
                >
                  <p className="leading-relaxed text-slate-700">{item.answer}</p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

/* ─────────────────────────── Loading / empty states ─────────────────────────── */

function LoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-12 w-12 rounded-full border-4 border-slate-200 motion-safe:animate-spin"
          style={{ borderTopColor: BRAND }}
          aria-hidden
        />
        <p className="font-medium text-slate-500">Loading product details…</p>
      </div>
    </div>
  );
}

function NotFoundState() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-white px-4 text-center">
      <p className="text-xl font-semibold text-slate-900">Product not found.</p>
      <p className="text-slate-500">
        The page you&apos;re looking for isn&apos;t published yet, or the slug has changed.
      </p>
    </div>
  );
}


/* ─────────────────────────── Main page ─────────────────────────── */

export default function AIVisitorManagementPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    if (!slug) return;

    axios
      .get(PRODUCTS_ENDPOINT, {
        params: {
          "filters[slug][$eq]": slug,
          "populate[image]": true,
          "populate[category]": true,
          "populate[seo][populate][ogImage]": true,
          "populate[berief_product][populate]": "*",
        },
      })
      .then((res) => {
        if (!cancelled) setProduct(res.data?.data?.[0] ?? null);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        if (!cancelled) setProduct(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) return <LoadingState />;
  if (!product) return <NotFoundState />;

  const heroImage =
    product.image?.[0]?.formats?.large?.url ??
    product.image?.[0]?.formats?.medium?.url ??
    product.image?.[0]?.url ??
    null;

  const blocks = product.berief_product ?? [];

  const seoFeatureList: string[] =
    product.seo?.schema?.["@graph"]?.find(
      (g) => g["@type"] === "SoftwareApplication"
    )?.featureList ?? [];

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <div className="relative h-[480px] w-full overflow-hidden md:h-[560px]">
        {heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${STRAPI_ORIGIN}${heroImage}`}
            alt={product.image?.[0]?.alternativeText ?? product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full" style={{ backgroundColor: BRAND }} />
        )}

        {/* Flat overlay for text legibility — solid color, not a gradient */}
        <div className="absolute inset-0 bg-slate-900/60" aria-hidden />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex items-center"
        >
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-5 flex items-center gap-2 text-sm text-white/70">
              <span className="capitalize">{product.category?.title ?? "Products"}</span>
              <ArrowRight className="h-3 w-3" />
              <span className="text-white">{product.title}</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mb-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl"
            >
              {product.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="mb-2 text-base font-medium uppercase tracking-widest text-white/70"
            >
              by Brihaspathi Technologies
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="max-w-2xl text-lg font-light leading-relaxed text-white/90 md:text-xl"
            >
              {product.description}
            </motion.p>

            {seoFeatureList.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="mt-6 flex flex-wrap gap-2"
              >
                {seoFeatureList.slice(0, 5).map((feature, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                  >
                    {feature}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── Body ── */}
      <div className="mx-auto max-w-6xl space-y-24 px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
        {blocks.map((block, index) => {
          if (block.__component === "sections.text-section") {
            // Skip the first block if its heading is exactly the product title
            // because we already show it prominently in the hero section.
            if (index === 0 && block.heading === product.title) {
              return null;
            }

            return (
              <section key={block.id} aria-labelledby={`text-${block.id}`}>
                <FadeUp>
                  {block.heading && (
                    <SectionHeading title={block.heading} />
                  )}
                  <div className="max-w-4xl">
                    <RichText nodes={block.content ?? []} />
                  </div>
                </FadeUp>
              </section>
            );
          }

          if (block.__component === "sections.steps-section") {
            return <StepsSection key={block.id} block={block} />;
          }

          if (block.__component === "sections.faq-section") {
            return <FaqSection key={block.id} block={block} />;
          }

          return null;
        })}
      </div>

      {/* ── CTA ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.8 }}
        className="py-16 mt-10"
        style={{ backgroundColor: BRAND }}
      >
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 text-3xl font-bold text-white md:text-4xl"
          >
            Ready to get started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 text-lg text-white/85"
          >
            Contact Brihaspathi Technologies to learn how {product.title} can
            strengthen security at your site.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold transition-all duration-300 hover:bg-slate-50 hover:scale-105 hover:shadow-xl"
            style={{ color: BRAND_DARK }}
          >
            Contact us
            <ArrowRight className="h-5 w-5" />
          </motion.a>
        </div>
      </motion.div>
    </main>
  );
}