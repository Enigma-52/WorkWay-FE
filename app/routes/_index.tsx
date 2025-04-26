import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "TechJobs - Your Gateway to Tech Opportunities" },
    {
      name: "description",
      content:
        "Discover curated tech opportunities from leading startups to established companies.",
    },
  ];
};

export default function Index() {
  const categories = [
    { name: "Remote", icon: "🌎", filter: "location=remote" },
    { name: "Design", icon: "🎨", filter: "role=design" },
    { name: "Engineering", icon: "👩‍💻", filter: "role=engineering" },
    { name: "Product", icon: "🚀", filter: "role=product" },
    { name: "Data", icon: "📊", filter: "role=data" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full opacity-20 -mr-32 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200 rounded-full opacity-20 -ml-40 -mb-40"></div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          <span className="ml-2 text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            WorkWay
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <Link
            to="/jobs"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Browse
          </Link>
          <button
            disabled
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Companies
          </button>
          <button
            disabled
            className="text-gray-600 hover:text-blue-600 transition"
          >
            About
          </button>
          {/* <Link
            to="/login"
            className="px-5 py-2 bg-white text-blue-600 font-medium rounded-full border border-blue-100 shadow-sm hover:shadow-md transition"
          >
            Sign In
          </Link> */}
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            <span className="block">Discover Your</span>
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Dream Tech Career
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Curated opportunities from innovative startups to industry leaders.
          </p>

          {/* Stats */}
          <div className="mt-6 flex justify-center space-x-12">
            <div>
              <div className="text-3xl font-bold text-gray-900">10k+</div>
              <div className="text-sm text-gray-500">Open Positions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">2.4k+</div>
              <div className="text-sm text-gray-500">Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">8.5k+</div>
              <div className="text-sm text-gray-500">Hired Monthly</div>
            </div>
          </div>

          {/* Search Box */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <div className="flex">
              <input
                type="text"
                placeholder="Search positions..."
                className="w-full px-6 py-4 rounded-l-full bg-white shadow-md border-0 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
              <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 rounded-r-full shadow-md hover:shadow-lg transition">
                Search
              </button>
            </div>

            {/* Trending Tags */}
            <div className="mt-4 flex justify-center flex-wrap">
              <span className="text-sm text-gray-500 mr-2">Trending:</span>
              <Link
                to="/jobs?tag=remote"
                className="text-sm text-blue-600 mr-3 hover:underline"
              >
                Remote
              </Link>
              <Link
                to="/jobs?tag=ai"
                className="text-sm text-blue-600 mr-3 hover:underline"
              >
                AI/ML
              </Link>
              <Link
                to="/jobs?tag=startup"
                className="text-sm text-blue-600 hover:underline"
              >
                Startups
              </Link>
            </div>
          </div>
        </div>

        {/* Category Cards */}
        <div className="mt-10 mb-4">
          <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
            Explore by Category
          </h2>
          <div className="flex justify-center space-x-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/jobs?${category.filter}`}
                className="w-24 h-24 bg-white rounded-xl shadow-md p-3 flex flex-col items-center justify-center hover:shadow-lg transition"
              >
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                  <span className="text-xl">{category.icon}</span>
                </div>
                <span className="font-medium text-gray-900 text-sm">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 px-8 flex justify-between items-center">
        <div className="text-sm text-gray-500">Built with ❤️ • v1.0</div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-gray-600 transition">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-600 transition">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-600 transition">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
