import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function askGroq(question: string, content: string) {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // ✅ FIXED MODEL
      messages: [
        {
          role: "system",
          content: "Answer clearly using the given context.",
        },
        {
          role: "user",
          content: `Context:\n${content}\n\nQuestion:\n${question}`,
        },
      ],
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error: any) {
    console.error("Groq Error:", error?.message || error);
    return "Error generating response from Groq";
  }
}