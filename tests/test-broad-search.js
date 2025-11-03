// Test script with broader search terms to catch more jobs
import { fetchJobsFromMultipleSources } from "../api/services/jobApiService.js";

async function testBroadSearch() {
  console.log("🧪 Testing Multi-API with Broad Search Terms...\n");

  try {
    // Use very broad search terms to catch more jobs
    const broadSearchTerms = [
      "engineer", "developer", "programmer", "software", "tech", "remote", "work"
    ];
    
    console.log("🔍 Testing with broad search terms:", broadSearchTerms);
    console.log("⏳ Fetching jobs from multiple sources...\n");

    const result = await fetchJobsFromMultipleSources(broadSearchTerms, {
      maxJobsPerSource: 10,
      includeAdzuna: true,
      includeRemoteCo: false, // Skip Remote.co since it's not working
      includeGitHubJobs: true,
      includeWeWorkRemotely: true,
      includeRemoteOK: true,
      includeJobsPresso: true,
      country: "za",
    });

    console.log("📊 RESULTS:");
    console.log(`✅ Total jobs found: ${result.jobs.length}`);
    console.log(`📋 Sources used:`, result.sources);
    
    if (result.errors.length > 0) {
      console.log(`⚠️ Errors encountered:`, result.errors);
    }

    console.log("\n📝 Sample jobs:");
    result.jobs.slice(0, 5).forEach((job, index) => {
      console.log(`${index + 1}. ${job.title} at ${job.company}`);
      console.log(`   💰 ${job.salary} | 📍 ${job.location} | 📊 ${job.source}`);
      console.log(`   🔗 ${job.url}\n`);
    });

    // Test with even broader terms
    console.log("🔍 Testing with even broader terms...\n");
    
    const veryBroadTerms = ["job", "position", "role", "career"];
    const broadResult = await fetchJobsFromMultipleSources(veryBroadTerms, {
      maxJobsPerSource: 5,
      includeAdzuna: true,
      includeRemoteCo: false,
      includeGitHubJobs: true,
      includeWeWorkRemotely: true,
      includeRemoteOK: true,
      includeJobsPresso: true,
      country: "za",
    });
    
    console.log(`📊 Broad search found: ${broadResult.jobs.length} jobs`);
    if (broadResult.jobs.length > 0) {
      console.log("📝 Sample from broad search:");
      broadResult.jobs.slice(0, 3).forEach((job, index) => {
        console.log(`${index + 1}. ${job.title} at ${job.company} (${job.source})`);
      });
    }

    console.log("\n✅ Multi-API test with broad search completed!");

  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

testBroadSearch();
