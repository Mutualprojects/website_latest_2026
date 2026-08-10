import { MetadataRoute } from 'next';
import { allSolutions } from './solutions/data';

export const revalidate = 86400; // Revalidate daily (86400 seconds)

const BASE_URL = 'https://www.brihaspathi.com';

// Dynamic CMS Base URL
const CMS_API_URL = 'http://183.82.117.36:2334/api';

// Helper to escape special XML characters (crucial for ampersands in URLs)
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Define all user-facing static paths
  const staticPaths = [
    { url: '', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/about/our-story', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/about/Board_of_directors', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/about/our-journeys', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/about/our-cmd', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/who-we-are', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/our-team', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/our-journey', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/services', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/service', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/products', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/product', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/solutions', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/explore-solutions', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/bussolution', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/projects', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/our-projects', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/govt-projects', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/events', priority: 0.6, changeFrequency: 'weekly' as const },
    { url: '/our-events', priority: 0.6, changeFrequency: 'weekly' as const },
    { url: '/media', priority: 0.6, changeFrequency: 'weekly' as const },
    { url: '/media-kit', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/videos', priority: 0.6, changeFrequency: 'weekly' as const },
    { url: '/press-release', priority: 0.6, changeFrequency: 'weekly' as const },
    { url: '/news', priority: 0.6, changeFrequency: 'weekly' as const },
    { url: '/careers', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/lifeat-brihaspathi', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/faq', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/escalation-matrix', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/testimonials', priority: 0.6, changeFrequency: 'weekly' as const },
    { url: '/rate-us', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/write-review', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/write-a-review', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/privacy-policy', priority: 0.3, changeFrequency: 'monthly' as const },
    { url: '/terms-and-conditions', priority: 0.3, changeFrequency: 'monthly' as const },
    { url: '/terms-&-conditions', priority: 0.3, changeFrequency: 'monthly' as const },
    { url: '/brochure', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/brihaspathi_brochure', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/blogs', priority: 0.8, changeFrequency: 'daily' as const },
  ];

  const staticSitemap = staticPaths.map((p) => ({
    url: escapeXml(`${BASE_URL}${p.url}`),
    lastModified: new Date(),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  // 2. Dynamic Solutions from static data (solutions/data.ts)
  const solutionSitemap = allSolutions
    .filter((s) => s.slug)
    .map((s) => ({
      url: escapeXml(`${BASE_URL}/solutions/${s.slug}`),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  // 3. Dynamic Blogs from Strapi
  let blogSitemap: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${CMS_API_URL}/blogs`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      const blogs = data.data || [];
      blogSitemap = blogs
        .filter((b: any) => b.slug)
        .map((b: any) => ({
          url: escapeXml(`${BASE_URL}/blogs/${b.slug}`),
          lastModified: new Date(b.updatedAt || b.createdAt || new Date()),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        }));
    }
  } catch (e) {
    console.error('Sitemap: Failed to fetch blogs:', e);
  }

  // 4. Dynamic Events from Strapi
  let eventSitemap: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${CMS_API_URL}/events`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      const events = data.data || [];
      eventSitemap = events
        .filter((e: any) => e.slug)
        .map((e: any) => ({
          url: escapeXml(`${BASE_URL}/events/${e.slug}`),
          lastModified: new Date(e.updatedAt || e.createdAt || new Date()),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        }));
    }
  } catch (e) {
    console.error('Sitemap: Failed to fetch events:', e);
  }

  // 5. Dynamic Categories from Strapi
  let categorySitemap: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${CMS_API_URL}/categories`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      const categories = data.data || [];
      categorySitemap = categories
        .filter((c: any) => c.slug)
        .map((c: any) => {
          const type = c.type === 'service' ? 'service' : 'product';
          return {
            url: escapeXml(`${BASE_URL}/${type}/${c.slug}`),
            lastModified: new Date(c.updatedAt || c.createdAt || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
          };
        });
    }
  } catch (e) {
    console.error('Sitemap: Failed to fetch categories:', e);
  }

  // 6. Dynamic Items (Services, Products, etc.) from Strapi
  let itemSitemap: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${CMS_API_URL}/items?populate=category`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      const items = data.data || [];
      itemSitemap = items
        .filter((i: any) => i.slug && i.category?.slug)
        .map((i: any) => {
          const type = i.category?.type === 'service' ? 'service' : 'product';
          return {
            url: escapeXml(`${BASE_URL}/${type}/${i.category.slug}/${i.slug}`),
            lastModified: new Date(i.updatedAt || i.createdAt || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
          };
        });
    }
  } catch (e) {
    console.error('Sitemap: Failed to fetch items:', e);
  }

  return [
    ...staticSitemap,
    ...solutionSitemap,
    ...blogSitemap,
    ...eventSitemap,
    ...categorySitemap,
    ...itemSitemap,
  ];
}
