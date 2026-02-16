'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import SplitType from 'split-type';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);
}

export default function SolutionSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const currentSlideRef = useRef<number>(0);
  const smootherRef = useRef<any>(null);

  // Initialize animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initAnimations = () => {
      // Create ScrollSmoother
      smootherRef.current = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.5,
        effects: true,
        normalizeScroll: true,
        smoothTouch: 0.1,
      });

      // Animate header
      const tl = gsap.timeline({ delay: 0.5 });
      tl.from('.solution-logo', {
        y: -40,
        opacity: 0,
        duration: 2,
        ease: 'power4',
      })
      .from('.solution-nav-btn__svg rect', {
        scaleX: 0,
        transformOrigin: 'center right',
        duration: 0.6,
        ease: 'power4',
        stagger: 0.1,
      }, 0.6)
      .to('.solution-nav-btn__svg rect', {
        scaleX: 0.8,
        transformOrigin: 'center left',
        duration: 0.4,
        ease: 'power2',
        stagger: 0.1,
      }, '-=0.6');

      // Split text for animation
      const introTitle = new SplitType('.solution-intro__title', {
        types: 'lines',
        lineClass: 'solution-intro-line',
      });

      const slideTitles = document.querySelectorAll('.solution-col__content-title');
      slideTitles.forEach((title) => {
        new SplitType(title as HTMLElement, {
          types: 'lines',
          lineClass: 'solution-line',
        });
      });

      // Intro animation
      const introTl = gsap.timeline({ delay: 1.2 });
      introTl.from('.solution-intro-line', {
        y: 400,
        ease: 'power4',
        duration: 3,
      })
      .from('.solution-intro__txt', {
        x: -100,
        opacity: 0,
        ease: 'power4',
        duration: 3,
      }, 0.7)
      .from('.solution-intro__img--1', {
        y: 50,
        opacity: 0,
        ease: 'power2',
        duration: 10,
      }, 1)
      .from('.solution-intro__img--2', {
        y: -50,
        opacity: 0,
        ease: 'power2',
        duration: 10,
      }, 1);

      // Intro scroll out animation
      gsap.to('.solution-intro__title', {
        scrollTrigger: {
          trigger: '.solution-intro',
          scrub: 1,
          start: 'top bottom',
          end: 'bottom top',
        },
        x: 400,
        ease: 'power4.in',
      });

      gsap.to('.solution-intro__txt', {
        scrollTrigger: {
          trigger: '.solution-intro',
          scrub: 1,
          start: 'top bottom',
          end: 'bottom top',
        },
        y: 100,
        ease: 'power4.in',
      });

      // Slide animations
      document.querySelectorAll('.solution-slide:not(.solution-intro)').forEach((slide, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: slide,
            start: '40% 50%',
          },
        });

        tl.from(slide.querySelector('.solution-col__content-title'), {
          y: '+=5vh',
          duration: 2.5,
          ease: 'power4',
        })
        .from(slide.querySelectorAll('.solution-line'), {
          y: 200,
          duration: 2,
          ease: 'power4',
          stagger: 0.1,
        }, 0)
        .from(slide.querySelector('.solution-col__content-txt'), {
          x: 100,
          y: 50,
          opacity: 0,
          duration: 2,
          ease: 'power4',
        }, 0.4)
        .from(slide.querySelector('.solution-slide-link'), {
          x: -100,
          y: 100,
          opacity: 0,
          duration: 2,
          ease: 'power4',
        }, 0.3);

        // Parallax effect for images
        const imageWrappers = slide.querySelectorAll('.solution-col__image-wrap');
        gsap.fromTo(imageWrappers, {
          y: '-30vh',
        }, {
          y: '30vh',
          ease: 'none',
          scrollTrigger: {
            trigger: slide,
            scrub: true,
            start: 'top bottom',
          },
        });
      });

      // Footer animation
      gsap.from('.solution-footer__link', {
        scrollTrigger: {
          trigger: '.solution-footer',
          scrub: 2,
          start: '50% 100%',
          end: '0% 0%',
        },
        y: '20vh',
        ease: 'sine',
      });

      // Initialize hover effects
      initHoverEffects();
    };

    // Hover effects
    const initHoverEffects = () => {
      // Navigation button hover
      const navBtn = document.querySelector('.solution-nav-btn');
      navBtn?.addEventListener('mouseenter', () => {
        gsap.to('.solution-nav-btn__svg rect', {
          scaleX: 1,
          transformOrigin: 'top left',
          duration: 0.4,
          ease: 'power4',
        });
      });

      navBtn?.addEventListener('mouseleave', () => {
        gsap.to('.solution-nav-btn__svg rect', {
          scaleX: 0.8,
          transformOrigin: 'top left',
          duration: 0.6,
          ease: 'power4',
        });
      });

      // Scroll link hover effects
      document.querySelectorAll('.solution-slide__scroll-link').forEach((link) => {
        const line = link.querySelector('.solution-slide__scroll-line');
        link.addEventListener('mouseenter', () => {
          gsap.to(line, {
            y: 40,
            duration: 0.6,
            ease: 'power4',
          });
        });

        link.addEventListener('mouseleave', () => {
          gsap.to(line, {
            y: 0,
            duration: 0.6,
            ease: 'power4',
          });
        });
      });

      // Slide link hover effects
      document.querySelectorAll('.solution-slide-link').forEach((link) => {
        const line = link.querySelector('.solution-slide-link__line');
        link.addEventListener('mouseenter', () => {
          gsap.to(line, {
            x: 20,
            scaleX: 0.3,
            duration: 0.8,
            ease: 'power4',
          });
        });

        link.addEventListener('mouseleave', () => {
          gsap.to(line, {
            x: 0,
            scaleX: 1,
            duration: 0.8,
            ease: 'power4',
          });
        });
      });

      // Top link hover
      const topLink = document.querySelector('.solution-footer__link-top');
      topLink?.addEventListener('mouseenter', () => {
        gsap.to('.solution-footer__link-top-line', {
          scaleY: 3,
          duration: 0.6,
          ease: 'power4',
        });
      });

      topLink?.addEventListener('mouseleave', () => {
        gsap.to('.solution-footer__link-top-line', {
          scaleY: 1,
          duration: 0.6,
          ease: 'power4',
        });
      });
    };

    // Click handlers
    const initClickHandlers = () => {
      // Scroll links
      document.querySelectorAll('.solution-slide__scroll-link').forEach((link, index) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          currentSlideRef.current = index + 1;
          gsap.to(window, {
            duration: 2,
            scrollTo: {
              y: `#solution-slide-${index + 2}`,
            },
            ease: 'power2.inOut',
          });
        });
      });

      // Top link
      document.querySelector('.solution-footer__link-top')?.addEventListener('click', (e) => {
        e.preventDefault();
        currentSlideRef.current = 0;
        gsap.to(window, {
          duration: 2,
          scrollTo: {
            y: '#solution-slide-0',
          },
          ease: 'power2.inOut',
        });
      });

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (currentSlideRef.current < 6) {
            currentSlideRef.current++;
            gsap.to(window, {
              duration: 2,
              scrollTo: {
                y: `#solution-slide-${currentSlideRef.current}`,
              },
              ease: 'power2.inOut',
            });
          }
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (currentSlideRef.current > 0) {
            currentSlideRef.current--;
            gsap.to(window, {
              duration: 2,
              scrollTo: {
                y: `#solution-slide-${currentSlideRef.current}`,
              },
              ease: 'power2.inOut',
            });
          }
        }
      });
    };

    initAnimations();
    initClickHandlers();

    // Cleanup
    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const slideColors = [
    '#D8C0C0', // slide 1
    '#CDD5E0', // slide 2
    '#F3D3B0', // slide 3
    '#F8E9E6', // slide 4
    '#D1E2EC', // slide 5
    '#D7CEC5', // slide 6
  ];

  return (
    <section className="solution-section py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Our Solutions
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Innovative solutions designed to transform your business and drive success
          </p>
        </div>
      </div>

      <div className="solution-container">
        {/* GSAP ScrollSmoother wrapper */}
        <div id="solution-smooth-wrapper" ref={wrapperRef}>
          <div id="solution-smooth-content" ref={contentRef}>
            <style jsx global>{`
              :root {
                --dark: #242423;
                --header-height: 80px;
              }

              .solution-container {
                min-height: 100vh;
                position: relative;
                margin: 0;
                padding: 0;
                width: 100%;
              }

              .solution-logo,
              .solution-h1,
              .solution-h2 {
                margin: 0;
                line-height: 1;
                font-family: 'Cinzel', serif;
                font-weight: 400;
              }

              .solution-p {
                margin: 0;
              }

              /* Header */
              .solution-header {
                position: fixed;
                left: 40px;
                top: 24px;
                z-index: 1000;
                display: flex;
                align-items: center;
              }

              .solution-logo {
                font-size: 27px;
                letter-spacing: -1px;
                color: var(--dark);
                text-decoration: none;
              }

              .solution-nav-btn {
                display: block;
                margin-left: 56px;
                width: 56px;
                height: 30px;
                cursor: pointer;
                background: none;
                border: none;
                padding: 0;
              }

              .solution-nav-btn__svg rect {
                fill: var(--dark);
              }

              /* Intro Section */
              .solution-intro {
                height: 100vh;
                position: relative;
                padding: 5vw;
                background: #C0D7D8;
                overflow: hidden;
                display: flex;
                align-items: flex-end;
                justify-content: flex-end;
              }

              .solution-intro__content {
                position: absolute;
                right: 8%;
                bottom: 15%;
                z-index: 3;
                max-width: 800px;
              }

              .solution-intro__title {
                font-size: clamp(60px, 25vw, 200px);
                letter-spacing: -2.3vw;
                line-height: 0.9;
                margin-bottom: 2rem;
                overflow: hidden;
              }

              .solution-intro__txt {
                max-width: 35vw;
                font-size: clamp(14px, 1.2vw, 18px);
                line-height: 1.6;
              }

              .solution-intro__img {
                position: absolute;
                width: 35%;
                max-width: 390px;
                height: auto;
                object-fit: cover;
              }

              .solution-intro__img--1 {
                z-index: 2;
                left: 10%;
                bottom: 35%;
              }

              .solution-intro__img--2 {
                z-index: 1;
                left: 25%;
                bottom: 40%;
              }

              /* Slides */
              .solution-slide {
                height: 100vh;
                display: flex;
                overflow: hidden;
                position: relative;
              }

              .solution-slide:nth-child(even) .solution-col--1 {
                order: 2;
              }

              .solution-slide:nth-child(even) .solution-col--2 {
                order: 1;
              }

              .solution-col {
                flex: 1;
                height: 100%;
                position: relative;
              }

              .solution-col--1 {
                display: flex;
                align-items: flex-end;
                justify-content: flex-end;
                padding: 6vw;
                z-index: 2;
              }

              .solution-col--2 {
                position: relative;
                overflow: hidden;
              }

              .solution-col__content {
                width: 100%;
                max-width: 600px;
              }

              .solution-col__content-title {
                font-size: clamp(40px, 11vw, 100px);
                letter-spacing: -0.8vw;
                line-height: 0.9;
                margin-bottom: 2rem;
                overflow: hidden;
              }

              .solution-line {
                overflow: hidden;
                display: block;
              }

              .solution-col__content-txt {
                font-size: clamp(14px, 1.1vw, 16px);
                line-height: 1.6;
                margin-bottom: 3rem;
                max-width: 400px;
              }

              .solution-col__content-wrap {
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
              }

              /* Slide Link */
              .solution-slide-link {
                position: relative;
                display: flex;
                justify-content: flex-end;
                width: 75px;
                height: 53px;
                cursor: pointer;
                text-decoration: none;
              }

              .solution-slide-link__circ {
                width: 53px;
                height: 53px;
                border-radius: 50%;
                border: 1px solid var(--dark);
              }

              .solution-slide-link__line {
                position: absolute;
                top: 50%;
                left: 0;
                width: 64px;
                height: 3px;
                background: var(--dark);
                transform: translateY(-50%);
              }

              /* Scroll Link */
              .solution-slide__scroll-link {
                position: absolute;
                right: -113px;
                bottom: 3.5vw;
                display: block;
                width: 140px;
                height: 140px;
                background: var(--dark);
                cursor: pointer;
                border-radius: 50%;
                overflow: hidden;
                transition: transform 0.3s ease;
              }

              .solution-slide__scroll-link:hover {
                transform: scale(1.05);
              }

              .solution-slide__scroll-line {
                position: absolute;
                left: 50%;
                top: 50%;
                width: 2px;
                height: 60px;
                background: white;
                transform: translate(-50%, -50%);
              }

              /* Column Image */
              .solution-col__image-wrap {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
              }

              .solution-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
              }

              /* Footer */
              .solution-footer {
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                background: #cecece;
                position: relative;
              }

              .solution-footer__link {
                font-size: clamp(40px, 5vw, 80px);
                color: var(--dark);
                text-decoration: none;
                font-family: 'Cinzel', serif;
                margin-bottom: 2rem;
              }

              .solution-footer__link:hover {
                text-decoration: underline;
              }

              .solution-footer__link-top {
                position: absolute;
                left: 50%;
                bottom: 100px;
                transform: translateX(-50%);
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100px;
                height: 100px;
                background: var(--dark);
                border-radius: 50%;
                color: white;
                text-decoration: none;
                font-family: 'Cinzel', serif;
                font-size: 18px;
                cursor: pointer;
                transition: transform 0.3s ease;
              }

              .solution-footer__link-top:hover {
                transform: translateX(-50%) scale(1.05);
              }

              .solution-footer__link-top-line {
                position: absolute;
                top: -50px;
                left: 50%;
                width: 2px;
                height: 50px;
                background: var(--dark);
              }

              .solution-footer__copyright {
                position: absolute;
                left: 50%;
                bottom: 24px;
                transform: translateX(-50%);
                font-size: 14px;
              }

              /* Responsive Styles */
              @media (max-width: 1024px) {
                .solution-intro__content {
                  right: 5%;
                  bottom: 10%;
                }
                
                .solution-intro__txt {
                  max-width: 45vw;
                }
                
                .solution-slide__scroll-link {
                  right: -100px;
                  bottom: 5vw;
                }
              }

              @media (max-width: 768px) {
                .solution-header {
                  left: 24px;
                  top: 20px;
                }

                .solution-intro {
                  padding: 20px;
                  flex-direction: column;
                  justify-content: flex-end;
                  align-items: flex-start;
                }

                .solution-intro__content {
                  position: relative;
                  right: auto;
                  bottom: auto;
                  max-width: 100%;
                }

                .solution-intro__title {
                  font-size: clamp(60px, 20vw, 150px);
                  margin-bottom: 2rem;
                }

                .solution-intro__txt {
                  max-width: 90%;
                  font-size: 16px;
                }

                .solution-intro__img {
                  width: 60%;
                }

                .solution-intro__img--1 {
                  left: 5%;
                  bottom: 40%;
                }

                .solution-intro__img--2 {
                  left: 35%;
                  bottom: 50%;
                }

                .solution-slide {
                  flex-direction: column;
                }

                .solution-col {
                  flex: none;
                  height: 50vh;
                }

                .solution-col--1 {
                  order: 2;
                  padding: 40px 20px;
                  align-items: flex-start;
                  justify-content: flex-start;
                }

                .solution-col--2 {
                  order: 1;
                  height: 50vh;
                }

                .solution-slide:nth-child(even) .solution-col--1 {
                  order: 2;
                }

                .solution-slide:nth-child(even) .solution-col--2 {
                  order: 1;
                }

                .solution-col__content-title {
                  font-size: clamp(40px, 15vw, 80px);
                  margin-bottom: 1.5rem;
                }

                .solution-col__content-txt {
                  font-size: 16px;
                  max-width: 100%;
                }

                .solution-col__content-wrap {
                  flex-direction: column;
                  align-items: flex-start;
                }

                .solution-slide-link {
                  margin-top: 2rem;
                }

                .solution-slide__scroll-link {
                  display: none;
                }
              }

              @media (max-width: 480px) {
                .solution-header {
                  left: 16px;
                  top: 16px;
                }

                .solution-logo {
                  font-size: 22px;
                }

                .solution-nav-btn {
                  margin-left: 30px;
                  width: 40px;
                  height: 25px;
                }

                .solution-nav-btn__svg {
                  width: 40px;
                  height: 25px;
                }

                .solution-intro__img {
                  width: 70%;
                }

                .solution-intro__img--1 {
                  left: 5%;
                  bottom: 35%;
                }

                .solution-intro__img--2 {
                  left: 25%;
                  bottom: 45%;
                }

                .solution-col__content-title {
                  font-size: clamp(32px, 12vw, 60px);
                }

                .solution-footer__link {
                  font-size: clamp(32px, 8vw, 60px);
                }

                .solution-footer__link-top {
                  width: 80px;
                  height: 80px;
                  font-size: 16px;
                }
              }

              /* Animation Classes */
              .solution-intro-line {
                display: inline-block;
                overflow: hidden;
                vertical-align: top;
              }

              .solution-line {
                overflow: hidden;
              }

              .solution-line__inner {
                display: block;
              }
            `}</style>

            {/* Header */}
            <header className="solution-header">
              <div className="solution-logo">Solutions</div>
              <button className="solution-nav-btn" aria-label="Navigation menu">
                <svg
                  className="solution-nav-btn__svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 56 30"
                >
                  <rect width="40" height="2" x="8" y="8" />
                  <rect width="40" height="2" x="8" y="14" />
                  <rect width="40" height="2" x="8" y="20" />
                </svg>
              </button>
            </header>

            {/* Intro Section */}
            <section className="solution-slide solution-intro" id="solution-slide-0">
              <div className="solution-intro__content">
                <h1 className="solution-intro__title">Innovate</h1>
                <p className="solution-intro__txt">
                  Cutting-edge solutions designed to transform your business. 
                  From concept to execution, we deliver excellence that drives 
                  measurable results and sustainable growth.
                </p>
              </div>

              <img
                className="solution-intro__img solution-intro__img--1"
                src="/images/solution-intro-1.jpg"
                alt="Innovative Solution 1"
                loading="lazy"
              />
              <img
                className="solution-intro__img solution-intro__img--2"
                src="/images/solution-intro-2.jpg"
                alt="Innovative Solution 2"
                loading="lazy"
              />
            </section>

            {/* Slides */}
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <section className="solution-slide" id={`solution-slide-${num}`} key={num}>
                <div 
                  className="solution-col solution-col--1"
                  style={{ backgroundColor: slideColors[num - 1] }}
                >
                  <div className="solution-col__content">
                    <h2 className="solution-col__content-title">
                      <span className="solution-line">
                        <span className="solution-line__inner">Solution</span>
                      </span>
                      <br />
                      <span className="solution-line">
                        <span className="solution-line__inner">No. {num}</span>
                      </span>
                    </h2>

                    <div className="solution-col__content-wrap">
                      <p className="solution-col__content-txt">
                        Comprehensive solutions tailored to your specific needs. 
                        Our approach combines innovation with practicality to 
                        deliver exceptional results.
                      </p>

                      <a href="#" className="solution-slide-link" aria-label={`View solution ${num} details`}>
                        <div className="solution-slide-link__circ"></div>
                        <div className="solution-slide-link__line"></div>
                      </a>
                    </div>
                  </div>

                  <a href={`#solution-slide-${num + 1}`} className="solution-slide__scroll-link" aria-label="Scroll to next section">
                    <div className="solution-slide__scroll-line"></div>
                  </a>
                </div>

                <div className="solution-col solution-col--2">
                  <div className="solution-col__image-wrap">
                    <img
                      className="solution-img solution-img--1"
                      src={`/images/solution-${num}.jpg`}
                      alt={`Solution ${num}`}
                      loading="lazy"
                    />
                  </div>
                </div>
              </section>
            ))}

            {/* Footer */}
            <footer className="solution-footer" id="solution-slide-7">
              <a
                className="solution-footer__link"
                href="/contact"
              >
                Get Started
              </a>

              <a className="solution-footer__link-top" href="#solution-slide-0" aria-label="Scroll to top">
                Top
                <span className="solution-footer__link-top-line"></span>
              </a>

              <p className="solution-footer__copyright">
                © {new Date().getFullYear()} All Rights Reserved
              </p>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}