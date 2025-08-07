import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Brand = {
  id: string;
  name: string;
};

type AnalysisResult = {
  vagueParts: string[];
  alignment: string;
  suggestion: string;
};

export default function ClaimAnalyzer() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [claim, setClaim] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    async function fetchBrands() {
      const { data, error } = await supabase
        .from("brands")
        .select("id, name")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching brands:", error.message);
      } else {
        setBrands(data || []);
      }
    }

    fetchBrands();
  }, []);

  async function handleAnalyze() {
    if (!claim || !selectedBrand) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze-claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim, brandId: selectedBrand }),
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing claim:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-6 bg-gray-50 text-gray-800">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">
          🧠 Claim Analyzer for Sustainability
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <label className="block text-lg font-semibold">
            🌍 Marketing Claim
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 text-md"
            placeholder="e.g., 'Our clothes are made with the planet in mind.'"
            rows={4}
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
          />

          <label className="block text-lg font-semibold">🏷️ Brand</label>
          <select
            className="w-full border border-gray-300 rounded-md p-2 text-md"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">Select a brand</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleAnalyze}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Claim"}
          </button>
        </div>

        {result && (
          <div className="bg-white p-6 rounded-lg shadow space-y-4 border border-green-200">
            <h2 className="text-2xl font-bold text-green-700">
              ✅ AI Analysis Result
            </h2>
            <div>
              <p className="font-semibold">🔍 Vague or Unclear Phrases:</p>
              <ul className="list-disc ml-6 text-gray-700">
                {result.vagueParts.map((part, idx) => (
                  <li key={idx}>{part}</li>
                ))}
              </ul>
            </div>
            <p>
              <span className="font-semibold">📊 Alignment:</span>{" "}
              <span>{result.alignment}</span>
            </p>
            <p>
              <span className="font-semibold">💡 Suggestion:</span>{" "}
              <span>{result.suggestion}</span>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
