import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Brand {
  id: number;
  name: string;
  logo_url: string;
  sustainability_score: number;
}

const BrandList: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const { data, error } = await supabase.from('brands').select('*');
      if (error) console.error('Error fetching brands:', error);
      else setBrands(data as Brand[]);
    };
    fetchBrands();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Sustainable Brands</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={brand.logo_url}
                alt={`${brand.name} logo`}
                className="h-20 object-contain mx-auto mb-4"
                onError={(e) =>
                  ((e.target as HTMLImageElement).src = '/fallback-logo.png')
                }
              />
              <h2 className="text-xl font-semibold mb-2 text-gray-900">{brand.name}</h2>
              <div className="text-sm text-gray-600 mb-1">Sustainability Score</div>
              <div
                className={`inline-block px-3 py-1 rounded-full font-bold text-white ${
                  brand.sustainability_score >= 80
                    ? 'bg-green-600'
                    : brand.sustainability_score >= 60
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
              >
                {brand.sustainability_score}/100
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BrandList;
