// lib/strapi.ts

import { Blog, BlogsResponse } from "../blogs/types/blog";

const STRAPI_URL = "/strapi";

/**
 * 🔹 Helper: Build full image URL
 */
export function getStrapiMedia(url?: string | null) {
  if (!url) return "/placeholder.jpg";

  // If already absolute URL
  if (url.startsWith("http")) return url;

  return `${STRAPI_URL}${url}`;
}

/**
 * 🔹 Fetch all blogs (ONLY WITH VALID SLUG)
 * Includes all relations (images, category, etc.)
 */
export async function fetchBlogs(): Promise<BlogsResponse> {
  const res = await fetch(
    `${STRAPI_URL}/api/blogs?populate[featured_images][populate]=*`,
    {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch blogs");

  return res.json();
}

/**
 * 🔹 Fetch single blog by slug
 */
export async function fetchBlogBySlug(
  slug: string
): Promise<Blog | null> {
  if (!slug) return null;

  const res = await fetch(
    `${STRAPI_URL}/api/blogs?filters[slug][$eq]=${slug}&populate[featured_images][populate]=*&populate[zone][populate]=*&populate[tags][populate]=*`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch blog");

  const data: BlogsResponse = await res.json();

  return data?.data?.[0] || null;
}

/**
 * 🔹 Fetch related blogs (same category)
 */
export async function fetchRelatedBlogs(
  category: string,
  currentSlug: string
): Promise<Blog[]> {
  if (!category) return [];

  const res = await fetch(
    `${STRAPI_URL}/api/blogs?filters[Category][$eq]=${category}&filters[slug][$ne]=${currentSlug}&filters[slug][$notNull]=true&populate[featured_images][populate]=*`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch related blogs");

  const data: BlogsResponse = await res.json();

  return data.data || [];
}

/**
 * 🔹 Fetch blogs by category
 */
export async function fetchBlogsByCategory(
  category: string
): Promise<Blog[]> {
  const res = await fetch(
    `${STRAPI_URL}/api/blogs?filters[Category][$eq]=${category}&filters[slug][$notNull]=true&populate=*`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch blogs by category");

  const data: BlogsResponse = await res.json();

  return data.data || [];
}

/**
 * 🔹 Update likes (Increment or Decrement)
 */
export async function updateBlogLikes(
  documentId: string,
  newLikes: number
): Promise<number> {
  const res = await fetch(`${STRAPI_URL}/api/blogs/${documentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        likesCount: newLikes,
      },
    }),
  });

  if (!res.ok) throw new Error("Failed to update likes");

  const result = await res.json();
  // Return either 'likesCount' or 'likes' based on what the API returns
  return result.data.likesCount ?? result.data.likes ?? newLikes;
}

/**
 * 🔹 Fetch latest blogs (limit)
 */
export async function fetchLatestBlogs(
  limit: number = 5
): Promise<Blog[]> {
  const res = await fetch(
    `${STRAPI_URL}/api/blogs?sort=publishedAt:desc&pagination[limit]=${limit}&filters[slug][$notNull]=true&populate[featured_images][populate]=*&populate[tags][populate]=*`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch latest blogs");

  const data: BlogsResponse = await res.json();

  return data.data || [];
}