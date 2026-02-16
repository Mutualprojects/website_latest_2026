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

export default function SolutionHome() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);
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
      tl.from('.logo', {
        y: -40,
        opacity: 0,
        duration: 2,
        ease: 'power4',
      })
      .from('.nav-btn__svg rect', {
        scaleX: 0,
        transformOrigin: 'center right',
        duration: 0.6,
        ease: 'power4',
        stagger: 0.1,
      }, 0.6)
      .to('.nav-btn__svg rect', {
        scaleX: 0.8,
        transformOrigin: 'center left',
        duration: 0.4,
        ease: 'power2',
        stagger: 0.1,
      }, '-=0.6');

      // Split text for animation
      const introTitle = new SplitType('.intro__title', {
        types: 'lines',
        lineClass: 'intro-line',
      });

      const slideTitles = document.querySelectorAll('.col__content-title');
      slideTitles.forEach((title) => {
        new SplitType(title as HTMLElement, {
          types: 'lines',
          lineClass: 'line',
        });
      });

      // Intro animation
      const introTl = gsap.timeline({ delay: 1.2 });
      introTl.from('.intro-line', {
        y: 400,
        ease: 'power4',
        duration: 3,
      })
      .from('.intro__txt', {
        x: -100,
        opacity: 0,
        ease: 'power4',
        duration: 3,
      }, 0.7)
      .from('.intro__img--1', {
        y: 50,
        opacity: 0,
        ease: 'power2',
        duration: 10,
      }, 1)
      .from('.intro__img--2', {
        y: -50,
        opacity: 0,
        ease: 'power2',
        duration: 10,
      }, 1);

      // Intro scroll out animation
      gsap.to('.intro__title', {
        scrollTrigger: {
          trigger: '.intro',
          scrub: 1,
          start: 'top bottom',
          end: 'bottom top',
        },
        x: 400,
        ease: 'power4.in',
      });

      gsap.to('.intro__txt', {
        scrollTrigger: {
          trigger: '.intro',
          scrub: 1,
          start: 'top bottom',
          end: 'bottom top',
        },
        y: 100,
        ease: 'power4.in',
      });

      // Slide animations
      document.querySelectorAll('.slide:not(.intro)').forEach((slide, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: slide,
            start: '40% 50%',
          },
        });

        tl.from(slide.querySelector('.col__content-title'), {
          y: '+=5vh',
          duration: 2.5,
          ease: 'power4',
        })
        .from(slide.querySelectorAll('.line'), {
          y: 200,
          duration: 2,
          ease: 'power4',
          stagger: 0.1,
        }, 0)
        .from(slide.querySelector('.col__content-txt'), {
          x: 100,
          y: 50,
          opacity: 0,
          duration: 2,
          ease: 'power4',
        }, 0.4)
        .from(slide.querySelector('.slide-link'), {
          x: -100,
          y: 100,
          opacity: 0,
          duration: 2,
          ease: 'power4',
        }, 0.3);

        // Parallax effect for images
        const imageWrappers = slide.querySelectorAll('.col__image-wrap');
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
      gsap.from('.footer__link', {
        scrollTrigger: {
          trigger: '.footer',
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
      const navBtn = document.querySelector('.nav-btn');
      navBtn?.addEventListener('mouseenter', () => {
        gsap.to('.nav-btn__svg rect', {
          scaleX: 1,
          transformOrigin: 'top left',
          duration: 0.4,
          ease: 'power4',
        });
      });

      navBtn?.addEventListener('mouseleave', () => {
        gsap.to('.nav-btn__svg rect', {
          scaleX: 0.8,
          transformOrigin: 'top left',
          duration: 0.6,
          ease: 'power4',
        });
      });

      // Scroll link hover effects
      document.querySelectorAll('.slide__scroll-link').forEach((link) => {
        const line = link.querySelector('.slide__scroll-line');
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
      document.querySelectorAll('.slide-link').forEach((link) => {
        const line = link.querySelector('.slide-link__line');
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
      const topLink = document.querySelector('.footer__link-top');
      topLink?.addEventListener('mouseenter', () => {
        gsap.to('.footer__link-top-line', {
          scaleY: 3,
          duration: 0.6,
          ease: 'power4',
        });
      });

      topLink?.addEventListener('mouseleave', () => {
        gsap.to('.footer__link-top-line', {
          scaleY: 1,
          duration: 0.6,
          ease: 'power4',
        });
      });
    };

    // Click handlers
    const initClickHandlers = () => {
      // Scroll links
      document.querySelectorAll('.slide__scroll-link').forEach((link, index) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          currentSlideRef.current = index + 1;
          gsap.to(window, {
            duration: 2,
            scrollTo: {
              y: `#slide-${index + 2}`,
            },
            ease: 'power2.inOut',
          });
        });
      });

      // Top link
      document.querySelector('.footer__link-top')?.addEventListener('click', (e) => {
        e.preventDefault();
        currentSlideRef.current = 0;
        gsap.to(window, {
          duration: 2,
          scrollTo: {
            y: '#slide-0',
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
                y: `#slide-${currentSlideRef.current}`,
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
                y: `#slide-${currentSlideRef.current}`,
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
    <div className="solution-container">
      {/* GSAP ScrollSmoother wrapper */}
      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef}>
          <style jsx global>{`
            :root {
              --dark: #242423;
              --header-height: 80px;
            }

            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }

            html, body {
              overflow-x: hidden;
              height: 100%;
            }

            body {
              font-family: 'Noto Sans', -apple-system, BlinkMacSystemFont, sans-serif;
              font-size: 14px;
              color: var(--dark);
              line-height: 1.3;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              background: white;
            }

            .solution-container {
              min-height: 100vh;
              position: relative;
            }

            .logo,
            h1,
            h2 {
              margin: 0;
              line-height: 1;
              font-family: 'Cinzel', serif;
              font-weight: 400;
            }

            p {
              margin: 0;
            }

            /* Header */
            .header {
              position: fixed;
              left: 40px;
              top: 24px;
              z-index: 1000;
              display: flex;
              align-items: center;
            }

            .logo {
              font-size: 27px;
              letter-spacing: -1px;
              color: var(--dark);
              text-decoration: none;
            }

            .nav-btn {
              display: block;
              margin-left: 56px;
              width: 56px;
              height: 30px;
              cursor: pointer;
              background: none;
              border: none;
              padding: 0;
            }

            .nav-btn__svg rect {
              fill: var(--dark);
            }

            /* Intro Section */
            .intro {
              height: 100vh;
              position: relative;
              padding: 5vw;
              background: #C0D7D8;
              overflow: hidden;
              display: flex;
              align-items: flex-end;
              justify-content: flex-end;
            }

            .intro__content {
              position: absolute;
              right: 8%;
              bottom: 15%;
              z-index: 3;
              max-width: 800px;
            }

            .intro__title {
              font-size: clamp(60px, 25vw, 200px);
              letter-spacing: -2.3vw;
              line-height: 0.9;
              margin-bottom: 2rem;
              overflow: hidden;
            }

            .intro__txt {
              max-width: 35vw;
              font-size: clamp(14px, 1.2vw, 18px);
              line-height: 1.6;
            }

            .intro__img {
              position: absolute;
              width: 35%;
              max-width: 390px;
              height: auto;
              object-fit: cover;
            }

            .intro__img--1 {
              z-index: 2;
              left: 10%;
              bottom: 35%;
            }

            .intro__img--2 {
              z-index: 1;
              left: 25%;
              bottom: 40%;
            }

            /* Slides */
            .slide {
              height: 100vh;
              display: flex;
              overflow: hidden;
              position: relative;
            }

            .slide:nth-child(even) .col--1 {
              order: 2;
            }

            .slide:nth-child(even) .col--2 {
              order: 1;
            }

            .col {
              flex: 1;
              height: 100%;
              position: relative;
            }

            .col--1 {
              display: flex;
              align-items: flex-end;
              justify-content: flex-end;
              padding: 6vw;
              z-index: 2;
            }

            .col--2 {
              position: relative;
              overflow: hidden;
            }

            .col__content {
              width: 100%;
              max-width: 600px;
            }

            .col__content-title {
              font-size: clamp(40px, 11vw, 100px);
              letter-spacing: -0.8vw;
              line-height: 0.9;
              margin-bottom: 2rem;
              overflow: hidden;
            }

            .line {
              overflow: hidden;
              display: block;
            }

            .col__content-txt {
              font-size: clamp(14px, 1.1vw, 16px);
              line-height: 1.6;
              margin-bottom: 3rem;
              max-width: 400px;
            }

            .col__content-wrap {
              display: flex;
              align-items: flex-end;
              justify-content: space-between;
            }

            /* Slide Link */
            .slide-link {
              position: relative;
              display: flex;
              justify-content: flex-end;
              width: 75px;
              height: 53px;
              cursor: pointer;
              text-decoration: none;
            }

            .slide-link__circ {
              width: 53px;
              height: 53px;
              border-radius: 50%;
              border: 1px solid var(--dark);
            }

            .slide-link__line {
              position: absolute;
              top: 50%;
              left: 0;
              width: 64px;
              height: 3px;
              background: var(--dark);
              transform: translateY(-50%);
            }

            /* Scroll Link */
            .slide__scroll-link {
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

            .slide__scroll-link:hover {
              transform: scale(1.05);
            }

            .slide__scroll-line {
              position: absolute;
              left: 50%;
              top: 50%;
              width: 2px;
              height: 60px;
              background: white;
              transform: translate(-50%, -50%);
            }

            /* Column Image */
            .col__image-wrap {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
            }

            .img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center;
            }

            /* Footer */
            .footer {
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              background: #cecece;
              position: relative;
            }

            .footer__link {
              font-size: clamp(40px, 5vw, 80px);
              color: var(--dark);
              text-decoration: none;
              font-family: 'Cinzel', serif;
              margin-bottom: 2rem;
            }

            .footer__link:hover {
              text-decoration: underline;
            }

            .footer__link-top {
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

            .footer__link-top:hover {
              transform: translateX(-50%) scale(1.05);
            }

            .footer__link-top-line {
              position: absolute;
              top: -50px;
              left: 50%;
              width: 2px;
              height: 50px;
              background: var(--dark);
            }

            .footer__copyright {
              position: absolute;
              left: 50%;
              bottom: 24px;
              transform: translateX(-50%);
              font-size: 14px;
            }

            /* Responsive Styles */
            @media (max-width: 1024px) {
              .intro__content {
                right: 5%;
                bottom: 10%;
              }
              
              .intro__txt {
                max-width: 45vw;
              }
              
              .slide__scroll-link {
                right: -100px;
                bottom: 5vw;
              }
            }

            @media (max-width: 768px) {
              .header {
                left: 24px;
                top: 20px;
              }

              .intro {
                padding: 20px;
                flex-direction: column;
                justify-content: flex-end;
                align-items: flex-start;
              }

              .intro__content {
                position: relative;
                right: auto;
                bottom: auto;
                max-width: 100%;
              }

              .intro__title {
                font-size: clamp(60px, 20vw, 150px);
                margin-bottom: 2rem;
              }

              .intro__txt {
                max-width: 90%;
                font-size: 16px;
              }

              .intro__img {
                width: 60%;
              }

              .intro__img--1 {
                left: 5%;
                bottom: 40%;
              }

              .intro__img--2 {
                left: 35%;
                bottom: 50%;
              }

              .slide {
                flex-direction: column;
              }

              .col {
                flex: none;
                height: 50vh;
              }

              .col--1 {
                order: 2;
                padding: 40px 20px;
                align-items: flex-start;
                justify-content: flex-start;
              }

              .col--2 {
                order: 1;
                height: 50vh;
              }

              .slide:nth-child(even) .col--1 {
                order: 2;
              }

              .slide:nth-child(even) .col--2 {
                order: 1;
              }

              .col__content-title {
                font-size: clamp(40px, 15vw, 80px);
                margin-bottom: 1.5rem;
              }

              .col__content-txt {
                font-size: 16px;
                max-width: 100%;
              }

              .col__content-wrap {
                flex-direction: column;
                align-items: flex-start;
              }

              .slide-link {
                margin-top: 2rem;
              }

              .slide__scroll-link {
                display: none;
              }
            }

            @media (max-width: 480px) {
              .header {
                left: 16px;
                top: 16px;
              }

              .logo {
                font-size: 22px;
              }

              .nav-btn {
                margin-left: 30px;
                width: 40px;
                height: 25px;
              }

              .nav-btn__svg {
                width: 40px;
                height: 25px;
              }

              .intro__img {
                width: 70%;
              }

              .intro__img--1 {
                left: 5%;
                bottom: 35%;
              }

              .intro__img--2 {
                left: 25%;
                bottom: 45%;
              }

              .col__content-title {
                font-size: clamp(32px, 12vw, 60px);
              }

              .footer__link {
                font-size: clamp(32px, 8vw, 60px);
              }

              .footer__link-top {
                width: 80px;
                height: 80px;
                font-size: 16px;
              }
            }

            /* Animation Classes */
            .intro-line {
              display: inline-block;
              overflow: hidden;
              vertical-align: top;
            }

            .line {
              overflow: hidden;
            }

            .line__inner {
              display: block;
            }
          `}</style>

          {/* Header */}
          <header className="header">
            <div className="logo">Duda</div>
            <button className="nav-btn" aria-label="Navigation menu">
              <svg
                className="nav-btn__svg"
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
          <section className="slide intro" id="slide-0">
            <div className="intro__content">
              <h1 className="intro__title">Duda</h1>
              <p className="intro__txt">
                Duda is going from strength to strength. Whether it's in the
                World Trade Centre in New York or an international art fair,
                people recognize the originality in Duda's work.
              </p>
            </div>

            <img
              className="intro__img intro__img--1"
              src="/images/duda-intro-1.jpg"
              alt="Intro 1"
              loading="lazy"
            />
            <img
              className="intro__img intro__img--2"
              src="/images/duda-intro-2.jpg"
              alt="Intro 2"
              loading="lazy"
            />
          </section>

          {/* Slides */}
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <section className="slide" id={`slide-${num}`} key={num}>
              <div 
                className="col col--1"
                style={{ backgroundColor: slideColors[num - 1] }}
              >
                <div className="col__content">
                  <h2 className="col__content-title">
                    <span className="line">
                      <span className="line__inner">Artwork</span>
                    </span>
                    <br />
                    <span className="line">
                      <span className="line__inner">No. {num}</span>
                    </span>
                  </h2>

                  <div className="col__content-wrap">
                    <p className="col__content-txt">
                      Praesent commodo cursus magna, vel scelerisque nisl
                      consectetur et. Sed posuere consectetur est at lobortis.
                    </p>

                    <a href="#" className="slide-link" aria-label={`View artwork ${num} details`}>
                      <div className="slide-link__circ"></div>
                      <div className="slide-link__line"></div>
                    </a>
                  </div>
                </div>

                <a href={`#slide-${num + 1}`} className="slide__scroll-link" aria-label="Scroll to next section">
                  <div className="slide__scroll-line"></div>
                </a>
              </div>

              <div className="col col--2">
                <div className="col__image-wrap">
                  <img
                    className="img img--1"
                    src={`/images/duda-${num}.jpg`}
                    alt={`Artwork ${num}`}
                    loading="lazy"
                  />
                </div>
              </div>
            </section>
          ))}

          {/* Footer */}
          <footer className="footer" id="slide-7">
            <a
              className="footer__link"
              href="https://www.duda.ie/"
              target="_blank"
              rel="noopener noreferrer"
            >
              duda.ie
            </a>

            <a className="footer__link-top" href="#slide-0" aria-label="Scroll to top">
              Top
              <span className="footer__link-top-line"></span>
            </a>

            <p className="footer__copyright">
              © {new Date().getFullYear()} Dave Uda
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}