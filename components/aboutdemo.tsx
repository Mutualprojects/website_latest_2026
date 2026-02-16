"use client";

import React from "react";
import {
  FullScreenScrollFX,
  FullScreenFXAPI,
} from "@/components/full-screen-scroll-fx";

const sections = [
  {
    leftLabel: "Silence",
    title: <>Absence</>,
    rightLabel: "Silence",
    background:
      "https://images.pexels.com/photos/3289156/pexels-photo-3289156.jpeg",
  },
  {
    leftLabel: "Essence",
    title: <>Stillness</>,
    rightLabel: "Essence",
    background:
      "https://images.pexels.com/photos/163790/at-night-under-a-lantern-guy-night-city-163790.jpeg",
  },
  {
    leftLabel: "Rebirth",
    title: <>Growth</>,
    rightLabel: "Rebirth",
    background: "https://images.pexels.com/photos/9817/pexels-photo-9817.jpeg",
  },
  {
    leftLabel: "Change",
    title: <>Opportunity</>,
    rightLabel: "Change",
    background:
      "https://images.pexels.com/photos/939807/pexels-photo-939807.jpeg",
  },
];

export default function DemoPage() {
  const apiRef = React.useRef<FullScreenFXAPI | null>(null);

  return (
    <main>
      <FullScreenScrollFX
        sections={sections}
        header={
          <>
            <div>The Creative</div>
            <div>Process</div>
          </>
        }
        footer={<div>Scroll or tap labels to navigate</div>}
        showProgress
        durations={{ change: 0.7, snap: 800 }}
        apiRef={apiRef}
      />
    </main>
  );
}
