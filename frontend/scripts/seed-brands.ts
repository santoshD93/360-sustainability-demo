import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const brands = [
  {
    name: "Patagonia",
    logo_url: "https://upload.wikimedia.org/patagonia-logo.png",
    website: "https://www.patagonia.com",
    sustainability_score: 92,
  },
  {
    name: "Everlane",
    logo_url: "https://upload.wikimedia.org/everlane-logo.png",
    website: "https://www.everlane.com",
    sustainability_score: 80,
  },
];

for (const brand of brands) {
  const { error } = await supabase.from("brands").insert(brand);
  if (error) console.error("Error inserting brand", brand.name, error.message);
}
