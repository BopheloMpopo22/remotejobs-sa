# PayFast 500 Error Troubleshooting Guide

## Common Causes of 500 Errors

### 1. Missing Environment Variables

Your PayFast integration requires these environment variables to be set in Vercel:

**Required Variables:**

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PAYFAST_MERCHANT_ID=your_merchant_id
PAYFAST_MERCHANT_KEY=your_merchant_key
PAYFAST_PASS_PHRASE=your_passphrase
PAYFAST_TEST_MODE=true
PAYFAST_SANDBOX_MERCHANT_ID=your_sandbox_merchant_id
PAYFAST_SANDBOX_MERCHANT_KEY=your_sandbox_merchant_key
PAYFAST_TEST_PHRASE=your_test_passphrase
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

### 2. Check Your Vercel Environment Variables

1. Go to your Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Verify all the above variables are set correctly

### 3. Test Mode vs Live Mode

**For Testing (Recommended):**

- `PAYFAST_TEST_MODE=true`
- Use sandbox credentials
- Use `PAYFAST_SANDBOX_MERCHANT_ID` and `PAYFAST_SANDBOX_MERCHANT_KEY`

**For Production:**

- `PAYFAST_TEST_MODE=false`
- Use live credentials
- Use `PAYFAST_MERCHANT_ID` and `PAYFAST_MERCHANT_KEY`

### 4. Common Issues

#### Issue: "PAYFAST_CONFIG.PASS_PHRASE is undefined"

**Solution:** Make sure `PAYFAST_TEST_PHRASE` is set in Vercel environment variables.

#### Issue: "Invalid merchant credentials"

**Solution:**

- Double-check your merchant ID and key
- Ensure you're using the correct credentials for test/live mode
- Verify your PayFast account is active

#### Issue: "Database connection failed"

**Solution:**

- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
- Check if your Supabase project is active

### 5. Debug Steps

1. **Check Vercel Logs:**

   - Go to Vercel Dashboard → Functions → `create-payfast-payment`
   - Check the latest function logs for error details

2. **Test Environment Variables:**
   Add this to your API function temporarily:

   ```javascript
   console.log("Environment check:", {
     SUPABASE_URL: process.env.SUPABASE_URL ? "SET" : "MISSING",
     PAYFAST_MERCHANT_ID: process.env.PAYFAST_MERCHANT_ID ? "SET" : "MISSING",
     PAYFAST_TEST_MODE: process.env.PAYFAST_TEST_MODE,
     PAYFAST_TEST_PHRASE: process.env.PAYFAST_TEST_PHRASE ? "SET" : "MISSING",
   });
   ```

3. **Verify PayFast Account:**
   - Log into your PayFast merchant account
   - Check if your account is verified and active
   - Ensure you have the correct merchant credentials

### 6. Quick Fix Checklist

- [ ] All environment variables set in Vercel
- [ ] PayFast account is active and verified
- [ ] Using correct credentials for test/live mode
- [ ] Supabase connection is working
- [ ] Base URL is correct for your domain

### 7. Contact Support

If the issue persists:

1. Check Vercel function logs for specific error messages
2. Contact PayFast support: support@payfast.co.za
3. Verify your PayFast account status

## Next Steps

Once you've identified and fixed the issue:

1. Redeploy your application
2. Test the payment flow again
3. Monitor the function logs for any remaining issues
