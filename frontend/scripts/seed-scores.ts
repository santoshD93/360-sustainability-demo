import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const scores = [
  {
    brandName: "Patagonia",
    score_overall: 95,
    score_environment: 98,
    score_labor: 90,
    score_animals: 96,
  },
  {
    brandName: "Allbirds",
    score_overall: 82,
    score_environment: 85,
    score_labor: 75,
    score_animals: 70,
  },
  {
    brandName: "Everlane",
    score_overall: 72,
    score_environment: 65,
    score_labor: 80,
    score_animals: 70,
  },
];

async function seedScores() {
  for (const s of scores) {
    const { data: brand } = await supabase
      .from("brands")
      .select("id")
      .eq("name", s.brandName)
      .single();

    if (!brand) {
      console.warn(`Brand not found: ${s.brandName}`);
      continue;
    }

    await supabase.from("sustainability_scores").insert({
      brand_id: brand.id,
      score_overall: s.score_overall,
      score_environment: s.score_environment,
      score_labor: s.score_labor,
      score_animals: s.score_animals,
    });

    console.log(`Inserted scores for ${s.brandName}`);
  }
}

seedScores();
