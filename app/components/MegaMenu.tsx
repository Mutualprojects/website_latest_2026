"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface MegaMenuProps {
  isOpen: boolean;
  data: any[];
  categoryType: "product" | "service";
  onClose: () => void;
}

export default function MegaMenu({ isOpen, data, categoryType, onClose }: MegaMenuProps) {
  if (!isOpen || !data.length) return null;

  return (
    <div
      className="hidden lg:block fixed left-0 right-0 z-[80] bg-[#f7f9fc] border-t border-gray-200 shadow-2xl"
      style={{ top: "85px" }}
    >
      <div className="mx-auto max-w-[1400px] px-10 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
          {data.map((col: any, idx: number) => (
            <div key={idx}>
              {/* Category Title */}
              <div className="flex items-center gap-2 mb-4">
                {col.icon && (
                  <Image
                    src={col.icon}
                    alt={col.title}
                    width={32}
                    height={32}
                    className="rounded object-cover"
                  />
                )}
                <h3 className="text-lg font-bold text-[#07518a]">{col.title}</h3>
              </div>

              {/* List Items */}
              <ul className="space-y-2">
                {col.items.map((item: any) => (
                  <li key={item.slug}>
                    <Link
                      href={`/${categoryType}/${col.slug}/${item.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-[#07518a]/10 hover:text-[#07518a] transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
