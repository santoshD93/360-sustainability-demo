import { useState } from "react";
import { Link } from "react-router-dom";
import { analyzeClaim } from "../api/analyzeClaim";

export default function ClaimAnalyzer() {
  const [claim, setClaim] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!claim.trim()) return;
    setLoading(true);
    setResult("");
    setError("");

    try {
      const res = await analyzeClaim(claim);
      setResult(res);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setClaim("");
    setResult("");
    setError("");
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">AI Claim Analyzer</h1>
          <Link
            to="/"
            className="text-sm text-green-700 font-medium hover:underline"
          >
            ← Back to Home
          </Link>
        </div>

        <textarea
          rows={5}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="Enter a brand claim like 'We are 100% sustainable'..."
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
        />

        <div className="flex space-x-4">
          <button
            onClick={handleAnalyze}
            disabled={loading || !claim.trim()}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
          {result && (
            <button
              onClick={reset}
              className="border border-gray-400 text-gray-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition"
            >
              Reset
            </button>
          )}
        </div>

        {error && (
          <p className="text-red-600 text-sm font-medium">{error}</p>
        )}

        {result && (
          <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg shadow-sm whitespace-pre-wrap text-gray-800">
            {result}
          </div>
        )}
      </div>
    </main>
  );
}
