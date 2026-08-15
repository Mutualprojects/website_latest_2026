import React from "react";
import type { Metadata } from "next";
import ProductClientView, { Product } from "./ProductClientView";

const STRAPI_ORIGIN = "http://183.82.117.36:2334";
const PRODUCTS_ENDPOINT = `${STRAPI_ORIGIN}/api/products`;

type PageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    const url = new URL(PRODUCTS_ENDPOINT);
    url.searchParams.set("filters[slug][$eq]", slug);
    url.searchParams.set("populate[image]", "true");
    url.searchParams.set("populate[category]", "true");
    url.searchParams.set("populate[seo][populate][ogImage]", "true");
    url.searchParams.set("populate[berief_product][populate]", "*");

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.[0] ?? null;
  } catch (error) {
    console.error("Error fetching product on server:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const product = await fetchProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found | Brihaspathi Technologies",
      description: "The requested product page was not found.",
    };
  }

  const seo = product.seo;
  const title = seo?.ogTitle || seo?.metaTitle || `${product.title} | Brihaspathi Technologies`;
  const description = seo?.metaDescription || product.description;
  const canonicalUrl = seo?.canonicalUrl || `https://www.brihaspathi.com/product/${slug}`;
  const robots = seo?.metaRobots || "index, follow";

  const heroImage =
    product.image?.[0]?.formats?.large?.url ??
    product.image?.[0]?.formats?.medium?.url ??
    product.image?.[0]?.url ??
    "";

  const ogImageUrl = heroImage ? `${STRAPI_ORIGIN}${heroImage}` : undefined;

  return {
    title,
    description,
    robots,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      url: canonicalUrl,
      siteName: "Brihaspathi Technologies",
      images: ogImageUrl ? [{ url: ogImageUrl }] : [],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const product = await fetchProduct(slug);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-white px-4 text-center">
        <p className="text-xl font-semibold text-slate-900">Product not found.</p>
        <p className="text-slate-500">
          The page you&apos;re looking for isn&apos;t published yet, or the slug has changed.
        </p>
      </div>
    );
  }

  // Extract SEO schema.org JSON-LD from CMS data
  const jsonLdSchema = product.seo?.schema ?? null;

  return (
    <>
      {/* ── Server-Rendered JSON-LD Schema.org Data (Visible in View Source) ── */}
      {jsonLdSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      )}

      {/* ── Client View Component ── */}
      <ProductClientView product={product} />
    </>
  );
}