# 🚀 Live PayPal Setup Guide

## **Step 1: Environment Variables (Vercel)**

### **Update in Vercel Dashboard:**

1. Go to your Vercel project
2. Settings → Environment Variables
3. Update these variables:

```bash
# DELETE OLD SANDBOX VARIABLES
PAYPAL_CLIENT_ID=your_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_sandbox_client_secret
PAYPAL_MODE=sandbox

# ADD NEW LIVE VARIABLES
PAYPAL_CLIENT_ID=your_live_client_id
PAYPAL_CLIENT_SECRET=your_live_client_secret
PAYPAL_MODE=live
```

## **Step 2: PayPal Webhooks (Live)**

### **In PayPal Developer Dashboard:**

1. Go to: https://developer.paypal.com/dashboard/
2. Select your **LIVE** app
3. Go to **Webhooks** section
4. Add these webhook URLs:

```
https://remotejobs-sa-i11c.vercel.app/api/paypal-webhook
https://remotejobs-sa-i11c.vercel.app/api/paypal-subscription-webhook
```

### **Events to Subscribe:**

- ✅ PAYMENT.CAPTURE.COMPLETED
- ✅ PAYMENT.CAPTURE.DENIED
- ✅ BILLING.SUBSCRIPTION.ACTIVATED
- ✅ BILLING.SUBSCRIPTION.CANCELLED
- ✅ BILLING.SUBSCRIPTION.SUSPENDED
- ✅ PAYMENT.SALE.COMPLETED
- ✅ PAYMENT.SALE.DENIED

## **Step 3: Create Live Subscription Plan**

### **Option A: Use Auto-Setup (Recommended)**

1. Go to: https://remotejobs-sa-i11c.vercel.app/public/test-paypal-setup.html
2. Click "🚀 Setup PayPal Live Environment"
3. Copy the generated Plan ID
4. Add to environment variables: `PAYPAL_SUBSCRIPTION_PLAN_ID=your_generated_plan_id`

### **Option B: Manual Setup**

1. Go to PayPal Developer Dashboard
2. Create a new subscription plan with:
   - **Setup Fee:** $10.00 USD
   - **Monthly Fee:** $5.00 USD
   - **Plan Name:** "Job Assistant Monthly Subscription"

## **Step 4: Test Live Environment**

### **Test Authentication:**

1. Go to: https://remotejobs-sa-i11c.vercel.app/public/test-paypal-auth.html
2. Click "Test PayPal Live Authentication"
3. Verify it shows "✅ Authentication successful!"

### **Test Payment Flow:**

1. Go to your live site
2. Try a small test payment ($1.00)
3. Verify payment goes through
4. Check webhook receives the event

## **Step 5: Verify Everything Works**

### **Checklist:**

- [ ] Environment variables updated to live
- [ ] Webhooks configured for live environment
- [ ] Subscription plan created
- [ ] Authentication test passes
- [ ] Payment flow works
- [ ] Webhooks receive events

## **Important Notes:**

### **⚠️ Security:**

- **Never commit** live credentials to Git
- **Use environment variables** for all secrets
- **Test with small amounts** first

### **🔄 Migration:**

- **Old sandbox data** will not work with live
- **Users will need to** sign up again
- **Test thoroughly** before going live

### **📧 Email Domain:**

- **Verify your domain** in Resend for professional emails
- **Current fallback:** onboarding@resend.dev (works but not branded)

---

**Status:** Ready for live customers! 🎉
