const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async function handler(req, res) {
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
    return res.status(400).json({ error: "No claim provided" });
  }

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a sustainability compliance analyst. Analyze the provided sustainability claim and provide feedback.",
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
  } catch (err) {
    console.error("🔥 OpenAI error:", err);
    return res.status(500).json({ error: "AI analysis failed" });
  }
};
