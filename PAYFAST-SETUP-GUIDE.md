# PayFast Integration Setup Guide

## Overview

This guide will help you set up PayFast payment integration for your RemoteJobsSA application. PayFast is South Africa's leading payment gateway and supports local payment methods.

## Step 1: Create PayFast Account

### 1.1 Register for PayFast

1. Go to [payfast.co.za](https://www.payfast.co.za)
2. Click "Register" or "Sign Up"
3. Choose "Business Account"
4. Fill in your business details:
   - Business name: "RemoteJobsSA" (or your preferred name)
   - Business type: Technology/Services
   - Website: Your domain
   - Business description: "Remote job platform with CV generator and job assistant services"

### 1.2 Complete Account Verification

1. **Personal Information**:

   - Full legal name
   - ID number
   - Contact details
   - Residential address

2. **Business Information**:

   - Business registration number (if applicable)
   - Business address
   - Tax clearance certificate (if required)

3. **Bank Account**:
   - Add your South African bank account
   - Account holder name must match your PayFast account

## Step 2: Get Your PayFast Credentials

### 2.1 Access Your Merchant Account

1. Log in to your PayFast merchant account
2. Go to **Settings** → **Integration**
3. You'll find:
   - **Merchant ID** (starts with numbers)
   - **Merchant Key** (alphanumeric string)
   - **Pass Phrase** (you set this during registration)

### 2.2 Test vs Live Mode

- **Test Mode**: Use sandbox credentials for development
- **Live Mode**: Use production credentials for real payments

## Step 3: Configure Environment Variables

Add these to your `.env.local` file:

```env
# Supabase (you already have these)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# PayFast Configuration
PAYFAST_MERCHANT_ID=your_merchant_id
PAYFAST_MERCHANT_KEY=your_merchant_key
PAYFAST_PASS_PHRASE=your_passphrase
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# For production, change to:
# NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

## Step 4: Set Up Webhook Endpoint

### 4.1 Configure Webhook URL

1. In PayFast Dashboard, go to **Settings** → **Integration**
2. Set your **Notify URL**: `https://yourdomain.com/api/payfast-webhook`
3. For development: `http://localhost:3000/api/payfast-webhook`

### 4.2 Webhook Events

PayFast will send notifications for:

- Payment completion
- Payment failure
- Payment cancellation

## Step 5: Update Database Schema

Run the PayFast schema updates in your Supabase SQL editor:

```sql
-- Copy and paste the contents of payfast-schema-updates.sql
```

This will:

- Add PayFast-related columns to existing tables
- Create new tables for payments and webhooks
- Set up proper indexes and security policies

## Step 6: Test the Integration

### 6.1 Test Payment Flow

1. Use PayFast's test credentials
2. Test with these payment methods:
   - **Credit Card**: Use test card numbers
   - **EFT**: Use test bank details
   - **M-Pesa**: Use test mobile number
   - **SnapScan**: Use test QR code

### 6.2 Test Scenarios

- Successful payment
- Failed payment
- Cancelled payment
- Webhook notifications

## Step 7: Go Live

### 7.1 Switch to Production

1. Update environment variables with live credentials
2. Change webhook URL to production domain
3. Update `NEXT_PUBLIC_BASE_URL` to your live domain

### 7.2 Final Verification

1. Test with small real payments
2. Verify webhook notifications
3. Check payment records in database

## Step 8: Monitor and Maintain

### 8.1 Regular Checks

- Monitor webhook logs
- Check payment success rates
- Review failed payments
- Update security settings

### 8.2 Support

- PayFast Support: support@payfast.co.za
- Documentation: [PayFast Developer Docs](https://developers.payfast.co.za)

## Payment Flow

1. **User submits job assistant application**
2. **System creates payment record**
3. **User redirected to PayFast**
4. **User completes payment**
5. **PayFast sends webhook notification**
6. **System updates application status**
7. **User redirected back to success page**

## Security Considerations

- Always validate webhook signatures
- Use HTTPS in production
- Keep credentials secure
- Monitor for suspicious activity
- Regular security updates

## Troubleshooting

### Common Issues

1. **Webhook not receiving notifications**

   - Check webhook URL is accessible
   - Verify signature validation
   - Check server logs

2. **Payment not completing**

   - Verify merchant credentials
   - Check payment amount format
   - Validate required fields

3. **Database errors**
   - Run schema updates
   - Check RLS policies
   - Verify table permissions

### Debug Mode

Enable debug logging by setting:

```env
DEBUG_PAYFAST=true
```

## Support Resources

- [PayFast Developer Documentation](https://developers.payfast.co.za)
- [PayFast API Reference](https://developers.payfast.co.za/api)
- [PayFast Support](https://www.payfast.co.za/support)

---

**Your PayFast integration is now ready!** 🎉

For any issues or questions, refer to the PayFast documentation or contact their support team.
