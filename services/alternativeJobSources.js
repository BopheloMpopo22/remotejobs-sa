// Alternative Job Sources for Remote Work
// Since Remote.co RSS isn't available, let's add other reliable sources

/**
 * Fetch jobs from AngelList/Wellfound (startup jobs - many remote)
 */
export async function fetchAngelListJobs(searchTerms, maxJobs = 20) {
  try {
    console.log("🚀 Fetching jobs from AngelList/Wellfound...");

    // AngelList has a public API for job listings
    const response = await fetch("https://api.angel.co/1/jobs", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`AngelList API error: ${response.status}`);
    }

    const data = await response.json();
    const jobs = [];

    if (data.jobs && data.jobs.length > 0) {
      for (const job of data.jobs.slice(0, maxJobs)) {
        // Check if job matches our search terms
        const matchesSearch = searchTerms.some(
          (term) =>
            job.title?.toLowerCase().includes(term.toLowerCase()) ||
            job.description?.toLowerCase().includes(term.toLowerCase()) ||
            job.startup?.name?.toLowerCase().includes(term.toLowerCase())
        );

        if (matchesSearch && job.remote_allowed) {
          jobs.push({
            id: `angellist_${job.id}`,
            title: job.title || "Startup Position",
            company: job.startup?.name || "Startup Company",
            location: "Remote",
            salary: job.salary_min
              ? `$${job.salary_min} - $${job.salary_max || job.salary_min}`
              : "Salary not specified",
            description:
              job.description?.substring(0, 200) + "..." ||
              "Exciting startup opportunity",
            url:
              job.angellist_url ||
              `https://angel.co/startups/${job.startup?.id}/jobs/${job.id}`,
            source: "AngelList",
            created: job.created_at || new Date().toISOString(),
            salary_min: job.salary_min,
            salary_max: job.salary_max,
            category: "startup",
          });
        }
      }
    }

    console.log(`✅ AngelList: Found ${jobs.length} remote startup jobs`);
    return jobs;
  } catch (error) {
    console.error("❌ AngelList fetch error:", error);
    return [];
  }
}

/**
 * Fetch jobs from Stack Overflow Jobs (developer positions)
 */
export async function fetchStackOverflowJobs(searchTerms, maxJobs = 20) {
  try {
    console.log("💻 Fetching jobs from Stack Overflow...");

    // Stack Overflow has a public API for job listings
    const response = await fetch(
      "https://api.stackexchange.com/2.3/jobs?site=stackoverflow&pagesize=50",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Stack Overflow API error: ${response.status}`);
    }

    const data = await response.json();
    const jobs = [];

    if (data.items && data.items.length > 0) {
      for (const job of data.items.slice(0, maxJobs)) {
        // Check if job matches our search terms
        const matchesSearch = searchTerms.some(
          (term) =>
            job.title?.toLowerCase().includes(term.toLowerCase()) ||
            job.description?.toLowerCase().includes(term.toLowerCase()) ||
            job.company_name?.toLowerCase().includes(term.toLowerCase())
        );

        if (matchesSearch) {
          jobs.push({
            id: `stackoverflow_${job.job_id}`,
            title: job.title || "Developer Position",
            company: job.company_name || "Tech Company",
            location: job.location || "Remote",
            salary: job.salary_min
              ? `$${job.salary_min} - $${job.salary_max || job.salary_min}`
              : "Salary not specified",
            description:
              job.description?.substring(0, 200) + "..." ||
              "Exciting developer opportunity",
            url: job.link || `https://stackoverflow.com/jobs/${job.job_id}`,
            source: "Stack Overflow",
            created: new Date(job.creation_date * 1000).toISOString(),
            salary_min: job.salary_min,
            salary_max: job.salary_max,
            category: "developer",
          });
        }
      }
    }

    console.log(`✅ Stack Overflow: Found ${jobs.length} developer jobs`);
    return jobs;
  } catch (error) {
    console.error("❌ Stack Overflow fetch error:", error);
    return [];
  }
}

/**
 * Fetch jobs from We Work Remotely (remote-only jobs)
 */
export async function fetchWeWorkRemotelyJobs(searchTerms, maxJobs = 20) {
  try {
    console.log("🏠 Fetching jobs from We Work Remotely...");

    const allJobs = [];
    
    // Multiple We Work Remotely RSS feeds that are working
    const rssFeeds = [
      "https://weworkremotely.com/categories/remote-programming-jobs.rss",
      "https://weworkremotely.com/categories/remote-design-jobs.rss", 
      "https://weworkremotely.com/categories/remote-customer-support-jobs.rss",
      "https://weworkremotely.com/categories/remote-devops-sysadmin-jobs.rss"
    ];

    for (const feedUrl of rssFeeds) {
      try {
        const response = await fetch(feedUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        });

        if (response.ok) {
          const xmlText = await response.text();
          const jobs = parseWeWorkRemotelyRSS(xmlText, searchTerms, Math.ceil(maxJobs / rssFeeds.length));
          allJobs.push(...jobs);
        }
      } catch (error) {
        console.error(`❌ Error fetching ${feedUrl}:`, error);
      }
    }

    // Remove duplicates and limit
    const uniqueJobs = removeDuplicateJobs(allJobs);
    const limitedJobs = uniqueJobs.slice(0, maxJobs);

    console.log(`✅ We Work Remotely: Found ${limitedJobs.length} remote jobs`);
    return limitedJobs;
  } catch (error) {
    console.error("❌ We Work Remotely fetch error:", error);
    return [];
  }
}

/**
 * Parse We Work Remotely RSS feed
 */
function parseWeWorkRemotelyRSS(xmlText, searchTerms, maxJobs) {
  const jobs = [];

  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  let count = 0;

  while ((match = itemRegex.exec(xmlText)) !== null && count < maxJobs) {
    const itemContent = match[1];

    // Try both CDATA and regular title formats
    const titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || 
                      itemContent.match(/<title>(.*?)<\/title>/);
    const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
    const descriptionMatch = itemContent.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) ||
                            itemContent.match(/<description>(.*?)<\/description>/);

    if (titleMatch && linkMatch) {
      const title = titleMatch[1].trim();
      const description = descriptionMatch ? descriptionMatch[1].trim() : "";
      const link = linkMatch[1].trim();

      // Check if job matches our search terms
      const matchesSearch = searchTerms.some(
        (term) =>
          title.toLowerCase().includes(term.toLowerCase()) ||
          description.toLowerCase().includes(term.toLowerCase())
      );

      if (matchesSearch) {
        jobs.push({
          id: `weworkremotely_${Date.now()}_${count}`,
          title: title,
          company: extractCompanyFromTitle(title),
          location: "Remote",
          salary: "Salary not specified",
          description:
            description.substring(0, 200) +
            (description.length > 200 ? "..." : ""),
          url: link,
          source: "We Work Remotely",
          created: new Date().toISOString(),
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
 * Fetch jobs from RemoteOK (remote jobs aggregator)
 */
export async function fetchRemoteOKJobs(searchTerms, maxJobs = 20) {
  try {
    console.log("🌐 Fetching jobs from RemoteOK...");

    const response = await fetch("https://remoteok.io/remote-jobs.rss", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`RemoteOK RSS error: ${response.status}`);
    }

    const xmlText = await response.text();
    const jobs = parseRemoteOKRSS(xmlText, searchTerms, maxJobs);

    console.log(`✅ RemoteOK: Found ${jobs.length} remote jobs`);
    return jobs;
  } catch (error) {
    console.error("❌ RemoteOK fetch error:", error);
    return [];
  }
}

/**
 * Fetch jobs from JobsPresso (remote jobs)
 */
export async function fetchJobsPressoJobs(searchTerms, maxJobs = 20) {
  try {
    console.log("📰 Fetching jobs from JobsPresso...");

    const response = await fetch("https://jobspresso.co/feed/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`JobsPresso RSS error: ${response.status}`);
    }

    const xmlText = await response.text();
    const jobs = parseJobsPressoRSS(xmlText, searchTerms, maxJobs);

    console.log(`✅ JobsPresso: Found ${jobs.length} remote jobs`);
    return jobs;
  } catch (error) {
    console.error("❌ JobsPresso fetch error:", error);
    return [];
  }
}

/**
 * Parse RemoteOK RSS feed
 */
function parseRemoteOKRSS(xmlText, searchTerms, maxJobs) {
  const jobs = [];
  
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  let count = 0;

  while ((match = itemRegex.exec(xmlText)) !== null && count < maxJobs) {
    const itemContent = match[1];
    
    // Try both CDATA and regular title formats
    const titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || 
                      itemContent.match(/<title>(.*?)<\/title>/);
    const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
    const descriptionMatch = itemContent.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) ||
                            itemContent.match(/<description>(.*?)<\/description>/);
    const companyMatch = itemContent.match(/<company>(.*?)<\/company>/);

    if (titleMatch && linkMatch) {
      const title = titleMatch[1].trim();
      const description = descriptionMatch ? descriptionMatch[1].trim() : "";
      const link = linkMatch[1].trim();
      const company = companyMatch ? companyMatch[1].trim() : extractCompanyFromTitle(title);

      // Check if job matches our search terms
      const matchesSearch = searchTerms.some(term => 
        title.toLowerCase().includes(term.toLowerCase()) ||
        description.toLowerCase().includes(term.toLowerCase()) ||
        company.toLowerCase().includes(term.toLowerCase())
      );

      if (matchesSearch) {
        jobs.push({
          id: `remoteok_${Date.now()}_${count}`,
          title: title,
          company: company,
          location: "Remote",
          salary: "Salary not specified",
          description: description.substring(0, 200) + (description.length > 200 ? "..." : ""),
          url: link,
          source: "RemoteOK",
          created: new Date().toISOString(),
          salary_min: null,
          salary_max: null,
          category: "remote"
        });
        count++;
      }
    }
  }

  return jobs;
}

/**
 * Parse JobsPresso RSS feed
 */
function parseJobsPressoRSS(xmlText, searchTerms, maxJobs) {
  const jobs = [];
  
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  let count = 0;

  while ((match = itemRegex.exec(xmlText)) !== null && count < maxJobs) {
    const itemContent = match[1];
    
    // Try both CDATA and regular title formats
    const titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || 
                      itemContent.match(/<title>(.*?)<\/title>/);
    const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
    const descriptionMatch = itemContent.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) ||
                            itemContent.match(/<description>(.*?)<\/description>/);

    if (titleMatch && linkMatch) {
      const title = titleMatch[1].trim();
      const description = descriptionMatch ? descriptionMatch[1].trim() : "";
      const link = linkMatch[1].trim();

      // Check if job matches our search terms
      const matchesSearch = searchTerms.some(term => 
        title.toLowerCase().includes(term.toLowerCase()) ||
        description.toLowerCase().includes(term.toLowerCase())
      );

      if (matchesSearch) {
        jobs.push({
          id: `jobspresso_${Date.now()}_${count}`,
          title: title,
          company: extractCompanyFromTitle(title),
          location: "Remote",
          salary: "Salary not specified",
          description: description.substring(0, 200) + (description.length > 200 ? "..." : ""),
          url: link,
          source: "JobsPresso",
          created: new Date().toISOString(),
          salary_min: null,
          salary_max: null,
          category: "remote"
        });
        count++;
      }
    }
  }

  return jobs;
}

/**
 * Remove duplicate jobs based on title and company
 */
function removeDuplicateJobs(jobs) {
  const seen = new Set();
  return jobs.filter(job => {
    const key = `${job.title.toLowerCase()}_${job.company.toLowerCase()}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

export default {
  fetchAngelListJobs,
  fetchStackOverflowJobs,
  fetchWeWorkRemotelyJobs,
  fetchRemoteOKJobs,
  fetchJobsPressoJobs,
};
