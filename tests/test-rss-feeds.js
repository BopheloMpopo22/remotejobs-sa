// Test script to find working RSS feeds for remote jobs
import fetch from 'node-fetch';

async function testRSSFeed(url, name) {
  try {
    console.log(`🔍 Testing ${name}: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      console.log(`❌ ${name}: HTTP ${response.status}`);
      return false;
    }

    const content = await response.text();
    
    // Check if it looks like RSS/XML
    if (content.includes('<rss') || content.includes('<feed') || content.includes('<item>')) {
      // Count job items
      const itemCount = (content.match(/<item>/g) || []).length;
      console.log(`✅ ${name}: Working! Found ${itemCount} items`);
      
      // Show sample titles
      const titleMatches = content.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/g);
      if (titleMatches && titleMatches.length > 0) {
        console.log(`   Sample: ${titleMatches[0].replace(/<title><!\[CDATA\[(.*?)\]\]><\/title>/, '$1')}`);
      }
      return true;
    } else {
      console.log(`❌ ${name}: Not RSS format`);
      return false;
    }

  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    return false;
  }
}

async function testAllRSSFeeds() {
  console.log("🧪 Testing RSS Feeds for Remote Job Sources...\n");

  const feeds = [
    // Remote.co variations
    { url: "https://remote.co/remote-jobs/feed/", name: "Remote.co Jobs" },
    { url: "https://remote.co/feed/", name: "Remote.co Main" },
    { url: "https://remote.co/remote-jobs/rss/", name: "Remote.co Jobs RSS" },
    { url: "https://remote.co/rss/", name: "Remote.co RSS" },
    
    // We Work Remotely variations
    { url: "https://weworkremotely.com/categories/remote-programming-jobs.rss", name: "We Work Remotely Programming" },
    { url: "https://weworkremotely.com/categories/remote-design-jobs.rss", name: "We Work Remotely Design" },
    { url: "https://weworkremotely.com/categories/remote-marketing-jobs.rss", name: "We Work Remotely Marketing" },
    { url: "https://weworkremotely.com/categories/remote-customer-support-jobs.rss", name: "We Work Remotely Support" },
    { url: "https://weworkremotely.com/categories/remote-sales-jobs.rss", name: "We Work Remotely Sales" },
    { url: "https://weworkremotely.com/categories/remote-devops-sysadmin-jobs.rss", name: "We Work Remotely DevOps" },
    { url: "https://weworkremotely.com/categories/remote-data-jobs.rss", name: "We Work Remotely Data" },
    { url: "https://weworkremotely.com/categories/remote-all-others.rss", name: "We Work Remotely Others" },
    
    // Other remote job sites
    { url: "https://remoteok.io/remote-jobs.rss", name: "RemoteOK" },
    { url: "https://flexjobs.com/rss.xml", name: "FlexJobs" },
    { url: "https://jobspresso.co/feed/", name: "JobsPresso" },
    { url: "https://remoteworkhub.com/feed/", name: "Remote Work Hub" },
    
    // General job sites with remote filters
    { url: "https://stackoverflow.com/jobs/feed?r=true", name: "Stack Overflow Remote" },
    { url: "https://github.com/remote-jobs/remote-jobs.github.io/commits.atom", name: "GitHub Remote Jobs" },
  ];

  const workingFeeds = [];

  for (const feed of feeds) {
    const isWorking = await testRSSFeed(feed.url, feed.name);
    if (isWorking) {
      workingFeeds.push(feed);
    }
    console.log(""); // Empty line for readability
  }

  console.log("📊 SUMMARY:");
  console.log(`✅ Working feeds: ${workingFeeds.length}`);
  console.log(`❌ Non-working feeds: ${feeds.length - workingFeeds.length}`);
  
  if (workingFeeds.length > 0) {
    console.log("\n🎉 Working RSS Feeds:");
    workingFeeds.forEach(feed => {
      console.log(`   ✅ ${feed.name}: ${feed.url}`);
    });
  } else {
    console.log("\n💡 No working RSS feeds found. This is common - many sites have disabled RSS.");
    console.log("   Alternative approaches:");
    console.log("   1. Use web scraping (more complex but reliable)");
    console.log("   2. Use official APIs (if available)");
    console.log("   3. Focus on your working Adzuna API");
  }
}

testAllRSSFeeds();
