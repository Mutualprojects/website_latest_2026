import { NextRequest, NextResponse } from "next/server";

const PINECONE_API_KEY = process.env.PINECONE_API_KEY!;
const PINECONE_ASSISTANT_NAME = process.env.PINECONE_ASSISTANT_NAME || "brichat";
const PINECONE_BASE = "https://prod-1-data.ke.pinecone.io";

export async function POST(req: NextRequest) {
  try {
    const { messages, language } = await req.json();

    if (!PINECONE_API_KEY) {
      return NextResponse.json(
        { error: "Pinecone API key not configured." },
        { status: 500 }
      );
    }

    // Build the messages array for Pinecone
    // Inject length constraint and language preference into the last user message
    const pineconeMessages = messages.map(
      (msg: { role: string; content: string }, idx: number) => {
        if (idx === messages.length - 1 && msg.role === "user") {
          const langInstruction =
            language && language !== "English" ? ` Respond in ${language}.` : "";
          const constraint = `[System Instruction: Provide a concise, clear answer in strictly under 50 words for maximum readability.${langInstruction}]`;
          return {
            role: msg.role,
            content: `${msg.content}\n\n${constraint}`,
          };
        }
        return { role: msg.role, content: msg.content };
      }
    );

    const pineconeRes = await fetch(
      `${PINECONE_BASE}/assistant/chat/${PINECONE_ASSISTANT_NAME}`,
      {
        method: "POST",
        headers: {
          "Api-Key": PINECONE_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: pineconeMessages,
          stream: false,
        }),
      }
    );

    if (!pineconeRes.ok) {
      const errText = await pineconeRes.text();
      console.error("Pinecone error:", errText);
      return NextResponse.json(
        { error: `Pinecone API error: ${pineconeRes.status}` },
        { status: pineconeRes.status }
      );
    }

    const data = await pineconeRes.json();

    // Pinecone returns: { message: { role, content }, finish_reason, usage, ... }
    const answer =
      data?.message?.content ||
      data?.choices?.[0]?.message?.content ||
      "I couldn't find an answer to that.";

    return NextResponse.json({ answer });
  } catch (err: any) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}