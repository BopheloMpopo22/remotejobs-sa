const fs = require("fs");

// Function to convert CSV to JSON
function convertCSVToJSON(csvContent) {
  const lines = csvContent.split("\n");
  const users = [];

  for (const line of lines) {
    if (!line.trim()) continue;

    // Split by comma, but handle quoted fields
    const parts = parseCSVLine(line);

    if (parts.length >= 3) {
      const email = parts[0].trim();
      const rawMetaData = parts[1].trim();
      const createdAt = parts[2].trim();

      // Extract full_name from raw_user_meta_data
      let fullName = "";
      try {
        const metaData = JSON.parse(rawMetaData.replace(/""/g, '"'));
        fullName = metaData.full_name || email.split("@")[0];
      } catch (e) {
        fullName = email.split("@")[0];
      }

      // Format the date
      let formattedDate = createdAt;
      if (createdAt.includes("+00")) {
        formattedDate = createdAt.replace("+00", "Z");
      }

      users.push({
        email: email,
        full_name: fullName,
        created_at: formattedDate,
      });
    }
  }

  return users;
}

function parseCSVLine(line) {
  const parts = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      parts.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  parts.push(current);
  return parts;
}

// Main execution
try {
  console.log("🔄 CSV to JSON Converter for User Migration");
  console.log("============================================");

  // Check if CSV file exists
  const csvFile = "users-export.csv"; // Your CSV file name

  if (!fs.existsSync(csvFile)) {
    console.log(`❌ File '${csvFile}' not found!`);
    console.log("");
    console.log("📋 To use this script:");
    console.log('1. Save your Supabase CSV export as "users-export.csv"');
    console.log("2. Put it in the same folder as this script");
    console.log("3. Run: node convert-csv.js");
    console.log("");
    console.log('📁 Or rename your CSV file to "users-export.csv"');
    return;
  }

  // Read CSV file
  console.log(`📖 Reading CSV file: ${csvFile}`);
  const csvContent = fs.readFileSync(csvFile, "utf8");

  // Convert to JSON
  console.log("🔧 Converting CSV to JSON...");
  const users = convertCSVToJSON(csvContent);

  // Save JSON file
  const jsonFile = "users-for-migration.json";
  fs.writeFileSync(jsonFile, JSON.stringify(users, null, 2));

  console.log(`✅ Successfully converted ${users.length} users!`);
  console.log(`📁 JSON saved to: ${jsonFile}`);
  console.log("");
  console.log("📊 Sample of converted data:");
  console.log(JSON.stringify(users.slice(0, 3), null, 2));
  console.log("");
  console.log("🎯 Next steps:");
  console.log("1. Use the JSON file with your migration API");
  console.log("2. Test with a few users first");
  console.log("3. Then migrate all users");
} catch (error) {
  console.error("❌ Error:", error.message);
  console.log("");
  console.log("🆘 If you need help:");
  console.log('1. Make sure your CSV file is named "users-export.csv"');
  console.log("2. Put it in the same folder as this script");
  console.log("3. Check that the CSV format matches the expected structure");
}
