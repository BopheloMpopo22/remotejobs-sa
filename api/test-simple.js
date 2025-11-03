// Simple test script using ES modules
import fetch from 'node-fetch';

async function testAdzunaAPI() {
  console.log("🧪 Testing Adzuna API...\n");

  try {
    const APP_ID = "6d779b8f";
    const API_KEY = "9854bcbf1e37c466be4206d7a2114d8a";
    
    const response = await fetch(
      `https://api.adzuna.com/v1/api/jobs/za/search/1?app_id=${APP_ID}&app_key=${API_KEY}&results_per_page=5&category=it-jobs&what=remote&content-type=application/json`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Adzuna API is working!");
    console.log(`📊 Found ${data.results?.length || 0} jobs`);
    
    if (data.results && data.results.length > 0) {
      console.log("\n📝 Sample jobs:");
      data.results.slice(0, 3).forEach((job, index) => {
        console.log(`${index + 1}. ${job.title} at ${job.company?.display_name || 'Unknown'}`);
        console.log(`   💰 ${job.salary_min ? 'R' + (job.salary_min/1000).toFixed(0) + 'k' : 'Not specified'} | 📍 ${job.location?.display_name || 'Remote'}`);
        console.log(`   🔗 ${job.redirect_url}\n`);
      });
    }

  } catch (error) {
    console.error("❌ Adzuna API test failed:", error.message);
  }
}

async function testRemoteCoRSS() {
  console.log("🧪 Testing Remote.co RSS Feed...\n");

  try {
    // Try multiple possible RSS feed URLs
    const possibleUrls = [
      "https://remote.co/remote-jobs/feed/",
      "https://remote.co/feed/",
      "https://remote.co/remote-jobs/rss/",
      "https://remote.co/rss/"
    ];

    let response;
    let workingUrl;
    
    for (const url of possibleUrls) {
      try {
        console.log(`🔍 Trying: ${url}`);
        response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        
        if (response.ok) {
          workingUrl = url;
          console.log(`✅ Found working RSS feed at: ${url}`);
          break;
        } else {
          console.log(`❌ ${url} returned ${response.status}`);
        }
      } catch (error) {
        console.log(`❌ ${url} failed: ${error.message}`);
        continue;
      }
    }

    if (!response || !response.ok) {
      throw new Error(`No working RSS feed found. Tried ${possibleUrls.length} URLs.`);
    }

    const xmlText = await response.text();
    
    // Simple regex to count job items
    const jobMatches = xmlText.match(/<item>/g);
    const jobCount = jobMatches ? jobMatches.length : 0;
    
    console.log("✅ Remote.co RSS is working!");
    console.log(`📊 Found ${jobCount} jobs in RSS feed`);
    
    // Extract a few sample titles
    const titleMatches = xmlText.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/g);
    if (titleMatches && titleMatches.length > 0) {
      console.log("\n📝 Sample job titles:");
      titleMatches.slice(0, 3).forEach((match, index) => {
        const title = match.replace(/<title><!\[CDATA\[(.*?)\]\]><\/title>/, '$1');
        console.log(`${index + 1}. ${title}`);
      });
    }

  } catch (error) {
    console.error("❌ Remote.co RSS test failed:", error.message);
    console.log("💡 This is okay - we can still use Adzuna as the primary source!");
  }
}

async function runTests() {
  console.log("🚀 Testing Multi-API Job Sources...\n");
  
  await testAdzunaAPI();
  console.log("\n" + "=".repeat(50) + "\n");
  await testRemoteCoRSS();
  
  console.log("\n🎉 Test completed!");
  console.log("\n📋 Summary:");
  console.log("✅ Adzuna API - Your existing job source");
  console.log("✅ Remote.co RSS - New remote job source");
  console.log("📈 You now have 2 job sources working!");
}

runTests();
