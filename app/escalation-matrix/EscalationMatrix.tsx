"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  Check,
  PhoneCall,
  MapPin,
  Globe,
  Headphones,
  Wrench,
  Settings,
  Crown,
  MessageSquare,
  Cog,
  PieChart,
  Trophy,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Level {
  level: number;
  name: string;
  designation: string;
  contact: string;
  email: string;
  icon: LucideIcon;
  sideIcon: LucideIcon;
  align: "left" | "right";
  description: string;

}

// ─── Brand Constants ──────────────────────────────────────────────────────────

const PRIMARY       = "#07518a";
const PRIMARY_DARK  = "#053d6b";
const PRIMARY_HOVER = "#0a6aad";
const PRIMARY_LIGHT = "#e8f2fa";
const CARD_BG       = "#07518a";   // all cards same colour
const CARD_BORDER   = "#0a6aad";
const BADGE_BG      = "#053d6b";   // slightly darker for step badge

// ─── Data ─────────────────────────────────────────────────────────────────────

const levels: Level[] = [
  {
    level: 1,
    name: "K. Rupa",
    designation: "Senior Technical Support Executive",
    contact: "9676031111",
    email: "support@brihaspathi.com",
    icon: Headphones,
    sideIcon: MessageSquare,
    align: "left",
    description:
      "First point of contact for all technical queries and general support requests.",
  },
  {
    level: 2,
    name: "K. Pavan Kalyan",
    designation: "Senior Technical Support Executive",
    contact: "7671026689",
    email: "support@brihaspathi.com",
    icon: Wrench,
    sideIcon: Cog,
    align: "right",
    description:
      "Escalated technical issues and advanced troubleshooting for complex problems.",
  },
  {
    level: 3,
    name: "Kiran Sanaboina",
    designation: "General Manager – Technical Team",
    contact: "9989992880",
    email: "support@brihaspathi.com",
    icon: Settings,
    sideIcon: PieChart,
    align: "left",
    description:
      "Critical issues requiring managerial intervention and strategic resolution.",
  },
  {
    level: 4,
    name: "Madhu Kuppani",
    designation: "Chief Operating Officer – Retail Sales",
    contact: "9676212345",
    email: "vp@brihaspathi.com",
    icon: Crown,
    sideIcon: Trophy,
    align: "right",
    description:
      "Executive escalation for unresolved critical matters at the highest level.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function EscalationMatrix(): React.ReactElement {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (
    text: string,
    field: string,
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f4f8",
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        .step-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .step-card:hover {
          transform: translateY(-4px) scale(1.007);
          box-shadow: 0 22px 56px rgba(7,81,138,0.38) !important;
        }

        .pill-btn {
          transition: background 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
          cursor: pointer;
        }
        .pill-btn:hover {
          opacity: 0.88;
          transform: scale(1.03);
        }

        .call-btn {
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        .call-btn:hover {
          background: #f0f4f8 !important;
          transform: scale(1.04) !important;
          box-shadow: 0 6px 18px rgba(255,255,255,0.30) !important;
        }

        .hero-badge { animation: fadeDown 0.55s ease both; }
        .hero-title { animation: fadeDown 0.65s ease 0.08s both; }
        .hero-sub   { animation: fadeDown 0.65s ease 0.16s both; }
        .hero-pills { animation: fadeDown 0.65s ease 0.24s both; }

        @media (max-width: 860px) {
          .hero-inner  { flex-direction: column !important; }
          .hero-video  { display: none !important; }
          .step-row    { justify-content: center !important; }
          .side-icon   { display: none !important; }
          .pill-card   { flex: 0 1 100% !important; border-radius: 24px !important; }
          .badge-circle { width: 74px !important; height: 74px !important; }
          .contact-row { flex-wrap: wrap !important; }
        }

        @media (max-width: 480px) {
          .hero-section  { padding: 36px 16px 50px !important; }
          .steps-section { padding: 36px 16px 52px !important; }
          .footer-inner  { flex-direction: column !important; gap: 8px !important; text-align: center; }
          .footer-sep    { display: none !important; }
        }
      `}</style>

      {/* ══════════════════════
          HERO
      ══════════════════════ */}
      <div
        className="hero-section"
        style={{
          background: `linear-gradient(135deg, ${PRIMARY_DARK} 0%, ${PRIMARY} 55%, #0e6db5 100%)`,
          padding: "64px 24px 76px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* dot grid */}
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* glow blob */}
        <div
          style={{
            position: "absolute", top: "-120px", right: "-120px",
            width: "440px", height: "440px",
            background: "rgba(255,255,255,0.04)",
            borderRadius: "50%", pointerEvents: "none",
          }}
        />

        <div
          className="hero-inner"
          style={{
            maxWidth: "1100px", margin: "0 auto",
            display: "flex", alignItems: "center",
            gap: "52px", flexWrap: "wrap",
            position: "relative", zIndex: 1,
          }}
        >
          {/* left */}
          <div style={{ flex: "1 1 340px", minWidth: 0 }}>
            <div
              className="hero-badge"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "40px", padding: "6px 18px",
                fontSize: "11px", fontWeight: 700,
                color: "#fff", letterSpacing: "2px",
                textTransform: "uppercase" as const, marginBottom: "22px",
              }}
            >
              <ShieldCheck size={13} />
              Brihaspathi Technologies
            </div>

            <h1
              className="hero-title"
              style={{
                fontSize: "clamp(28px, 5.5vw, 52px)",
                fontWeight: 900, color: "#fff",
                margin: "0 0 18px", lineHeight: 1.1, letterSpacing: "-1px",
              }}
            >
              Support{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #7dd3fc, #38bdf8, #7dd3fc)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmer 3s linear infinite",
                }}
              >
                Escalation
              </span>
              <br />Matrix
            </h1>

            <p
              className="hero-sub"
              style={{
                color: "rgba(255,255,255,0.72)",
                fontSize: "15px", lineHeight: 1.75,
                margin: "0 0 30px", maxWidth: "440px",
              }}
            >
              A clear path to resolution. Contact the right expert instantly
              and keep your operations running smoothly.
            </p>

            <div
              className="hero-pills"
              style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
            >
              {[
                { Icon: Zap,          label: "4 Escalation Levels" },
                { Icon: ShieldCheck,  label: "24 / 7 Support"       },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    background: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(255,255,255,0.20)",
                    borderRadius: "30px", padding: "8px 18px",
                    color: "#fff", fontSize: "13px", fontWeight: 600,
                  }}
                >
                  <Icon size={14} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* right – video */}
          <div className="hero-video" style={{ flex: "1 1 380px", minWidth: 0 }}>
            <div
              style={{
                borderRadius: "20px", overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,0.40)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <video autoPlay loop muted playsInline
                style={{ width: "100%", height: "auto", display: "block" }}
              >
                <source
                  src="https://ik.imagekit.io/ynh4hdbml/0_customer_Service_technical_Support_1920x1080.mp4?tr=orig"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>

        {/* wave divider */}
        <div
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "46px", background: "#f0f4f8",
            clipPath: "ellipse(55% 100% at 50% 100%)",
          }}
        />
      </div>

      {/* ══════════════════════
          STEPS
      ══════════════════════ */}
      <div
        className="steps-section"
        style={{
          maxWidth: "980px", margin: "0 auto",
          padding: "60px 24px 68px",
        }}
      >
        {/* section header */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <p
            style={{
              fontSize: "12px", fontWeight: 700,
              letterSpacing: "3px", color: PRIMARY,
              textTransform: "uppercase" as const, margin: "0 0 10px",
            }}
          >
            Contact Hierarchy
          </p>
          <h2
            style={{
              fontSize: "clamp(20px, 4vw, 30px)",
              fontWeight: 800, color: "#1a2744",
              margin: 0, letterSpacing: "-0.5px",
            }}
          >
            Reach the Right Person, Every Time
          </h2>
        </div>

        {/* cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {levels.map((item, index) => {
            const isLeft        = item.align === "left";
            const SideIconComp  = item.sideIcon;

            return (
              <div key={item.level} style={{ position: "relative" }}>

                {/* row */}
                <div
                  className="step-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isLeft ? "flex-start" : "flex-end",
                    gap: "24px",
                  }}
                >
                  {/* side icon — left when right-aligned card */}
                  {!isLeft && (
                    <div
                      className="side-icon"
                      style={{
                        width: "62px", height: "62px",
                        background: CARD_BG,
                        borderRadius: "16px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: `0 8px 24px rgba(7,81,138,0.35)`,
                        flexShrink: 0,
                        border: `2px solid ${CARD_BORDER}`,
                      }}
                    >
                      <SideIconComp size={28} color="#fff" />
                    </div>
                  )}

                  {/* ── PILL CARD ── */}
                  <div
                    className="step-card pill-card"
                    style={{
                      flex: "0 1 740px",
                      background: CARD_BG,
                      borderRadius: "72px",
                      boxShadow: `0 12px 40px rgba(7,81,138,0.28)`,
                      border: `2px solid ${CARD_BORDER}`,
                      position: "relative",
                      overflow: "visible",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        minHeight: "100px",
                      }}
                    >
                      {/* ── STEP BADGE ── */}
                      <div
                        className="badge-circle"
                        style={{
                          width: "100px", height: "100px",
                          borderRadius: "50%",
                          background: BADGE_BG,
                          border: `4px solid rgba(255,255,255,0.20)`,
                          display: "flex", flexDirection: "column",
                          alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                          marginLeft:  isLeft ? "-4px" : "auto",
                          marginRight: isLeft ? "auto"  : "-4px",
                          order: isLeft ? 0 : 2,
                          boxShadow: "0 0 0 6px rgba(255,255,255,0.08)",
                          zIndex: 1,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "9px", fontWeight: 800,
                            color: "rgba(255,255,255,0.70)",
                            letterSpacing: "2.5px",
                            textTransform: "uppercase" as const,
                            lineHeight: 1, marginBottom: "4px",
                          }}
                        >
                          STEP
                        </span>
                        <span
                          style={{
                            fontSize: "32px", fontWeight: 900,
                            color: "#ffffff", lineHeight: 1,
                          }}
                        >
                          0{item.level}
                        </span>
                      </div>

                      {/* ── TEXT ── */}
                      <div
                        style={{
                          flex: 1,
                          padding: isLeft
                            ? "22px 30px 22px 26px"
                            : "22px 26px 22px 30px",
                          order: 1,
                          textAlign: isLeft ? "left" : ("right" as const),
                        }}
                      >
                        <div
                          style={{
                            fontSize: "10px", fontWeight: 700,
                            letterSpacing: "2.5px",
                            color: "rgba(255,255,255,0.60)",
                            textTransform: "uppercase" as const,
                            marginBottom: "5px",
                          }}
                        >
                          Level {item.level} Support
                        </div>

                        <div
                          style={{
                            fontSize: "18px", fontWeight: 800,
                            color: "#ffffff", marginBottom: "3px",
                          }}
                        >
                          {item.name}
                        </div>

                        <div
                          style={{
                            fontSize: "13px", fontWeight: 600,
                            color: "rgba(255,255,255,0.80)",
                            marginBottom: "8px",
                          }}
                        >
                          {item.designation}
                        </div>

                        <div
                          style={{
                            fontSize: "12px",
                            color: "rgba(255,255,255,0.60)",
                            lineHeight: 1.65, marginBottom: "16px",
                          }}
                        >
                          {item.description}
                        </div>

                        {/* contact buttons */}
                        <div
                          className="contact-row"
                          style={{
                            display: "flex", gap: "10px",
                            flexWrap: "wrap", alignItems: "center",
                            justifyContent: isLeft ? "flex-start" : "flex-end",
                          }}
                        >
                          {/* Phone copy */}
                          <button
                            className="pill-btn"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                              handleCopy(item.contact, `ph-${item.level}`, e)
                            }
                            style={{
                              display: "flex", alignItems: "center", gap: "8px",
                              background: "rgba(255,255,255,0.12)",
                              border: "1.5px solid rgba(255,255,255,0.25)",
                              borderRadius: "30px", padding: "8px 18px",
                              fontSize: "13px", fontWeight: 700,
                              color: "#fff",
                            }}
                          >
                            {copiedField === `ph-${item.level}`
                              ? <Check size={14} />
                              : <Phone size={14} />
                            }
                            {copiedField === `ph-${item.level}`
                              ? "Copied!"
                              : item.contact
                            }
                          </button>

                          {/* Email copy */}
                          <button
                            className="pill-btn"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                              handleCopy(item.email, `em-${item.level}`, e)
                            }
                            style={{
                              display: "flex", alignItems: "center", gap: "8px",
                              background: "rgba(255,255,255,0.12)",
                              border: "1.5px solid rgba(255,255,255,0.25)",
                              borderRadius: "30px", padding: "8px 18px",
                              fontSize: "13px", fontWeight: 700,
                              color: "#fff",
                            }}
                          >
                            {copiedField === `em-${item.level}`
                              ? <Check size={14} />
                              : <Mail size={14} />
                            }
                            {copiedField === `em-${item.level}`
                              ? "Copied!"
                              : item.email
                            }
                          </button>

                          {/* Call Now */}
                          <a
                            href={`tel:${item.contact}`}
                            onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                              e.stopPropagation()
                            }
                            className="call-btn"
                            style={{
                              display: "inline-flex", alignItems: "center", gap: "8px",
                              background: "#ffffff",
                              color: PRIMARY,
                              borderRadius: "30px", padding: "8px 22px",
                              textDecoration: "none",
                              fontSize: "13px", fontWeight: 800,
                              boxShadow: "0 4px 14px rgba(255,255,255,0.25)",
                              letterSpacing: "0.2px",
                            }}
                          >
                            <PhoneCall size={14} />
                            Call Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* side icon — right when left-aligned card */}
                  {isLeft && (
                    <div
                      className="side-icon"
                      style={{
                        width: "62px", height: "62px",
                        background: CARD_BG,
                        borderRadius: "16px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: `0 8px 24px rgba(7,81,138,0.35)`,
                        flexShrink: 0,
                        border: `2px solid ${CARD_BORDER}`,
                      }}
                    >
                      <SideIconComp size={28} color="#fff" />
                    </div>
                  )}
                </div>

                {/* connector */}
                {index < levels.length - 1 && (
                  <div
                    style={{
                      display: "flex", justifyContent: "center",
                      padding: "14px 0",
                    }}
                  >
                    <div
                      style={{
                        width: "2px", height: "34px",
                        background: `linear-gradient(to bottom, ${PRIMARY}, ${PRIMARY_HOVER})`,
                        borderRadius: "4px", opacity: 0.35,
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════
          FOOTER
      ══════════════════════ */}
      <footer
        style={{
          background: "#ffffff",
          borderTop: `3px solid ${PRIMARY_LIGHT}`,
          padding: "28px 24px",
        }}
      >
        <div
          className="footer-inner"
          style={{
            maxWidth: "980px", margin: "0 auto",
            display: "flex", flexWrap: "wrap",
            gap: "16px", justifyContent: "center", alignItems: "center",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "#5a6a8a", fontSize: "13px" }}>
            <MapPin size={15} color={PRIMARY} />
            #501, #508-510, Shangrila Plaza, Park View Enclave, Banjara Hills, Hyderabad, Telangana 500034
          </span>

          <span className="footer-sep" style={{ color: "#d1d5db" }}>|</span>

          <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "#5a6a8a", fontSize: "13px" }}>
            <Phone size={15} color={PRIMARY} />
            +91 98858 88835
          </span>

          <span className="footer-sep" style={{ color: "#d1d5db" }}>|</span>

          <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "#5a6a8a", fontSize: "13px" }}>
            <Globe size={15} color={PRIMARY} />
            www.brihaspathi.com
          </span>
        </div>
      </footer>
    </div>
  );
}