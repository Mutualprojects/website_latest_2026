import React from "react";
import BrochureViewer from "./brochureset";

const bannerCSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

.bn-banner {
  position: relative;
  width: 100%;
  background: linear-gradient(135deg, #032f54 0%, #07518a 52%, #0a6eb8 100%);
  padding: 72px 24px 80px;
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;
}

/* animated grid overlay */
.bn-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 52px 52px;
  pointer-events: none;
}

/* glowing orbs */
.bn-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
}
.bn-orb-1 {
  width: 480px; height: 480px;
  background: rgba(91, 192, 255, 0.16);
  top: -160px; right: -100px;
  animation: bn-float1 8s ease-in-out infinite;
}
.bn-orb-2 {
  width: 320px; height: 320px;
  background: rgba(255, 255, 255, 0.07);
  bottom: -80px; left: 6%;
  animation: bn-float2 10s ease-in-out infinite;
}
.bn-orb-3 {
  width: 200px; height: 200px;
  background: rgba(14, 165, 233, 0.12);
  top: 30%; left: 40%;
  animation: bn-float1 12s ease-in-out infinite reverse;
}
@keyframes bn-float1 {
  0%, 100% { transform: translateY(0px) scale(1); }
  50%       { transform: translateY(-22px) scale(1.04); }
}
@keyframes bn-float2 {
  0%, 100% { transform: translateY(0px) scale(1); }
  50%       { transform: translateY(18px) scale(0.97); }
}

/* inner content */
.bn-inner {
  position: relative;
  z-index: 1;
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

/* left block */
.bn-left { flex: 1 1 480px; }

.bn-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  padding: 5px 15px;
  border-radius: 100px;
  color: rgba(255,255,255,0.9);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 24px;
}
.bn-dot {
  width: 6px; height: 6px;
  background: #4ade80;
  border-radius: 50%;
  animation: bn-pulse 2s ease-in-out infinite;
}
@keyframes bn-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.45; transform: scale(0.7); }
}

.bn-h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.18;
  letter-spacing: -0.02em;
  margin: 0 0 16px 0;
}
.bn-h1 span {
  background: linear-gradient(90deg, #7dd3f8, #bfdbfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.bn-desc {
  color: rgba(255,255,255,0.65);
  font-size: 15px;
  font-weight: 300;
  line-height: 1.8;
  margin: 0 0 34px 0;
  max-width: 480px;
}

.bn-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
.bn-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 13px 26px;
  background: #ffffff;
  color: #07518a;
  border: none;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(0,0,0,0.18);
  transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
}
.bn-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.24);
  background: #edf6ff;
}
.bn-btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 13px 26px;
  background: rgba(255,255,255,0.09);
  color: #ffffff;
  border: 1px solid rgba(255,255,255,0.24);
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  backdrop-filter: blur(8px);
  text-decoration: none;
  transition: background 0.22s ease, border-color 0.22s ease, transform 0.22s ease;
}
.bn-btn-ghost:hover {
  background: rgba(255,255,255,0.17);
  border-color: rgba(255,255,255,0.4);
  transform: translateY(-2px);
}

/* right block — floating card */
.bn-right { flex: 0 1 300px; }

.bn-card {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  backdrop-filter: blur(14px);
  border-radius: 20px;
  padding: 28px 24px;
  animation: bn-float2 7s ease-in-out infinite;
}
.bn-card-title {
  font-family: 'Playfair Display', serif;
  font-size: 15px;
  font-weight: 700;
  color: rgba(255,255,255,0.9);
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}
.bn-card-title::before {
  content: '';
  display: block;
  width: 20px; height: 2px;
  background: #4ade80;
  border-radius: 2px;
  flex-shrink: 0;
}
.bn-features {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.bn-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255,255,255,0.8);
  font-size: 13px;
  font-weight: 400;
}
.bn-feat-icon {
  width: 32px; height: 32px;
  border-radius: 9px;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.16);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 15px;
}

/* bottom wave */
.bn-wave {
  position: absolute;
  bottom: -1px; left: 0; right: 0;
  height: 52px;
  overflow: hidden;
  pointer-events: none;
}
.bn-wave svg { display: block; width: 100%; height: 100%; }

@media (max-width: 768px) {
  .bn-banner { padding: 52px 16px 68px; }
  .bn-right   { display: none; }
}
`;

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: bannerCSS }} />

      {/* ── Banner ── */}
      <div className="bn-banner">
        <div className="bn-grid" />
        <div className="bn-orb bn-orb-1" />
        <div className="bn-orb bn-orb-2" />
        <div className="bn-orb bn-orb-3" />

        <div className="bn-inner">

          {/* Left */}
          <div className="bn-left">
            <div className="bn-badge">
              <span className="bn-dot" />
              Official Company Document
            </div>

            <h1 className="bn-h1">
              Brihaspathi <span>Technology</span>
              <br />
              Official Brochure
            </h1>

            <p className="bn-desc">
              Discover our full range of security, surveillance and technology
              solutions. Trusted by 12,000+ clients across India and beyond —
              all in one comprehensive brochure.
            </p>

            <div className="bn-ctas">
              <a
                href="https://ik.imagekit.io/cbrrjodcw/brihaspathi-technology-brochure.pdf"
                download="Brihaspathi-Technology-Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bn-btn-primary"
              >
                {/* download icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Brochure
              </a>

              <a href="#brochure-viewer" className="bn-btn-ghost">
                {/* eye icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                Preview Below
                {/* chevron */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right floating card */}
          <div className="bn-right">
            <div className="bn-card">
              <p className="bn-card-title">What's Inside</p>
              <ul className="bn-features">
                {[
                  { icon: "🔒", text: "Security & Surveillance Solutions" },
                  { icon: "📡", text: "Networking & IT Infrastructure" },
                  { icon: "🏗️", text: "Project Case Studies" },
                  { icon: "🤝", text: "Service & Support Plans" },
                  { icon: "🌐", text: "Global Client Portfolio" },
                  { icon: "📋", text: "Product Specifications" },
                ].map(({ icon, text }) => (
                  <li key={text} className="bn-feature">
                    <span className="bn-feat-icon">{icon}</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Wave bottom */}
        <div className="bn-wave">
          <svg viewBox="0 0 1440 52" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,32 C240,52 480,12 720,32 C960,52 1200,12 1440,32 L1440,52 L0,52 Z"
              fill="#f0f5fa"
            />
          </svg>
        </div>
      </div>

      {/* ── Brochure Viewer ── */}
      <div id="brochure-viewer">
        <BrochureViewer />
      </div>
    </>
  );
}