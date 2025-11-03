// Debug script to see the actual RSS structure
import fetch from 'node-fetch';

async function debugRSS(url, name) {
  try {
    console.log(`🔍 Debugging ${name}: ${url}`);
    
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
    
    // Show first 1000 characters to see the structure
    console.log(`📄 First 1000 characters of ${name}:`);
    console.log(content.substring(0, 1000));
    console.log("\n" + "=".repeat(50) + "\n");

  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
  }
}

async function debugAllRSS() {
  console.log("🧪 Debugging RSS Feed Structure...\n");

  const feeds = [
    { url: "https://weworkremotely.com/categories/remote-programming-jobs.rss", name: "We Work Remotely Programming" },
    { url: "https://remoteok.io/remote-jobs.rss", name: "RemoteOK" },
  ];

  for (const feed of feeds) {
    await debugRSS(feed.url, feed.name);
  }
}

debugAllRSS();
