import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          🌱 360 Sustainability Insights
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          A central dashboard for transparent, brand-level sustainability data.
        </p>
        <Link
          to="/brands"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
        >
          View Brands
        </Link>
      </div>
    </main>
  );
};

export default Home;
