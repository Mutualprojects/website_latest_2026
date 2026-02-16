// components/ui/HeroReveal.tsx
"use client"
import React, { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

interface HeroRevealProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaText?: string;
  ctaLink?: string;
  overlayOpacity?: number;
  enableParallax?: boolean;
  revealOnScroll?: boolean;
  className?: string;
}

const HeroReveal: React.FC<HeroRevealProps> = ({
  title,
  subtitle,
  imageUrl,
  ctaText = 'Learn More',
  ctaLink = '#',
  overlayOpacity = 0.6,
  enableParallax = true,
  revealOnScroll = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Convert pixel to rem helper
  const pxToRem = (pixels: number): string => `${pixels / 16}rem`;

  useGSAP(() => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    mm.add("(min-width: 768px)", () => {
      // Set initial states
      gsap.set(imageRef.current, {
        scale: 1.2,
        opacity: 0,
        filter: 'blur(10px)',
      });

      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(overlayRef.current, {
        opacity: 0,
      });

      // Create timeline
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          duration: 1.4,
        },
        onStart: () => {
          if (containerRef.current) {
            containerRef.current.style.willChange = 'transform, opacity';
          }
        },
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.willChange = 'auto';
          }
        }
      });

      // Animation sequence
      tl.to(overlayRef.current, {
        opacity: overlayOpacity,
        duration: 1,
      })
      .to(imageRef.current, {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.8,
        ease: 'power2.inOut',
      }, 0)
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
      }, 0.6)
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      }, 0.8)
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        onComplete: () => {
          // Add hover effect to CTA
          if (ctaRef.current) {
            gsap.to(ctaRef.current, {
              scale: 1.05,
              duration: 0.3,
              paused: true,
              ease: 'power2.out',
            });

            ctaRef.current.addEventListener('mouseenter', () => {
              gsap.to(ctaRef.current, { scale: 1.05, duration: 0.3 });
            });

            ctaRef.current.addEventListener('mouseleave', () => {
              gsap.to(ctaRef.current, { scale: 1, duration: 0.3 });
            });
          }
        },
      }, 1);

      // Add character splitting animation for title (optional)
      if (titleRef.current && !prefersReducedMotion.matches) {
        const splitTitle = new SplitText(titleRef.current, {
          type: 'chars, words',
          charsClass: 'char',
          wordsClass: 'word',
        });

        gsap.from(splitTitle.chars, {
          opacity: 0,
          y: 30,
          rotationX: 90,
          duration: 0.8,
          stagger: 0.02,
          ease: 'back.out(1.7)',
          scrollTrigger: revealOnScroll ? {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          } : undefined,
        });
      }

      // Parallax effect
      if (enableParallax && !prefersReducedMotion.matches) {
        gsap.to(imageRef.current, {
          y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });

        gsap.to(titleRef.current, {
          y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Scroll reveal (if enabled)
      if (revealOnScroll) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          onEnter: () => tl.play(),
          onLeaveBack: () => tl.reverse(),
          onLeave: () => {
            if (!prefersReducedMotion.matches) {
              gsap.to(containerRef.current, {
                opacity: 0.8,
                scale: 0.98,
                duration: 0.8,
                ease: 'power2.inOut',
              });
            }
          },
          onEnterBack: () => {
            if (!prefersReducedMotion.matches) {
              gsap.to(containerRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'power2.out',
              });
            }
          },
        });
      } else {
        // Auto play on mount
        tl.play();
      }

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        tl.kill();
      };
    });

    // Mobile animation
    mm.add("(max-width: 767px)", () => {
      const mobileTl = gsap.timeline({
        defaults: {
          ease: 'power2.out',
          duration: 1,
        },
      });

      mobileTl
        .fromTo(imageRef.current,
          { scale: 1.1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2 }
        )
        .fromTo(titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        );

      if (revealOnScroll) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 85%',
          onEnter: () => mobileTl.play(),
        });
      }
    });

    // Cleanup all match media
    return () => mm.revert();
  }, [enableParallax, revealOnScroll, overlayOpacity]);

  // Responsive font sizes using JS calculations
  const getResponsiveFontSize = (
    minSize: number,
    maxSize: number,
    minWidth: number = 320,
    maxWidth: number = 1920
  ): string => {
    const slope = (maxSize - minSize) / (maxWidth - minWidth);
    const yAxisIntersection = -minWidth * slope + minSize;
    return `clamp(${pxToRem(minSize)}, ${yAxisIntersection.toFixed(2)}rem + ${(slope * 100).toFixed(2)}vw, ${pxToRem(maxSize)})`;
  };

  const titleFontSize = getResponsiveFontSize(36, 96);
  const subtitleFontSize = getResponsiveFontSize(18, 32);
  const ctaFontSize = getResponsiveFontSize(14, 18);

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-h-screen overflow-hidden ${className}`}
      style={{
        backgroundColor: '#000',
      }}
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'scale(1.2)',
          opacity: 0,
          willChange: 'transform, opacity',
        }}
      />

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%)',
          opacity: 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4 md:px-8 py-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Title */}
          <h1
            ref={titleRef}
            className="font-bold mb-6 md:mb-8 tracking-tight leading-tight"
            style={{
              fontSize: titleFontSize,
              color: '#ffffff',
              opacity: 0,
              transform: 'translateY(50px)',
              textShadow: '0 4px 12px rgba(0,0,0,0.5)',
              lineHeight: 1.1,
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p
              ref={subtitleRef}
              className="mb-8 md:mb-12 max-w-3xl mx-auto"
              style={{
                fontSize: subtitleFontSize,
                color: 'rgba(255,255,255,0.9)',
                opacity: 0,
                transform: 'translateY(50px)',
                lineHeight: 1.6,
                fontWeight: 300,
              }}
            >
              {subtitle}
            </p>
          )}

          {/* CTA Button */}
          <a
            ref={ctaRef}
            href={ctaLink}
            className="inline-flex items-center justify-center px-8 py-4 font-semibold tracking-wider uppercase transition-all duration-300 border-2 border-white text-white hover:bg-white hover:text-black"
            style={{
              fontSize: ctaFontSize,
              opacity: 0,
              transform: 'translateY(50px)',
              letterSpacing: '2px',
              borderRadius: '0',
              minWidth: '200px',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.05,
                duration: 0.3,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                duration: 0.3,
              });
            }}
          >
            {ctaText}
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        style={{
          opacity: revealOnScroll ? 1 : 0,
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/70 text-sm tracking-wider">SCROLL</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div
              className="w-1 h-3 bg-white rounded-full mt-2"
              style={{
                animation: 'bounce 1.5s infinite',
              }}
            />
          </div>
        </div>
      </div>

      {/* Inline styles for animations */}
      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }

        /* Reduce motion preference */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Character animation classes */
        .char {
          display: inline-block;
          opacity: 0;
        }

        .word {
          display: inline-block;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default HeroReveal;