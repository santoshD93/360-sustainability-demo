// api/analyze.ts
import { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { claim } = req.body;

  if (!claim || typeof claim !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'claim' in body" });
  }

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a sustainability compliance analyst. Analyze the provided sustainability claim and provide a concise factual judgment (1-2 sentences) indicating if it's credible, misleading, unverifiable, or greenwashing.",
        },
        {
          role: "user",
          content: claim,
        },
      ],
    });

    const result = chat.choices?.[0]?.message?.content?.trim();

    if (!result) {
      console.error("No result returned from OpenAI");
      return res.status(500).json({ error: "Empty result from AI" });
    }

    return res.status(200).json({ result });
  } catch (error: unknown) {
    console.error("OpenAI API error:", error);
    return res.status(500).json({ error: "AI analysis failed" });
  }
}
