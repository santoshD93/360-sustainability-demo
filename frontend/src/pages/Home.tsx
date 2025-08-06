import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <main className="home-container">
      <div className="hero">
        <h1>🌱 360 Sustainability Insights</h1>
        <p>A central dashboard for transparent, brand-level sustainability data.</p>
        <Link to="/brands" className="cta-button">
          View Brands
        </Link>
      </div>
    </main>
  );
};

export default Home;
