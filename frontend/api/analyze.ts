import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error("❌ OPENAI_API_KEY is missing from environment variables");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const claim = req.body?.claim;

  if (!claim) {
    return res.status(400).json({ error: "Missing claim in request body" });
  }

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a sustainability compliance analyst. Analyze the provided sustainability claim and provide feedback.",
        },
        {
          role: "user",
          content: claim,
        },
      ],
    });

    const result = chat.choices?.[0]?.message?.content;

    if (!result) {
      throw new Error("No result from OpenAI");
    }

    return res.status(200).json({ result });
  } catch (err: any) {
    console.error("🔥 OpenAI error:", err);
    return res.status(500).json({
      error: "AI analysis failed",
      details: err.message ?? String(err),
    });
  }
}
