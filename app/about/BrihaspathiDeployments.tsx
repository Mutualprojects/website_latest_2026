"use client";

import React from "react";
import styled from "styled-components";

/* ================= BRAND ================= */
const BRAND = "#07518a";
const BRAND_DARK = "#053a63";
const BRAND_LIGHT = "#0a6fbf";

/* ================= DATA ================= */
type Deployment = {
  title: string;
  description: string;
  ribbon: string;
};

const DEPLOYMENTS: Deployment[] = [
  {
    title: "Border Security",
    description:
      "Secured international borders with 674 cameras for the Border Security Force (BSF), enabling real-time monitoring and enhanced perimeter intelligence.",
    ribbon: "National Security",
  },
  {
    title: "Democratic Integrity",
    description:
      "Deployed 100,000+ cameras for the General Elections 2024, enabling real-time webcasting and transparent electoral monitoring at national scale.",
    ribbon: "Elections 2024",
  },
  {
    title: "Educational Security",
    description:
      "Managed large-scale surveillance for NEET-NTA 2025 (65,000+ cameras) and MHCET (4,500+ cameras), ensuring exam integrity and compliance.",
    ribbon: "Examinations",
  },
  {
    title: "Wildlife Conservation",
    description:
      "Implemented futuristic thermal imaging and ANPR systems at Kaziranga National Park to protect wildlife and monitor restricted zones.",
    ribbon: "Conservation",
  },
  {
    title: "Smart Infrastructure",
    description:
      "Awarded major solar projects (5MW) and ICCC maintenance for MSRTC and REIL, powering intelligent and sustainable public infrastructure.",
    ribbon: "Smart Cities",
  },
  {
    title: "ICCC & Command Centers",
    description:
      "Delivered integrated command-and-control operations with centralized monitoring, incident workflows, and analytics to support faster decision-making for city-scale deployments.",
    ribbon: "ICCC Operations",
  },
  {
    title: "Critical Public Facilities",
    description:
      "Deployed surveillance and access-control ecosystems for high-footfall public facilities, ensuring perimeter safety, controlled entry, and continuous monitoring.",
    ribbon: "Public Safety",
  },
  {
    title: "Enterprise & Banking Security",
    description:
      "Implemented compliant, audit-ready security infrastructure for enterprise and banking environments, enabling branch monitoring, incident traceability, and operational reliability.",
    ribbon: "BFSI",
  },
];

/* ================= COMPONENT ================= */
const BrihaspathiDeployments: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="grid-container">
        {DEPLOYMENTS.map((item, index) => (
          <div className="card_box" key={index}>
            <span data-ribbon={item.ribbon} />
            <div className="card_content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
};

/* ================= STYLES ================= */
const StyledWrapper = styled.section`
  width: 100%;
  padding: 5rem 2rem;
  background: #f6f8fb;
  display: flex;
  justify-content: center;

  .grid-container {
    width: 100%;
    max-width: 1300px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2.5rem;
  }

  /* Responsive */
  @media (max-width: 1200px) {
    .grid-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .grid-container {
      grid-template-columns: 1fr;
    }
  }

  .card_box {
    height: 320px;
    border-radius: 22px;
    background: linear-gradient(
      160deg,
      ${BRAND_LIGHT} 0%,
      ${BRAND} 55%,
      ${BRAND_DARK} 100%
    );
    position: relative;
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
    cursor: default;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    padding: 2rem;
    display: flex;
    align-items: flex-end;
  }

  .card_box:hover {
    transform: translateY(-6px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.45);
  }

  .card_content {
    color: #ffffff;
    z-index: 2;
  }

  .card_content h3 {
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: 0.6rem;
    letter-spacing: 0.01em;
  }

  .card_content p {
    font-size: 0.88rem;
    line-height: 1.5;
    color: #e3edf7;
  }

  /* ================= RIBBON ================= */
  .card_box span {
    position: absolute;
    overflow: hidden;
    width: 150px;
    height: 150px;
    top: -12px;
    left: -12px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
  }

  .card_box span::before {
    content: attr(data-ribbon);
    position: absolute;
    width: 160%;
    height: 38px;
    background-image: linear-gradient(
      45deg,
      #ffffff 0%,
      #dbe9f5 40%,
      ${BRAND_LIGHT} 100%
    );
    transform: rotate(-45deg) translateY(-18px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${BRAND_DARK};
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-size: 0.65rem;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
  }

  .card_box span::after {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    bottom: 0;
    left: 0;
    z-index: -1;
    box-shadow: 142px -142px ${BRAND_DARK};
    background: ${BRAND_DARK};
  }
`;

export default BrihaspathiDeployments;
