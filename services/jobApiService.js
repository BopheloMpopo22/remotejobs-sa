// Unified Job API Service
// Fetches jobs from multiple sources and normalizes the data

import { fetchRemoteCoFromRSS } from "./remoteCoService.js";
import { fetchWeWorkRemotelyJobs, fetchRemoteOKJobs, fetchJobsPressoJobs } from "./alternativeJobSources.js";

const ADZUNA_APP_ID = "6d779b8f";
const ADZUNA_API_KEY = "9854bcbf1e37c466be4206d7a2114d8a";

/**
 * Fetch jobs from multiple APIs and return normalized results
 */
export async function fetchJobsFromMultipleSources(searchTerms, options = {}) {
  const {
    maxJobsPerSource = 20,
    includeAdzuna = true,
    includeRemoteCo = true,
    includeGitHubJobs = true,
    includeWeWorkRemotely = true,
    includeRemoteOK = true,
    includeJobsPresso = true,
    country = "za",
  } = options;

  const allJobs = [];
  const errors = [];

  // Fetch from Adzuna (existing)
  if (includeAdzuna) {
    try {
      const adzunaJobs = await fetchJobsFromAdzuna(
        searchTerms,
        maxJobsPerSource,
        country
      );
      allJobs.push(...adzunaJobs);
      console.log(`✅ Adzuna: ${adzunaJobs.length} jobs`);
    } catch (error) {
      console.error("❌ Adzuna error:", error);
      errors.push({ source: "Adzuna", error: error.message });
    }
  }

  // Fetch from Remote.co
  if (includeRemoteCo) {
    try {
      const remoteCoJobs = await fetchRemoteCoFromRSS(
        searchTerms,
        maxJobsPerSource
      );
      allJobs.push(...remoteCoJobs);
      console.log(`✅ Remote.co: ${remoteCoJobs.length} jobs`);
    } catch (error) {
      console.error("❌ Remote.co error:", error);
      errors.push({ source: "Remote.co", error: error.message });
    }
  }

  // Fetch from GitHub Jobs
  if (includeGitHubJobs) {
    try {
      const githubJobs = await fetchJobsFromGitHub(
        searchTerms,
        maxJobsPerSource
      );
      allJobs.push(...githubJobs);
      console.log(`✅ GitHub Jobs: ${githubJobs.length} jobs`);
    } catch (error) {
      console.error("❌ GitHub Jobs error:", error);
      errors.push({ source: "GitHub Jobs", error: error.message });
    }
  }

  // Fetch from We Work Remotely
  if (includeWeWorkRemotely) {
    try {
      const weWorkRemotelyJobs = await fetchWeWorkRemotelyJobs(
        searchTerms,
        maxJobsPerSource
      );
      allJobs.push(...weWorkRemotelyJobs);
      console.log(`✅ We Work Remotely: ${weWorkRemotelyJobs.length} jobs`);
    } catch (error) {
      console.error("❌ We Work Remotely error:", error);
      errors.push({ source: "We Work Remotely", error: error.message });
    }
  }

  // Fetch from RemoteOK
  if (includeRemoteOK) {
    try {
      const remoteOKJobs = await fetchRemoteOKJobs(
        searchTerms,
        maxJobsPerSource
      );
      allJobs.push(...remoteOKJobs);
      console.log(`✅ RemoteOK: ${remoteOKJobs.length} jobs`);
    } catch (error) {
      console.error("❌ RemoteOK error:", error);
      errors.push({ source: "RemoteOK", error: error.message });
    }
  }

  // Fetch from JobsPresso
  if (includeJobsPresso) {
    try {
      const jobsPressoJobs = await fetchJobsPressoJobs(
        searchTerms,
        maxJobsPerSource
      );
      allJobs.push(...jobsPressoJobs);
      console.log(`✅ JobsPresso: ${jobsPressoJobs.length} jobs`);
    } catch (error) {
      console.error("❌ JobsPresso error:", error);
      errors.push({ source: "JobsPresso", error: error.message });
    }
  }

  // Remove duplicates and sort
  const uniqueJobs = removeDuplicateJobs(allJobs);
  const sortedJobs = sortJobsByRelevance(uniqueJobs);

  console.log(`📊 Total unique jobs: ${sortedJobs.length}`);
  if (errors.length > 0) {
    console.log(`⚠️ API errors: ${errors.length}`);
  }

  return {
    jobs: sortedJobs,
    sources: {
      adzuna: includeAdzuna,
      remoteCo: includeRemoteCo,
      githubJobs: includeGitHubJobs,
      weWorkRemotely: includeWeWorkRemotely,
      remoteOK: includeRemoteOK,
      jobsPresso: includeJobsPresso,
    },
    errors,
  };
}

/**
 * Fetch jobs from Adzuna API (existing implementation)
 */
async function fetchJobsFromAdzuna(searchTerms, maxJobs, country) {
  const allJobs = [];

  for (const term of searchTerms) {
    try {
      const response = await fetch(
        `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_API_KEY}&results_per_page=${Math.min(maxJobs, 10)}&category=${term}&what=remote&content-type=application/json`
      );

      if (!response.ok) {
        console.error(`❌ Adzuna API error for ${term}:`, response.status);
        continue;
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const normalizedJobs = data.results.map((job) =>
          normalizeAdzunaJob(job)
        );
        allJobs.push(...normalizedJobs);
      }
    } catch (error) {
      console.error(`❌ Error fetching Adzuna jobs for ${term}:`, error);
    }
  }

  return allJobs.slice(0, maxJobs);
}

/**
 * Fetch jobs from GitHub Jobs API
 */
async function fetchJobsFromGitHub(searchTerms, maxJobs) {
  try {
    // GitHub Jobs API is deprecated, but we can use GitHub's GraphQL API for job postings
    // For now, we'll use a mock implementation
    const jobs = await fetchGitHubJobPostings(searchTerms, maxJobs);
    return jobs;
  } catch (error) {
    console.error("❌ GitHub Jobs fetch error:", error);
    return [];
  }
}

/**
 * Normalize Adzuna job data to standard format
 */
function normalizeAdzunaJob(job) {
  return {
    id: `adzuna_${job.id}`,
    title: job.title,
    company: job.company?.display_name || "Unknown Company",
    location: job.location?.display_name || "Remote",
    salary: formatSalary(job.salary_min, job.salary_max),
    description: job.description || "",
    url: job.redirect_url,
    source: "Adzuna",
    created: job.created,
    salary_min: job.salary_min,
    salary_max: job.salary_max,
    category: job.category?.tag || "general",
  };
}

/**
 * Fetch GitHub job postings (mock implementation)
 */
async function fetchGitHubJobPostings(searchTerms, maxJobs) {
  // This is a mock implementation
  // In reality, you'd need to use GitHub's GraphQL API or scrape job boards
  const mockJobs = [
    {
      id: `github_${Date.now()}_1`,
      title: "Senior Full Stack Developer - Remote",
      company: "TechCorp",
      location: "Remote",
      salary: "R45,000 - R65,000/month",
      description:
        "Looking for an experienced full stack developer to join our remote team...",
      url: "https://github.com/jobs/example",
      source: "GitHub Jobs",
      created: new Date().toISOString(),
      salary_min: 45000,
      salary_max: 65000,
      category: "it-jobs",
    },
  ];

  return mockJobs.slice(0, maxJobs);
}

/**
 * Remove duplicate jobs based on title and company
 */
function removeDuplicateJobs(jobs) {
  const seen = new Set();
  return jobs.filter((job) => {
    const key = `${job.title.toLowerCase()}_${job.company.toLowerCase()}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * Sort jobs by relevance (salary, recency, source priority)
 */
function sortJobsByRelevance(jobs) {
  return jobs.sort((a, b) => {
    // Priority: Adzuna > RemoteOK > We Work Remotely > JobsPresso > Remote.co > GitHub Jobs
    const sourcePriority = { 
      Adzuna: 6, 
      RemoteOK: 5,
      "We Work Remotely": 4, 
      JobsPresso: 3,
      "Remote.co": 2, 
      "GitHub Jobs": 1 
    };
    const aPriority = sourcePriority[a.source] || 0;
    const bPriority = sourcePriority[b.source] || 0;

    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }

    // Then by salary
    const aSalary = a.salary_max || a.salary_min || 0;
    const bSalary = b.salary_max || b.salary_min || 0;
    if (aSalary !== bSalary) {
      return bSalary - aSalary;
    }

    // Finally by date
    return new Date(b.created) - new Date(a.created);
  });
}

/**
 * Format salary for display
 */
function formatSalary(min, max) {
  if (!min && !max) return "Salary not specified";
  if (min && max) {
    return `R${(min / 1000).toFixed(0)}k - R${(max / 1000).toFixed(0)}k/month`;
  }
  const salary = min || max;
  return `R${(salary / 1000).toFixed(0)}k/month`;
}

export default {
  fetchJobsFromMultipleSources,
  fetchJobsFromAdzuna,
  fetchJobsFromGitHub,
};
