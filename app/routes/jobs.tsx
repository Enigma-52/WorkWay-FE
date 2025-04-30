import { useEffect, useState, useRef, useCallback } from "react";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    employmentType: "",
    experienceLevel: "",
    domain: "",
    location: "",
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

      const res = await fetch(`http://localhost:8080/api/jobs?${query}`);
      if (!res.ok) throw new Error("Failed to fetch");

      const json = await res.json();
      setJobs((prev) => [...prev, ...json.jobs]);
      if (json.jobs.length > 0) {
        const lastJob = json.jobs[json.jobs.length - 1];
        setLastPageMarker(lastJob.id);
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

  useEffect(() => {
    loadJobs();
  }, [filters, loadJobs]);

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
    </div>
  );
}

function JobCard({ job }: { job: any }) {
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
          <div className="text-sm mt-6 ml-auto">
            Added on {new Date(job.updatedAt).toLocaleString()}
          </div>
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
