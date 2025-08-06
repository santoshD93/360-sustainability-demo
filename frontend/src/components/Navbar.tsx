import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md p-4 mb-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-green-700">🌱 360 Insights</Link>
        <div className="space-x-4">
          <Link
            to="/"
            className={`text-sm font-medium ${location.pathname === "/" ? "text-green-700" : "text-gray-600 hover:text-green-700"}`}
          >
            Home
          </Link>
          <Link
            to="/brands"
            className={`text-sm font-medium ${location.pathname.startsWith("/brands") ? "text-green-700" : "text-gray-600 hover:text-green-700"}`}
          >
            Brands
          </Link>
        </div>
      </div>
    </nav>
  );
}
