import React, { useState, useEffect } from "react";

interface Job {
  id: string;
  title: string;
  company: {
    display_name: string;
  };
  location: {
    display_name: string;
  };
  salary_min?: number;
  salary_max?: number;
  created: string;
  description: string;
  redirect_url: string;
  category: {
    label: string;
  };
}

interface JobSearchProps {
  onJobsChange: (jobs: Job[]) => void;
  onLoadingChange: (loading: boolean) => void;
  onErrorChange: (error: string | null) => void;
}

// Cache interface
interface CacheEntry {
  data: Job[];
  totalJobs: number;
  timestamp: number;
  expiresAt: number;
}

const JobSearch: React.FC<JobSearchProps> = ({
  onJobsChange,
  onLoadingChange,
  onErrorChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("remote");
  const [selectedCountry, setSelectedCountry] = useState("za");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [salaryRange, setSalaryRange] = useState("all");
  const [experienceLevel, setExperienceLevel] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [jobsPerPage] = useState(12);
  const [allJobs, setAllJobs] = useState<Job[]>([]);

  // Your Adzuna API keys
  const APP_ID = "6d779b8f";
  const API_KEY = "9854bcbf1e37c466be4206d7a2114d8a";

  // Cache configuration
  const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
  const CACHE_PREFIX = "remotejobs_cache_";
  const MAX_CACHE_SIZE = 50; // Maximum number of cached entries
  const TOTAL_JOBS_TO_FETCH = 50; // Fetch 50 jobs for client-side pagination

  // Calculate total pages for client-side pagination
  const totalPages = Math.ceil(
    Math.min(totalJobs, TOTAL_JOBS_TO_FETCH) / jobsPerPage
  );

  // Available countries (Adzuna supports)
  const countries = [
    { code: "za", name: "South Africa" },
    { code: "gb", name: "United Kingdom" },
    { code: "us", name: "United States" },
    { code: "au", name: "Australia" },
    { code: "br", name: "Brazil" },
    { code: "ca", name: "Canada" },
    { code: "de", name: "Germany" },
    { code: "fr", name: "France" },
    { code: "in", name: "India" },
    { code: "it", name: "Italy" },
    { code: "mx", name: "Mexico" },
    { code: "nl", name: "Netherlands" },
    { code: "nz", name: "New Zealand" },
    { code: "pl", name: "Poland" },
    { code: "ru", name: "Russia" },
    { code: "sg", name: "Singapore" },
    { code: "es", name: "Spain" },
  ];

  // Updated job categories including Legal Jobs
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "it-jobs", label: "IT & Technology" },
    { value: "legal-jobs", label: "Legal Jobs" },
    {
      value: "pr-advertising-marketing-jobs",
      label: "Marketing & Advertising",
    },
    { value: "sales-jobs", label: "Sales" },
    { value: "customer-services-jobs", label: "Customer Service" },
    { value: "creative-design-jobs", label: "Design & Creative" },
    { value: "admin-jobs", label: "Administration" },
    { value: "accounting-finance-jobs", label: "Finance & Accounting" },
    { value: "hr-jobs", label: "Human Resources" },
    { value: "teaching-jobs", label: "Education" },
    { value: "healthcare-nursing-jobs", label: "Healthcare" },
    { value: "engineering-jobs", label: "Engineering" },
    { value: "graduate-jobs", label: "Graduate Jobs" },
    { value: "consultancy-jobs", label: "Consultancy" },
    { value: "retail-jobs", label: "Retail" },
    { value: "hospitality-catering-jobs", label: "Hospitality" },
    { value: "logistics-warehouse-jobs", label: "Logistics" },
    { value: "trade-construction-jobs", label: "Construction" },
    { value: "scientific-qa-jobs", label: "Science & QA" },
    { value: "energy-oil-gas-jobs", label: "Energy & Oil" },
    { value: "property-jobs", label: "Property" },
    { value: "travel-jobs", label: "Travel" },
    { value: "charity-voluntary-jobs", label: "Charity & Voluntary" },
    { value: "other-general-jobs", label: "Other Jobs" },
  ];

  // Salary ranges
  const salaryRanges = [
    { value: "all", label: "All Salaries" },
    { value: "0-30000", label: "R0 - R30,000" },
    { value: "30000-60000", label: "R30,000 - R60,000" },
    { value: "60000-100000", label: "R60,000 - R100,000" },
    { value: "100000-150000", label: "R100,000 - R150,000" },
    { value: "150000+", label: "R150,000+" },
  ];

  // Experience levels
  const experienceLevels = [
    { value: "all", label: "All Experience Levels" },
    { value: "entry-level", label: "No Experience / Entry Level" },
    { value: "junior", label: "1-2 Years Experience" },
    { value: "senior", label: "3+ Years Experience" },
  ];

  // Cache utility functions
  const generateCacheKey = (): string => {
    const params = {
      searchTerm,
      selectedCountry,
      selectedCategory,
      salaryRange,
      experienceLevel,
      // Remove currentPage and jobsPerPage from cache key since we're doing client-side pagination
    };
    return CACHE_PREFIX + btoa(JSON.stringify(params));
  };

  const getCachedData = (): CacheEntry | null => {
    try {
      const cacheKey = generateCacheKey();
      const cached = localStorage.getItem(cacheKey);

      if (!cached) return null;

      const cacheEntry: CacheEntry = JSON.parse(cached);

      // Check if cache is expired
      if (Date.now() > cacheEntry.expiresAt) {
        localStorage.removeItem(cacheKey);
        return null;
      }

      return cacheEntry;
    } catch (error) {
      console.error("Error reading cache:", error);
      return null;
    }
  };

  const setCachedData = (data: Job[], totalJobs: number): void => {
    try {
      const cacheKey = generateCacheKey();
      const cacheEntry: CacheEntry = {
        data,
        totalJobs,
        timestamp: Date.now(),
        expiresAt: Date.now() + CACHE_DURATION,
      };

      localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));

      // Clean up old cache entries
      cleanupCache();
    } catch (error) {
      console.error("Error writing cache:", error);
    }
  };

  // Function to update displayed jobs based on current page
  const updateDisplayJobs = (jobs: Job[], page: number) => {
    const startIndex = (page - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const pageJobs = jobs.slice(startIndex, endIndex);
    onJobsChange(pageJobs);
  };

  const cleanupCache = (): void => {
    try {
      const keys = Object.keys(localStorage);
      const cacheKeys = keys.filter((key) => key.startsWith(CACHE_PREFIX));

      if (cacheKeys.length > MAX_CACHE_SIZE) {
        // Sort by timestamp and remove oldest entries
        const cacheEntries = cacheKeys
          .map((key) => ({
            key,
            timestamp:
              JSON.parse(localStorage.getItem(key) || "{}").timestamp || 0,
          }))
          .sort((a, b) => a.timestamp - b.timestamp);

        // Remove oldest entries
        const toRemove = cacheEntries.slice(
          0,
          cacheEntries.length - MAX_CACHE_SIZE
        );
        toRemove.forEach((entry) => localStorage.removeItem(entry.key));
      }
    } catch (error) {
      console.error("Error cleaning cache:", error);
    }
  };

  // Function to filter jobs by experience level
  const filterJobsByExperience = (jobs: Job[], level: string): Job[] => {
    const searchText = (job: Job) => {
      const title = job.title.toLowerCase();
      const description = job.description.toLowerCase();
      return `${title} ${description}`;
    };

    switch (level) {
      case "entry-level":
        // Look for entry-level indicators
        return jobs.filter((job) => {
          const text = searchText(job);
          const entryLevelTerms = [
            "entry level",
            "entry-level",
            "graduate",
            "trainee",
            "internship",
            "intern",
            "junior",
            "no experience",
            "0 years",
            "fresh graduate",
            "recent graduate",
            "new graduate",
            "entry position",
            "starter",
            "beginner",
            "first job",
            "training provided",
            "will train",
            "no prior experience",
            "entry role",
          ];
          return entryLevelTerms.some((term) => text.includes(term));
        });

      case "junior":
        // Look for junior/mid-level indicators
        return jobs.filter((job) => {
          const text = searchText(job);
          const juniorTerms = [
            "junior",
            "1 year",
            "2 years",
            "3 years",
            "assistant",
            "associate",
            "coordinator",
            "specialist",
            "analyst",
            "developer",
            "designer",
            "1-2 years",
            "2-3 years",
            "1+ years",
            "2+ years",
            "mid-level",
            "mid level",
            "intermediate",
          ];
          return juniorTerms.some((term) => text.includes(term));
        });

      case "senior":
        // Look for senior-level indicators
        return jobs.filter((job) => {
          const text = searchText(job);
          const seniorTerms = [
            "senior",
            "lead",
            "manager",
            "principal",
            "director",
            "head of",
            "5 years",
            "10 years",
            "5+ years",
            "10+ years",
            "experienced",
            "expert",
            "architect",
            "team lead",
            "supervisor",
            "coordinator",
            "senior level",
            "senior-level",
            "leadership",
            "mentor",
            "coach",
            "strategic",
            "strategic planning",
            "decision making",
            "project management",
            "team management",
            "people management",
          ];
          return seniorTerms.some((term) => text.includes(term));
        });

      default:
        return jobs;
    }
  };

  const fetchJobs = async () => {
    onLoadingChange(true);
    onErrorChange(null);

    // Check cache first
    const cachedData = getCachedData();
    if (cachedData) {
      console.log("📦 Using cached data");
      setAllJobs(cachedData.data);
      setTotalJobs(cachedData.totalJobs);
      updateDisplayJobs(cachedData.data, currentPage);
      onLoadingChange(false);
      return;
    }

    try {
      console.log("🌐 Fetching fresh data from API");

      // Build search query - keep it simple for better results
      let searchQuery = searchTerm;

      let url = `https://api.adzuna.com/v1/api/jobs/${selectedCountry}/search/1?app_id=${APP_ID}&app_key=${API_KEY}&results_per_page=${TOTAL_JOBS_TO_FETCH}&what=${encodeURIComponent(
        searchQuery
      )}`;

      // Add category filter
      if (selectedCategory !== "all") {
        url += `&category=${selectedCategory}`;
      }

      // Add salary filter
      if (salaryRange !== "all") {
        const [min, max] = salaryRange.split("-");
        if (max === "+") {
          url += `&salary_min=${min}`;
        } else {
          url += `&salary_min=${min}&salary_max=${max}`;
        }
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      let jobs = data.results || [];
      let total = data.count || 0;

      // Sort jobs by creation date (newest first)
      jobs.sort((a: Job, b: Job) => {
        const dateA = new Date(a.created).getTime();
        const dateB = new Date(b.created).getTime();
        return dateB - dateA; // Newest first
      });

      // Apply client-side experience level filtering
      if (experienceLevel !== "all") {
        jobs = filterJobsByExperience(jobs, experienceLevel);
        total = jobs.length;
      }

      // Store all jobs and update display
      setAllJobs(jobs);
      setTotalJobs(total);
      updateDisplayJobs(jobs, currentPage);

      // Cache the results
      setCachedData(jobs, total);
    } catch (err) {
      onErrorChange(
        err instanceof Error ? err.message : "Failed to fetch jobs"
      );
      console.error("Error fetching jobs:", err);
    } finally {
      onLoadingChange(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [
    searchTerm,
    selectedCountry,
    selectedCategory,
    salaryRange,
    experienceLevel,
    // Remove currentPage from dependencies since we handle pagination client-side
  ]);

  // Handle page changes
  useEffect(() => {
    if (allJobs.length > 0) {
      updateDisplayJobs(allJobs, currentPage);
    }
  }, [currentPage, allJobs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchJobs();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    // No need to fetch jobs again - just update display
  };

  return (
    <div className="search-container">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="search-form">
        {/* Search Input */}
        <div className="search-group">
          <label className="search-label">Search Jobs</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g., remote developer, marketing"
            className="search-input"
          />
        </div>

        {/* Country Selection */}
        <div className="search-group">
          <label className="search-label">Country</label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="search-select"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category Selection */}
        <div className="search-group">
          <label className="search-label">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="search-select"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Level */}
        <div className="search-group">
          <label className="search-label">Experience Level</label>
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="search-select"
          >
            {experienceLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        {/* Salary Range */}
        <div className="search-group">
          <label className="search-label">Salary Range</label>
          <select
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            className="search-select"
          >
            {salaryRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </form>

      {/* Search Button and Results */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button type="submit" onClick={handleSearch} className="search-button">
          Search Jobs
        </button>

        <div style={{ fontSize: "1rem", color: "#6b7280", fontWeight: "500" }}>
          Found {totalJobs.toLocaleString()} jobs
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <nav
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: "0.5rem 1rem",
                border: "2px solid #d1d5db",
                borderRadius: "0.75rem",
                fontSize: "1rem",
                opacity: currentPage === 1 ? 0.5 : 1,
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              Previous
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page =
                Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  style={{
                    padding: "0.5rem 1rem",
                    border: "2px solid",
                    borderRadius: "0.75rem",
                    fontSize: "1rem",
                    transition: "all 0.2s",
                    backgroundColor:
                      currentPage === page ? "#3b82f6" : "transparent",
                    color: currentPage === page ? "white" : "#374151",
                    borderColor: currentPage === page ? "#3b82f6" : "#d1d5db",
                    cursor: "pointer",
                  }}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: "0.5rem 1rem",
                border: "2px solid #d1d5db",
                borderRadius: "0.75rem",
                fontSize: "1rem",
                opacity: currentPage === totalPages ? 0.5 : 1,
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default JobSearch;
