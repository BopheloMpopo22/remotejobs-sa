// Test script for multi-API job fetching
import { fetchJobsFromMultipleSources } from "../api/services/jobApiService.js";

async function testMultiAPI() {
  console.log("🧪 Testing Multi-API Job Fetching...\n");

  try {
    // Test with software development terms
    const searchTerms = ["it-jobs", "developer", "software engineer"];

    console.log("🔍 Testing with search terms:", searchTerms);
    console.log("⏳ Fetching jobs from multiple sources...\n");

    const result = await fetchJobsFromMultipleSources(searchTerms, {
      maxJobsPerSource: 5,
      includeAdzuna: true,
      includeRemoteCo: true,
      includeGitHubJobs: true,
      country: "za",
    });

    console.log("📊 RESULTS:");
    console.log(`✅ Total jobs found: ${result.jobs.length}`);
    console.log(`📋 Sources used:`, result.sources);

    if (result.errors.length > 0) {
      console.log(`⚠️ Errors encountered:`, result.errors);
    }

    console.log("\n📝 Sample jobs:");
    result.jobs.slice(0, 3).forEach((job, index) => {
      console.log(`${index + 1}. ${job.title} at ${job.company}`);
      console.log(
        `   💰 ${job.salary} | 📍 ${job.location} | 📊 ${job.source}`
      );
      console.log(`   🔗 ${job.url}\n`);
    });

    // Test different categories
    console.log("🔍 Testing different job categories...\n");

    const categories = {
      Marketing: [
        "marketing",
        "digital marketing",
        "pr-advertising-marketing-jobs",
      ],
      Design: ["designer", "ui/ux", "creative-design-jobs"],
      Data: ["data analyst", "data scientist", "scientific-qa-jobs"],
    };

    for (const [category, terms] of Object.entries(categories)) {
      console.log(`📊 Testing ${category} jobs...`);
      const categoryResult = await fetchJobsFromMultipleSources(terms, {
        maxJobsPerSource: 3,
        includeAdzuna: true,
        includeRemoteCo: true,
        includeGitHubJobs: true,
        country: "za",
      });

      console.log(`   Found ${categoryResult.jobs.length} ${category} jobs`);
      if (categoryResult.jobs.length > 0) {
        const sampleJob = categoryResult.jobs[0];
        console.log(
          `   Sample: ${sampleJob.title} at ${sampleJob.company} (${sampleJob.source})`
        );
      }
      console.log("");
    }

    console.log("✅ Multi-API test completed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

// Run the test
testMultiAPI();

