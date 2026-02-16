"use client";

import React from "react";

const bannerImage = "/10075.jpg";

export default function Outeambanner() {
  return (
    <section
      className="w-full h-[60vh] bg-center bg-cover bg-no-repeat rounded-b-xl"
      style={{ backgroundImage: `url(${bannerImage})` }}
      aria-label="Banner"
    />
  );
}
