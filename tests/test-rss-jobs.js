// Test script to see what jobs are actually in the RSS feeds
import fetch from 'node-fetch';

async function testRSSFeedJobs(url, name) {
  try {
    console.log(`🔍 Testing ${name}: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      console.log(`❌ ${name}: HTTP ${response.status}`);
      return;
    }

    const content = await response.text();
    
    // Extract job titles
    const titleMatches = content.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/g);
    if (titleMatches && titleMatches.length > 0) {
      console.log(`✅ ${name}: Found ${titleMatches.length} jobs`);
      console.log("📝 Sample job titles:");
      titleMatches.slice(0, 5).forEach((match, index) => {
        const title = match.replace(/<title><!\[CDATA\[(.*?)\]\]><\/title>/, '$1');
        console.log(`   ${index + 1}. ${title}`);
      });
    } else {
      console.log(`❌ ${name}: No job titles found`);
    }

  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
  }
}

async function testAllRSSJobs() {
  console.log("🧪 Testing RSS Feeds for Actual Job Content...\n");

  const feeds = [
    { url: "https://weworkremotely.com/categories/remote-programming-jobs.rss", name: "We Work Remotely Programming" },
    { url: "https://weworkremotely.com/categories/remote-design-jobs.rss", name: "We Work Remotely Design" },
    { url: "https://weworkremotely.com/categories/remote-customer-support-jobs.rss", name: "We Work Remotely Support" },
    { url: "https://weworkremotely.com/categories/remote-devops-sysadmin-jobs.rss", name: "We Work Remotely DevOps" },
    { url: "https://remoteok.io/remote-jobs.rss", name: "RemoteOK" },
    { url: "https://jobspresso.co/feed/", name: "JobsPresso" },
  ];

  for (const feed of feeds) {
    await testRSSFeedJobs(feed.url, feed.name);
    console.log(""); // Empty line for readability
  }
}

testAllRSSJobs();
