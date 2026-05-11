export async function searchTavily(query: string) {
  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: process.env.TAVILY_API_KEY,
      query,
      include_answer: true,
      search_depth: "advanced",

      // ✅ IMPORTANT FIX
      include_domains: ["brihaspathi.com"], 
      // or your exact domain

      max_results: 5,
    }),
  });

  const data = await res.json();

  return (
    data?.answer ||
    data?.results?.map((r: any) => r.content).join("\n") ||
    ""
  );
}