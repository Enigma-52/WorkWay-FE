import type { MetaFunction } from "@remix-run/node";

export default function JobsPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-500">JobSearch</div>
        <div className="flex items-center space-x-4">
          <button className="text-blue-500 hover:text-blue-700">Sign In</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Post a Job
          </button>
        </div>
      </header>

      <div className="flex">
        <aside className="w-1/4 p-6 border-r border-gray-200 sticky top-0 h-screen overflow-y-auto">
          <h2 className="text-xl font-semibold mb-6">Filters</h2>

          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Role Type
            </h3>
            <div className="space-y-2">
              {["Internships", "Full-time", "Contract"].map((type) => (
                <div key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`role-${type}`}
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`role-${type}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Filter */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Experience Level
            </h3>
            <div className="space-y-2">
              {["Entry", "Mid", "Senior", "Lead"].map((level) => (
                <div key={level} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`exp-${level}`}
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`exp-${level}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Location</h3>
            <div className="space-y-2">
              {["Remote", "SF", "NY", "Bangalore"].map((location) => (
                <div key={location} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`loc-${location}`}
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`loc-${location}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {location}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button className="text-sm text-blue-500 hover:text-blue-700">
            Clear Filters
          </button>
        </aside>

        {/* Jobs List (75-80% width) */}
        <main className="w-3/4 p-6">
          {/* Search and Sort Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-2/3">
              <input
                type="text"
                placeholder="Search for jobs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Newest</option>
              <option>Relevance</option>
            </select>
          </div>

          {/* Job Cards */}
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <JobCard key={i} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function JobCard() {
  const jobTypes = ["Full-time", "Contract", "Internship"];
  const levels = ["Entry", "Mid", "Senior", "Lead"];
  const locations = ["Remote", "SF", "NY", "Bangalore"];

  const randomType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
  const randomLevel = levels[Math.floor(Math.random() * levels.length)];
  const randomLocation =
    locations[Math.floor(Math.random() * locations.length)];

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold">
              {randomLocation.charAt(0)}
            </div>
            <span className="text-sm text-gray-500">
              TechCorp • {randomLocation}
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2">
            Software Engineer ({randomLevel})
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            We're looking for a skilled software engineer to join our growing
            team...
          </p>
          <div className="flex space-x-3">
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
              {randomType}
            </span>
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
              {randomLevel}
            </span>
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
              {randomLocation}
            </span>
          </div>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600">
          Apply
        </button>
      </div>
    </div>
  );
}
