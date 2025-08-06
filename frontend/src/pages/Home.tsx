import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 flex items-center justify-center px-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight text-gray-900">
          🌿 360 Sustainability Insights
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Elevate transparency in sustainability. Explore real, data-driven insights into how brands perform on environmental, labor, and animal welfare standards.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/brands"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md"
          >
            🚀 Explore Brands
          </Link>
          <a
            href="https://github.com/santoshD93/360-sustainability-demo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            ⭐ Star on GitHub
          </a>
        </div>
        <footer className="pt-12 text-sm text-gray-400">
          Built with 💚 by Santosh Dhirwani ·{" "}
          <a
            href="https://www.linkedin.com/in/santoshdhirwani93/"
            className="underline hover:text-green-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect on LinkedIn
          </a>
        </footer>
      </div>
    </main>
  );
}
