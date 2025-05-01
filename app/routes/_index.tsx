import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "WorkWay - Your Gateway to Tech Opportunities" },
    {
      name: "description",
      content:
        "Find all tech jobs in one place. No more jumping between Greenhouse, Lever, and company career pages.",
    },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 overflow-hidden">
      <nav className="flex items-center justify-between px-8 py-4 relative z-10">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          <span className="ml-2 text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            WorkWay
          </span>
        </div>
        <div>
          <Link
            to="/jobs"
            className="text-gray-600 hover:text-blue-600 transition mr-6"
          >
            Browse
          </Link>
          <Link to="#" className="text-gray-600 hover:text-blue-600 transition">
            About
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Eye-catching Headline */}
          <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm py-3 px-6 rounded-lg inline-block mb-4">
            <span className="text-sm font-medium text-indigo-600">
              One place for all tech jobs
            </span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-2">
            <span className="block">Tired of bouncing between</span>
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Greenhouse, Lever & career pages?
            </span>
          </h1>

          <p className="mt-4 text-xl text-gray-600 max-w-xl mx-auto">
            We aggregate{" "}
            <span className="line-through inline-block mr-1">
              all the boring job boards
            </span>{" "}
            tech opportunities in one beautiful place.
          </p>

          {/* Stats */}
          <div className="mt-8 flex justify-center space-x-12 mb-8">
            <div className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm px-6 py-3 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-gray-900">10k+</div>
              <div className="text-sm text-gray-500">Open Positions</div>
            </div>
            <div className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm px-6 py-3 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-gray-900">2.4k+</div>
              <div className="text-sm text-gray-500">Companies</div>
            </div>
          </div>

          {/* Primary CTA Button */}
          <div className="mt-8 relative">
            <Link
              to="/jobs"
              className="relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-105 inline-flex items-center"
            >
              Find Your Dream Job
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          {/* Testimonial-like tagline */}
          <div className="mt-8 bg-white bg-opacity-60 backdrop-filter backdrop-blur-sm py-3 px-6 rounded-lg inline-block">
            <p className="text-gray-700 italic">
              "Finally, a job board that doesn't make me want to quit looking
              for a job."
            </p>
            <p className="text-sm text-gray-500 mt-1">
              — A relieved job seeker
            </p>
          </div>
        </div>

        {/* Bottom Tags */}
        <div className="mt-12 flex justify-center flex-wrap max-w-lg">
          <span className="text-sm text-gray-500 mr-2">Popular searches:</span>
          <span className="text-sm text-blue-600 mr-3 bg-blue-50 px-2 py-1 rounded-full">
            Remote
          </span>
          <span className="text-sm text-blue-600 mr-3 bg-blue-50 px-2 py-1 rounded-full">
            AI/ML
          </span>
          <span className="text-sm text-blue-600 mr-3 bg-blue-50 px-2 py-1 rounded-full">
            Frontend
          </span>
          <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            Startups
          </span>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 px-8 flex justify-between items-center relative z-10 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          <span className="font-medium text-indigo-600">WorkWay</span> • Built
          with ❤️
        </div>
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
        </div>
      </footer>
    </div>
  );
}
