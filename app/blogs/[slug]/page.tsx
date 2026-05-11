"use client"

import React, { useState, useEffect, useRef, useMemo, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useSpring, AnimatePresence, useInView } from 'framer-motion'
import { format, parseISO } from 'date-fns'
import { fetchBlogBySlug, fetchLatestBlogs, updateBlogLikes, getStrapiMedia } from '@/app/lib/strapi'
import { Blog, TableSection, TextSection, StepSection, ListSection, FAQSection, RichTextNode } from '../types/blog'
import { notFound } from 'next/navigation'
import { Tag as TagIcon, Clock, ChevronRight, TrendingUp, Heart } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// 🎨 Design System & Constants
// ─────────────────────────────────────────────────────────────────────────────

const TRANSITIONS = {
  smooth: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  spring: { stiffness: 120, damping: 25 },
  entrance: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  heroZoom: { duration: 20, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
} as const

const COLORS = {
  primary: '#00A8E8',
  primaryDark: '#008FBF',
  primaryLight: '#E6F7FF',
  accent: '#6366F1',
  text: {
    primary: '#0F172A',
    secondary: '#475569',
    muted: '#94A3B8',
  },
  bg: {
    card: 'rgba(255, 255, 255, 0.92)',
    overlay: 'rgba(248, 250, 252, 0.95)',
  },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// ♻️ Reusable UI Components
// ─────────────────────────────────────────────────────────────────────────────

const ReadingProgress: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, TRANSITIONS.spring)
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00A8E8] via-[#6366F1] to-[#00A8E8] z-[200] origin-left shadow-sm"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}

interface StrategicImageProps {
  url: string
  alt?: string
  className?: string
  priority?: boolean
  width?: number
  height?: number
  contain?: boolean
}

const StrategicImage: React.FC<StrategicImageProps> = ({
  url,
  alt = "",
  className = "",
  priority = false,
  width,
  height,
  contain = false
}) => {
  const isNative = width && height;
  return (
    <div className={`relative overflow-hidden group ${className} ${isNative ? 'h-auto' : ''}`}>
      <Image
        src={getStrapiMedia(url)}
        alt={alt}
        {...(isNative ? { width, height } : { fill: true })}
        unoptimized
        priority={priority}
        className={`${isNative ? 'w-full h-auto' : 'object-cover'} ${contain ? 'object-contain' : ''} transition-transform duration-700 group-hover:scale-105`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {!contain && <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 📊 Content Section Components
// ─────────────────────────────────────────────────────────────────────────────

interface TableSectionComponentProps {
  section: TableSection
}

const TableSectionComponent: React.FC<TableSectionComponentProps> = ({ section }) => (
  <section className="my-12 md:my-16 overflow-hidden rounded-2xl border-2 border-black bg-white shadow-sm">
    <div className="bg-slate-50 px-4 md:px-8 py-4 md:py-6 border-b-2 border-black flex items-center justify-between">
      <h3 className="text-lg md:text-xl font-black text-black uppercase tracking-wider">{section.title}</h3>
      <span className="text-[10px] md:text-[11px] font-black text-white uppercase tracking-[0.2em] px-2 md:px-3 py-1 bg-black rounded-md">
        Data Matrix
      </span>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-slate-100">
            {section.header?.map((head) => (
              <th
                key={head.id}
                className="py-4 md:py-5 px-4 md:px-8 text-[11px] md:text-[12px] font-black text-black uppercase tracking-[0.12em] border-r-2 border-b-2 border-black"
              >
                {head.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.table_row?.map((row) => (
            <tr key={row.id} className="group hover:bg-slate-50 transition-colors">
              {row.cells?.map((cell, idx) => (
                <td
                  key={idx}
                  className={`py-4 md:py-5 px-4 md:px-8 text-black text-sm border-r-2 border-b-2 border-black font-bold ${idx === 0 ? 'bg-slate-50/50' : ''
                    }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
)

interface StepsSectionComponentProps {
  section: StepSection
}

const StepsSectionComponent: React.FC<StepsSectionComponentProps> = ({ section }) => {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = entry.target.getAttribute('data-idx')
            if (idx !== null) {
              setActiveStep(parseInt(idx, 10))
            }
          }
        })
      },
      { threshold: 0.4, rootMargin: "-15% 0px -30% 0px" }
    )
    const triggers = containerRef.current?.querySelectorAll('.step-trigger')
    triggers?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="my-12 md:my-16 relative" ref={containerRef}>
      <div
        className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#00A8E8]/50 via-slate-200 to-transparent"
        aria-hidden="true"
      />
      <div className="space-y-16 md:space-y-24">
        {section.steps?.map((step, idx) => {
          const isActive = activeStep === idx
          const imageMatch = step.description.match(/!\[.*?\]\((.*?)\)/)
          const cleanDesc = step.description.replace(/!\[.*?\]\((.*?)\)/g, '').trim()
          const [description, ...listItems] = cleanDesc.split(/●\t|●\s+|•\s+/)

          return (
            <motion.article
              key={step.id}
              data-idx={idx}
              className={`step-trigger relative pl-16 md:pl-24 lg:pl-32 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40'
                }`}
            >
              <div className="absolute left-0 top-0">
                <div
                  className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 z-10 bg-white transition-all duration-400 ${isActive
                    ? 'border-[#00A8E8] text-[#00A8E8] scale-105 shadow-md shadow-[#00A8E8]/15'
                    : 'border-slate-200 text-slate-300'
                    }`}
                >
                  <span className="text-base md:text-lg font-bold tracking-tighter">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              <div className="max-w-4xl">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 md:mb-12 tracking-tight">
                  {step.step_title}
                </h3>
                <div className="flex flex-col gap-8 md:gap-12 items-start">
                  <div className="flex-1">
                    {description && (
                      <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed mb-6 md:mb-8">
                        {description.trim()}
                      </p>
                    )}
                    {listItems.length > 0 && (
                      <ul className="grid grid-cols-1 gap-2 md:gap-3">
                        {listItems.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 p-3 md:p-4 rounded-xl border border-slate-100 bg-slate-50/40"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#00A8E8] mt-2 shrink-0"
                              aria-hidden="true"
                            />
                            <span className="text-slate-700 font-semibold text-sm tracking-tight">
                              {item.trim()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {imageMatch && (
                    <figure className="lg:w-96 shrink-0">
                      <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white relative bg-slate-100">
                        <StrategicImage
                          url={imageMatch[1]}
                          alt={step.step_title}
                          className="h-full w-full"
                        />
                      </div>
                    </figure>
                  )}
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

interface FAQSectionComponentProps {
  section: FAQSection
}

const FAQSectionComponent: React.FC<FAQSectionComponentProps> = ({ section }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="my-12 md:my-16 max-w-4xl">
      <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 md:mb-12 tracking-tight">
        {section.title}
      </h3>
      <div className="space-y-3 md:space-y-4">
        {section.items?.map((item, idx) => (
          <div
            key={item.id}
            className="border border-slate-100 rounded-xl md:rounded-2xl overflow-hidden bg-white"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full px-4 md:px-8 py-4 md:py-6 text-left flex items-center justify-between hover:bg-slate-50/50 transition-colors"
              aria-expanded={openIndex === idx}
            >
              <span className="text-base md:text-lg font-bold text-slate-900 pr-4 md:pr-8">{item.question}</span>
              <span
                className={`text-[#00A8E8] transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''
                  }`}
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-4 md:px-8 pb-4 md:pb-8 text-slate-600 font-medium leading-relaxed text-sm md:text-base text-justify">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 📝 Rich Text Renderer — Strapi Blocks Format
// ─────────────────────────────────────────────────────────────────────────────

const RichTextLeaf: React.FC<{ node: RichTextNode }> = ({ node }) => {
  if (node.type === 'text') {
    let content: React.ReactNode = node.text
    if (node.bold) content = <strong key="b">{content}</strong>
    if (node.italic) content = <em key="i">{content}</em>
    if (node.underline) content = <u key="u">{content}</u>
    if (node.strikethrough) content = <s key="s">{content}</s>
    if (node.code) content = <code key="c" className="bg-slate-100 px-1 rounded font-mono text-[0.9em]">{content}</code>
    return <>{content}</>
  }

  if (node.type === 'link') {
    return (
      <a
        href={node.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#00A8E8] hover:underline font-bold"
      >
        {node.children?.map((child, idx) => (
          <RichTextLeaf key={idx} node={child} />
        ))}
      </a>
    )
  }

  return null
}

const RichTextRenderer: React.FC<{ blocks: RichTextNode[] }> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks)) return null

  return (
    <>
      {blocks.map((block, bIdx) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={bIdx}>
                {block.children?.map((child, cIdx) => (
                  <RichTextLeaf key={cIdx} node={child} />
                ))}
              </p>
            )
          case 'heading':
            const HeadingTag = `h${block.level || 2}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
            const headingClasses = {
              h1: 'text-3xl md:text-5xl font-black mt-12 mb-6',
              h2: 'text-2xl md:text-4xl font-black mt-10 mb-5',
              h3: 'text-xl md:text-3xl font-black mt-8 mb-4',
              h4: 'text-lg md:text-2xl font-black mt-6 mb-3',
              h5: 'text-base md:text-xl font-black mt-4 mb-2',
              h6: 'text-sm md:text-lg font-black mt-2 mb-1',
            }[HeadingTag as string] || 'text-2xl md:text-4xl font-black mt-10 mb-5'

            return (
              <HeadingTag key={bIdx} className={`${headingClasses} text-slate-900 tracking-tight leading-tight`}>
                {block.children?.map((child, cIdx) => (
                  <RichTextLeaf key={cIdx} node={child} />
                ))}
              </HeadingTag>
            )
          case 'list':
            const ListTag = block.format === 'ordered' ? 'ol' : 'ul'
            return (
              <ListTag key={bIdx} className={`space-y-3 mb-8 ${ListTag === 'ul' ? 'list-disc pl-6' : 'list-decimal pl-6'} marker:text-[#00A8E8] marker:font-black`}>
                {block.children?.map((item, iIdx) => (
                  <li key={iIdx} className="pl-2">
                    {item.children?.map((child: any, cIdx: number) => (
                      <RichTextLeaf key={cIdx} node={child} />
                    ))}
                  </li>
                ))}
              </ListTag>
            )
          case 'quote':
            return (
              <blockquote key={bIdx} className="border-l-4 border-[#00A8E8] pl-6 py-2 my-8 italic text-slate-700 bg-slate-50 rounded-r-xl">
                {block.children?.map((child, cIdx) => (
                  <RichTextLeaf key={cIdx} node={child} />
                ))}
              </blockquote>
            )
          default:
            return null
        }
      })}
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 🧭 Active Section Hook for TOC
// ─────────────────────────────────────────────────────────────────────────────

const useActiveSection = (sectionIds: string[]) => {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find(entry => entry.isIntersecting)
        if (visible?.target?.id) {
          setActiveId(visible.target.id)
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 }
    )

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}

// ─────────────────────────────────────────────────────────────────────────────
// 🚀 Main Page Component
// ─────────────────────────────────────────────────────────────────────────────

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params)
  const [post, setPost] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [copied, setCopied] = useState(false)
  const [heroMounted, setHeroMounted] = useState(false)
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [likes, setLikes] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() => {
    fetchBlogBySlug(slug)
      .then((data) => {
        setPost(data)
        if (data) {
          // Support both 'likes' and 'likesCount' from Strapi
          setLikes(data.likesCount ?? data.likes ?? 0)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const likedBlogs = JSON.parse(localStorage.getItem('liked_blogs') || '[]')
      if (likedBlogs.includes(slug)) {
        setHasLiked(true)
      }
    }
  }, [slug])

  useEffect(() => {
    fetchLatestBlogs(4)
      .then(res => {
        // res is already the array of blogs from fetchLatestBlogs
        const filtered = res.filter((b: any) => b.slug !== slug)
        const sorted = [...filtered].sort((a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        ).slice(0, 3)
        setRecentBlogs(sorted)
      })
      .catch(console.error)

    const timer = setTimeout(() => setHeroMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const primaryHeroImage = useMemo(() => {
    const img = post?.featured_images?.[0]?.url || post?.featured_image?.url
    return img || null
  }, [post])

  const galleryImages = useMemo(() => {
    return post?.featured_images?.slice(1) || []
  }, [post])

  const sectionIds = useMemo(() => {
    return post?.zone?.map((_, idx) => `section-${idx}`) || []
  }, [post])

  const activeSection = useActiveSection(sectionIds)

  const handleCopy = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    if (!url) return

    if (typeof window !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        return
      } catch (err) {
        console.error('Modern copy failed, trying fallback:', err)
      }
    }

    // Fallback for non-HTTPS/older browsers
    try {
      const textArea = document.createElement('textarea')
      textArea.value = url
      textArea.style.position = 'fixed'
      textArea.style.left = '-9999px'
      textArea.style.top = '0'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      if (successful) {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      console.error('Fallback copy failed:', err)
    }
  }

  const handleLike = async () => {
    if (!post) return

    const newHasLiked = !hasLiked
    const newLikes = newHasLiked ? likes + 1 : Math.max(0, likes - 1)

    setLikes(newLikes)
    setHasLiked(newHasLiked)

    // Update localStorage
    if (typeof window !== 'undefined') {
      try {
        const likedBlogs = JSON.parse(localStorage.getItem('liked_blogs') || '[]')
        if (newHasLiked) {
          if (!likedBlogs.includes(slug)) {
            likedBlogs.push(slug)
          }
        } else {
          const index = likedBlogs.indexOf(slug)
          if (index > -1) {
            likedBlogs.splice(index, 1)
          }
        }
        localStorage.setItem('liked_blogs', JSON.stringify(likedBlogs))
      } catch (err) {
        console.error('LocalStorage error:', err)
      }
    }

    try {
      await updateBlogLikes(post.documentId, newLikes)
    } catch (error) {
      console.error('Failed to update likes:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white" role="status">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-14 h-14 md:w-16 md:h-16">
            <div className="absolute inset-0 rounded-full border-2 md:border-[3px] border-slate-100" />
            <div className="absolute inset-0 rounded-full border-2 md:border-[3px] border-transparent border-t-[#00A8E8] animate-spin" />
          </div>
          <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] md:text-[11px]">
            Loading Briefing
          </p>
        </div>
      </div>
    )
  }

  if (!post) notFound()

  return (
    <article className="min-h-screen bg-white font-dm-sans selection:bg-[#00A8E8]/15 text-slate-900 antialiased relative">
      <ReadingProgress />

      {/* ─────────────────────────────────────────────────────────────────────
          🏙️ RESPONSIVE HERO — OPTIMIZED GLASSMORPHISM
      ───────────────────────────────────────────────────────────────────── */}
      <header className="relative w-full min-h-[70vh] md:min-h-[85vh] lg:h-[90vh] bg-white">
        {primaryHeroImage && (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{
                scale: heroMounted && imageLoaded ? 1 : 1.1,
                opacity: imageLoaded ? 1 : 0
              }}
              transition={{
                scale: TRANSITIONS.heroZoom,
                opacity: { duration: 1.2, ease: "easeOut" }
              }}
              className="absolute inset-0 hero-zoom-bg"
            >
              <Image
                src={getStrapiMedia(primaryHeroImage)}
                alt={post.title}
                fill
                priority
                unoptimized
                className="object-cover"
                onLoad={() => setTimeout(() => setImageLoaded(true), 50)}
              />
            </motion.div>

            {/* Layered Gradient Overlays — Mobile Optimized */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/20 to-white z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,168,232,0.1),transparent_70%)] z-10" />

            {/* Subtle Grid Texture */}
            <div
              className="absolute inset-0 z-[11] opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#00A8E8 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />
          </div>
        )}

        {/* Floating Card — Responsive Sizing */}
        <div className="absolute bottom-0 left-0 right-0 z-[50] translate-y-1/2 md:translate-y-1/2">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-xl md:backdrop-blur-2xl rounded-2xl md:rounded-[2.5rem] border border-white/50 shadow-lg md:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] p-5 md:p-8 lg:p-10 flex flex-col relative overflow-hidden"
            >
              {/* Top Accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 md:w-40 h-[3px] bg-gradient-to-r from-transparent via-[#00A8E8] to-transparent rounded-full" />

              {/* Category & Date */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 md:mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <span className="px-4 md:px-5 py-1.5 md:py-2 bg-[#00A8E8]/10 text-[#00A8E8] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] rounded-full">
                    {post.Category || "Strategic Insight"}
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="text-[10px] md:text-[11px] text-slate-400 font-bold tracking-[0.2em] uppercase"
                >
                  {format(parseISO(post.Published || post.publishedAt || post.createdAt), 'MMM dd, yyyy')}
                </motion.div>
              </div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8"
              >
                {post.title}
              </motion.h1>

              {/* Author & Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 md:pt-8 border-t border-slate-100">
                <motion.div
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="bg-white/40 backdrop-blur-md border border-white/40 p-2.5 md:p-3.5 rounded-xl md:rounded-2xl shadow-lg hover:bg-white/60 transition-all duration-500">
                    <div className="relative w-28 md:w-36 h-8 md:h-10">
                      <Image
                        src="/highbtlogo-tm-1.png"
                        alt="BTL Strategy"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 md:gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  <div className="hidden sm:flex items-center gap-2 text-[9px] md:text-[10px] text-slate-400 font-black tracking-[0.25em] uppercase pr-4 md:pr-6 border-r border-slate-100">
                    <span className="text-[#00A8E8]">READ:</span>
                    <span>{Math.ceil((post.zone?.length || 1) * 1.5)} MIN</span>
                  </div>



                  <button
                    onClick={handleLike}
                    disabled={hasLiked}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:border-[#07518a] hover:bg-[#07518a]/5 transition-all duration-300 group disabled:opacity-80"
                    aria-label="Like post"
                  >
                    <Heart
                      className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ${hasLiked ? 'fill-[#07518a] text-[#07518a] scale-110' : 'text-slate-400 group-hover:text-[#07518a] group-hover:scale-110'
                        }`}
                    />
                    <div className="flex flex-col items-start leading-none">
                      <span className={`text-[10px] font-black uppercase tracking-wider ${hasLiked ? 'text-[#07518a]' : 'text-slate-400'}`}>
                        {likes}
                      </span>
                      <span className={`text-[8px] font-bold uppercase tracking-tight ${hasLiked ? 'text-[#07518a]' : 'text-slate-500'}`}>
                        Likes
                      </span>
                    </div>
                  </button>
                  <div className="flex gap-2 md:gap-3">
                    {[
                      {
                        name: 'linkedin',
                        href: "https://www.linkedin.com/company/brihaspathi-technologies",
                        path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
                      },
                      {
                        name: 'facebook',
                        href: "https://www.facebook.com/BrihaspathiTechnology",
                        path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
                      },
                      {
                        name: 'twitter',
                        href: "https://x.com/Brihaspathitec",
                        path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-13.985 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'
                      },
                    ].map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#00A8E8] hover:border-[#00A8E8] hover:bg-[#00A8E8]/5 transition-all duration-200"
                        aria-label={`Share on ${item.name}`}
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d={item.path} /></svg>
                      </a>
                    ))}
                    <button
                      onClick={handleCopy}
                      className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#00A8E8] hover:border-[#00A8E8] hover:bg-[#00A8E8]/5 transition-all duration-200"
                      aria-label="Copy link"
                    >
                      {copied ? (
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile TOC Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden fixed bottom-4 right-4 z-[60] w-12 h-12 rounded-full bg-[#00A8E8] text-white flex items-center justify-center shadow-lg shadow-[#00A8E8]/30"
          aria-label="Toggle navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 md:gap-2"
        >
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-[#00A8E8] to-transparent" />
        </motion.div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────────
          📄 MAIN CONTENT — RESPONSIVE LAYOUT
      ───────────────────────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-[15vh] md:pt-[20vh] lg:pt-[22vh] pb-24 md:pb-32 relative z-10 mt-42">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-16 lg:gap-20">

          {/* Desktop Sidebar — Pro Max Navigation Index */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-32 space-y-12">
              {post.expert && (
                <div className="relative pl-6 border-l-4 border-[#07518a] py-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#07518a] mb-3">Intelligence Summary</h4>
                  <p className="text-sm font-bold text-slate-700 leading-relaxed italic">{post.expert}</p>
                </div>
              )}

              <nav aria-label="Table of contents" className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00A8E8] animate-pulse" />
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900">
                    Table of Contents
                  </h4>
                </div>

                <div className="absolute left-[7px] top-12 bottom-0 w-[1px] bg-slate-100" />

                <ul className="space-y-6 relative">
                  {post.zone.map((section: any, idx: number) => {
                    const sectionId = `section-${idx}`
                    const isActive = activeSection === sectionId
                    return (
                      <li key={idx} className="relative">
                        <a
                          href={`#${sectionId}`}
                          className={`group flex items-start gap-6 transition-all duration-500 ${isActive ? 'translate-x-2' : 'hover:translate-x-1'
                            }`}
                        >
                          <div className="relative mt-1">
                            <div className={`absolute -inset-2 rounded-full transition-all duration-500 ${isActive ? 'bg-[#00A8E8]/15 scale-100' : 'bg-transparent scale-0'
                              }`} />
                            <div className={`w-[15px] h-[15px] rounded-full border-2 transition-all duration-500 relative z-10 ${isActive
                              ? 'bg-[#00A8E8] border-[#00A8E8] shadow-[0_0_15px_rgba(0,168,232,0.5)]'
                              : 'bg-white border-slate-200 group-hover:border-[#00A8E8]'
                              }`} />
                          </div>

                          <div className="flex flex-col gap-1">
                            {/* <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${isActive ? 'text-[#00A8E8]' : 'text-slate-400'
                              }`}>
                              Section {String(idx + 1).padStart(2, '0')}
                            </span> */}
                            <span className={`text-xs font-bold leading-tight transition-all duration-300 max-w-[180px] ${isActive ? 'text-slate-900 opacity-100' : 'text-slate-500 opacity-60 group-hover:opacity-100'
                              }`}>
                              {section.title || section.heading || `Intelligence Unit ${idx + 1}`}
                            </span>
                          </div>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-xs font-bold text-slate-900 mb-4 leading-snug tracking-tight">
                  Need expert consultation regarding this intelligence?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[#00A8E8] text-[10px] font-black uppercase tracking-widest hover:gap-4 transition-all duration-200"
                >
                  Contact Authority
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </aside>

          {/* Mobile Drawer Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="lg:hidden fixed inset-0 bg-black z-[55]"
                  onClick={() => setMobileMenuOpen(false)}
                />
                <motion.nav
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="lg:hidden fixed right-0 top-0 bottom-0 w-72 bg-white z-[60] p-6 shadow-2xl overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">Navigate</h4>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 rounded-full hover:bg-slate-100"
                      aria-label="Close menu"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <ul className="space-y-6">
                    {post.zone.map((section: any, idx: number) => {
                      const sectionId = `section-${idx}`
                      const isActive = activeSection === sectionId
                      return (
                        <li key={idx}>
                          <a
                            href={`#${sectionId}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex flex-col gap-1 p-4 rounded-xl transition-all duration-300 ${isActive
                              ? 'bg-[#00A8E8]/10 border-l-4 border-[#00A8E8]'
                              : 'hover:bg-slate-50'
                              }`}
                          >
                            <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${isActive ? 'text-[#00A8E8]' : 'text-slate-400'
                              }`}>
                              Section {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className={`text-sm font-bold leading-tight ${isActive ? 'text-slate-900' : 'text-slate-600'
                              }`}>
                              {section.title || section.heading || `Intelligence Unit ${idx + 1}`}
                            </span>
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full py-3 px-4 bg-[#00A8E8] text-white text-center text-sm font-black uppercase tracking-widest rounded-lg hover:bg-[#008FBF] transition-colors"
                    >
                      Contact Authority
                    </Link>
                  </div>
                </motion.nav>
              </>
            )}
          </AnimatePresence>

          {/* Article Body */}
          <div className="lg:w-3/4 flex flex-col space-y-10 md:space-y-14">

            {/* Expert Quote */}
            {post.expert && (
              <motion.blockquote
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative p-6 md:p-10 bg-gradient-to-br from-slate-50/90 to-white rounded-2xl border border-slate-100 shadow-sm"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00A8E8] to-[#6366F1]" aria-hidden="true" />
                <p className="text-lg md:text-2xl font-bold text-slate-900 italic tracking-tight leading-snug text-justify">
                  {post.expert}
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <div className="h-px w-6 bg-[#00A8E8]" aria-hidden="true" />
                  <cite className="text-[9px] md:text-[10px] font-black text-[#00A8E8] uppercase tracking-[0.3em] not-italic">
                    Executive Summary
                  </cite>
                </footer>
              </motion.blockquote>
            )}

            {/* Gallery Images */}
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {galleryImages.map((img, idx) => (
                  <StrategicImage
                    key={img.id}
                    url={img.url}
                    alt={`Gallery image ${idx + 1}`}
                    className="aspect-video rounded-3xl shadow-xl border-4 border-white"
                  />
                ))}
              </div>
            )}

            {/* Dynamic Sections */}
            {post.zone.map((section, idx) => (
              <motion.section
                key={idx}
                id={`section-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`scroll-mt-24 transition-all duration-700 ${idx === 0 ? 'border-l-4 border-[#07518a] pl-6 md:pl-10 py-2' : ''}`}
              >
                {section.__component === 'sections.text-section' && (
                  <article className="max-w-4xl">
                    {(section as TextSection).heading && (
                      <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                        {(section as TextSection).heading}
                      </h2>
                    )}
                    <div className="text-slate-600 font-medium leading-[1.65] space-y-6 text-base md:text-lg text-justify">
                      <RichTextRenderer blocks={(section as TextSection).content} />
                    </div>
                    {((section as TextSection).image?.length ?? 0) > 0 && (
                      <div className="mt-10 md:mt-16 space-y-12">
                        {(section as TextSection).image?.map((img) => (
                          <div key={img.id} className="relative">
                            <StrategicImage
                              url={img.url}
                              width={img.width}
                              height={img.height}
                              alt={img.alternativeText || ""}
                              className="rounded-[2.5rem] shadow-2xl border-8 border-white"
                            />
                            <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_80px_rgba(255,255,255,0.1)] pointer-events-none" />
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                )}

                {section.__component === 'sections.steps-section' && (
                  <StepsSectionComponent section={section as StepSection} />
                )}

                {section.__component === 'sections.table-section' && (
                  <TableSectionComponent section={section as TableSection} />
                )}

                {section.__component === 'sections.list-section' && (
                  <div className="my-6 md:my-8 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-gradient-to-r from-slate-50 to-white px-4 md:px-8 py-4 border-b border-slate-200">
                      <h3 className="text-lg font-black text-slate-900 tracking-tight">
                        {(section as ListSection).title}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 divide-x divide-y divide-slate-100">
                      {(section as ListSection).items.map((item) => (
                        <div key={item.id} className="p-4 md:p-6 hover:bg-slate-50/60 transition-colors">
                          <div className="flex items-start gap-3 md:gap-4">
                            <span
                              className="w-5 h-5 rounded bg-[#00A8E8]/10 flex items-center justify-center shrink-0 mt-0.5"
                              aria-hidden="true"
                            >
                              <svg className="w-3 h-3 text-[#00A8E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <span className="text-slate-700 text-sm md:text-base font-bold leading-snug text-justify">
                              {item.items.replace(/^●\t|●\s+|•\s+/, '')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {(section as ListSection).image && (
                      <div className="p-4 md:p-6 border-t border-slate-100">
                        <StrategicImage
                          url={(section as ListSection).image!.url}
                          alt={(section as ListSection).title}
                          className="aspect-video rounded-xl shadow-md"
                        />
                      </div>
                    )}
                  </div>
                )}

                {section.__component === 'sections.faq-section' && (
                  <FAQSectionComponent section={section as FAQSection} />
                )}
              </motion.section>
            ))}

            {/* 📊 DOT-SEPARATED HORIZONTAL TAXONOMY BAR */}
            {(post.Category || (post.tags && post.tags.length > 0)) && (
              <div className="mt-16 pt-10 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                  {/* Left: Label with Icon */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <div className="w-7 h-7 rounded-lg bg-[#00A8E8]/10 flex items-center justify-center">
                      <TagIcon className="w-3.5 h-3.5 text-[#00A8E8]" />
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 whitespace-nowrap">Topic Taxonomy</h4>
                  </div>

                  {/* Dot Separator */}
                  <div className="hidden md:block w-1 h-1 rounded-full bg-slate-300" />

                  {/* Horizontal Tags with Dots */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    {post.Category && (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 px-2 py-1 bg-[#00A8E8]/5 rounded-md border border-[#00A8E8]/10 text-[9px] font-bold text-[#00A8E8] uppercase tracking-tight">
                          <TrendingUp className="w-2.5 h-2.5" />
                          {post.Category}
                        </div>
                        {(post.tags && post.tags.length > 0) && <div className="w-1 h-1 rounded-full bg-slate-200" />}
                      </div>
                    )}
                    
                    {post.tags && post.tags.length > 0 && post.tags.map((tag: any, idx: number, arr: any[]) => (
                      <div key={tag.id || idx} className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 hover:text-[#00A8E8] transition-colors group/tag cursor-default">
                          <TagIcon className="w-3 h-3 text-slate-300 group-hover/tag:text-[#00A8E8] transition-colors" />
                          <span className="text-[10px] font-bold text-slate-500 group-hover/tag:text-slate-900 transition-colors uppercase tracking-tight">
                            {tag.tags || tag.name || (typeof tag === 'string' ? tag : '')}
                          </span>
                        </div>
                        {idx < arr.length - 1 && <div className="w-1 h-1 rounded-full bg-slate-200" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 🚀 UNIFIED STRATEGIC DISCOVERY & FINAL CALL — IMMERSIVE */}
      <section className="relative overflow-hidden border-t border-slate-100 mt-24">
        {/* Universal Workspace Foundation */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/flat-lay-workspace-table-with-laptop-computer-office-supplies-coffee-cup-tablet-cell-phone-yellow-pastel-background.png"
            alt="BTL Strategic Foundation"
            fill
            className="object-cover opacity-100"
            priority
          />
          {/* Pro Max High-Contrast Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-white/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_100%)]" />
        </div>

        <div className="relative z-10">
          {/* 1. Recent Intelligence Grid */}
          {recentBlogs.length > 0 && (
            <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-16">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16">
                <div className="flex items-center gap-6">

                  <div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Also Read</h2>
                    <p className="text-[10px] md:text-xs font-black text-[#00A8E8] uppercase tracking-[0.4em] mt-3">Global Cross-Sector Strategic Index</p>
                  </div>
                </div>
                <Link href="/blogs" className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest hover:bg-[#00A8E8] hover:text-white hover:border-[#00A8E8] transition-all duration-300 shadow-sm">
                  Explore Full Archive
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {recentBlogs.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blogs/${rel.slug}`}
                    className="group block bg-white/60 backdrop-blur-xl border border-white p-2 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                  >
                    <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-6 border-4 border-white shadow-sm bg-slate-50">
                      <StrategicImage
                        url={rel.featured_images?.[0]?.url || rel.featured_image?.url || ""}
                        alt={rel.title}
                        className="w-full h-full"
                        contain={true}
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    <div className="px-6 pb-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-[#00A8E8]/10 text-[#00A8E8] text-[9px] font-black uppercase tracking-widest rounded-md">
                          {rel.Category || "Analysis"}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {format(parseISO(rel.Published || rel.publishedAt || rel.createdAt), 'MMM dd')}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#00A8E8] transition-colors leading-snug line-clamp-2 min-h-[3rem]">
                        {rel.title}
                      </h3>
                      {rel.expert ? (
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {rel.expert}
                        </p>
                      ) : rel.tags && rel.tags.length > 0 ? (
                        <p className="text-[10px] font-bold text-slate-400 line-clamp-2 leading-relaxed uppercase tracking-wider">
                          {rel.tags.map((t: any) => t.tags || t.name).join(' • ')}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 2. Final Footer CTA — High Fidelity */}

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          🎨 Global Styles — Mobile-First Responsive
      ───────────────────────────────────────────────────────────────────── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300..900&family=Instrument+Serif:ital@0;1&display=swap');

        .font-dm-sans {
          font-family: 'DM Sans', sans-serif !important;
        }

        html {
          scroll-behavior: smooth;
          font-size: 16px;
        }
        
        @media (max-width: 768px) {
          html {
            font-size: 15px;
          }
        }
        
        @media (max-width: 480px) {
          html {
            font-size: 14px;
          }
        }

        body {
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Scrollbar — Subtle & Modern */
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #00a8e8;
        }

        /* Hero zoom — GPU accelerated */
        .hero-zoom-bg {
          will-change: transform, opacity;
          transform-origin: center center;
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        /* Touch targets for mobile */
        @media (hover: none) and (pointer: coarse) {
          a, button {
            min-height: 44px;
            min-width: 44px;
          }
        }

        /* Prevent layout shift on image load */
        .strategic-image-container {
          contain: layout;
        }

        /* Smooth section transitions */
        .scroll-mt-24 {
          scroll-margin-top: 6rem;
        }
        @media (min-width: 1024px) {
          .scroll-mt-24 {
            scroll-margin-top: 8rem;
          }
        }
      `}</style>
    </article>
  )
}