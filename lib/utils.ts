import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// lib/utils.ts

export function getImageUrl(blog: any) {
  const img = blog.featured_images?.[0] || blog.featured_image;

  if (!img) return "/no-image.png";

  const STRAPI_URL = "/backend-api";
  const url = img.url;
  
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url.startsWith("/") ? url : "/" + url}`;
}

export function getExcerpt(content: any) {
  if (!content) return "No description available";

  const text = content
    .map((block: any) =>
      block.children?.map((c: any) => c.text).join("")
    )
    .join(" ");

  return text.slice(0, 120) + "...";
}