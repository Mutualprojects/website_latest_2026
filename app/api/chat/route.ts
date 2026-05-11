import { NextResponse } from "next/server";
import { askGroq } from "@/lib/groq";
import { companyData } from "@/lib/companyData";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    const answer = await askGroq(question, companyData);

    return NextResponse.json({
      success: true,
      answer,
    });

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
}