import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

type Score = {
  score_overall: number;
  score_environment: number;
  score_labor: number;
  score_animals: number;
};

type Brand = {
  name: string;
  logo_url: string;
};

export default function BrandScores() {
  const { id } = useParams();
  const [scores, setScores] = useState<Score | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const [{ data: brandData, error: brandError }, { data: scoreData, error: scoreError }] =
        await Promise.all([
          supabase.from("brands").select("name, logo_url").eq("id", id).single(),
          supabase.from("sustainability_scores").select("*").eq("brand_id", id).single(),
        ]);

      if (brandError) {
        console.error("Error fetching brand info:", brandError.message);
      } else {
        setBrand(brandData);
      }

      if (scoreError) {
        console.error("Error fetching scores:", scoreError.message);
      } else {
        setScores(scoreData);
      }

      setLoading(false);
    }

    if (id) fetchData();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!brand || !scores) return <p className="p-4">No scores available.</p>;

  return (
    <main className="min-h-screen p-6 text-gray-800 bg-white">
      <div className="max-w-xl mx-auto space-y-6 text-center">
        <img
          src={brand.logo_url}
          alt={`${brand.name} logo`}
          className="mx-auto w-28 h-28 object-contain"
        />
        <h1 className="text-3xl font-bold">{brand.name}</h1>

        <div className="text-2xl font-semibold text-green-700">
          🌿 Overall Score: {scores.score_overall}
        </div>

        <ul className="space-y-2 text-lg text-left">
          <li>🌍 <strong>Environment:</strong> {scores.score_environment}</li>
          <li>👷 <strong>Labor:</strong> {scores.score_labor}</li>
          <li>🐑 <strong>Animals:</strong> {scores.score_animals}</li>
        </ul>

        <Link
          to="/brands"
          className="text-green-600 hover:underline block mt-4 text-base"
        >
          ← Back to Brands
        </Link>
      </div>
    </main>
  );
}
