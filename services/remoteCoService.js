// Remote.co Job Scraping Service
// Since Remote.co doesn't have a public API, we'll scrape their job listings

import { JSDOM } from "jsdom";

/**
 * Fetch jobs from Remote.co by scraping their job listings
 */
export async function fetchRemoteCoJobs(searchTerms, maxJobs = 20) {
  try {
    console.log("🌐 Fetching jobs from Remote.co...");

    const jobs = [];
    const baseUrl = "https://remote.co";

    // Remote.co has different job categories we can scrape
    const jobCategories = [
      "remote-jobs/developer",
      "remote-jobs/design",
      "remote-jobs/marketing",
      "remote-jobs/customer-service",
      "remote-jobs/sales",
      "remote-jobs/project-management",
      "remote-jobs/writing",
      "remote-jobs/accounting",
    ];

    for (const category of jobCategories) {
      try {
        const categoryJobs = await scrapeRemoteCoCategory(
          `${baseUrl}/${category}`,
          searchTerms,
          5
        );
        jobs.push(...categoryJobs);

        if (jobs.length >= maxJobs) break;
      } catch (error) {
        console.error(
          `❌ Error scraping Remote.co category ${category}:`,
          error
        );
      }
    }

    // Remove duplicates and limit results
    const uniqueJobs = removeDuplicateJobs(jobs);
    const limitedJobs = uniqueJobs.slice(0, maxJobs);

    console.log(`✅ Remote.co: Found ${limitedJobs.length} unique jobs`);
    return limitedJobs;
  } catch (error) {
    console.error("❌ Remote.co fetch error:", error);
    return [];
  }
}

/**
 * Scrape a specific Remote.co category page
 */
async function scrapeRemoteCoCategory(url, searchTerms, maxJobsPerCategory) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const jobs = [];
    const jobElements = document.querySelectorAll(".job_listings .job_listing");

    for (const element of jobElements) {
      if (jobs.length >= maxJobsPerCategory) break;

      try {
        const job = extractJobFromElement(element, searchTerms);
        if (job) {
          jobs.push(job);
        }
      } catch (error) {
        console.error("❌ Error extracting job from element:", error);
      }
    }

    return jobs;
  } catch (error) {
    console.error(`❌ Error scraping ${url}:`, error);
    return [];
  }
}

/**
 * Extract job data from a DOM element
 */
function extractJobFromElement(element, searchTerms) {
  try {
    const titleElement = element.querySelector(".job_listing-title a");
    const companyElement = element.querySelector(".job_listing-company");
    const locationElement = element.querySelector(".job_listing-location");
    const descriptionElement = element.querySelector(
      ".job_listing-description"
    );
    const linkElement = element.querySelector(".job_listing-title a");

    if (!titleElement || !linkElement) {
      return null;
    }

    const title = titleElement.textContent.trim();
    const company = companyElement
      ? companyElement.textContent.trim()
      : "Remote Company";
    const location = locationElement
      ? locationElement.textContent.trim()
      : "Remote";
    const description = descriptionElement
      ? descriptionElement.textContent.trim()
      : "";
    const url = linkElement.href;

    // Check if job matches our search terms
    const matchesSearch = searchTerms.some(
      (term) =>
        title.toLowerCase().includes(term.toLowerCase()) ||
        description.toLowerCase().includes(term.toLowerCase()) ||
        company.toLowerCase().includes(term.toLowerCase())
    );

    if (!matchesSearch) {
      return null;
    }

    return {
      id: `remoteco_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: title,
      company: company,
      location: location,
      salary: "Salary not specified", // Remote.co doesn't always show salary
      description:
        description.substring(0, 200) + (description.length > 200 ? "..." : ""),
      url: url.startsWith("http") ? url : `https://remote.co${url}`,
      source: "Remote.co",
      created: new Date().toISOString(),
      salary_min: null,
      salary_max: null,
      category: "remote",
    };
  } catch (error) {
    console.error("❌ Error extracting job data:", error);
    return null;
  }
}

/**
 * Alternative method: Use Remote.co's RSS feed
 */
export async function fetchRemoteCoFromRSS(searchTerms, maxJobs = 20) {
  try {
    console.log("📡 Fetching Remote.co jobs from RSS feed...");

    // Try multiple possible RSS feed URLs
    const possibleUrls = [
      "https://remote.co/remote-jobs/feed/",
      "https://remote.co/feed/",
      "https://remote.co/remote-jobs/rss/",
      "https://remote.co/rss/"
    ];

    let response;
    let lastError;
    
    for (const url of possibleUrls) {
      try {
        response = await fetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        });
        
        if (response.ok) {
          console.log(`✅ Found working RSS feed at: ${url}`);
          break;
        }
      } catch (error) {
        lastError = error;
        continue;
      }
    }

    if (!response || !response.ok) {
      throw new Error(`RSS feed error: ${response?.status || 'No working feed found'}`);
    }

    const xmlText = await response.text();
    const jobs = parseRemoteCoRSS(xmlText, searchTerms, maxJobs);

    console.log(`✅ Remote.co RSS: Found ${jobs.length} jobs`);
    return jobs;
  } catch (error) {
    console.error("❌ Remote.co RSS fetch error:", error);
    return [];
  }
}

/**
 * Parse Remote.co RSS feed
 */
function parseRemoteCoRSS(xmlText, searchTerms, maxJobs) {
  const jobs = [];

  // Simple regex-based RSS parsing (you might want to use a proper XML parser)
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  let count = 0;

  while ((match = itemRegex.exec(xmlText)) !== null && count < maxJobs) {
    const itemContent = match[1];

    const titleMatch = itemContent.match(
      /<title><!\[CDATA\[(.*?)\]\]><\/title>/
    );
    const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
    const descriptionMatch = itemContent.match(
      /<description><!\[CDATA\[(.*?)\]\]><\/description>/
    );
    const pubDateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/);

    if (titleMatch && linkMatch) {
      const title = titleMatch[1];
      const description = descriptionMatch ? descriptionMatch[1] : "";
      const link = linkMatch[1];
      const pubDate = pubDateMatch ? pubDateMatch[1] : new Date().toISOString();

      // Check if job matches our search terms
      const matchesSearch = searchTerms.some(
        (term) =>
          title.toLowerCase().includes(term.toLowerCase()) ||
          description.toLowerCase().includes(term.toLowerCase())
      );

      if (matchesSearch) {
        jobs.push({
          id: `remoteco_rss_${Date.now()}_${count}`,
          title: title,
          company: extractCompanyFromTitle(title),
          location: "Remote",
          salary: "Salary not specified",
          description:
            description.substring(0, 200) +
            (description.length > 200 ? "..." : ""),
          url: link,
          source: "Remote.co",
          created: pubDate,
          salary_min: null,
          salary_max: null,
          category: "remote",
        });
        count++;
      }
    }
  }

  return jobs;
}

/**
 * Extract company name from job title
 */
function extractCompanyFromTitle(title) {
  // Common patterns: "Job Title at Company", "Company - Job Title", etc.
  const patterns = [
    /at\s+(.+?)(?:\s*$|\s*-)/i,
    /^(.+?)\s*-\s*/,
    /^(.+?)\s*at\s+/i,
  ];

  for (const pattern of patterns) {
    const match = title.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return "Remote Company";
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

export default {
  fetchRemoteCoJobs,
  fetchRemoteCoFromRSS,
};
