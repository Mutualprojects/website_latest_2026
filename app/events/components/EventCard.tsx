"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

const BRAND = "#07518a";

// Types
interface ImageFormat {
  url: string;
  width?: number;
  height?: number;
}

interface EventImage {
  url: string;
  formats?: {
    large?: ImageFormat;
    medium?: ImageFormat;
    small?: ImageFormat;
    thumbnail?: ImageFormat;
  };
}

interface EventData {
  id?: number;
  slug: string;
  eventTitle: string;
  eventType: string;
  eventDate: string;
  eventDescription: string;
  mainImage: EventImage;
  eventGallery?: EventImage[];
}

interface Props {
  event: EventData;
}

export default function EventCard({ event }: Props) {
  // Combine main image and gallery images
  const galleryImages = useMemo(
    () => [event.mainImage, ...(event?.eventGallery || [])].filter(Boolean),
    [event.mainImage, event.eventGallery]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Image URL resolver
  const resolveUrl = (img?: EventImage): string => {
    if (!img) return "/default-image.jpg";
    
    const url =
      img?.formats?.large?.url ||
      img?.formats?.medium?.url ||
      img?.formats?.small?.url ||
      img?.formats?.thumbnail?.url ||
      img?.url;
    
    return url?.startsWith("http") ? url : `http://172.30.0.200:1334${url}`;
  };

  const currentImage = galleryImages[selectedIndex] || galleryImages[0];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      {/* IMAGE SECTION */}
      <div className="relative">
        {/* Main Image - Clickable */}
        <Link 
          href={`/events/${event.slug}`}
          className="block relative w-full aspect-[4/3] bg-gray-200 overflow-hidden group"
        >
          <Image
            src={resolveUrl(currentImage)}
            alt={event.eventTitle}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-lg font-semibold bg-blue-600 px-6 py-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              View Details →
            </span>
          </div>
        </Link>

        {/* Thumbnail Strip */}
        {galleryImages.length > 1 && (
          <div className="absolute bottom-3 left-3 right-3 z-10">
            <div className="flex gap-2 overflow-x-auto py-2 px-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg scrollbar-hide">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedIndex(idx);
                  }}
                  className={`relative flex-shrink-0 w-14 h-14 rounded-md overflow-hidden transition-all duration-300 ${
                    idx === selectedIndex
                      ? "ring-3 ring-blue-600 shadow-lg scale-110 opacity-100"
                      : "opacity-60 hover:opacity-100 hover:scale-105"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image
                    src={resolveUrl(img)}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="56px"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Event Type Badge */}
        <div className="absolute top-4 right-4 z-10 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
          {event.eventType}
        </div>

        {/* Gallery Count Badge */}
        {galleryImages.length > 1 && (
          <div className="absolute top-4 left-4 z-10 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
            📸 {galleryImages.length} photos
          </div>
        )}
      </div>

      {/* DETAILS SECTION */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title - Clickable */}
        <Link href={`/events/${event.slug}`}>
          <h3 className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer">
            {event.eventTitle}
          </h3>
        </Link>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span className="text-lg">📅</span>
          <span className="font-medium">{event.eventDate}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {event.eventDescription}
        </p>

        {/* VIEW DETAILS BUTTON */}
        <Link
          href={`/events/${event.slug}`}
          className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 active:scale-95"
        >
          View Full Details →
        </Link>
      </div>
    </div>
  );
}