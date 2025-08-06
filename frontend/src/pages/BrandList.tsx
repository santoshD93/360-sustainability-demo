import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";

type BrandWithScores = {
  id: string;
  name: string;
  logo_url: string;
  sustainability_scores?: {
    score_overall: number;
    score_environment: number;
    score_labor: number;
    score_animals: number;
  }[];
};

export const BrandList = () => {
  const [brands, setBrands] = useState<BrandWithScores[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrands() {
      const { data, error } = await supabase
        .from("brands")
        .select(`
          id,
          name,
          logo_url,
          sustainability_scores (
            score_overall,
            score_environment,
            score_labor,
            score_animals
          )
        `);

      if (error) {
        console.error("Error fetching brands:", error.message);
      } else {
        setBrands(data || []);
      }

      setLoading(false);
    }

    fetchBrands();
  }, []);

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading brands...</p>;
  }

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Sustainable Brands</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => {
          const score = brand.sustainability_scores?.[0];
          return (
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
              {score ? (
                <div className="text-sm text-gray-600">
                  <p>🌍 Environment: {score.score_environment}</p>
                  <p>👷 Labor: {score.score_labor}</p>
                  <p>🐑 Animals: {score.score_animals}</p>
                  <p className="font-bold text-green-700 mt-1">Overall: {score.score_overall}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">No scores available</p>
              )}
            </Link>
          );
        })}
      </div>
    </main>
  );
};
