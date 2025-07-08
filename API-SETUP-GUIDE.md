# 🚀 Job APIs Setup Guide

## 📋 Step-by-Step Instructions

### Step 1: Get Adzuna API Keys (Recommended Primary Source)

1. **Visit Adzuna Developer Portal:**

   - Go to: https://developer.adzuna.com/
   - Click "Get API Key" or "Sign Up"

2. **Create Account:**

   - Fill in your details (name, email, etc.)
   - Verify your email address
   - Complete the registration

3. **Get Your API Keys:**

   - After login, you'll see your dashboard
   - Copy your **App ID** and **API Key**
   - Save these securely (we'll use them in the project)

4. **Test Your Keys:**
   - Open `api-test.html` in your browser
   - Enter your App ID and API Key
   - Click "Test Adzuna API"

### Step 2: Test All APIs

1. **Open the Test Page:**

   - Open `api-test.html` in your web browser
   - This will test all three APIs

2. **Test Results:**
   - ✅ **GitHub Jobs**: Should work immediately (no key needed)
   - ✅ **Remote.co**: Should work immediately (no key needed)
   - ⏳ **Adzuna**: Will work after you add your keys

### Step 3: API Information

#### Adzuna API (Primary)

- **Free Tier**: 1,000 requests/day
- **Coverage**: Global (including South Africa)
- **Remote Jobs**: Excellent filtering
- **Setup**: Requires App ID + API Key

#### GitHub Jobs API (Secondary)

- **Free**: No rate limits
- **Focus**: Tech jobs (perfect for remote)
- **Coverage**: Global
- **Setup**: No API key needed

#### Remote.co API (Secondary)

- **Free**: Limited but good
- **Focus**: Remote jobs specifically
- **Coverage**: Global
- **Setup**: No API key needed

## 🎯 Next Steps

Once you have your Adzuna API keys:

1. **Test the APIs** using the HTML test page
2. **Let me know the results** - which APIs work best
3. **We'll start building** the actual job website

## 📊 Expected Results

### Adzuna API Response Example:

```json
{
  "results": [
    {
      "id": "123456",
      "title": "Remote Software Developer",
      "description": "We are looking for...",
      "company": "Tech Company",
      "location": "Remote",
      "salary_min": 50000,
      "salary_max": 80000,
      "created": "2024-01-15T10:00:00Z"
    }
  ],
  "count": 150
}
```

### GitHub Jobs API Response Example:

```json
[
  {
    "id": "123456",
    "title": "Remote Developer",
    "company": "Tech Corp",
    "location": "Remote",
    "description": "We need a developer...",
    "created_at": "2024-01-15T10:00:00Z"
  }
]
```

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**: Some APIs may have CORS restrictions
2. **Rate Limiting**: Adzuna has 1,000 requests/day limit
3. **Network Issues**: Check your internet connection

### Solutions:

1. **Use the HTML test page** (avoids CORS issues)
2. **Check API documentation** for rate limits
3. **Try different search terms** if no results

## 📞 Need Help?

If you encounter any issues:

1. Check the API documentation
2. Try the test page first
3. Let me know what specific error you're getting

---

**Ready to proceed?** Once you have your Adzuna API keys and have tested the APIs, let me know and we'll start building your remote jobs website! 🚀
