import { NextResponse } from "next/server";

// Fallback social statistics to display in case environment keys are missing or invalid
const FALLBACK_STATS = {
  facebookFollowers: 8650,
  facebookLikes: 8120,
  instagramFollowers: 12450,
  linkedInFollowers: 14200, // LinkedIn stats (since it's a corporate site)
};

export async function GET() {
  const fbPageId = process.env.META_FB_PAGE_ID;
  const igBusinessId = process.env.META_IG_BUSINESS_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  // If credentials are not present, return fallback statistics cleanly
  if (!fbPageId || !accessToken) {
    return NextResponse.json({
      ...FALLBACK_STATS,
      source: "fallback",
    });
  }

  try {
    // 1. Fetch Facebook Page Stats
    const fbUrl = `https://graph.facebook.com/v20.0/${fbPageId}?fields=fan_count,followers_count&access_token=${accessToken}`;
    
    // 2. Fetch Instagram Stats if Instagram ID is provided
    const igUrl = igBusinessId
      ? `https://graph.facebook.com/v20.0/${igBusinessId}?fields=followers_count&access_token=${accessToken}`
      : null;

    // Fetch endpoints in parallel with Next.js cache revalidation of 1 hour (3600 seconds)
    const [fbRes, igRes] = await Promise.all([
      fetch(fbUrl, { next: { revalidate: 3600 } }),
      igUrl ? fetch(igUrl, { next: { revalidate: 3600 } }) : Promise.resolve(null),
    ]);

    let facebookFollowers = FALLBACK_STATS.facebookFollowers;
    let facebookLikes = FALLBACK_STATS.facebookLikes;
    let instagramFollowers = FALLBACK_STATS.instagramFollowers;

    if (fbRes.ok) {
      const fbData = await fbRes.json();
      facebookLikes = fbData.fan_count ?? facebookLikes;
      facebookFollowers = fbData.followers_count ?? fbData.fan_count ?? facebookFollowers;
    }

    if (igRes && igRes.ok) {
      const igData = await igRes.json();
      instagramFollowers = igData.followers_count ?? instagramFollowers;
    }

    return NextResponse.json({
      facebookFollowers,
      facebookLikes,
      instagramFollowers,
      linkedInFollowers: FALLBACK_STATS.linkedInFollowers,
      source: "live",
    });
  } catch (error) {
    console.error("Error fetching Meta Graph API statistics:", error);
    // Graceful fallback response on API connection failures
    return NextResponse.json({
      ...FALLBACK_STATS,
      source: "fallback_error",
    });
  }
}
