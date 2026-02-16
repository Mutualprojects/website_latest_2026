"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** 
 * Interface for Mega Menu props
 */
interface MegaMenuProps {
  isOpen: boolean; // Controls visibility
  category: string; // Example: "products" or "services"
  onClose: () => void; // Close when clicked
  data: Array<{
    title: string;
    icon?: string | null;
    items: Array<{ label: string; slug: string }>;
  }>;
}

/* Helper to generate URL-safe slug */
const slugify = (text: string = "") =>
  text
    .trim()
    .toLowerCase()
    .replace(/[\/&_,+]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * ================================
 * NORMAL PURE COMPONENT MEGA MENU
 * ================================
 */
const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, data, category, onClose }) => {
  if (!isOpen) return null; // Do not render if closed

  return (
    <div
      className="hidden lg:block fixed left-0 right-0 z-[80] bg-[#f7f9fc] border-t border-gray-200 shadow-2xl"
      style={{ top: "82px" }} // Match your header height
    >
      {/* Container */}
      <div className="mx-auto max-w-[120rem] px-10 py-12">
        {/* Grid layout like your screenshot */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
          {data.map((col, colIdx) => (
            <div key={colIdx}>
              {/* Category Title with optional icon */}
              <div className="flex items-center gap-2 mb-4">
                {col.icon && (
                  <img
                    src={col.icon}
                    alt={col.title}
                    className="w-6 h-6 object-contain rounded"
                  />
                )}
                <h3 className="text-lg font-bold text-[#07518a]">{col.title}</h3>
              </div>

              {/* Item List */}
              <ul className="space-y-2">
                {col.items?.map((item, itemIdx) => {
                  const route = `/${category}/${slugify(col.title)}/${slugify(item.slug || item.label)}`;
                  return (
                    <li key={itemIdx}>
                      <Link
                        href={route}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-[#07518a]/10 hover:text-[#07518a] transition-all"
                        onClick={onClose}
                      >
                        <ChevronRight className="w-4 h-4" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
