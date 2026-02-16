"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  FC,
} from "react";

import { animated, useTransition, useSpring } from "@react-spring/web";
import { Pagination } from "antd";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Download,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import "antd/dist/reset.css";

/* -------------------------------- TYPES -------------------------------- */
interface ImageItem {
  id: number;
  image: string;
  height: number;
}

interface GridItem extends ImageItem {
  x: number;
  y: number;
  width: number;
}

/* -------------------------------- CONSTANTS -------------------------------- */
const HEIGHTS = [220, 260, 300, 340, 380, 420];

/* -------------------------------- IMAGE SOURCES -------------------------------- */
const LATEST_NEWS: string[] = [
  "https://ik.imagekit.io/tsuss6ulm/Samarth%20Rashtra,%20P-8,%20Nov%2021.jpg",
  "https://ik.imagekit.io/tsuss6ulm/Nai%20Soch%20Express,%20P-2,%20Nov%2024.jpg",
  "https://ik.imagekit.io/tsuss6ulm/Taasir,%20P-3,%20Nov%2022.jpg",
  "https://ik.imagekit.io/tsuss6ulm/Hamara%20Samaj,%20P-3,%20Nov%2022.jpg",
  "https://ik.imagekit.io/tsuss6ulm/Sanmarg,%20P-2,%20Nov%2024.jpg",
];

const BASE_COUNT = 96;
const BASE_URL = "https://ik.imagekit.io/waxuvuasch/news";

/* -------------------------------- BUILD DATA -------------------------------- */
const buildImages = (): ImageItem[] => {
  const latest = LATEST_NEWS.map((img, i) => ({
    id: 1000 + i,
    image: img,
    height: HEIGHTS[i % HEIGHTS.length],
  }));

  const older = Array.from({ length: BASE_COUNT }, (_, i) => ({
    id: i + 1,
    image: `${BASE_URL}/${i + 1}.${i + 1 <= 82 ? "jpeg" : "jpg"}`,
    height: HEIGHTS[i % HEIGHTS.length],
  }));

  return [...latest, ...older];
};

/* -------------------------------- PREVIEW MODAL -------------------------------- */
const PreviewModal: FC<{
  images: ImageItem[];
  index: number;
  onClose: () => void;
  setIndex: (i: number) => void;
}> = ({ images, index, onClose, setIndex }) => {
  const [zoom, setZoom] = useState(1);
  const img = images[index];

  const anim = useSpring({ opacity: 1, from: { opacity: 0 } });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft")
        setIndex((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, images.length, onClose, setIndex]);

  return (
    <animated.div
      style={anim}
      className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      <img
        src={img.image}
        className="max-h-[90vh] max-w-[90vw] object-contain"
        style={{ transform: `scale(${zoom})` }}
        onClick={(e) => e.stopPropagation()}
      />

      <button className="absolute top-6 right-6 text-white" onClick={onClose}>
        <X size={32} />
      </button>

      <div className="absolute bottom-6 flex gap-4">
        <button onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}>
          <ZoomOut className="text-white" />
        </button>
        <button onClick={() => setZoom((z) => Math.min(3, z + 0.2))}>
          <ZoomIn className="text-white" />
        </button>
        <a href={img.image} download>
          <Download className="text-white" />
        </a>
      </div>

      <button
        className="absolute left-6 text-white"
        onClick={(e) => {
          e.stopPropagation();
          setIndex((index - 1 + images.length) % images.length);
        }}
      >
        <ChevronLeft size={36} />
      </button>

      <button
        className="absolute right-6 text-white"
        onClick={(e) => {
          e.stopPropagation();
          setIndex((index + 1) % images.length);
        }}
      >
        <ChevronRight size={36} />
      </button>
    </animated.div>
  );
};

/* -------------------------------- MASONRY -------------------------------- */
const MasonryGallery: FC = () => {
  const allImages = useMemo(buildImages, []);
  const [page, setPage] = useState(1);
  const [preview, setPreview] = useState<number | null>(null);

  const pageSize = 18;
  const paged = useMemo(
    () => allImages.slice((page - 1) * pageSize, page * pageSize),
    [page, allImages]
  );

  const ref = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(4);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const resize = () => {
      const w = window.innerWidth;
      setCols(w >= 1600 ? 6 : w >= 1200 ? 5 : w >= 900 ? 4 : w >= 600 ? 3 : 2);
      if (ref.current) setWidth(ref.current.offsetWidth);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const { items, height } = useMemo(() => {
    const colHeights = Array(cols).fill(0);
    const colWidth = width / cols || 1;
    const items: GridItem[] = [];

    paged.forEach((img) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      items.push({
        ...img,
        x: col * colWidth,
        y: colHeights[col],
        width: colWidth,
      });
      colHeights[col] += img.height;
    });

    return { items, height: Math.max(...colHeights, 0) };
  }, [paged, cols, width]);

  const transitions = useTransition(items, {
    keys: (i) => i.id,
    from: { opacity: 0, y: 40 },
    enter: { opacity: 1, y: 0 },
    trail: 25,
  });

  return (
    <>
      <div ref={ref} style={{ height }} className="relative w-full">
        {transitions((style, item, _, i) => (
          <animated.div
            key={item.id}
            style={{
              ...style,
              position: "absolute",
              left: item.x,
              top: item.y,
              width: item.width,
              height: item.height,
            }}
            className="p-2"
          >
            <img
              src={item.image}
              className="w-full h-full object-cover rounded-xl cursor-pointer"
              onClick={() => setPreview(i)}
            />
          </animated.div>
        ))}
      </div>

      {/* ✅ NO SCROLL TO TOP */}
      <div className="mt-10 flex justify-center">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={allImages.length}
          onChange={(p) => setPage(p)}
        />
      </div>

      {preview !== null && (
        <PreviewModal
          images={paged}
          index={preview}
          setIndex={setPreview}
          onClose={() => setPreview(null)}
        />
      )}
    </>
  );
};

/* -------------------------------- PAGE -------------------------------- */
export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-[1800px] mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#07518a] mb-8">
          Brihaspathi News & Media Coverage
        </h1>
        <MasonryGallery />
      </div>
    </div>
  );
}
