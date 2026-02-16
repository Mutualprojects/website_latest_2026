"use client";

import React from "react";

const bannerImage = "/1627.jpg";

export default function BannerSection() {
  return (
    <section
      className="w-full h-[60vh] bg-center bg-cover bg-no-repeat rounded-b-xl"
      style={{ backgroundImage: `url(${bannerImage})` }}
      aria-label="Banner"
    />
  );
}
