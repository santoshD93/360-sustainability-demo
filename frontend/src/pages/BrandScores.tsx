import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

type Score = {
  score_overall: number;
  score_environment: number;
  score_labor: number;
  score_animals: number;
};

export default function BrandScores() {
  const { id } = useParams();
  const [scores, setScores] = useState<Score | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScores() {
      const { data, error } = await supabase
        .from("sustainability_scores")
        .select("*")
        .eq("brand_id", id)
        .single();

      if (error) {
        console.error("Error fetching scores:", error.message);
      } else {
        setScores(data);
      }

      setLoading(false);
    }

    if (id) fetchScores();
  }, [id]);

  if (loading) return <p className="p-4">Loading scores...</p>;
  if (!scores) return <p className="p-4">No scores available.</p>;

  return (
    <main className="min-h-screen p-6 text-gray-800 bg-white">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Sustainability Scores</h1>
        <ul className="space-y-2 text-lg">
          <li>🌿 Overall: <strong>{scores.score_overall}</strong></li>
          <li>🌍 Environment: <strong>{scores.score_environment}</strong></li>
          <li>🧑‍🤝‍🧑 Labor: <strong>{scores.score_labor}</strong></li>
          <li>🐾 Animals: <strong>{scores.score_animals}</strong></li>
        </ul>
        <Link to="/brands" className="text-green-600 hover:underline block mt-4">← Back to Brands</Link>
      </div>
    </main>
  );
}
