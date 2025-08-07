export async function analyzeClaim(claim: string): Promise<string> {
  const response = await fetch("https://mainteny-openai-api.vercel.app/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ claim })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("AI API error:", errorText);
    throw new Error("Failed to fetch AI analysis");
  }

  const data = await response.json();

  if (!data.result) {
    throw new Error("No result returned from AI");
  }

  return data.result;
}
