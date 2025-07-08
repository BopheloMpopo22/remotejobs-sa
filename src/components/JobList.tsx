import React from "react";

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

interface JobListProps {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

const JobList: React.FC<JobListProps> = ({ jobs, loading, error }) => {
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return "Salary not specified";

    const formatAmount = (amount: number) => {
      if (amount >= 1000000) {
        return `R${(amount / 1000000).toFixed(1)}M`;
      } else if (amount >= 1000) {
        return `R${(amount / 1000).toFixed(0)}K`;
      }
      return `R${amount.toLocaleString()}`;
    };

    if (min && max) {
      return `${formatAmount(min)} - ${formatAmount(max)}`;
    } else if (min) {
      return `${formatAmount(min)}+`;
    } else if (max) {
      return `Up to ${formatAmount(max)}`;
    }

    return "Salary not specified";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays <= 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const truncateDescription = (
    description: string,
    maxLength: number = 150
  ) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trim() + "...";
  };

  // Function to get direct job URL
  const getDirectJobUrl = (redirectUrl: string): string => {
    try {
      // Parse the Adzuna redirect URL to extract the original job URL
      const url = new URL(redirectUrl);

      // Look for common parameters that contain the original URL
      const originalUrl =
        url.searchParams.get("url") ||
        url.searchParams.get("redirect") ||
        url.searchParams.get("link") ||
        url.searchParams.get("u");

      if (originalUrl) {
        return decodeURIComponent(originalUrl);
      }

      // If no direct parameter, try to extract from the path or other parameters
      // Some Adzuna URLs have the original URL encoded in the path
      const pathSegments = url.pathname.split("/");
      const lastSegment = pathSegments[pathSegments.length - 1];

      // Check if the last segment looks like an encoded URL
      if (lastSegment && lastSegment.length > 50) {
        try {
          const decoded = decodeURIComponent(lastSegment);
          if (decoded.startsWith("http")) {
            return decoded;
          }
        } catch (e) {
          // If decoding fails, continue with original URL
        }
      }

      // If we can't extract the original URL, return the Adzuna URL
      // but add a note that it's going through Adzuna
      return redirectUrl;
    } catch (error) {
      console.error("Error parsing job URL:", error);
      return redirectUrl;
    }
  };

  // Function to get job source name
  const getJobSource = (redirectUrl: string): string => {
    try {
      const directUrl = getDirectJobUrl(redirectUrl);
      const url = new URL(directUrl);

      // Extract domain name for display
      const domain = url.hostname.replace("www.", "");

      // Map common job sites to friendly names
      const siteNames: { [key: string]: string } = {
        "linkedin.com": "LinkedIn",
        "indeed.com": "Indeed",
        "glassdoor.com": "Glassdoor",
        "careerbuilder.com": "CareerBuilder",
        "monster.com": "Monster",
        "ziprecruiter.com": "ZipRecruiter",
        "simplyhired.com": "SimplyHired",
        "dice.com": "Dice",
        "stackoverflow.com": "Stack Overflow",
        "weworkremotely.com": "We Work Remotely",
        "remote.co": "Remote.co",
        "angel.co": "AngelList",
        "adzuna.co.za": "Adzuna",
        "adzuna.co.uk": "Adzuna",
        "adzuna.com": "Adzuna",
      };

      return siteNames[domain] || domain;
    } catch (error) {
      return "Job Site";
    }
  };

  if (loading) {
    return (
      <div className="jobs-container">
        <div className="jobs-header">
          <h2>Loading Jobs...</h2>
          <p>Please wait while we fetch the latest remote job opportunities.</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "3rem",
            fontSize: "1.125rem",
            color: "#6b7280",
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="jobs-container">
        <div className="jobs-header">
          <h2>Error Loading Jobs</h2>
          <p>We encountered an issue while fetching jobs. Please try again.</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "3rem",
            fontSize: "1.125rem",
            color: "#dc2626",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="jobs-container">
        <div className="jobs-header">
          <h2>No Jobs Found</h2>
          <p>Try adjusting your search criteria to find more opportunities.</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "3rem",
            fontSize: "1.125rem",
            color: "#6b7280",
            textAlign: "center",
          }}
        >
          No jobs match your current search criteria.
        </div>
      </div>
    );
  }

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <h2>Remote Job Opportunities</h2>
        <p>
          Discover {jobs.length} remote job opportunities that match your
          criteria.
        </p>
      </div>

      <div className="jobs-grid">
        {jobs.map((job) => {
          const directUrl = getDirectJobUrl(job.redirect_url);

          return (
            <div key={job.id} className="job-card">
              <h3 className="job-title">
                <a href={directUrl} target="_blank" rel="noopener noreferrer">
                  {job.title}
                </a>
              </h3>

              <div className="job-company">
                <span>🏢</span>
                <span>{job.company.display_name}</span>
              </div>

              <div className="job-location">
                <span>📍</span>
                <span>{job.location.display_name}</span>
              </div>

              {job.salary_min || job.salary_max ? (
                <div className="job-salary">
                  {formatSalary(job.salary_min, job.salary_max)}
                </div>
              ) : null}

              <div className="job-date">Posted {formatDate(job.created)}</div>

              <p className="job-description">
                {truncateDescription(job.description)}
              </p>

              <div className="job-footer">
                <a
                  href={directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apply-button"
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "white",
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "0.75rem",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                  title="Click to view job details and apply on the original job site"
                >
                  View & Apply
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobList;
