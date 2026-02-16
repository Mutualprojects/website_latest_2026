"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";

const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  // Show button after scrolling
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <StyledWrapper>
      <button
        className="button"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 384 512" className="svgIcon">
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;

  .button {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0a5f9e, #07518a);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(7, 81, 138, 0.35);
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
    position: relative;
  }

  .svgIcon {
    width: 14px;
    transition: transform 0.3s ease;
  }

  .svgIcon path {
    fill: #ffffff;
  }

  .button:hover {
    width: 150px;
    border-radius: 40px;
  }

  .button:hover .svgIcon {
    transform: translateY(-200%);
  }

  .button::before {
    content: "Back to Top";
    position: absolute;
    color: #ffffff;
    font-size: 0;
    opacity: 0;
    transition: all 0.3s ease;
  }

  .button:hover::before {
    font-size: 14px;
    opacity: 1;
  }

  /* 📱 Mobile responsiveness */
  @media (max-width: 640px) {
    bottom: 16px;
    right: 16px;

    .button {
      width: 44px;
      height: 44px;
    }

    .button:hover {
      width: 44px;
    }

    .button::before {
      display: none;
    }
  }
`;

export default BackToTopButton;
