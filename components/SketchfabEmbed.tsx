"use client";

import React from "react";

interface SketchfabEmbedProps {
  modelId: string; // only the model ID, not full URL
  title?: string;
  height?: string | number;
}

const SketchfabEmbed: React.FC<SketchfabEmbedProps> = ({
  modelId,
  title = "Sketchfab Model",
  height = "500px",
}) => {
  const embedUrl = `https://sketchfab.com/models/${modelId}/embed`;

  return (
    <div className="w-full overflow-hidden sketchfab-embed-wrapper">
      <iframe
        title={title}
        src={embedUrl}
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
        className="w-full rounded-lg"
        style={{
          height,
          border: "none",
        }}
      />
    </div>
  );
};

export default SketchfabEmbed;
