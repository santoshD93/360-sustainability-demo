import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

type BrandWithScores = {
  id: string;
  name: string;
  logo_url: string;
  score_overall: number | null;
  score_environment: number | null;
  score_labor: number | null;
  score_animals: number | null;
};

export const BrandList = () => {
  const [brands, setBrands] = useState<BrandWithScores[]>([]);
  const [loading, setLoading] = useState(true);
  const [minScore, setMinScore] = useState(0);
  const [sortBy, setSortBy] = useState("name-asc"); // name-asc, name-desc, score-asc, score-desc

  useEffect(() => {
    async function fetchBrands() {
      const { data, error } = await supabase
        .from("sustainability_scores")
        .select(`
          brand_id,
          score_overall,
          score_environment,
          score_labor,
          score_animals,
          brands (
            id,
            name,
            logo_url
          )
        `);

      if (error) {
        console.error("Error fetching scores with brands:", error.message);
        setLoading(false);
        return;
      }

      const formatted: BrandWithScores[] = data.map((item: any) => ({
        id: item.brands.id,
        name: item.brands.name,
        logo_url: item.brands.logo_url,
        score_overall: item.score_overall,
        score_environment: item.score_environment,
        score_labor: item.score_labor,
        score_animals: item.score_animals,
      }));

      setBrands(formatted);
      setLoading(false);
    }

    fetchBrands();
  }, []);

  const filtered = brands.filter(
    (b) => b.score_overall === null || b.score_overall >= minScore
  );

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "score-asc":
        return (a.score_overall ?? 0) - (b.score_overall ?? 0);
      case "score-desc":
        return (b.score_overall ?? 0) - (a.score_overall ?? 0);
      default:
        return 0;
    }
  });

  const handleReset = () => {
    setMinScore(0);
    setSortBy("name-asc");
  };

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading brands...</p>;
  }

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sustainable Brands</h1>
        <Link to="/" className="text-green-600 hover:underline">← Back to Home</Link>
      </div>

      {/* --- Filters + Sorting Bar --- */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">
            Sort by:
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="ml-2 border px-2 py-1 rounded"
            >
              <option value="name-asc">Name (A → Z)</option>
              <option value="name-desc">Name (Z → A)</option>
              <option value="score-desc">Highest Score</option>
              <option value="score-asc">Lowest Score</option>
            </select>
          </label>

          <label className="text-sm font-medium">
            Min Overall Score: <span className="ml-1 font-bold">{minScore}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="ml-2"
            />
          </label>
        </div>

        <button
          onClick={handleReset}
          className="text-sm bg-gray-100 hover:bg-gray-200 border px-3 py-1 rounded"
        >
          Reset Filters
        </button>
      </div>

      {/* --- Brands Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((brand) => (
          <Link
            key={brand.id}
            to={`/brands/${brand.id}`}
            className="border rounded-lg shadow-sm p-4 flex flex-col items-center text-center space-y-2 bg-white hover:shadow-md transition"
          >
            <img
              src={brand.logo_url}
              alt={`${brand.name} logo`}
              className="w-24 h-24 object-contain mb-2"
            />
            <h2 className="text-xl font-semibold">{brand.name}</h2>
            {brand.score_overall !== null ? (
              <div className="text-sm text-gray-600">
                <p>🌍 Environment: {brand.score_environment}</p>
                <p>👷 Labor: {brand.score_labor}</p>
                <p>🐑 Animals: {brand.score_animals}</p>
                <p className="font-bold text-green-700 mt-1">
                  Overall: {brand.score_overall}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No scores available</p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
};
