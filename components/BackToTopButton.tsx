"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";

const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  // 👀 Show "Back to Top" after scrolling
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // ⬆️ Scroll to Top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ⬇️ Scroll Down (250vh)
  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight * 2.5, // ✅ 250vh scroll
      behavior: "smooth",
    });
  };

  return (
    <Wrapper>
      {/* ⬆️ Back to Top */}
      {visible && (
        <button className="button" onClick={scrollToTop} aria-label="Scroll to top">
          <svg viewBox="0 0 384 512" className="icon">
            <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
          </svg>
        </button>
      )}

      {/* ⬇️ Scroll Down */}
      <button className="button" onClick={scrollDown} aria-label="Scroll down">
        <svg viewBox="0 0 384 512" className="icon">
          <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v306.8L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
          </svg>
        </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  bottom: 120px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 999;

  .button {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;

    background: linear-gradient(135deg, #0a5f9e, #07518a);
    box-shadow: 0 8px 24px rgba(7, 81, 138, 0.35);

    cursor: pointer;
    transition: all 0.3s ease;
  }

  .icon {
    width: 14px;
  }

  .icon path {
    fill: #ffffff;
  }

  .button:hover {
    transform: scale(1.1);
  }

  /* 📱 Mobile */
  @media (max-width: 640px) {
    bottom: 16px;

    .button {
      width: 44px;
      height: 44px;
    }
  }
`;

export default BackToTopButton;