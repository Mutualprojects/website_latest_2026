'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxScroll: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const speed = 100;
    
    // Set initial states
    gsap.set("#h2-1", { opacity: 0 });
    gsap.set("#bg_grad", { attr: { cy: "-50" } });
    gsap.set(["#cloudStart-L", "#cloudStart-R"], { x: 10, opacity: 1 });

    /* SCENE 1 - Day Scene */
    const scene1 = gsap.timeline();
    ScrollTrigger.create({
      animation: scene1,
      trigger: ".scrollElement",
      start: "top top",
      end: "45% 100%",
      scrub: 3
    });

    scene1.to("#h1-1", { y: 3 * speed, x: 1 * speed, scale: 0.9, ease: "power1.in" }, 0);
    scene1.to("#h1-2", { y: 2.6 * speed, x: -0.6 * speed, ease: "power1.in" }, 0);
    scene1.to("#h1-3", { y: 1.7 * speed, x: 1.2 * speed }, 0.03);
    scene1.to("#h1-4", { y: 3 * speed, x: 1 * speed }, 0.03);
    scene1.to("#h1-5", { y: 2 * speed, x: 1 * speed }, 0.03);
    scene1.to("#h1-6", { y: 2.3 * speed, x: -2.5 * speed }, 0);
    scene1.to("#cloudsBig-L", { y: 4.5 * speed, x: -0.2 * speed }, 0);
    scene1.to("#cloudsBig-R", { y: 4.5 * speed, x: -0.2 * speed }, 0);
    scene1.to("#cloudStart-L", { x: -300 }, 0);
    scene1.to("#cloudStart-R", { x: 300 }, 0);
    scene1.to("#info", { y: 8 * speed }, 0);

    // Animate new surveillance elements in Scene 1 (Day)
    scene1.fromTo("#camera1", { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, 0);
    scene1.fromTo("#solar1", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1 }, 0.1);
    scene1.fromTo("#ai-eye", { opacity: 0, rotation: -180 }, { opacity: 0.8, rotation: 0 }, 0.2);

    /* Clouds */
    const clouds = gsap.timeline();
    ScrollTrigger.create({
      animation: clouds,
      trigger: ".scrollElement",
      start: "top top",
      end: "70% 100%",
      scrub: 1
    });

    clouds.to("#cloud1", { x: 500 }, 0);
    clouds.to("#cloud2", { x: 1000 }, 0);
    clouds.to("#cloud3", { x: -1000 }, 0);
    clouds.to("#cloud4", { x: -700, y: 25 }, 0);

    /* Sun Animation */
    const sun = gsap.timeline();
    ScrollTrigger.create({
      animation: sun,
      trigger: ".scrollElement",
      start: "1% top",
      end: "2150 100%",
      scrub: 2
    });

    sun.fromTo("#bg_grad", { attr: { cy: "-50" } }, { attr: { cy: "330" } }, 0);
    sun.to("#bg_grad stop:nth-child(2)", { attr: { offset: "0.15" } }, 0);
    sun.to("#bg_grad stop:nth-child(3)", { attr: { offset: "0.18" } }, 0);
    sun.to("#bg_grad stop:nth-child(4)", { attr: { offset: "0.25" } }, 0);
    sun.to("#bg_grad stop:nth-child(5)", { attr: { offset: "0.46" } }, 0);
    sun.to("#bg_grad stop:nth-child(6)", { attr: { "stop-color": "#FF9171" } }, 0);

    /* SCENE 2 - Sunset */
    const scene2 = gsap.timeline();
    ScrollTrigger.create({
      animation: scene2,
      trigger: ".scrollElement",
      start: "15% top",
      end: "40% 100%",
      scrub: 3
    });

    scene2.fromTo("#h2-1", { y: 500, opacity: 0 }, { y: 0, opacity: 1 }, 0);
    scene2.fromTo("#h2-2", { y: 500 }, { y: 0 }, 0.1);
    scene2.fromTo("#h2-3", { y: 700 }, { y: 0 }, 0.1);
    scene2.fromTo("#h2-4", { y: 700 }, { y: 0 }, 0.2);
    scene2.fromTo("#h2-5", { y: 800 }, { y: 0 }, 0.3);
    scene2.fromTo("#h2-6", { y: 900 }, { y: 0 }, 0.3);

    // Animate surveillance elements in Scene 2 (Sunset)
    scene2.fromTo("#camera2", { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, 0.1);
    scene2.fromTo("#solar2", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1 }, 0.2);
    scene2.fromTo("#ai-drone", { opacity: 0, x: 100 }, { opacity: 0.7, x: 0 }, 0.3);

    /* Sun Increase */
    const sun2 = gsap.timeline();
    ScrollTrigger.create({
      animation: sun2,
      trigger: ".scrollElement",
      start: "2000 top",
      end: "5000 100%",
      scrub: 2
    });

    sun2.to("#sun", { attr: { offset: "1.4" } }, 0);
    sun2.to("#bg_grad stop:nth-child(2)", { attr: { offset: "0.7" } }, 0);
    sun2.to("#sun", { attr: { "stop-color": "#ffff00" } }, 0);
    sun2.to("#bg_grad stop:nth-child(6)", { attr: { "stop-color": "#45224A" } }, 0);

    /* SCENE 3 - Night */
    if (svgRef.current) {
      const height = svgRef.current.getBBox().height;
      gsap.set("#scene3", { y: height - 40, visibility: "visible" });
      
      const sceneTransition = gsap.timeline();
      ScrollTrigger.create({
        animation: sceneTransition,
        trigger: ".scrollElement",
        start: "60% top",
        end: "bottom 100%",
        scrub: 3
      });

      sceneTransition.to("#h2-1", { y: -height - 100, scale: 1.5, transformOrigin: "50% 50%" }, 0);
      sceneTransition.to("#bg_grad", { attr: { cy: "-80" } }, 0.0);
      sceneTransition.to("#bg2", { y: 0 }, 0);

      const scene3 = gsap.timeline();
      ScrollTrigger.create({
        animation: scene3,
        trigger: ".scrollElement",
        start: "70% 50%",
        end: "bottom 100%",
        scrub: 3
      });

      scene3.fromTo("#h3-1", { y: 300 }, { y: -550 }, 0);
      scene3.fromTo("#h3-2", { y: 800 }, { y: -550 }, 0.03);
      scene3.fromTo("#h3-3", { y: 600 }, { y: -550 }, 0.06);
      scene3.fromTo("#h3-4", { y: 800 }, { y: -550 }, 0.09);
      scene3.fromTo("#h3-5", { y: 1000 }, { y: -550 }, 0.12);
      scene3.fromTo("#stars", { opacity: 0 }, { opacity: 0.5, y: -500 }, 0);
      scene3.fromTo("#arrow2", { opacity: 0 }, { opacity: 0.7, y: -710 }, 0.25);
      scene3.fromTo("#text2", { opacity: 0 }, { opacity: 0.7, y: -710 }, 0.3);
      scene3.to("#bg2-grad", { attr: { cy: 600 } }, 0);
      scene3.to("#bg2-grad", { attr: { r: 500 } }, 0);

      // Animate surveillance elements in Scene 3 (Night)
      scene3.fromTo("#camera3", { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, 0.1);
      scene3.fromTo("#solar3", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1 }, 0.2);
      scene3.fromTo("#ai-eye2", { opacity: 0.8 }, { opacity: 1, scale: 1.2 }, 0.3);
    }

    /* Falling Star */
    gsap.set("#fstar", { y: -400 });
    const fstarTL = gsap.timeline();
    ScrollTrigger.create({
      animation: fstarTL,
      trigger: ".scrollElement",
      start: "4200 top",
      end: "6000 bottom",
      scrub: 2,
      onEnter: () => gsap.set("#fstar", { opacity: 1 }),
      onLeave: () => gsap.set("#fstar", { opacity: 0 })
    });
    fstarTL.to("#fstar", { x: -700, y: -250, ease: "power2.out" }, 0);

    /* Stars Twinkling */
    const starIndices = [1, 3, 5, 7, 9, 11, 13, 15, 17];
    const delays = [0.8, 1.8, 1, 1.2, 0.5, 2, 1.1, 1.4, 1.1];
    
    starIndices.forEach((index, i) => {
      gsap.fromTo(
        `#stars circle:nth-of-type(${index})`,
        { opacity: 0.3 },
        { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: delays[i] }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div style={{ margin: 0, padding: 0, fontFamily: '"Canva Sans", Arial, Helvetica, sans-serif' }}>
      <div style={{ position: 'relative' }}>
        <svg
          ref={svgRef}
          className="parallax"
          viewBox="0 0 750 500"
          preserveAspectRatio="xMidYMax slice"
          style={{
            display: 'block',
            width: '100%',
            height: '100vh',
            position: 'fixed',
            zIndex: 3,
            top: 0,
            left: 0
          }}
        >
          <defs>
            <linearGradient id="grad1" x1="-154.32" y1="263.27" x2="-154.32" y2="374.3" gradientTransform="matrix(-1, 0, 0, 1.36, 231.36, -100.14)" gradientUnits="userSpaceOnUse">
              <stop offset="0.07" stopColor="#9c536b" />
              <stop offset="0.98" stopColor="#d98981" />
            </linearGradient>
            <radialGradient id="bg_grad" cx="375" cy="-30" r="318.69" gradientUnits="userSpaceOnUse">
              <stop offset="0.1" stopColor="#F5C54E" id="sun" />
              <stop offset="0.1" stopColor="#FFDBA6" />
              <stop offset="0.0" stopColor="#F7BB93" />
              <stop offset="0.0" stopColor="#F2995E" />
              <stop offset="0.0" stopColor="#f07560" />
              <stop offset="0.8" stopColor="#FFAB93" />
            </radialGradient>
            <radialGradient id="bg2-grad" cx="365.22" cy="500" r="631.74" gradientTransform="translate(750 552.6) rotate(180) scale(1 1.11)" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="hsla(349, 94%, 75%, 1)" />
              <stop offset="0.12" stopColor="hsla(342, 49%, 62%, 1)" />
              <stop offset="0.18" stopColor="hsla(328, 37%, 56%, 1)" />
              <stop offset="0.33" stopColor="hsla(281, 33%, 48%, 1)" />
              <stop offset="0.41" stopColor="hsla(268, 38%, 48%, 1)" />
              <stop offset="0.45" stopColor="hsla(266, 38%, 43%, 1)" />
              <stop offset="0.55" stopColor="hsla(261, 37%, 32%, 1)" />
              <stop offset="0.64" stopColor="hsla(253, 36%, 24%, 1)" />
              <stop offset="0.72" stopColor="hsla(244, 33%, 19%, 1)" />
              <stop offset="0.78" stopColor="hsla(240, 33%, 17%, 1)" />
            </radialGradient>
          </defs>

          <rect id="bg" width="750" height="500" opacity="0.8" fill="url(#bg_grad)" />

          {/* CLOUDS */}
          <g id="clouds" fill="#fefefe">
            <path id="cloud4" transform='translate(600 0)' d="M402.34,341.68c9.9-10.24,23.76-7.43,36.05-5.48C448,332,458.88,329,468.9,334c-.95-7.91,8.65-14.92,15.9-11.61-3.34-11.77,13-13.9,20.53-8.34A13.53,13.53,0,0,1,522,310.16c2.64-18.11,27.85-24.13,38.38-9.17,3.54-5.51,12.12-6.88,17.2-2.74,6.59-43.22,70.78-27.93,65.83,12.62,14.7-4.43,32,6.72,34.08,21.93,5.76-2.23,29.28,1,21.76,9.26" />
            <path id="cloud3" transform='translate(600 0)' d="M382.94,363.16c-7-10.5-18.72-9.06-28.19-4.53-12.19-6.71-26.73-11.74-39.62-3.13,1-15.45-18-25.51-28-12.41-14.59-29.67-56.68-34.41-72-3.09-1.41,4-4.73,6.07-8.1,2.88-23.13-25.66-57.12-30.25-67.73,8.21-13.05-1.88-33.42-9.15-37.47,10.07a38.08,38.08,0,0,0-36.36,2.11" />
            <path id="cloud2" transform='translate(-600 0)' d="M506.86,233.56c9.62-3.21,23.27-4,33.88-2.17,0-5.7,10.4-6.68,14-3.58,10.32-12.45,29.93-5.12,40.08,0,10.06-6.52,27.67-9.72,33.93,2.42,5.53-.13,15.88-3.23,18.8,2.94a31.53,31.53,0,0,1,18.21.64" />
            <path id="cloud1" transform='translate(-600 0)' d="M402.18,271.3c-7.57-7.46-18.46-7.52-28.05-5.3-6.75-8.79-20.54-13.18-27.24-1.45-10.4-11.06-30.66-24.2-37.74-2.24a13.1,13.1,0,0,0-17.76,1.47c-11.23-25.69-58.46-41.29-64.24-4.06-9-8.26-20.15-2.62-27.47,4.4-11-2.87-22.18-7.58-31.72,2.7-8.44-.75-18.1-2.8-24.71,4.57" />
          </g>

          {/* SCENE 1 - Day Hills */}
          <g id="scene1">
            <path id="cloudStart-L" style={{ fill: '#fff', opacity: 0 }} d="m71.1,92.9c-.1,0-.3.2-.4.3-1.9-8.3-13.5-3.3-13.9,2.6.2,1.8,1.2,6.2-2.3,6.3-5.6-2.6-5.5.3-9.8,2.7-2.6-2.5-10-.6-9.9,3.4,49.8-1.3,91.9-1.8,126.3-1.6" />
            <path id="cloudStart-R" style={{ fill: '#fff', opacity: 0 }} d="m710.3,103c0,1,1.2,1.6,2.2,1.2,17.9,1.7,6.4-8.6-2.2-1.2m-33.1-20.8c1.3-14.4-17.6-14.4-23.3-4" />
            <path id="cloudsBig-L" d="M286.9,293.2c-94.4,24-191.8,46.4-288.9,41.9v-162.1c13.2,4.6,24.7,14.5,30.1,27.5" style={{ fill: '#fff', opacity: 0.5 }} />
            <path id="cloudsBig-R" d="m797.3,100.5l26.8,179.4c-163.5,24.8-334,76.2-497.6,41.2" style={{ fill: '#fff', opacity: 0.5 }} />
            
            {/* Hills - using gradients for natural look */}
            <ellipse id="h1-6" cx="200" cy="400" rx="300" ry="120" fill="#8B7355" opacity="0.6" />
            <ellipse id="h1-5" cx="500" cy="420" rx="280" ry="100" fill="#9D8B6C" opacity="0.7" />
            <ellipse id="h1-4" cx="100" cy="430" rx="250" ry="90" fill="#7A6952" opacity="0.65" />
            <ellipse id="h1-3" cx="600" cy="440" rx="270" ry="95" fill="#A89878" opacity="0.75" />
            <ellipse id="h1-2" cx="350" cy="450" rx="320" ry="110" fill="#6B5D4F" opacity="0.8" />
            <ellipse id="h1-1" cx="400" cy="470" rx="400" ry="130" fill="#5A4E42" opacity="0.9" />

            {/* Surveillance Elements - Camera, Solar, AI Eye */}
            <image id="camera1" href="https://img.icons8.com/color/48/security-camera.png" x="150" y="320" width="48" height="48" opacity="0" />
            <image id="solar1" href="https://img.icons8.com/color/48/solar-panel.png" x="450" y="340" width="48" height="48" opacity="0" />
            <image id="ai-eye" href="https://img.icons8.com/color/48/eye.png" x="600" y="300" width="48" height="48" opacity="0" />

            {/* Info Text */}
            <g id="info">
              <polygon id="arrow" points="353.93 368.91 356.06 366.79 374.26 385 392.47 366.79 394.59 368.91 374.26 389.24 353.93 368.91" fill="#fff" stroke="#231f20" strokeMiterlimit="10" strokeWidth="0.5" />
              <text id="text" x="375" y="355" fill="#fff" fontSize="24" fontWeight="bold" textAnchor="middle" stroke="#231f20" strokeWidth="0.5">Scroll Down</text>
            </g>
          </g>

          {/* SCENE 2 - Sunset Hills */}
          <g id="scene2">
            <ellipse id="h2-6" cx="650" cy="380" rx="150" ry="60" fill="#8B5A6B" opacity="0.7" />
            <ellipse id="h2-5" cx="150" cy="400" rx="180" ry="70" fill="#9B6A7B" opacity="0.75" />
            <ellipse id="h2-4" cx="450" cy="390" rx="200" ry="80" fill="#7B4A5B" opacity="0.8" />
            <ellipse id="h2-3" cx="300" cy="420" rx="220" ry="85" fill="#AB7A8B" opacity="0.85" />
            <ellipse id="h2-2" cx="550" cy="440" rx="250" ry="95" fill="#6B3A4B" opacity="0.9" />
            <ellipse id="h2-1" cx="375" cy="460" rx="350" ry="120" fill="#5B2A3B" opacity="0.95" />

            {/* Surveillance Elements - Additional Camera, Solar, AI Drone */}
            <image id="camera2" href="https://img.icons8.com/color/48/security-camera.png" x="250" y="350" width="48" height="48" opacity="0" />
            <image id="solar2" href="https://img.icons8.com/color/48/solar-panel.png" x="500" y="360" width="48" height="48" opacity="0" />
            <image id="ai-drone" href="https://img.icons8.com/color/48/drone.png" x="550" y="280" width="48" height="48" opacity="0" />
          </g>

          {/* SCENE 3 - Night Sky */}
          <g id="scene3" style={{ visibility: 'hidden' }}>
            <rect id="bg2" y="-59.8" width="750" height="612.4" transform="translate(750 492.8) rotate(180)" fill="url(#bg2-grad)" />
            
            {/* Falling Star */}
            <g id="fstar">
              <circle cx="768.6" cy="78.72" r="10" fill="#fff" opacity="0.8" />
            </g>

            {/* Stars */}
            <g id="stars" fill="#fff" style={{ opacity: 0 }}>
              <circle cx="699" cy="128" r="1" />
              <circle cx="643" cy="37" r="1" />
              <circle cx="665" cy="139" r="1.5" />
              <circle cx="636" cy="77" r="1.5" />
              <circle cx="713" cy="31" r="1.5" />
              <circle cx="468" cy="65" r="1.5" />
              <circle cx="708" cy="97" r="1.5" />
              <circle cx="711" cy="170" r="1.5" />
              <circle cx="676" cy="260" r="1.5" />
              <circle cx="729" cy="208" r="1.5" />
              <circle cx="445" cy="234" r="1.5" />
              <circle cx="521" cy="200" r="1.5" />
              <circle cx="623" cy="167" r="1.5" />
              <circle cx="561" cy="139" r="1.5" />
              <circle cx="370" cy="86" r="1.5" />
              <circle cx="473" cy="34" r="1.5" />
              <circle cx="397" cy="28" r="1.5" />
              <circle cx="447" cy="192" r="1.5" />
            </g>

            {/* Night Hills */}
            <ellipse id="h3-5" cx="550" cy="420" rx="200" ry="80" fill="#3B2A5B" opacity="0.7" />
            <ellipse id="h3-4" cx="200" cy="440" rx="180" ry="70" fill="#4B3A6B" opacity="0.75" />
            <ellipse id="h3-3" cx="450" cy="450" rx="220" ry="90" fill="#2B1A4B" opacity="0.8" />
            <ellipse id="h3-2" cx="600" cy="460" rx="250" ry="100" fill="#5B4A7B" opacity="0.85" />
            <ellipse id="h3-1" cx="300" cy="480" rx="300" ry="120" fill="#1B0A3B" opacity="0.9" />

            {/* Surveillance Elements - Night Camera, Solar, Enhanced AI Eye */}
            <image id="camera3" href="https://img.icons8.com/color/48/security-camera.png" x="350" y="380" width="48" height="48" opacity="0" />
            <image id="solar3" href="https://img.icons8.com/color/48/solar-panel.png" x="100" y="400" width="48" height="48" opacity="0" />
            <image id="ai-eye2" href="https://img.icons8.com/color/48/eye.png" x="650" y="320" width="48" height="48" opacity="0.8" />

            {/* Scroll Back Info */}
            <g id="info2">
              <polygon id="arrow2" points="395.5 482.2 393.4 484.3 375.2 466.1 357 484.3 354.9 482.2 375.2 461.9 395.5 482.2" style={{ fill: '#fff', stroke: '#231f20', strokeMiterlimit: 10, strokeWidth: '.5px' }} />
              <text id="text2" x="375" y="530" fill="#fff" fontSize="18" textAnchor="middle" stroke="#231f20" strokeWidth="0.5">Scroll Back</text>
            </g>
          </g>
        </svg>

        <div
          ref={scrollElementRef}
          className="scrollElement"
          style={{
            position: 'absolute',
            height: '6000px',
            width: '100%',
            top: 0,
            zIndex: 4
          }}
        />

        <a
          href="https://example.com/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'fixed',
            bottom: '5%',
            left: '100px',
            border: '1px solid #fff',
            borderRadius: '5px',
            fontSize: '0.9rem',
            padding: '0.5rem 0.7em',
            backgroundColor: 'transparent',
            color: '#ffffff',
            fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
            cursor: 'pointer',
            transition: 'all .3s',
            zIndex: 11,
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ffffff';
            e.currentTarget.style.color = '#1B1734';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#ffffff';
          }}
        >
          My Portfolio
        </a>

        <a
          href="https://example.com/new"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'fixed',
            bottom: '5%',
            right: '100px',
            border: '1px solid #fff',
            borderRadius: '5px',
            fontSize: '0.9rem',
            padding: '0.5rem 0.7em',
            backgroundColor: 'transparent',
            color: '#ffffff',
            fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
            cursor: 'pointer',
            transition: 'all .3s',
            zIndex: 11,
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ffffff';
            e.currentTarget.style.color = '#1B1734';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#ffffff';
          }}
        >
          New Version
        </a>
      </div>
    </div>
  );
};

export default ParallaxScroll;