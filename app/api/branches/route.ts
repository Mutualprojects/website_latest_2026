import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://sheetpilot.co.in/api/v1/https-docs-google-com-spreadsheets-d-1f2t9gwp3tqhg8knvlgaoca6nzd4sxmsie66fdwai1ye-edit-gid-0-gid-0",
      {
        // Revalidate every 60 seconds to avoid spamming the external API
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch branches" },
        { status: res.status }
      );
    }

    let data = await res.json();
    
    // Global data entry fix for Kolkata/West Bengal swap
    data = data.map((item: any) => {
      let rawCity = (item.City || "").trim();
      let rawState = (item.State || "").trim();
      
      if (rawCity === "West Bengal" && rawState === "Kolkata") {
        item.City = "Kolkata";
        item.State = "West Bengal";
      }
      return item;
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching branches:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
