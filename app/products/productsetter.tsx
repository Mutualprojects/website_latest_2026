'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "./data";

export default function ProductSetter() {

  const productList = Object.values(products);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productList.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [productList.length]);

  return (
    <div className="w-full bg-white">

      {/* HERO SECTION */}
      <div className="relative w-full h-[70vh] overflow-hidden">

        {productList.map((product, index) => (
          <div
            key={product.slug}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={product.bannerImage}
              alt={product.name}
              fill
              priority={index === 0}
              className="object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Cross Pattern */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="relative w-40 h-40">
                <div className="absolute top-0 left-1/2 w-[2px] h-full bg-white transform -translate-x-1/2"></div>
                <div className="absolute top-1/2 left-0 h-[2px] w-full bg-white transform -translate-y-1/2"></div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-6">

                <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
                  {product.name}
                </h1>

                <p className="text-lg md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
                  {product.tagline}
                </p>

              </div>
            </div>

          </div>
        ))}

      </div>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-6xl font-light tracking-tight text-gray-900 mb-4">
          Our Products
        </h1>

        <div className="w-12 h-1 bg-gray-900 mb-6"></div>

        <p className="text-lg text-gray-600 max-w-2xl font-light">
          Discover our carefully curated collection of premium products
        </p>
      </div>

      {/* PRODUCTS GRID */}
      <div className="w-full">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

          {productList.map((product, index) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >

              <div className="relative h-full flex flex-col overflow-hidden bg-gray-50 border border-gray-100 hover:border-gray-300 transition-all duration-500">

                {/* Banner Image */}
                <div className="relative w-full h-[60vh] overflow-hidden bg-gray-200">

                  <Image
                    src={product.bannerImage}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Blur Overlay */}
                  <div className="absolute inset-0 bg-black/15 backdrop-blur-[2px] group-hover:bg-black/20 transition-all duration-500"></div>

                  {/* Cross Pattern */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                    <div className="relative w-32 h-32">
                      <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white transform -translate-x-1/2"></div>
                      <div className="absolute top-1/2 left-0 h-0.5 w-full bg-white transform -translate-y-1/2"></div>
                    </div>
                  </div>

                </div>

                {/* Product Title */}
                <div className="p-8 flex items-center justify-between group-hover:bg-gray-100 transition-colors duration-300">

                  <h2 className="text-2xl font-light tracking-tight text-gray-900 group-hover:text-gray-700">
                    {product.name}
                  </h2>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-6 h-6 text-gray-900 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>

                </div>

              </div>

            </Link>
          ))}

        </div>

      </div>

      {/* FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-100">

        <p className="text-sm text-gray-500 font-light tracking-wide">
          Browse our complete collection and find the perfect product for you
        </p>

      </div>

    </div>
  );
}