# Detailed PayFast Account Setup Guide

## Business Type Decision: Company vs Sole Trader

### For RemoteJobsSA, choose: **Sole Trader** ✅

**Why Sole Trader is better for your project:**

- ✅ Simpler registration process
- ✅ Less documentation required
- ✅ Faster approval (usually 2-3 business days)
- ✅ Perfect for individual developers/entrepreneurs
- ✅ Can upgrade to company later if needed

**Choose Company only if:**

- You have a registered company (Pty Ltd, CC, etc.)
- You have company registration documents
- You want to separate business and personal finances

---

## Step-by-Step PayFast Registration

### Step 1: Visit PayFast Website

1. Go to [https://www.payfast.co.za](https://www.payfast.co.za)
2. Click **"Register"** or **"Sign Up"** (usually in the top right)

### Step 2: Choose Account Type

1. You'll see options like:
   - **Personal Account** (for buying)
   - **Business Account** (for selling) ← **Choose this**
2. Click **"Business Account"**

### Step 3: Business Type Selection

1. You'll be asked: **"What type of business are you?"**
2. Choose: **"Sole Trader"** ✅
3. Click **"Continue"**

### Step 4: Personal Information

Fill in your personal details:

- **First Name**: Your first name
- **Last Name**: Your last name
- **Email Address**: Your business email
- **Mobile Number**: Your SA mobile number
- **Password**: Create a strong password
- **Confirm Password**: Repeat the password

### Step 5: Business Information

Fill in your business details:

- **Business Name**: "RemoteJobsSA" (or your preferred name)
- **Business Type**: "Technology/Services" or "Software Development"
- **Website**: Your website URL (or "Coming Soon" if you don't have one)
- **Business Description**: "Remote job platform with CV generator and job assistant services"
- **Business Address**: Your home address (for sole trader)
- **City**: Your city
- **Postal Code**: Your postal code

### Step 6: Identity Verification

You'll need to provide:

- **ID Number**: Your South African ID number
- **Date of Birth**: Your birth date
- **Residential Address**: Your home address (same as business address for sole trader)

### Step 7: Bank Account Details

Add your South African bank account:

- **Bank Name**: Your bank (FNB, Standard Bank, etc.)
- **Account Type**: Savings or Current
- **Account Number**: Your account number
- **Account Holder Name**: Must match your PayFast account name
- **Branch Code**: Your bank branch code

### Step 8: Security Questions

Set up security questions:

- Choose 3 security questions
- Provide answers you'll remember
- These are for account recovery

### Step 9: Terms and Conditions

1. Read the terms and conditions
2. Check the box to agree
3. Click **"Create Account"**

### Step 10: Email Verification

1. Check your email for verification link
2. Click the verification link
3. Your account will be activated

---

## Account Verification Process

### What Happens Next:

1. **Immediate**: You can log in and see your dashboard
2. **2-3 Business Days**: PayFast will verify your details
3. **Verification Complete**: You'll receive an email confirmation

### Documents You Might Need:

- **ID Document**: Clear copy of your SA ID
- **Proof of Address**: Utility bill or bank statement (not older than 3 months)
- **Bank Statement**: Recent bank statement showing your account details

### Verification Status:

- **Pending**: Account created, under review
- **Verified**: Account fully active, can accept payments
- **Rejected**: You'll get an email explaining why

---

## Getting Your Merchant Credentials

### Once Verified:

1. **Log in** to your PayFast merchant account
2. Go to **"Settings"** → **"Integration"**
3. You'll find:
   - **Merchant ID**: Numbers (e.g., 12345678)
   - **Merchant Key**: Letters and numbers (e.g., abc123def456)
   - **Pass Phrase**: The password you set during registration

### Test Mode vs Live Mode:

- **Test Mode**: Use sandbox credentials for development
- **Live Mode**: Use production credentials for real payments

---

## Common Issues and Solutions

### Issue 1: "Business name already taken"

**Solution**: Try variations like:

- "RemoteJobsSA Services"
- "RemoteJobsSA Tech"
- "YourName RemoteJobs"

### Issue 2: "ID verification failed"

**Solution**:

- Ensure ID copy is clear and complete
- Check that ID number matches exactly
- Make sure ID is not expired

### Issue 3: "Bank account verification failed"

**Solution**:

- Double-check account number
- Ensure account holder name matches exactly
- Verify branch code is correct

### Issue 4: "Email already registered"

**Solution**:

- Use a different email address
- Check if you already have an account
- Contact PayFast support

---

## After Account Creation

### 1. Complete Profile

- Upload profile picture (optional)
- Add business logo (optional)
- Complete any missing information

### 2. Set Up Security

- Enable two-factor authentication
- Set up login notifications
- Review security settings

### 3. Test Your Account

- Make a small test payment
- Verify webhook notifications
- Check payment reports

---

## Support Contacts

- **PayFast Support**: support@payfast.co.za
- **Phone**: 021 300 0055
- **Live Chat**: Available on their website
- **Help Center**: [help.payfast.co.za](https://help.payfast.co.za)

---

## Next Steps After Account Creation

1. **Get your credentials** from Settings → Integration
2. **Add them to your .env.local file**
3. **Run the database schema updates**
4. **Test the payment integration**
5. **Go live when ready**

---

**Need Help?**
If you encounter any issues during registration, PayFast's support team is very helpful and responds quickly. Don't hesitate to contact them!

**Estimated Time**: 15-30 minutes for registration + 2-3 business days for verification
