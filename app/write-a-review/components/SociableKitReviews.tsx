'use client';

import React, { useEffect } from 'react';

interface Props {
  embedId?: string;
  className?: string;
}

export default function SociableKitReviews({
  embedId = '25671028',
  className = '',
}: Props) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scriptId = 'sk-widget';

    // Prevent duplicate script
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://widgets.sociablekit.com/google-reviews/widget.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      // Re-render widget if script already exists
      (window as any).SociableKit?.init();
    }
  }, []);

  return (
    <div
      className={`sk-ww-google-reviews ${className}`}
      data-embed-id={embedId}
    />
  );
}