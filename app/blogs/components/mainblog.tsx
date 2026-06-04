'use client'

import React, { useMemo, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { fetchBlogs, getStrapiMedia } from '@/app/lib/strapi'
import { Blog } from '../types/blog'

// ─────────────────────────────────────────
// 🎨 MNC Design System Tokens
// ─────────────────────────────────────────
const DESIGN_TOKENS = {
  colors: {
    primary: '#0A2540',      // Deep Navy
    primaryLight: '#1E3A5F', // Corporate Blue
    accent: '#00A8E8',       // Tech Cyan
    accentHover: '#0089C2',
    surface: '#FFFFFF',
    surfaceAlt: '#F8FAFC',
    border: '#E2E8F0',
    text: '#0F172A',
    textMuted: '#64748B',
    textLight: '#94A3B8',
    success: '#10B981',
    warning: '#F59E0B',
  },
  shadows: {
    soft: '0 4px 20px rgba(10, 37, 64, 0.04)',
    medium: '0 8px 40px rgba(10, 37, 64, 0.08)',
    elevated: '0 16px 80px rgba(10, 37, 64, 0.12)',
    glow: '0 0 0 1px rgba(0, 168, 232, 0.1), 0 8px 40px rgba(0, 168, 232, 0.15)',
  },
  radii: {
    sm: '0.75rem',
    md: '1.25rem',
    lg: '2rem',
    xl: '3rem',
    pill: '9999px',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '600ms cubic-bezier(0.16, 1, 0.3, 1)',
    elastic: '800ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
}

// ─────────────────────────────────────────
// 🧩 Type Definitions
// ─────────────────────────────────────────
interface FilterState {
  category: string | null
  search: string
  sortBy: 'newest' | 'oldest' | 'popular'
}

interface CategoryStats {
  name: string
  count: number
  trend?: 'up' | 'down' | 'stable'
}


// ─────────────────────────────────────────
// ✨ Premium UI Primitives
// ─────────────────────────────────────────

function PremiumBadge({
  children,
  variant = 'default',
  className = '',
  onClick
}: {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'accent' | 'outline'
  className?: string
  onClick?: () => void
}) {
  const variants = {
    default: 'bg-gray-100 text-gray-700 border-gray-200',
    primary: 'bg-[#0A2540] text-white border-[#0A2540]/20',
    accent: 'bg-[#00A8E8]/10 text-[#0089C2] border-[#00A8E8]/20',
    outline: 'bg-transparent text-gray-600 border-gray-300 hover:border-[#00A8E8] hover:text-[#00A8E8]',
  }

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider border rounded-full transition-all duration-200 ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

function SearchInput({
  value,
  onChange,
  placeholder = "Search insights...",
  className = ""
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
        <motion.svg
          className="h-5 w-5 text-gray-400 group-focus-within:text-[#00A8E8] transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </motion.svg>
      </div>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-14 pl-12 pr-5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/20 focus:border-[#00A8E8] transition-all duration-200 text-gray-900 placeholder-gray-400 font-medium"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

function SortDropdown({
  value,
  onChange
}: {
  value: FilterState['sortBy']
  onChange: (value: FilterState['sortBy']) => void
}) {
  const options: { value: FilterState['sortBy']; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Viewed' },
  ]

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as FilterState['sortBy'])}
        className="appearance-none w-full h-14 pl-5 pr-10 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/20 focus:border-[#00A8E8] transition-all duration-200 text-gray-900 font-medium cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// 🃏 Premium Blog Card Component
// ─────────────────────────────────────────
function BlogCardSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-3xl shadow-soft border border-gray-100 overflow-hidden">
      <div className="aspect-[16/10] bg-gray-100" />
      <div className="p-6 md:p-8 space-y-5">
        <div className="flex items-center gap-3">
          <div className="h-6 w-20 bg-gray-100 rounded-full" />
          <div className="h-4 w-24 bg-gray-100 rounded" />
        </div>
        <div className="h-7 bg-gray-100 rounded-lg w-3/4" />
        <div className="space-y-2.5">
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-5/6" />
          <div className="h-4 bg-gray-100 rounded w-4/6" />
        </div>
        <div className="pt-5 border-t border-gray-100 flex justify-between items-center">
          <div className="h-4 w-28 bg-gray-100 rounded" />
          <div className="h-10 w-10 bg-gray-100 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

function BlogCard({ post, index }: { post: Blog; index: number }) {
  const publishedDate = useMemo(() => {
    try {
      return format(parseISO(post.Published || post.publishedAt || post.createdAt), 'MMM dd, yyyy')
    } catch {
      return 'Recently Published'
    }
  }, [post.Published, post.publishedAt, post.createdAt])

  const featuredImage = useMemo(() => {
    if (post.featured_images?.[0]?.url) return getStrapiMedia(post.featured_images[0].url)
    if (post.featured_image?.url) return getStrapiMedia(post.featured_image.url)
    return null
  }, [post.featured_images, post.featured_image])

  const readTime = useMemo(() => {
    const words = post.expert?.split(' ').length || 150
    return Math.ceil(words / 200)
  }, [post.expert])

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col bg-white/80 backdrop-blur-xl rounded-[3rem] border border-gray-100 hover:border-[#00A8E8]/30 hover:shadow-2xl hover:shadow-[#0A2540]/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
    >
      <Link href={`/blogs/${post.slug}`} className="flex flex-col h-full p-2 md:p-3">
        {/* Image Section — Pro Max Frame */}
        <div className="relative aspect-video overflow-hidden rounded-[2.5rem] border-4 md:border-8 border-white shadow-lg bg-gray-50">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={post.title}
              fill
              unoptimized={true}
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          )}

          {/* Inner Glow Overlay */}
          <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_80px_rgba(255,255,255,0.15)] pointer-events-none" />

          <div className="absolute top-4 left-4 z-10">
            <PremiumBadge variant="accent" className="backdrop-blur-md bg-white/90 border-white/50 shadow-sm text-[#0A2540] font-black">
              {post.Category || 'Insights'}
            </PremiumBadge>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col p-6 md:p-8 flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold text-[#00A8E8] uppercase tracking-widest">{publishedDate}</span>
            <span className="w-1 h-1 rounded-full bg-gray-200" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{readTime} min read</span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#0A2540] transition-colors line-clamp-6 leading-tight tracking-tight">
            {post.title}
          </h3>

          <p className="text-gray-500 text-sm md:text-base leading-relaxed line-clamp-2 mb-6">
            {post.expert || (post.tags && post.tags.length > 0 ? post.tags.map((t: any) => t.tags || t.name).join(' • ') : "Exploring the convergence of emerging technologies and strategic infrastructure development.")}
          </p>

          <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
            {/* <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden">
                <span className="text-[10px] font-bold text-gray-400">{post.author?.name?.charAt(0) || 'B'}</span>
              </div>
              <span className="text-xs font-semibold text-gray-600">{post.author?.name || 'Editorial'}</span>
            </div> */}

            {/* <div className="flex items-center gap-2 text-[#0A2540] group/btn">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">Explore Analysis</span>
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#0A2540] group-hover:text-white transition-all duration-500 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div> */}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

// ─────────────────────────────────────────
// 📊 Category Filter with Analytics
// ─────────────────────────────────────────
function CategoryFilter({
  categories,
  activeCategory,
  onSelect,
  stats
}: {
  categories: string[]
  activeCategory: string | null
  onSelect: (category: string | null) => void
  stats?: Record<string, number>
}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect(null)}
        className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeCategory === null
          ? 'bg-[#0A2540] text-white shadow-medium'
          : 'bg-white text-gray-600 border border-gray-200 hover:border-[#00A8E8] hover:text-[#00A8E8]'
          }`}
      >
        All Insights
        {stats && <span className="ml-2 text-xs opacity-70">({Object.values(stats).reduce((a, b) => a + b, 0)})</span>}
      </motion.button>

      {categories.map((cat) => (
        <motion.button
          key={cat}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${activeCategory === cat
            ? 'bg-[#0A2540] text-white shadow-medium'
            : 'bg-white text-gray-600 border border-gray-200 hover:border-[#00A8E8] hover:text-[#00A8E8]'
            }`}
        >
          {cat}
          {stats?.[cat] !== undefined && (
            <span className={`text-xs ${activeCategory === cat ? 'text-white/80' : 'text-gray-400'}`}>
              ({stats[cat]})
            </span>
          )}
        </motion.button>
      ))}
    </div>
  )
}



// ─────────────────────────────────────────
// 🎯 Main Editorial Archive Component
// ─────────────────────────────────────────
function MainBlog() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    search: '',
    sortBy: 'newest'
  })
  const [displayCount, setDisplayCount] = useState(9)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 200], [0, 1])
  const headerBlur = useTransform(scrollY, [0, 200], [0, 16])

  // Load blogs data
  useEffect(() => {
    async function loadBlogs() {
      try {
        const response = await fetchBlogs()
        // Support both Strapi v4/v5 {data: [...]} and direct array responses
        const blogData = Array.isArray(response) ? response : (response.data || [])
        setBlogs(blogData)
      } catch (error) {
        console.error("Archive Load Error:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadBlogs()
  }, [])

  // Extract unique categories with counts
  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {}
    blogs.forEach((post) => {
      if (post.Category) {
        stats[post.Category] = (stats[post.Category] || 0) + 1
      }
    })
    return stats
  }, [blogs])

  const categories = useMemo(() => {
    return Object.keys(categoryStats).sort()
  }, [categoryStats])

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let result = blogs.filter((post) => {
      const matchesCategory = !filters.category || post.Category === filters.category
      const matchesSearch = !filters.search ||
        post.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        post.expert?.toLowerCase().includes(filters.search.toLowerCase())
      return matchesCategory && matchesSearch
    })

    // Apply sorting
    switch (filters.sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.Published || b.publishedAt || b.createdAt).getTime() - new Date(a.Published || a.publishedAt || a.createdAt).getTime())
        break
      case 'oldest':
        result.sort((a, b) => new Date(a.Published || a.publishedAt || a.createdAt).getTime() - new Date(b.Published || b.publishedAt || b.createdAt).getTime())
        break
      case 'popular':
        // Placeholder: sort by a hypothetical view count
        result.sort((a, b) => (b.views || 0) - (a.views || 0))
        break
    }

    return result
  }, [blogs, filters])

  // Handlers
  const handleCategorySelect = useCallback((category: string | null) => {
    setFilters(prev => ({ ...prev, category }))
  }, [])

  const handleSearchChange = useCallback((value: string) => {
    setFilters(prev => ({ ...prev, search: value }))
  }, [])

  const handleSortChange = useCallback((sortBy: FilterState['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }))
  }, [])

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true)
    // Simulated premium loading delay
    setTimeout(() => {
      setDisplayCount(prev => prev + 9)
      setIsLoadingMore(false)
    }, 800)
  }, [])


  const resetFilters = useCallback(() => {
    setFilters({ category: null, search: '', sortBy: 'newest' })
  }, [])

  return (
    <section className="min-h-screen bg-white py-20 md:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

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
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),transparent_100%)]" />
      </div>


      {/* Sticky Header with Scroll Effect */}


      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        {/* <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24 px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 mb-8 bg-white rounded-full border border-gray-200 shadow-soft"
          >
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6"
          >
            Strategic Insights for{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A2540] to-[#00A8E8]">Global Leaders</span>
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 2, ease: "easeInOut" }}
                className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-3 md:h-4 text-[#00A8E8]/20"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path d="M0 5 Q 25 2, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-500 font-normal leading-relaxed max-w-3xl mx-auto"
          >
            Deep-dive technical archives on enterprise architecture, integrated surveillance systems, and next-generation urban resilience frameworks.
          </motion.p>
        </div> */}

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-12 md:mb-16 px-4"
        >
          <div className="bg-white rounded-3xl shadow-soft border border-gray-100 p-4 md:p-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              {/* Category Filters */}
              <div className="flex-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                <CategoryFilter
                  categories={categories}
                  activeCategory={filters.category}
                  onSelect={handleCategorySelect}
                  stats={categoryStats}
                />
              </div>

              {/* Search & Sort */}
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="w-full sm:w-64">
                  <SearchInput
                    value={filters.search}
                    onChange={handleSearchChange}
                    placeholder="Search insights..."
                  />
                </div>
                <div className="w-full sm:w-48">
                  <SortDropdown
                    value={filters.sortBy}
                    onChange={handleSortChange}
                  />
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(filters.category || filters.search) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2"
              >
                <span className="text-sm text-gray-500">Active filters:</span>
                {filters.category && (
                  <PremiumBadge variant="outline" className="cursor-pointer" onClick={() => handleCategorySelect(null)}>
                    {filters.category} ×
                  </PremiumBadge>
                )}
                {filters.search && (
                  <PremiumBadge variant="outline" className="cursor-pointer" onClick={() => handleSearchChange('')}>
                    "{filters.search}" ×
                  </PremiumBadge>
                )}
                <button
                  onClick={resetFilters}
                  className="text-sm text-[#00A8E8] font-semibold hover:text-[#0089C2] transition-colors ml-auto"
                >
                  Clear all
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Results Grid with Featured Highlight */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${filters.category}-${filters.search}-${filters.sortBy}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-12 md:space-y-20"
          >
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {Array.from({ length: 9 }).map((_, i) => <BlogCardSkeleton key={`skeleton-${i}`} />)}
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                  {filteredPosts.slice(0, displayCount).map((post, index) => (
                    <BlogCard key={post.id || index} post={post} index={index} />
                  ))}
                  {isLoadingMore && Array.from({ length: 3 }).map((_, i) => (
                    <BlogCardSkeleton key={`loading-more-${i}`} />
                  ))}
                </div>
              </div>
            ) : null}

          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {!isLoading && filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32 md:py-48 bg-white rounded-[3rem] border border-gray-100 shadow-soft relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15]" />
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-10 rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-center shadow-inner">
                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">No Insights Found</h3>
              <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                We couldn't find any results matching your current filters. Try refining your search or explore all categories.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetFilters}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#0A2540] text-white font-bold rounded-2xl hover:bg-[#071d33] transition-all shadow-xl shadow-[#0A2540]/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Clear All Filters
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Load More / Pagination */}
        {!isLoading && filteredPosts.length > displayCount && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#0A2540] text-white font-bold rounded-2xl hover:bg-[#071d33] transition-all shadow-xl shadow-[#0A2540]/10 disabled:opacity-50"
            >
              {isLoadingMore ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing Database...
                </>
              ) : (
                <>
                  Load More Intelligence
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </>
              )}
            </button>
          </motion.div>
        )}


        {/* Footer CTA */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 md:mt-32 pt-12 border-t border-gray-100 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Stay Ahead of the Curve</h3>
          <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our executive briefing for curated insights delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your work email"
              className="flex-1 h-14 px-5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/20 focus:border-[#00A8E8] transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 h-14 bg-gradient-to-r from-[#0A2540] to-[#00A8E8] text-white font-semibold rounded-xl hover:shadow-glow transition-all"
            >
              Subscribe
            </motion.button>
          </div>
          <p className="mt-6 text-xs text-gray-400">
            By subscribing, you agree to our <Link href="/privacy" className="text-[#00A8E8] hover:underline">Privacy Policy</Link>
          </p>
        </motion.footer>
      </div>
    </section>
  )
}

export default MainBlog