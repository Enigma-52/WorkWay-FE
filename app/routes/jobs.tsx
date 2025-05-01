import { useEffect, useState, useRef, useCallback } from "react";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    employmentType: "",
    experienceLevel: "",
    domain: "",
    location: "",
    title: "",
  });
  const [lastPageMarker, setLastPageMarker] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadJobs = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const query = new URLSearchParams({
        pageSize: "10",
        lastPageMarker,
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v)),
      });

      const backendUrl = window.ENV.BACKEND_URL;
      const res = await fetch(`${backendUrl}/api/jobs?${query}`);
      if (!res.ok) throw new Error("Failed to fetch");

      const json = await res.json();
      setJobs((prev) => [...prev, ...json.jobs]);
      if (json.jobs.length > 0) {
        const lastJob = json.jobs[json.jobs.length - 1];
        const lastPageMarker = JSON.stringify({
          updatedAt: lastJob.updatedAt,
          id: lastJob.id,
        });
        setLastPageMarker(lastPageMarker);
      }
      setHasMore(json.jobs.length > 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [lastPageMarker, filters, loading, hasMore]);

  useEffect(() => {
    setJobs([]);
    setLastPageMarker("");
    setHasMore(true);
  }, [filters]);

  const loaderRef = useRef(null);
  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) loadJobs();
    });

    if (loaderRef.current) observer.current.observe(loaderRef.current);
  }, [loading, hasMore, loadJobs]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters on the left (1 column on md+) */}
        <div className="md:col-span-1 p-4 bg-white rounded-lg shadow-md">
          <Filters filters={filters} setFilters={setFilters} />
        </div>

        {/* Job cards on the right (3 columns on md+) */}
        <main className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
          {loading && <p className="text-gray-500 mt-4">Loading...</p>}
          <div ref={loaderRef}></div>
        </main>
      </div>
    </div>
  );
}

function Filters({ filters, setFilters }: any) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        name="title"
        placeholder="Search by job title"
        value={filters.title}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, title: e.target.value }))
        }
        className="border p-2 rounded-md shadow-sm"
      />
      <select
        name="employmentType"
        value={filters.employmentType}
        onChange={handleChange}
        className="border p-2 rounded-md shadow-sm"
      >
        <option value="">Employment Type</option>
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
        <option value="Internship">Internship</option>
      </select>

      <select
        name="experienceLevel"
        value={filters.experienceLevel}
        onChange={handleChange}
        className="border p-2 rounded-md shadow-sm"
      >
        <option value="">Experience Level</option>
        <option value="Entry-level">Entry-level</option>
        <option value="Mid-level">Mid-level</option>
        <option value="Senior">Senior</option>
      </select>

      <select
        name="domain"
        value={filters.domain}
        onChange={handleChange}
        className="border p-2 rounded-md shadow-sm"
      >
        <option value="">Domain</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="DevOps">DevOps</option>
        <option value="Data">Data</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={filters.location}
        onChange={(e) => handleChange(e as any)}
        className="border p-2 rounded-md shadow-sm"
      />

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Creator Links */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-500 font-medium">
          Created with ❤️ by Rohit Singh
        </p>
        <div className="flex space-x-2">
          <a
            href="https://github.com/Enigma-52"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm"
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/rohitsingh52/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

function JobCard({ job }: { job: any }) {
  const formattedDate = new Date(job.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
            {job.company_img && (
              <img
                src={job.company_img}
                alt={job.company}
                className="h-6 w-6 rounded-full"
              />
            )}
            <span>
              {job.company} • {job.location}
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
          <div className="flex gap-2 flex-wrap mb-3">
            <Tag>{job.experienceLevel}</Tag>
            <Tag>{job.employmentType}</Tag>
            <Tag>{job.domain}</Tag>
            <Tag>{job.workplaceType}</Tag>
          </div>
          <div className="text-sm mt-6 ml-auto">Added on {formattedDate}</div>
        </div>
        <a
          href={job.absolute_url}
          target="_blank"
          className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700"
        >
          Apply
        </a>
      </div>
      <div className="text-sm text-gray-700">
        {/* Add any additional job description here */}
      </div>
    </div>
  );
}

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-md">
    {children}
  </span>
);
