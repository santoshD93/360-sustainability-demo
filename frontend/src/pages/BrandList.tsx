import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

type Brand = {
  id: string;
  name: string;
  logo_url: string;
  score_overall: number | null;
  score_environment: number | null;
  score_labor: number | null;
  score_animals: number | null;
};

export const BrandList = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrandsWithScores() {
      const { data: brandsData, error: brandsError } = await supabase
        .from("brands")
        .select("*");

      if (brandsError) {
        console.error("Error fetching brands:", brandsError.message);
        setLoading(false);
        return;
      }

      const enrichedBrands = await Promise.all(
        brandsData.map(async (brand: any) => {
          const { data: scoreData, error: scoreError } = await supabase
            .from("sustainability_scores")
            .select("*")
            .eq("brand_id", brand.id)
            .single();

          if (scoreError) {
            console.warn(`No scores found for brand ${brand.name}`);
          }

          return {
            id: brand.id,
            name: brand.name,
            logo_url: brand.logo_url,
            score_overall: scoreData?.score_overall ?? null,
            score_environment: scoreData?.score_environment ?? null,
            score_labor: scoreData?.score_labor ?? null,
            score_animals: scoreData?.score_animals ?? null,
          };
        })
      );

      setBrands(enrichedBrands);
      setLoading(false);
    }

    fetchBrandsWithScores();
  }, []);

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading brands...</p>;
  }

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Sustainable Brands</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Link
            to={`/brands/${brand.id}`}
            key={brand.id}
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
