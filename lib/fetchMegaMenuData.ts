// lib/fetchMegaMenuData.ts
import axios from "axios";

const API_URL = "/cms-api/api/items";

let cache: Record<string, any[]> = {}; // 👈 Cache memory

export async function fetchMegaMenuData(category: "products" | "services") {
  if (cache[category]) return cache[category]; // Cached response

  const res = await axios.get(API_URL, {
    params: {
      "populate[0]": "category",
      "populate[1]": "image",
      "pagination[pageSize]": 100,
    },
  });

  const data = res.data?.data || [];
  const filtered = data.filter(
    (i: any) => i?.category?.type?.toLowerCase() === category
  );

  const grouped = filtered.reduce((acc: any, item: any) => {
    const key = item.category.slug;
    if (!acc[key]) {
      acc[key] = {
        title: item.category.title,
        slug: key,
        icon: item.image?.[0]?.url || "/default-icon.svg", // Optional icon
        items: [],
      };
    }
    acc[key].items.push({ title: item.title, slug: item.slug });
    return acc;
  }, {});

  cache[category] = Object.values(grouped);
  return cache[category];
}
