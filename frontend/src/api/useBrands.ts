import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export type Brand = {
  id: string;
  name: string;
  logo_url?: string;
  website?: string;
  sustainability_score?: number;
};

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      const { data, error } = await supabase.from("brands").select("*").order("name");
      if (error) {
        console.error("Failed to fetch brands:", error.message);
      } else {
        setBrands(data || []);
      }
      setLoading(false);
    };
    fetchBrands();
  }, []);

  return { brands, loading };
}
