"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/app/products/data";

export default function MegaMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const productList = Object.values(products);

  return (
    <header className="w-full bg-white border-b border-gray-200">

      {/* NAVBAR */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          BTL
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8 relative">

          <Link
            href="/"
            className="text-gray-700 font-medium hover:text-black"
          >
            Home
          </Link>

          {/* PRODUCTS MENU */}
          <div
            className="relative"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button className="flex items-center gap-1 text-gray-700 font-medium hover:text-black">
              Products
              <span className={`transition-transform ${menuOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>

            {/* MEGA MENU */}
            {menuOpen && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 mt-6 w-[900px] bg-white border border-gray-200 rounded-xl shadow-xl p-6">

                <div className="grid grid-cols-3 gap-4">

                  {productList.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition"
                    >

                      {/* PRODUCT IMAGE */}
                      <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                        <Image
                          src={product.bannerImage}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* PRODUCT TEXT */}
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {product.name}
                        </p>

                        <p className="text-xs text-gray-500 line-clamp-2">
                          {product.tagline}
                        </p>
                      </div>

                    </Link>
                  ))}

                </div>

              </div>
            )}
          </div>

          <Link
            href="/contact"
            className="text-gray-700 font-medium hover:text-black"
          >
            Contact
          </Link>

        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="lg:hidden text-gray-700"
        >
          ☰
        </button>

      </div>


      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="lg:hidden border-t">

          <div className="flex flex-col p-4 gap-4">

            <Link href="/" className="font-medium">
              Home
            </Link>

            <p className="font-medium">Products</p>

            <div className="grid gap-3">

              {productList.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="flex items-center gap-3"
                >

                  <div className="relative h-12 w-12 rounded-md overflow-hidden border">
                    <Image
                      src={product.bannerImage}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <span className="text-sm">
                    {product.name}
                  </span>

                </Link>
              ))}

            </div>

            <Link href="/contact" className="font-medium">
              Contact
            </Link>

          </div>

        </div>
      )}

    </header>
  );
}