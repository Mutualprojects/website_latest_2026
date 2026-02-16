"use client";

import { Card } from "@/components/ui/card";
import AIVMSHero from "./Surveillance";

const videoSrc =
  "https://ik.imagekit.io/tsuss6ulm/corpo%20video%202%20-.mp4";

export function SplineSceneBasic() {
  return (
    <Card className="relative w-full min-h-screen overflow-hidden border-0 rounded-none">
      {/* ── background video ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* ── overlay — strong enough for text readability ── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/95 via-white/90 to-white/95" />

      {/* ── content ── */}
      <div className="relative z-10 w-full h-full">
        <AIVMSHero />
      </div>
    </Card>
  );
}
