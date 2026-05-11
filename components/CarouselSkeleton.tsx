"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import axios from "axios"
import Image from "next/image"
import { 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Calendar, 
  CheckCircle, 
  Clock, 
  RefreshCw,
  AlertCircle,
  Loader2
} from "lucide-react"

// ============ TYPES (Matching your Strapi API Response) ============
type ImageFormat = {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes: number
}

type ProjectImage = {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    large?: ImageFormat
    medium?: ImageFormat
    small?: ImageFormat
    thumbnail?: ImageFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: Record<string, any> | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

type SEO = {
  id: number
  metaTitle: string
  metaDescription: string
  canonicalUrl: string
  metaRobots: string
  ogTitle: string
  ogDescription: string
}

export type Project = {
  id: number
  documentId: string
  title: string
  description: string
  projectobjective: "ongoing" | "completed" | "archived" | string
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: ProjectImage
  seo: SEO
}

type ApiResponse = {
  data: Project[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// ============ CONFIG ============
const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "/cms-api"
const API_ENDPOINT = `${API_URL}/api/projects`

// ============ HELPERS ============
const getImageUrl = (image: ProjectImage, size: "large" | "medium" | "small" = "large"): string => {
  // Handle both relative and absolute URLs from Strapi
  const baseUrl = image.url.startsWith('http') ? '' : API_URL
  const url = image.formats[size]?.url || image.url
  return url.startsWith('http') ? url : `${baseUrl}${url}`
}

const formatDate = (dateString: string): string => {
  if (!dateString) return "N/A"
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch {
    return dateString
  }
}

const getStatusConfig = (status: string) => {
  switch (status?.toLowerCase()) {
    case "ongoing":
      return {
        label: "Ongoing",
        icon: Clock,
        color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
        dotColor: "bg-amber-500",
      }
    case "completed":
      return {
        label: "Completed",
        icon: CheckCircle,
        color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
        dotColor: "bg-emerald-500",
      }
    case "archived":
      return {
        label: "Archived",
        icon: Calendar,
        color: "bg-slate-500/10 text-slate-600 border-slate-500/20",
        dotColor: "bg-slate-500",
      }
    default:
      return {
        label: status || "Unknown",
        icon: Calendar,
        color: "bg-slate-500/10 text-slate-600 border-slate-500/20",
        dotColor: "bg-slate-500",
      }
  }
}

// ============ AXIOS INSTANCE ============
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
})

// ============ SKELETON COMPONENT ============
function CarouselSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-16 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 md:mb-12">
        <div>
          <div className="h-8 w-40 bg-muted rounded" />
          <div className="h-4 w-24 bg-muted rounded mt-2" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-64 bg-muted rounded-lg" />
          <div className="h-9 w-32 bg-muted rounded-lg" />
        </div>
      </div>

      {/* Image skeleton */}
      <div className="flex items-start gap-6 md:gap-10">
        <div className="hidden sm:block h-[120px] w-[100px] bg-muted rounded" />
        <div className="flex-1">
          <div className="relative aspect-video md:aspect-[21/9] w-full rounded-2xl bg-muted" />
          <div className="mt-6 space-y-3">
            <div className="h-8 w-3/4 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-2/3 bg-muted rounded" />
          </div>
        </div>
      </div>

      {/* Navigation skeleton */}
      <div className="mt-8 md:mt-12 flex items-center justify-between">
        <div className="flex gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-8 h-0.5 bg-muted rounded" />
          ))}
        </div>
        <div className="flex gap-1">
          <div className="w-10 h-10 bg-muted rounded-full" />
          <div className="w-10 h-10 bg-muted rounded-full" />
        </div>
      </div>
    </div>
  )
}

// ============ ERROR COMPONENT ============
function CarouselError({ 
  message, 
  onRetry 
}: { 
  message: string
  onRetry: () => void 
}) {
  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-24 text-center">
      <div className="inline-flex flex-col items-center gap-4 p-6 rounded-2xl bg-destructive/10 border border-destructive/20">
        <AlertCircle className="w-8 h-8 text-destructive" />
        <div>
          <h3 className="font-semibold text-foreground">Failed to load projects</h3>
          <p className="text-sm text-muted-foreground mt-1">{message}</p>
        </div>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  )
}

// ============ MAIN COMPONENT ============
export default function ProjectCarouselLive() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  
  const [active, setActive] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [filter, setFilter] = useState<"all" | "ongoing" | "completed" | "archived">("all")
  const [sortBy, setSortBy] = useState<"date-desc" | "date-asc" | "status">("status")
  
  const abortControllerRef = useRef<AbortController | null>(null)

  // ============ FETCH DATA ============
  const fetchProjects = useCallback(async (signal?: AbortSignal) => {
    try {
      setError(null)
      const response = await api.get<ApiResponse>("/api/projects", {
        params: {
          populate: "*",
          "pagination[pageSize]": 50,
          sort: "createdAt:desc"
        },
        signal
      })
      
      // Handle Strapi v4 response structure
      const projectsData = response.data.data || response.data
      setProjects(Array.isArray(projectsData) ? projectsData : [])
      setLoading(false)
    } catch (err: any) {
      if (axios.isCancel(err)) {
        console.log("Request cancelled")
        return
      }
      
      console.error("Failed to fetch projects:", err)
      
      // User-friendly error messages
      if (err.code === "ECONNABORTED") {
        setError("Request timed out. Please check your connection.")
      } else if (err.response?.status === 404) {
        setError("Projects endpoint not found. Check your API configuration.")
      } else if (err.response?.status === 403) {
        setError("Access denied. Please check API permissions.")
      } else if (err.response?.status >= 500) {
        setError("Server error. Please try again later.")
      } else {
        setError("Unable to connect to the server. Please check your network.")
      }
      setLoading(false)
    }
  }, [])

  // ============ EFFECT: Initial Fetch + Auto-retry ============
  useEffect(() => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    
    // Create new abort controller
    abortControllerRef.current = new AbortController()
    
    fetchProjects(abortControllerRef.current.signal)
    
    // Cleanup
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [fetchProjects, retryCount])

  // ============ FILTER & SORT LOGIC ============
  const filteredProjects = useMemo(() => {
    let result = [...projects]

    // Apply status filter
    if (filter !== "all") {
      result = result.filter((p) => p.projectobjective?.toLowerCase() === filter)
    }

    // Apply sorting
    if (sortBy === "status") {
      const statusPriority: Record<string, number> = { 
        ongoing: 0, 
        completed: 1, 
        archived: 2 
      }
      result.sort((a, b) => {
        const statusA = a.projectobjective?.toLowerCase() || ""
        const statusB = b.projectobjective?.toLowerCase() || ""
        const statusDiff = (statusPriority[statusA] ?? 99) - (statusPriority[statusB] ?? 99)
        if (statusDiff !== 0) return statusDiff
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      })
    } else if (sortBy === "date-desc") {
      result.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    } else if (sortBy === "date-asc") {
      result.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    }

    return result
  }, [projects, filter, sortBy])

  // Reset active index when filter/sort changes
  useEffect(() => {
    setActive(0)
  }, [filter, sortBy])

  // ============ CAROUSEL NAVIGATION ============
  const handleChange = useCallback((index: number) => {
    if (index === active || isTransitioning || filteredProjects.length === 0) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActive(index)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 400)
  }, [active, isTransitioning, filteredProjects.length])

  const handlePrev = useCallback(() => {
    if (filteredProjects.length === 0) return
    const newIndex = active === 0 ? filteredProjects.length - 1 : active - 1
    handleChange(newIndex)
  }, [active, handleChange, filteredProjects.length])

  const handleNext = useCallback(() => {
    if (filteredProjects.length === 0) return
    const newIndex = active === filteredProjects.length - 1 ? 0 : active + 1
    handleChange(newIndex)
  }, [active, handleChange, filteredProjects.length])

  const handleRetry = useCallback(() => {
    setLoading(true)
    setRetryCount(prev => prev + 1)
  }, [])

  // ============ KEYBOARD NAVIGATION ============
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }
      
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        handlePrev()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        handleNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handlePrev, handleNext])

  // ============ EMPTY / LOADING / ERROR STATES ============
  if (loading && retryCount === 0) {
    return <CarouselSkeleton />
  }

  if (error) {
    return <CarouselError message={error} onRetry={handleRetry} />
  }

  if (filteredProjects.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex flex-col items-center gap-3 p-6 rounded-2xl bg-muted/50">
          <Filter className="w-6 h-6 text-muted-foreground" />
          <div>
            <h3 className="font-medium text-foreground">No projects found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {filter !== "all" 
                ? `Try changing the filter or check back later for ${filter} projects.`
                : "Check your API connection or add projects in Strapi."
              }
            </p>
          </div>
          {filter !== "all" && (
            <button
              onClick={() => setFilter("all")}
              className="mt-2 text-sm text-foreground/70 hover:text-foreground underline"
            >
              Show all projects
            </button>
          )}
        </div>
      </div>
    )
  }

  const current = filteredProjects[active]
  const StatusIcon = getStatusConfig(current.projectobjective).icon

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-16">
      {/* ========== HEADER WITH FILTERS ========== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 md:mb-12">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Projects</h2>
            {loading && <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />}
          </div>
          <p className="text-muted-foreground mt-1">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {/* Status filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg">
            {(["all", "ongoing", "completed", "archived"] as const).map((status) => {
              const config = status !== "all" ? getStatusConfig(status) : null
              return (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  disabled={loading}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 disabled:opacity-50 ${
                    filter === status
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {status === "all" ? "All" : config?.label}
                </button>
              )
            })}
          </div>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            disabled={loading}
            className="px-3 py-1.5 rounded-md text-sm bg-muted/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 cursor-pointer disabled:opacity-50"
          >
            <option value="status">Sort: Status</option>
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
          </select>
        </div>
      </div>

      {/* ========== MAIN CAROUSEL ========== */}
      <div className="relative">
        {/* Large index number - editorial style */}
        <div className="flex items-start gap-6 md:gap-10">
          <span
            className="text-[80px] md:text-[120px] font-light leading-none text-foreground/10 select-none transition-all duration-500 hidden sm:block"
            style={{ fontFeatureSettings: '"tnum"' }}
          >
            {String(active + 1).padStart(2, "0")}
          </span>

          <div className="flex-1 pt-4 md:pt-6">
            {/* Large hero image with overlay */}
            <div
              className={`relative aspect-video md:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-muted transition-all duration-500 ${
                isTransitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
              }`}
            >
              <Image
                src={getImageUrl(current.image, "large")}
                alt={current.title || current.image.name || "Project image"}
                fill
                priority={active === 0}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                onError={(e) => {
                  // Fallback for broken images
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg"
                }}
              />
              
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              
              {/* Status badge */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusConfig(current.projectobjective).color}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${getStatusConfig(current.projectobjective).dotColor}`} />
                  <StatusIcon className="w-3 h-3" />
                  {getStatusConfig(current.projectobjective).label}
                </span>
              </div>

              {/* Date info */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-background/80 backdrop-blur-sm border border-border">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  {formatDate(current.startDate)}
                </span>
              </div>

              {/* Refresh indicator when loading new data */}
              {loading && retryCount > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                  <Loader2 className="w-8 h-8 animate-spin text-foreground" />
                </div>
              )}
            </div>

            {/* Content section */}
            <div className="mt-6 md:mt-8">
              {/* Title & Description */}
              <div
                className={`transition-all duration-300 ${
                  isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                }`}
              >
                <h3 className="text-2xl md:text-4xl font-semibold tracking-tight">{current.title}</h3>
                <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  {current.description || "No description available."}
                </p>
              </div>

              {/* Meta info row */}
              <div
                className={`mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground transition-all duration-300 delay-100 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatDate(current.startDate)} → {formatDate(current.endDate)}
                  </span>
                </div>
                {current.seo?.metaDescription && (
                  <>
                    <span className="hidden md:inline text-foreground/20">•</span>
                    <span className="max-w-md truncate">{current.seo.metaDescription}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ========== NAVIGATION CONTROLS ========== */}
        <div className="mt-8 md:mt-12 flex items-center justify-between">
          {/* Dots/Progress indicator - vertical line style */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {filteredProjects.map((project, index) => {
                const isActive = index === active
                const statusConfig = getStatusConfig(project.projectobjective)
                return (
                  <button
                    key={project.id}
                    onClick={() => handleChange(index)}
                    disabled={isTransitioning || loading}
                    className="group relative py-3 flex-shrink-0 disabled:opacity-50"
                    aria-label={`Go to project ${index + 1}: ${project.title}`}
                  >
                    {/* Line indicator */}
                    <span
                      className={`block h-0.5 transition-all duration-500 ease-out ${
                        isActive
                          ? "w-16 bg-foreground"
                          : "w-8 bg-foreground/20 group-hover:w-10 group-hover:bg-foreground/40"
                      }`}
                    />
                    {/* Status dot below line */}
                    <span
                      className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        isActive ? statusConfig.dotColor : "bg-foreground/20 group-hover:bg-foreground/40"
                      }`}
                    />
                  </button>
                )
              })}
            </div>
            <span className="text-xs text-muted-foreground tracking-widest uppercase hidden md:inline">
              {String(active + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}
            </span>
          </div>

          {/* Arrow buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              disabled={isTransitioning || loading || filteredProjects.length <= 1}
              className="p-2.5 md:p-3 rounded-full text-foreground/40 hover:text-foreground hover:bg-foreground/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={handleNext}
              disabled={isTransitioning || loading || filteredProjects.length <= 1}
              className="p-2.5 md:p-3 rounded-full text-foreground/40 hover:text-foreground hover:bg-foreground/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Mobile: Show current index */}
        <div className="mt-4 text-center md:hidden">
          <span className="text-xs text-muted-foreground tracking-widest uppercase">
            {String(active + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ========== THUMBNAIL STRIP (Desktop) ========== */}
      <div className="hidden lg:block mt-12 pt-8 border-t border-border/50">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-muted-foreground">All Projects</p>
          <button
            onClick={handleRetry}
            disabled={loading}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded">
          {filteredProjects.map((project, index) => {
            const isActive = index === active
            const statusConfig = getStatusConfig(project.projectobjective)
            return (
              <button
                key={project.id}
                onClick={() => handleChange(index)}
                disabled={isTransitioning || loading}
                className={`group flex-shrink-0 w-40 transition-all duration-300 disabled:opacity-50 ${
                  isActive ? "scale-105" : "hover:scale-[1.02] opacity-70 hover:opacity-100"
                }`}
              >
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={getImageUrl(project.image, "small")}
                    alt={project.title || project.image.name || "Project thumbnail"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="160px"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg"
                    }}
                  />
                  {/* Status indicator */}
                  <span
                    className={`absolute top-2 left-2 w-2 h-2 rounded-full ring-2 ring-background ${statusConfig.dotColor}`}
                  />
                  {/* Loading overlay for individual thumb */}
                  {loading && retryCount > 0 && (
                    <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm font-medium text-left truncate">{project.title}</p>
                <p className="text-xs text-muted-foreground">{formatDate(project.startDate)}</p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}