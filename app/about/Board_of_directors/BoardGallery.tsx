'use client';

import * as React from 'react';
import { NeonOrbs } from '../components/NeonOrbs';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface BoardMember {
    id: number;
    name: string;
    designation: string;
    bio: string;
    linkedin: string;
    photo: string;
}

interface ScrollState {
    currentY: number;
    targetY: number;
    isDragging: boolean;
    isSnapping: boolean;
    snapStart: {
        time: number;
        y: number;
        target: number;
    };
    lastScrollTime: number;
    dragStart: {
        y: number;
        scrollY: number;
    };
    projectHeight: number;
}

interface VisibleRange {
    min: number;
    max: number;
}

interface Config {
    SCROLL_SPEED: number;
    LERP_FACTOR: number;
    BUFFER_SIZE: number;
    MAX_VELOCITY: number;
    SNAP_DURATION: number;
}

// ============================================================================
// CONSTANTS & DATA
// ============================================================================

const CONFIG: Config = {
    SCROLL_SPEED: 0.75,
    LERP_FACTOR: 0.08,
    BUFFER_SIZE: 3,
    MAX_VELOCITY: 150,
    SNAP_DURATION: 600,
};

const BG_IMAGE =
    '/13312327_v748-toon-94.jpg';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const lerp = (start: number, end: number, factor: number): number =>
    start + (end - start) * factor;

// ============================================================================
// LINKEDIN ICON SVG
// ============================================================================

const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

// ============================================================================
// MODAL COMPONENT
// ============================================================================

interface MemberModalProps {
    member: BoardMember;
    memberNumber: string;
    onClose: () => void;
    onNavigate: (direction: 'prev' | 'next') => void;
    currentIndex: number;
    totalMembers: number;
}

const MemberModal: React.FC<MemberModalProps> = ({
    member,
    memberNumber,
    onClose,
    onNavigate,
    currentIndex,
    totalMembers,
}) => {
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(7,81,138,0.92)' }}
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8"
                style={{ backgroundColor: '#ffffff' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
                    style={{
                        backgroundColor: 'rgba(7,81,138,0.08)',
                        color: '#07518a',
                    }}
                    onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(7,81,138,0.18)')
                    }
                    onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(7,81,138,0.08)')
                    }
                    aria-label="Close modal"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Member number */}
                <div className="flex items-center gap-3 mb-4">
                    <span
                        className="text-4xl sm:text-5xl font-black tracking-tighter leading-none select-none"
                        style={{ color: '#07518a', opacity: 0.15 }}
                    >
                        {memberNumber}
                    </span>
                    <div
                        className="h-px flex-1 max-w-[80px]"
                        style={{ backgroundColor: '#07518a', opacity: 0.25 }}
                    />
                </div>

                {/* Name */}
                <h2
                    className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight mb-3"
                    style={{ color: '#07518a' }}
                >
                    {member.name}
                </h2>

                {/* Designation pill */}
                <div className="flex justify-start mb-5">
                    <span
                        className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full border"
                        style={{
                            color: '#07518a',
                            borderColor: 'rgba(7,81,138,0.25)',
                            backgroundColor: 'rgba(7,81,138,0.06)',
                        }}
                    >
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {member.designation}
                    </span>
                </div>

                {/* Divider */}
                <div
                    className="w-12 h-[2px] rounded-full mb-5"
                    style={{ backgroundColor: '#07518a', opacity: 0.35 }}
                />

                {/* Bio */}
                <p
                    className="text-sm sm:text-base leading-relaxed mb-7"
                    style={{ color: 'rgba(7,81,138,0.82)' }}
                >
                    {member.bio}
                </p>

                {/* LinkedIn CTA */}
                {member.linkedin ? (
                    <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 group"
                        style={{
                            color: '#ffffff',
                            backgroundColor: '#07518a',
                        }}
                        onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#05406e')
                        }
                        onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#07518a')
                        }
                    >
                        <LinkedInIcon className="w-4 h-4" />
                        <span>View LinkedIn Profile</span>
                        <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                ) : (
                    <span
                        className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full"
                        style={{
                            color: 'rgba(7,81,138,0.5)',
                            border: '1px dashed rgba(7,81,138,0.25)',
                        }}
                    >
                        LinkedIn not available
                    </span>
                )}

                {/* Navigation buttons */}
                <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: '1px solid rgba(7,81,138,0.1)' }}>
                    <button
                        onClick={() => onNavigate('prev')}
                        disabled={currentIndex === 0}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{
                            backgroundColor: currentIndex === 0 ? 'rgba(7,81,138,0.08)' : 'rgba(7,81,138,0.12)',
                            color: '#07518a',
                        }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm font-medium">Previous</span>
                    </button>

                    <span className="text-xs font-medium" style={{ color: 'rgba(7,81,138,0.5)' }}>
                        {currentIndex + 1} / {totalMembers}
                    </span>

                    <button
                        onClick={() => onNavigate('next')}
                        disabled={currentIndex === totalMembers - 1}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{
                            backgroundColor: currentIndex === totalMembers - 1 ? 'rgba(7,81,138,0.08)' : '#07518a',
                            color: currentIndex === totalMembers - 1 ? '#07518a' : '#ffffff',
                        }}
                    >
                        <span className="text-sm font-medium">Next</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

// ============================================================================
// MOBILE CARD COMPONENT
// ============================================================================

interface MobileCardProps {
    member: BoardMember;
    memberNumber: string;
    index: number;
    onClick: () => void;
}

const MobileCard: React.FC<MobileCardProps> = ({ member, memberNumber, index, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full text-left rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
            style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                border: '1px solid rgba(7,81,138,0.12)',
            }}
        >
            <div className="flex gap-4 p-4">
                {/* Thumbnail */}
                <div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0"
                    style={{
                        border: '2px solid rgba(7,81,138,0.15)',
                    }}
                >
                    <img
                        src={member.photo || undefined}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop';
                        }}
                    />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-center min-w-0">
                    <span
                        className="text-[10px] font-bold leading-none mb-1"
                        style={{ color: 'rgba(7,81,138,0.4)' }}
                    >
                        #{memberNumber}
                    </span>
                    <span
                        className="text-sm sm:text-base font-semibold leading-tight truncate"
                        style={{ color: '#07518a' }}
                    >
                        {member.name}
                    </span>
                    <span
                        className="text-[10px] sm:text-xs uppercase tracking-wide font-medium truncate mt-1"
                        style={{ color: 'rgba(7,81,138,0.5)' }}
                    >
                        {member.designation}
                    </span>
                </div>

                {/* Chevron */}
                <div className="flex items-center">
                    <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: 'rgba(7,81,138,0.4)' }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </button>
    );
};

// ============================================================================
// COMPONENT
// ============================================================================

export const BoardGallery: React.FC = () => {
    // ========================================================================
    // STATE
    // ========================================================================

    const [members, setMembers] = React.useState<BoardMember[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [baseUrl, setBaseUrl] = React.useState<string>("");

    const [visibleRange, setVisibleRange] = React.useState<VisibleRange>({
        min: 0,
        max: 0,
    });

    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
    const [isMounted, setIsMounted] = React.useState<boolean>(false);

    // Mobile modal state
    const [selectedMemberIndex, setSelectedMemberIndex] = React.useState<number | null>(null);
    const [activeIndex, setActiveIndex] = React.useState<number>(0);

    // ========================================================================
    // REFS
    // ========================================================================

    const membersRef = React.useRef<BoardMember[]>([]);
    const activeIndexRef = React.useRef<number>(0);
    const activeItemRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (activeItemRef.current) {
            activeItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [activeIndex]);

    const containerRef = React.useRef<HTMLDivElement | null>(null);

    const state = React.useRef<ScrollState>({
        currentY: 0,
        targetY: 0,
        isDragging: false,
        isSnapping: false,
        snapStart: { time: 0, y: 0, target: 0 },
        lastScrollTime: Date.now(),
        dragStart: { y: 0, scrollY: 0 },
        projectHeight:
            typeof window !== 'undefined'
                ? window.innerHeight - (window.innerWidth >= 768 ? 64 : 56)
                : 0,
    });

    const projectsRef = React.useRef<Map<number, HTMLLIElement>>(new Map());
    const requestRef = React.useRef<number | undefined>(undefined);
    const renderedRange = React.useRef<VisibleRange>({
        min: 0,
        max: 0,
    });

    // ========================================================================
    // DYNAMIC DATA HELPERS
    // ========================================================================

    const getMemberData = (index: number): BoardMember => {
        const list = membersRef.current;
        if (list.length === 0) return { id: 0, name: '', designation: '', bio: '', linkedin: '', photo: '' };
        const normalizedIndex = ((index % list.length) + list.length) % list.length;
        return list[normalizedIndex];
    };

    const getMemberNumber = (index: number): string => {
        const list = membersRef.current;
        if (list.length === 0) return '01';
        const normalizedIndex = ((index % list.length) + list.length) % list.length;
        return (normalizedIndex + 1).toString().padStart(2, '0');
    };

    // ========================================================================
    // ANIMATION FUNCTIONS
    // ========================================================================

    const updateParallax = (
        img: HTMLImageElement | null,
        scroll: number,
        index: number,
        height: number
    ): void => {
        if (!img) return;

        if (!img.dataset.parallaxCurrent) {
            img.dataset.parallaxCurrent = '0';
        }

        let current: number = parseFloat(img.dataset.parallaxCurrent || '0');
        const target: number = (-scroll - index * height) * 0.2;
        current = lerp(current, target, 0.12);

        if (Math.abs(current - target) > 0.01) {
            img.style.transform = `translateY(${current}px)`;
            img.dataset.parallaxCurrent = current.toString();
        }
    };

    const updateSnap = (): void => {
        const s = state.current;
        const progress: number = Math.min(
            (Date.now() - s.snapStart.time) / CONFIG.SNAP_DURATION,
            1
        );
        const eased: number = 1 - Math.pow(1 - progress, 3);
        s.targetY = s.snapStart.y + (s.snapStart.target - s.snapStart.y) * eased;
        if (progress >= 1) s.isSnapping = false;
    };

    const snapToProject = (): void => {
        const s = state.current;
        const list = membersRef.current;
        if (list.length === 0) return;
        const maxIndex = list.length - 1;
        const rawIndex = Math.round(-s.targetY / s.projectHeight);
        // Clamp index between 0 and maxIndex (no infinite scroll)
        const currentIndex = Math.max(0, Math.min(rawIndex, maxIndex));
        const target: number = -currentIndex * s.projectHeight;

        // Only snap if we're not already at the target
        if (Math.abs(s.targetY - target) > 1) {
            s.isSnapping = true;
            s.snapStart = {
                time: Date.now(),
                y: s.targetY,
                target,
            };
        }
    };

    const updatePositions = (): void => {
        const s = state.current;
        const list = membersRef.current;
        if (list.length === 0) return;

        projectsRef.current.forEach((el, index) => {
            const y: number = index * s.projectHeight + s.currentY;
            el.style.transform = `translateY(${y}px)`;
            const img = el.querySelector(
                '.parallax-image'
            ) as HTMLImageElement | null;
            updateParallax(img, s.currentY, index, s.projectHeight);
        });
    };

    const animate = (): void => {
        const s = state.current;
        const now: number = Date.now();
        const list = membersRef.current;
        if (list.length === 0) return;
        const maxIndex = list.length - 1;

        // Auto-snap to nearest project when not interacting
        if (!s.isSnapping && !s.isDragging && now - s.lastScrollTime > 100) {
            const rawIndex = Math.round(-s.targetY / s.projectHeight);
            const clampedIndex = Math.max(0, Math.min(rawIndex, maxIndex));
            const snapPoint: number = -clampedIndex * s.projectHeight;
            if (Math.abs(s.targetY - snapPoint) > 1) snapToProject();
        }

        if (s.isSnapping) updateSnap();

        if (!s.isDragging) {
            s.currentY += (s.targetY - s.currentY) * CONFIG.LERP_FACTOR;
        }

        updatePositions();
    };

    const animationLoop = (): void => {
        animate();

        const s = state.current;
        const list = membersRef.current;
        if (list.length === 0) {
            requestRef.current = requestAnimationFrame(animationLoop);
            return;
        }
        const maxIndex = list.length - 1;
        const rawIndex = Math.round(-s.targetY / s.projectHeight);
        const currentIndex = Math.max(0, Math.min(rawIndex, maxIndex));

        const rawActiveIndex = Math.round(-s.currentY / s.projectHeight);
        const computedActiveIndex = Math.max(0, Math.min(rawActiveIndex, maxIndex));
        if (computedActiveIndex !== activeIndexRef.current) {
            activeIndexRef.current = computedActiveIndex;
            setActiveIndex(computedActiveIndex);
        }

        const min: number = Math.max(0, currentIndex - CONFIG.BUFFER_SIZE);
        const max: number = Math.min(maxIndex, currentIndex + CONFIG.BUFFER_SIZE);

        if (
            min !== renderedRange.current.min ||
            max !== renderedRange.current.max
        ) {
            renderedRange.current = { min, max };
            setVisibleRange({ min, max });
        }

        requestRef.current = requestAnimationFrame(animationLoop);
    };

    // ========================================================================
    // EVENT HANDLERS
    // ========================================================================

    const handleWheel = React.useCallback((e: WheelEvent): void => {
        e.preventDefault();
        const s = state.current;
        const list = membersRef.current;
        if (list.length === 0) return;
        const maxIndex = list.length - 1;

        s.isSnapping = false;
        s.lastScrollTime = Date.now();

        const delta: number = Math.max(
            Math.min(e.deltaY * CONFIG.SCROLL_SPEED, CONFIG.MAX_VELOCITY),
            -CONFIG.MAX_VELOCITY
        );

        // Calculate new target with bounds checking
        const newTarget = s.targetY - delta;
        const minScroll = 0;
        const maxScroll = -maxIndex * s.projectHeight;

        s.targetY = Math.max(maxScroll, Math.min(minScroll, newTarget));
    }, []);

    const handleTouchStart = React.useCallback((e: TouchEvent): void => {
        const s = state.current;
        s.isDragging = true;
        s.isSnapping = false;
        s.dragStart = { y: e.touches[0].clientY, scrollY: s.targetY };
        s.lastScrollTime = Date.now();
    }, []);

    const handleTouchMove = React.useCallback((e: TouchEvent): void => {
        const s = state.current;
        const list = membersRef.current;
        if (list.length === 0) return;
        const maxIndex = list.length - 1;

        if (!s.isDragging) return;

        const deltaY = e.touches[0].clientY - s.dragStart.y;
        const newTarget = s.dragStart.scrollY + deltaY * 1.5;

        // Apply bounds
        const minScroll = 0;
        const maxScroll = -maxIndex * s.projectHeight;
        s.targetY = Math.max(maxScroll, Math.min(minScroll, newTarget));

        s.lastScrollTime = Date.now();
    }, []);

    const handleTouchEnd = React.useCallback((): void => {
        state.current.isDragging = false;
    }, []);

    const handleResize = React.useCallback((): void => {
        const s = state.current;
        const list = membersRef.current;
        if (list.length === 0) return;
        const maxIndex = list.length - 1;
        const oldHeight = s.projectHeight;
        const newHeight = window.innerHeight - (window.innerWidth >= 768 ? 64 : 56);

        // Calculate current index based on old height
        const rawIndex = Math.round(-s.targetY / oldHeight);
        const currentIndex = Math.max(0, Math.min(rawIndex, maxIndex));

        s.projectHeight = newHeight;

        // Recalculate target position with new height
        const newTargetY = -currentIndex * newHeight;
        s.targetY = newTargetY;
        s.currentY = newTargetY;

        updatePositions();
    }, []);

    // ========================================================================
    // EFFECTS
    // ========================================================================

    React.useEffect(() => {
        const loadMembers = async () => {
            try {
                setLoading(true);
                setError(null);

                const endpoints = [
                    { url: "/strapi/api/leadership-members?populate=*", base: "/strapi" },
                    { url: "http://183.82.117.36:2334/api/leadership-members?populate=*", base: "http://183.82.117.36:2334" },
                    { url: "http://172.30.0.200:1334/api/leadership-members?populate=*", base: "http://172.30.0.200:1334" },
                ];

                let data = null;
                let fetchedBaseUrl = "";

                for (const ep of endpoints) {
                    try {
                        const res = await fetch(ep.url);
                        if (res.ok) {
                            data = await res.json();
                            if (data && data.data && data.data.length > 0) {
                                fetchedBaseUrl = ep.base;
                                break;
                            }
                        }
                    } catch (e) {
                        console.error(`Failed to fetch from ${ep.url}:`, e);
                    }
                }

                if (!data || !data.data || data.data.length === 0) {
                    throw new Error("No leadership members data found.");
                }

                setBaseUrl(fetchedBaseUrl);

                const rawMembers = data.data.map((item: any) => {
                    const attrs = item.attributes || item;

                    const photoData = attrs.photo;
                    const firstPhoto = Array.isArray(photoData) ? photoData[0] : photoData;
                    let photoUrl = "";
                    if (firstPhoto) {
                        const url = firstPhoto.url || (firstPhoto.attributes && firstPhoto.attributes.url) || "";
                        if (url.startsWith("http")) {
                            photoUrl = url;
                        } else {
                            photoUrl = `${fetchedBaseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
                        }
                    }

                    const name = (attrs.name || "").trim();
                    const designation = (attrs.designation || "").trim();
                    const bio = (attrs.bio || "").trim();
                    let linkedin = (attrs.linkedin || "").trim();

                    if (linkedin.toLowerCase() === "gg" || !linkedin.startsWith("http")) {
                        if (linkedin.toLowerCase() === "gg" || linkedin === "") {
                            linkedin = "";
                        } else {
                            linkedin = `https://www.linkedin.com/in/${linkedin}`;
                        }
                    }

                    return {
                        id: item.id || attrs.id,
                        name,
                        designation,
                        bio,
                        linkedin,
                        photo: photoUrl,
                        order: typeof attrs.order === 'number' ? attrs.order : 99,
                    };
                });

                rawMembers.sort((a: any, b: any) => a.order - b.order);

                setMembers(rawMembers);
                membersRef.current = rawMembers;

                setVisibleRange({
                    min: 0,
                    max: Math.min(CONFIG.BUFFER_SIZE, rawMembers.length - 1),
                });

            } catch (err: any) {
                setError(err.message || "Failed to load board directory.");
            } finally {
                setLoading(false);
            }
        };

        loadMembers();
    }, []);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    React.useEffect(() => {
        if (!isMounted || loading || error || members.length === 0) return;
        const container = containerRef.current;
        if (!container) return;

        const offset = window.innerWidth >= 768 ? 64 : 56;
        state.current.projectHeight = window.innerHeight - offset;

        container.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchmove', handleTouchMove);
        container.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('resize', handleResize);

        handleResize();
        requestRef.current = requestAnimationFrame(animationLoop);

        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('resize', handleResize);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isMounted, loading, error, members.length, handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd, handleResize]);

    // ========================================================================
    // DERIVED VALUES
    // ========================================================================

    const indices: number[] = [];
    for (let i = visibleRange.min; i <= visibleRange.max; i++) {
        indices.push(i);
    }

    const maxIndex = members.length > 0 ? members.length - 1 : 0;
    const rawCurrentIndex = Math.round(
        -state.current.targetY / state.current.projectHeight
    );
    const currentIndex: number = Math.max(0, Math.min(rawCurrentIndex, maxIndex));

    const activeMemberIndex: number = currentIndex;
    const progressPercentage: number =
        members.length > 0 ? ((activeMemberIndex + 1) / members.length) * 100 : 0;

    const navigateTo = (targetIndex: number): void => {
        const s = state.current;
        if (members.length === 0) return;
        // Clamp target index
        const clampedIndex = Math.max(0, Math.min(targetIndex, members.length - 1));

        s.isSnapping = true;
        s.snapStart = {
            time: Date.now(),
            y: s.targetY,
            target: -clampedIndex * s.projectHeight,
        };
        s.targetY = -clampedIndex * s.projectHeight;
    };

    const navigatePrev = (): void => {
        if (currentIndex > 0) navigateTo(currentIndex - 1);
    };

    const navigateNext = (): void => {
        if (members.length > 0 && currentIndex < members.length - 1) navigateTo(currentIndex + 1);
    };

    // Modal navigation handlers
    const openMemberModal = (index: number) => {
        if (members.length === 0) return;
        const clampedIndex = Math.max(0, Math.min(index, members.length - 1));
        setSelectedMemberIndex(clampedIndex);
    };

    const closeMemberModal = () => {
        setSelectedMemberIndex(null);
    };

    const navigateModal = (direction: 'prev' | 'next') => {
        if (selectedMemberIndex === null || members.length === 0) return;

        if (direction === 'prev' && selectedMemberIndex > 0) {
            setSelectedMemberIndex(selectedMemberIndex - 1);
        } else if (direction === 'next' && selectedMemberIndex < members.length - 1) {
            setSelectedMemberIndex(selectedMemberIndex + 1);
        }
    };

    if (loading) {
        return (
            <div
                className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden"
                style={{
                    backgroundImage: `url(${BG_IMAGE})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    fontFamily: "'Segoe UI', system-ui, sans-serif"
                }}
            >
                {/* Background overlay */}
                <div className="absolute inset-0 bg-white/88 backdrop-blur-[3px] z-0" />

                <div className="relative z-10 flex flex-col items-center gap-4">
                    {/* Pulsing ring spinner */}
                    <div className="w-16 h-16 rounded-full border-4 border-[#07518a]/10 border-t-[#07518a] animate-spin" />
                    <h3 className="text-lg font-semibold tracking-tight animate-pulse" style={{ color: '#07518a' }}>
                        Loading Board Directory...
                    </h3>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="w-full h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden text-center"
                style={{
                    backgroundImage: `url(${BG_IMAGE})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    fontFamily: "'Segoe UI', system-ui, sans-serif"
                }}
            >
                {/* Background overlay */}
                <div className="absolute inset-0 bg-white/88 backdrop-blur-[3px] z-0" />

                <div className="relative z-10 max-w-md p-8 rounded-2xl bg-white/80 backdrop-blur border border-red-200/50 shadow-xl flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: '#07518a' }}>
                        Failed to Load Directory
                    </h3>
                    <p className="text-sm text-red-700/80 leading-relaxed">
                        {error}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-2 px-6 py-2.5 rounded-full text-white font-semibold text-sm transition-all hover:scale-105"
                        style={{ backgroundColor: '#07518a' }}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!isMounted || members.length === 0) return null;

    return (
        <div
            ref={containerRef}
            className="w-full h-[calc(100vh-56px)] md:h-[calc(100vh-64px)] flex overflow-hidden relative"
            style={{ backgroundColor: '#ffffff', fontFamily: "'Segoe UI', system-ui, sans-serif" }}
        >

            {/* ── MINIMAP SIDEBAR (desktop only) ───────────────────────────────── */}
            <aside
                className="hidden lg:flex w-80 xl:w-96 flex-col overflow-hidden z-20"
                style={{
                    backgroundColor: 'rgba(255,255,255,0.97)',
                    backdropFilter: 'blur(8px)',
                    borderRight: '1px solid rgba(7,81,138,0.12)',
                }}
            >
                {/* Header */}
                <div
                    className="px-6 py-5"
                    style={{ borderBottom: '1px solid rgba(7,81,138,0.1)' }}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <div
                            className="w-1.5 h-5 rounded-full"
                            style={{ backgroundColor: '#07518a' }}
                        />
                        <h3
                            className="text-xs font-bold tracking-widest uppercase"
                            style={{ color: '#07518a' }}
                        >
                            Board Directory
                        </h3>
                    </div>
                    <p className="text-[10px] tracking-wide font-medium pl-3.5" style={{ color: 'rgba(7,81,138,0.5)' }}>
                        Leadership · Governance · Vision
                    </p>
                </div>

                {/* Scrollable member list */}
                <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .custom-scrollbar::-webkit-scrollbar {
                            width: 5px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb {
                            background: rgba(7,81,138,0.15);
                            border-radius: 10px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: rgba(7,81,138,0.3);
                        }
                    `}} />
                    <div className="flex flex-col">
                        {members.map((member, i) => {
                            const isActive = i === activeIndex;
                            const isHovered = hoveredIndex === i;

                            return (
                                <div
                                    key={member.id}
                                    ref={isActive ? activeItemRef : null}
                                    className="w-full h-24 flex gap-3 items-center cursor-pointer transition-colors duration-200"
                                    style={{
                                        padding: '0 20px',
                                        borderBottom: '1px solid rgba(7,81,138,0.07)',
                                        borderRight: isActive ? '3px solid #07518a' : '3px solid transparent',
                                        backgroundColor: isActive
                                            ? 'rgba(7,81,138,0.06)'
                                            : isHovered
                                                ? 'rgba(7,81,138,0.03)'
                                                : 'transparent',
                                        paddingRight: isActive ? '17px' : '20px',
                                    }}
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onClick={() => navigateTo(i)}
                                >
                                    {/* Thumbnail */}
                                    <div
                                        className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0"
                                        style={{
                                            border: isActive
                                                ? '2px solid rgba(7,81,138,0.4)'
                                                : '2px solid rgba(7,81,138,0.1)',
                                            boxShadow: isActive
                                                ? '0 4px 12px rgba(7,81,138,0.15)'
                                                : 'none',
                                        }}
                                    >
                                        <img
                                            src={member.photo || undefined}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src =
                                                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop';
                                            }}
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 flex flex-col gap-1 min-w-0">
                                        <span
                                            className="text-[11px] font-bold leading-none"
                                            style={{ color: 'rgba(7,81,138,0.4)' }}
                                        >
                                            {(i + 1).toString().padStart(2, '0')}
                                        </span>
                                        <span
                                            className="text-[12px] font-semibold leading-tight truncate"
                                            style={{ color: '#07518a' }}
                                        >
                                            {member.name}
                                        </span>
                                        <span
                                            className="text-[9px] uppercase tracking-wide font-medium truncate"
                                            style={{ color: 'rgba(7,81,138,0.5)' }}
                                        >
                                            {member.designation}
                                        </span>
                                    </div>

                                    {/* Active indicator chevron */}
                                    {isActive && (
                                        <svg
                                            className="w-3 h-3 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            style={{ color: '#07518a' }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Progress footer */}
                <div
                    className="px-6 py-5"
                    style={{ borderTop: '1px solid rgba(7,81,138,0.1)' }}
                >
                    <div className="flex items-center justify-between mb-2.5">
                        <span
                            className="text-[10px] uppercase tracking-widest font-semibold"
                            style={{ color: 'rgba(7,81,138,0.5)' }}
                        >
                            Progress
                        </span>
                        <span
                            className="text-[11px] font-bold tabular-nums"
                            style={{ color: '#07518a' }}
                        >
                            {activeMemberIndex + 1}
                            <span style={{ color: 'rgba(7,81,138,0.4)' }}> / {members.length}</span>
                        </span>
                    </div>
                    <div
                        className="h-1.5 rounded-full overflow-hidden"
                        style={{ backgroundColor: 'rgba(7,81,138,0.1)' }}
                    >
                        <div
                            className="h-full rounded-full transition-all duration-500 ease-out"
                            style={{
                                width: `${progressPercentage}%`,
                                backgroundColor: '#07518a',
                            }}
                        />
                    </div>

                    {/* Member name below progress */}
                    <p
                        className="text-[10px] font-medium mt-2 truncate"
                        style={{ color: 'rgba(7,81,138,0.55)' }}
                    >
                        {members[activeMemberIndex]?.name}
                    </p>
                </div>
            </aside>

            {/* ── DESKTOP VIEW (lg and up) ─────────────────────────────────── */}
            <div 
                className="hidden lg:flex flex-1 h-full overflow-hidden relative z-10 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${BG_IMAGE})` }}
            >
                {/* Background overlay for right side only */}
                <div className="absolute inset-0 bg-white/88 backdrop-blur-[2px] z-0" />
                <ul className="relative h-full w-full z-10">
                    {indices.map((i) => {
                        const data = getMemberData(i);
                        const num = getMemberNumber(i);
                        const isActive = i === currentIndex;

                        return (
                            <li
                                key={i}
                                className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing will-change-transform"
                                ref={(el) => {
                                    if (el) projectsRef.current.set(i, el);
                                    else projectsRef.current.delete(i);
                                }}
                            >
                                <div className="relative w-full max-w-[1550px] mx-auto px-8 sm:px-12 lg:px-20 h-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

                                    {/* ── TEXT CONTENT ──────────────────────────────────── */}
                                    <div className="flex-1 z-10 max-w-3xl lg:max-w-4xl text-center lg:text-left">

                                        {/* Member number */}
                                        <div className="flex items-center gap-3 justify-center lg:justify-start mb-2">
                                            <span
                                                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-none select-none"
                                                style={{ color: '#07518a', opacity: 0.15 }}
                                            >
                                                {num}
                                            </span>
                                            <div
                                                className="h-px flex-1 max-w-[50px]"
                                                style={{ backgroundColor: '#07518a', opacity: 0.25 }}
                                            />
                                        </div>

                                        {/* Name */}
                                        <h2
                                            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-2"
                                            style={{ color: '#07518a' }}
                                        >
                                            {data.name}
                                        </h2>

                                        {/* Designation pill */}
                                        <div className="flex justify-center lg:justify-start mb-4">
                                            <span
                                                className="inline-flex items-center gap-2 text-[11px] md:text-xs uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full border"
                                                style={{
                                                    color: '#07518a',
                                                    borderColor: 'rgba(7,81,138,0.25)',
                                                    backgroundColor: 'rgba(7,81,138,0.06)',
                                                }}
                                            >
                                                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                {data.designation}
                                            </span>
                                        </div>

                                        {/* Divider */}
                                        <div
                                            className="w-12 h-[2px] rounded-full mx-auto lg:mx-0 mb-4"
                                            style={{ backgroundColor: '#07518a', opacity: 0.35 }}
                                        />

                                        {/* Bio */}
                                        <p
                                            className="text-sm sm:text-base lg:text-[15px] xl:text-[16px] leading-relaxed max-w-3xl mx-auto lg:mx-0 mb-6"
                                            style={{ color: 'rgba(7,81,138,0.82)' }}
                                        >
                                            {data.bio}
                                        </p>

                                        {/* LinkedIn CTA */}
                                        {data.linkedin ? (
                                            <a
                                                href={data.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2.5 font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 group self-center lg:self-start"
                                                style={{
                                                    color: '#ffffff',
                                                    backgroundColor: '#07518a',
                                                }}
                                                onMouseEnter={(e) =>
                                                    ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#05406e')
                                                }
                                                onMouseLeave={(e) =>
                                                    ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#07518a')
                                                }
                                            >
                                                <LinkedInIcon className="w-4 h-4" />
                                                <span>View LinkedIn Profile</span>
                                                <svg
                                                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </a>
                                        ) : (
                                            <span
                                                className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full"
                                                style={{
                                                    color: 'rgba(7,81,138,0.5)',
                                                    border: '1px dashed rgba(7,81,138,0.25)',
                                                }}
                                            >
                                                LinkedIn not available
                                            </span>
                                        )}
                                    </div>

                                    {/* ── PHOTO ────────────────────────────────────────── */}
                                    <div className="relative flex-shrink-0 select-none">
                                        {/* Decorative ring */}
                                        <div
                                            className="absolute -inset-3 rounded-3xl opacity-20"
                                            style={{
                                                background:
                                                    'radial-gradient(circle at 30% 30%, #07518a, transparent 70%)',
                                            }}
                                        />
                                        <div
                                            className="relative w-44 h-52 sm:w-56 sm:h-64 md:w-64 md:h-80 lg:w-80 lg:h-[24rem] xl:w-96 xl:h-[28rem] rounded-3xl overflow-hidden shadow-2xl"
                                            style={{
                                                boxShadow:
                                                    '0 25px 60px rgba(7,81,138,0.2), 0 10px 25px rgba(0,0,0,0.1)',
                                            }}
                                        >
                                            <img
                                                src={data.photo || undefined}
                                                alt={data.name}
                                                className="parallax-image w-full h-full object-cover will-change-transform"
                                                loading="lazy"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src =
                                                        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2000&auto=format&fit=crop';
                                                }}
                                            />
                                            {/* Subtle gradient overlay on image bottom */}
                                            <div
                                                className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                                                style={{
                                                    background:
                                                        'linear-gradient(to top, rgba(7,81,138,0.15), transparent)',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* ── KEYBOARD NAV HINT (first slide only) ─────────── */}
                                {isActive && i === 0 && (
                                    <div
                                        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-widest font-medium animate-bounce"
                                        style={{ color: 'rgba(7,81,138,0.5)' }}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                        Scroll to explore
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>

                {/* ── ARROW NAV (desktop, right edge) ─────────────────────── */}
                <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-30">
                    <button
                        onClick={navigatePrev}
                        disabled={currentIndex === 0}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{
                            backgroundColor: 'rgba(7,81,138,0.08)',
                            color: '#07518a',
                            border: '1px solid rgba(7,81,138,0.2)',
                        }}
                        onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(7,81,138,0.18)')
                        }
                        onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(7,81,138,0.08)')
                        }
                        aria-label="Previous member"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                    <button
                        onClick={navigateNext}
                        disabled={currentIndex === members.length - 1}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{
                            backgroundColor: 'rgba(7,81,138,0.08)',
                            color: '#07518a',
                            border: '1px solid rgba(7,81,138,0.2)',
                        }}
                        onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(7,81,138,0.18)')
                        }
                        onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(7,81,138,0.08)')
                        }
                        aria-label="Next member"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {/* ── DOT INDICATORS (desktop bottom-right) ───────────────── */}
                <div className="hidden lg:flex absolute bottom-6 right-6 gap-2 z-30">
                    {members.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => navigateTo(idx)}
                            className="rounded-full transition-all duration-300"
                            style={{
                                width: idx === activeMemberIndex ? '24px' : '8px',
                                height: '8px',
                                backgroundColor:
                                    idx === activeMemberIndex
                                        ? '#07518a'
                                        : 'rgba(7,81,138,0.25)',
                            }}
                            aria-label={`Go to ${members[idx]?.name}`}
                        />
                    ))}
                </div>
            </div>


            {/* ── MOBILE/TABLET VIEW (below lg) ────────────────────────────────── */}
            <div
                className="lg:hidden flex-1 h-full overflow-y-auto relative z-10 p-4 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${BG_IMAGE})` }}
            >
                {/* Background overlay for mobile view */}
                <div className="absolute inset-0 bg-white/92 backdrop-blur-[2px] z-0" />

                <div className="relative z-10 w-full">
                    {/* Header */}
                    <div className="mb-6 text-center">
                        <h2
                            className="text-xl font-bold tracking-tight mb-1"
                            style={{ color: '#07518a' }}
                        >
                            Board of Directors
                        </h2>
                        <p className="text-xs" style={{ color: 'rgba(7,81,138,0.6)' }}>
                            Tap a card to view details
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-24">
                        {members.map((member, index) => (
                            <MobileCard
                                key={member.id}
                                member={member}
                                memberNumber={(index + 1).toString().padStart(2, '0')}
                                index={index}
                                onClick={() => openMemberModal(index)}
                            />
                        ))}
                    </div>

                    {/* Progress indicator */}
                    <div className="fixed bottom-20 inset-x-4 z-10">
                        <div
                            className="h-1.5 rounded-full overflow-hidden"
                            style={{ backgroundColor: 'rgba(7,81,138,0.12)' }}
                        >
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                    width: `${progressPercentage}%`,
                                    backgroundColor: '#07518a',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MOBILE BOTTOM NAV (for desktop-style scroll on tablet) ───────── */}
            <div className="lg:hidden absolute bottom-0 inset-x-0 z-20">
                <div
                    className="flex items-center justify-between px-5 py-3"
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.97)',
                        borderTop: '1px solid rgba(7,81,138,0.12)',
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    {/* Prev button */}
                    <button
                        onClick={navigatePrev}
                        disabled={currentIndex === 0}
                        className="w-9 h-9 rounded-full flex items-center justify-center disabled:opacity-40"
                        style={{
                            backgroundColor: 'rgba(7,81,138,0.08)',
                            color: '#07518a',
                        }}
                        aria-label="Previous member"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Progress */}
                    <div className="flex flex-col items-center gap-1.5 flex-1 px-4">
                        <div
                            className="w-full h-1.5 rounded-full overflow-hidden"
                            style={{ backgroundColor: 'rgba(7,81,138,0.12)' }}
                        >
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                    width: `${progressPercentage}%`,
                                    backgroundColor: '#07518a',
                                }}
                            />
                        </div>
                        <span
                            className="text-[10px] font-semibold tabular-nums"
                            style={{ color: 'rgba(7,81,138,0.6)' }}
                        >
                            {activeMemberIndex + 1} / {members.length}
                        </span>
                    </div>

                    {/* Next button */}
                    <button
                        onClick={navigateNext}
                        disabled={currentIndex === members.length - 1}
                        className="w-9 h-9 rounded-full flex items-center justify-center disabled:opacity-40"
                        style={{
                            backgroundColor: '#07518a',
                            color: '#ffffff',
                        }}
                        aria-label="Next member"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* ── MEMBER MODAL (mobile/tablet) ───────────────────────────────── */}
            {selectedMemberIndex !== null && (
                <MemberModal
                    member={members[selectedMemberIndex as number]}
                    memberNumber={((selectedMemberIndex as number) + 1).toString().padStart(2, '0')}
                    onClose={closeMemberModal}
                    onNavigate={navigateModal}
                    currentIndex={selectedMemberIndex as number}
                    totalMembers={members.length}
                />
            )}
        </div>
    );
};

export default BoardGallery;