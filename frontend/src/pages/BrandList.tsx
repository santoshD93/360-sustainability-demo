import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Brand {
  id: number;
  name: string;
  description: string;
  logo_url: string;
}

export const BrandList = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      const { data, error } = await supabase.from('brands').select('*');
      if (error) {
        console.error('Error fetching brands:', error.message);
      } else {
        setBrands(data);
      }
      setLoading(false);
    };
    fetchBrands();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sustainable Brands</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <img
              src={brand.logo_url}
              alt={`${brand.name} logo`}
              className="h-16 mb-4 object-contain"
            />
            <h2 className="text-xl font-semibold">{brand.name}</h2>
            <p className="text-gray-600 mt-2">{brand.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
};
