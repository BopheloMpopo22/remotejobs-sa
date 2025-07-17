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
[13:47:59.598] Running build in Washington, D.C., USA (East) – iad1
[13:47:59.599] Build machine configuration: 2 cores, 8 GB
[13:47:59.616] Cloning github.com/BopheloMpopo22/remotejobs-sa (Branch: main, Commit: 89d1c70)
[13:47:59.623] Skipping build cache, deployment was triggered without cache.
[13:47:59.882] Cloning completed: 266.000ms
[13:48:01.647] Running "vercel build"
[13:48:02.104] Vercel CLI 44.4.3
[13:48:03.168] Running "install" command: `npm install`...
[13:48:05.194] npm warn deprecated crypto@1.0.1: This package is no longer supported. It's now a built-in Node module. If you've depended on crypto, you should switch to the one that's built-in.
[13:48:05.404] npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[13:48:13.665]
[13:48:13.665] added 173 packages, and audited 174 packages in 10s
[13:48:13.668]
[13:48:13.668] 19 packages are looking for funding
[13:48:13.669] run `npm fund` for details
[13:48:13.670]
[13:48:13.670] found 0 vulnerabilities
[13:48:13.902]
[13:48:13.903] > remotejobssa@0.0.0 build
[13:48:13.903] > tsc -b && vite build
[13:48:13.903]
[13:48:15.774] src/App.tsx(1,37): error TS7016: Could not find a declaration file for module 'react'. '/vercel/path0/node*modules/react/index.js' implicitly has an 'any' type.
[13:48:15.775] Try `npm i --save-dev @types/react` if it exists or add a new declaration (.d.ts) file containing `declare module 'react';`
[13:48:15.776] src/App.tsx(9,8): error TS2307: Cannot find module './App.css' or its corresponding type declarations.
[13:48:15.777] src/App.tsx(103,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.777] src/App.tsx(103,7): error TS7016: Could not find a declaration file for module 'react/jsx-runtime'. '/vercel/path0/node_modules/react/jsx-runtime.js' implicitly has an 'any' type.
[13:48:15.778] Try `npm i --save-dev @types/react` if it exists or add a new declaration (.d.ts) file containing `declare module 'react/jsx-runtime';`
[13:48:15.778] src/App.tsx(104,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.779] src/App.tsx(104,42): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.780] src/App.tsx(105,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.780] src/App.tsx(105,22): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.781] src/App.tsx(106,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.781] src/App.tsx(111,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.782] src/App.tsx(114,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.782] src/App.tsx(129,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.783] src/App.tsx(133,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.783] src/App.tsx(144,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.786] src/App.tsx(147,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.788] src/App.tsx(148,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.790] src/App.tsx(149,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.791] src/App.tsx(149,29): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.794] src/App.tsx(150,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.796] src/App.tsx(153,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.796] src/App.tsx(156,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.797] src/App.tsx(160,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.797] src/App.tsx(165,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.797] src/App.tsx(167,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.797] src/App.tsx(170,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.798] src/App.tsx(171,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.798] src/App.tsx(176,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.798] src/App.tsx(177,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.799] src/App.tsx(182,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.799] src/App.tsx(183,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.799] src/App.tsx(190,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.799] src/App.tsx(191,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.800] src/App.tsx(192,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.800] src/App.tsx(193,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.800] src/App.tsx(196,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.800] src/App.tsx(197,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.800] src/App.tsx(212,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.800] src/App.tsx(213,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.800] src/App.tsx(216,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.800] src/App.tsx(217,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.800] src/App.tsx(218,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.801] src/App.tsx(219,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.801] src/App.tsx(219,31): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.801] src/App.tsx(220,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.801] src/App.tsx(220,74): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.801] src/App.tsx(221,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.801] src/App.tsx(223,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.801] src/App.tsx(224,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.801] src/App.tsx(224,35): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.801] src/App.tsx(225,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.801] src/App.tsx(225,39): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.801] src/App.tsx(226,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.801] src/App.tsx(226,46): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.801] src/App.tsx(227,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.801] src/App.tsx(227,46): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.801] src/App.tsx(228,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.801] src/App.tsx(229,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.802] src/App.tsx(230,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.802] src/App.tsx(234,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.802] src/App.tsx(235,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.802] src/App.tsx(236,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.802] src/App.tsx(241,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.802] src/App.tsx(243,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.802] src/App.tsx(244,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.802] src/App.tsx(246,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.802] src/components/Auth.tsx(1,33): error TS7016: Could not find a declaration file for module 'react'. '/vercel/path0/node_modules/react/index.js' implicitly has an 'any' type.
[13:48:15.802] Try `npm i --save-dev @types/react` if it exists or add a new declaration (.d.ts) file containing `declare module 'react';`
[13:48:15.802] src/components/Auth.tsx(8,38): error TS7031: Binding element 'onAuthChange' implicitly has an 'any' type.
[13:48:15.802] src/components/Auth.tsx(74,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.802] src/components/Auth.tsx(74,5): error TS7016: Could not find a declaration file for module 'react/jsx-runtime'. '/vercel/path0/node_modules/react/jsx-runtime.js' implicitly has an 'any' type.
[13:48:15.802] Try `npm i --save-dev @types/react` if it exists or add a new declaration (.d.ts) file containing `declare module 'react/jsx-runtime';`
[13:48:15.802] src/components/Auth.tsx(75,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.803] src/components/Auth.tsx(76,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.803] src/components/Auth.tsx(76,58): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.803] src/components/Auth.tsx(77,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.803] src/components/Auth.tsx(79,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.803] src/components/Auth.tsx(81,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.803] src/components/Auth.tsx(83,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.803] src/components/Auth.tsx(84,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.803] src/components/Auth.tsx(84,31): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.804] src/components/Auth.tsx(85,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.804] src/components/Auth.tsx(88,28): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.804] src/components/Auth.tsx(92,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.804] src/components/Auth.tsx(95,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.804] src/components/Auth.tsx(96,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.804] src/components/Auth.tsx(96,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.804] src/components/Auth.tsx(97,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.804] src/components/Auth.tsx(100,26): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.804] src/components/Auth.tsx(104,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.805] src/components/Auth.tsx(106,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.805] src/components/Auth.tsx(107,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.805] src/components/Auth.tsx(107,28): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.805] src/components/Auth.tsx(108,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.805] src/components/Auth.tsx(111,26): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.805] src/components/Auth.tsx(116,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.805] src/components/Auth.tsx(119,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.805] src/components/Auth.tsx(125,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.805] src/components/Auth.tsx(128,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.806] src/components/Auth.tsx(130,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.806] src/components/Auth.tsx(131,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.806] src/components/Auth.tsx(133,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.806] src/components/Auth.tsx(134,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.806] src/components/Auth.tsx(134,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.806] src/components/Auth.tsx(135,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.806] src/components/Auth.tsx(137,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.806] src/components/Auth.tsx(138,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.807] src/components/Auth.tsx(139,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.807] src/components/Auth.tsx(143,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.807] src/components/Auth.tsx(147,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.807] src/components/Auth.tsx(151,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.807] src/components/Auth.tsx(155,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.807] src/components/Auth.tsx(157,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.807] src/components/Auth.tsx(159,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.807] src/components/Auth.tsx(160,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.807] src/components/Auth.tsx(162,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.807] src/components/Auth.tsx(170,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.807] src/components/Auth.tsx(171,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.808] src/components/Auth.tsx(172,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.808] src/components/Auth.tsx(173,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.808] src/components/Auth.tsx(174,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.808] src/components/CVGenerator.tsx(1,33): error TS7016: Could not find a declaration file for module 'react'. '/vercel/path0/node_modules/react/index.js' implicitly has an 'any' type.
[13:48:15.808] Try `npm i --save-dev @types/react` if it exists or add a new declaration (.d.ts) file containing `declare module 'react';`
[13:48:15.808] src/components/CVGenerator.tsx(40,52): error TS7031: Binding element 'onAuthRequired' implicitly has an 'any' type.
[13:48:15.808] src/components/CVGenerator.tsx(40,68): error TS7031: Binding element 'user' implicitly has an 'any' type.
[13:48:15.808] src/components/CVGenerator.tsx(80,18): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.808] src/components/CVGenerator.tsx(97,18): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.808] src/components/CVGenerator.tsx(114,15): error TS7006: Parameter 'skill' implicitly has an 'any' type.
[13:48:15.808] src/components/CVGenerator.tsx(115,18): error TS7006: Parameter 'skill' implicitly has an 'any' type.
[13:48:15.808] src/components/CVGenerator.tsx(116,18): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.808] src/components/CVGenerator.tsx(128,15): error TS7006: Parameter 'lang' implicitly has an 'any' type.
[13:48:15.808] src/components/CVGenerator.tsx(129,18): error TS7006: Parameter 'lang' implicitly has an 'any' type.
[13:48:15.808] src/components/CVGenerator.tsx(130,18): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.808] src/components/CVGenerator.tsx(139,16): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.808] src/components/CVGenerator.tsx(141,43): error TS7006: Parameter '*' implicitly has an 'any' type.
[13:48:15.809] src/components/CVGenerator.tsx(141,46): error TS7006: Parameter 'i' implicitly has an 'any' type.
[13:48:15.809] src/components/CVGenerator.tsx(146,16): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.819] src/components/CVGenerator.tsx(148,41): error TS7006: Parameter '_' implicitly has an 'any' type.
[13:48:15.819] src/components/CVGenerator.tsx(148,44): error TS7006: Parameter 'i' implicitly has an 'any' type.
[13:48:15.819] src/components/CVGenerator.tsx(153,16): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.819] src/components/CVGenerator.tsx(155,35): error TS7006: Parameter '_' implicitly has an 'any' type.
[13:48:15.819] src/components/CVGenerator.tsx(155,38): error TS7006: Parameter 'i' implicitly has an 'any' type.
[13:48:15.819] src/components/CVGenerator.tsx(160,16): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.819] src/components/CVGenerator.tsx(162,41): error TS7006: Parameter '\_' implicitly has an 'any' type.
[13:48:15.819] src/components/CVGenerator.tsx(162,44): error TS7006: Parameter 'i' implicitly has an 'any' type.
[13:48:15.819] src/components/CVGenerator.tsx(269,18): error TS7006: Parameter 'exp' implicitly has an 'any' type.
[13:48:15.819] src/components/CVGenerator.tsx(293,18): error TS7006: Parameter 'edu' implicitly has an 'any' type.
[13:48:15.819] src/components/CVGenerator.tsx(314,23): error TS7006: Parameter 'skill' implicitly has an 'any' type.
[13:48:15.819] src/components/CVGenerator.tsx(329,23): error TS7006: Parameter 'lang' implicitly has an 'any' type.
[13:48:15.819] src/components/CVGenerator.tsx(483,16): error TS7006: Parameter 'exp' implicitly has an 'any' type.
[13:48:15.819] src/components/CVGenerator.tsx(507,16): error TS7006: Parameter 'edu' implicitly has an 'any' type.
[13:48:15.819] src/components/CVGenerator.tsx(528,21): error TS7006: Parameter 'skill' implicitly has an 'any' type.
[13:48:15.819] src/components/CVGenerator.tsx(543,21): error TS7006: Parameter 'lang' implicitly has an 'any' type.
[13:48:15.819] src/components/CVGenerator.tsx(573,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.819] src/components/CVGenerator.tsx(574,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.819] src/components/CVGenerator.tsx(574,37): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.819] src/components/CVGenerator.tsx(575,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.819] src/components/CVGenerator.tsx(576,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.819] src/components/CVGenerator.tsx(576,33): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.819] src/components/CVGenerator.tsx(577,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.820] src/components/CVGenerator.tsx(580,28): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.820] src/components/CVGenerator.tsx(581,30): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.820] src/components/CVGenerator.tsx(591,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.820] src/components/CVGenerator.tsx(592,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.820] src/components/CVGenerator.tsx(593,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.820] src/components/CVGenerator.tsx(593,29): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.820] src/components/CVGenerator.tsx(594,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.820] src/components/CVGenerator.tsx(597,28): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.820] src/components/CVGenerator.tsx(598,30): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.820] src/components/CVGenerator.tsx(608,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.820] src/components/CVGenerator.tsx(609,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.820] src/components/CVGenerator.tsx(610,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.820] src/components/CVGenerator.tsx(610,29): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.820] src/components/CVGenerator.tsx(611,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.820] src/components/CVGenerator.tsx(614,28): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.820] src/components/CVGenerator.tsx(615,30): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.820] src/components/CVGenerator.tsx(625,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.820] src/components/CVGenerator.tsx(626,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.820] src/components/CVGenerator.tsx(627,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.820] src/components/CVGenerator.tsx(627,32): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.820] src/components/CVGenerator.tsx(628,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.820] src/components/CVGenerator.tsx(631,28): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.830] src/components/CVGenerator.tsx(632,30): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.830] src/components/CVGenerator.tsx(642,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.830] src/components/CVGenerator.tsx(643,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.830] src/components/CVGenerator.tsx(644,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.830] src/components/CVGenerator.tsx(644,41): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.830] src/components/CVGenerator.tsx(645,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.830] src/components/CVGenerator.tsx(648,28): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.830] src/components/CVGenerator.tsx(649,30): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.830] src/components/CVGenerator.tsx(658,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.830] src/components/CVGenerator.tsx(659,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.830] src/components/CVGenerator.tsx(660,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.830] src/components/CVGenerator.tsx(660,50): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.830] src/components/CVGenerator.tsx(661,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.831] src/components/CVGenerator.tsx(664,28): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.831] src/components/CVGenerator.tsx(665,30): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.831] src/components/CVGenerator.tsx(674,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.831] src/components/CVGenerator.tsx(675,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.831] src/components/CVGenerator.tsx(676,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.831] src/components/CVGenerator.tsx(676,46): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.831] src/components/CVGenerator.tsx(677,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.831] src/components/CVGenerator.tsx(680,28): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.831] src/components/CVGenerator.tsx(685,34): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.831] src/components/CVGenerator.tsx(698,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.831] src/components/CVGenerator.tsx(699,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.831] src/components/CVGenerator.tsx(710,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.832] src/components/CVGenerator.tsx(712,34): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.832] src/components/CVGenerator.tsx(731,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.832] src/components/CVGenerator.tsx(732,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.832] src/components/CVGenerator.tsx(734,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.832] src/components/CVGenerator.tsx(735,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.832] src/components/CVGenerator.tsx(740,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.832] src/components/CVGenerator.tsx(741,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.832] src/components/CVGenerator.tsx(741,37): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.832] src/components/CVGenerator.tsx(742,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.832] src/components/CVGenerator.tsx(743,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.832] src/components/CVGenerator.tsx(743,64): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.832] src/components/CVGenerator.tsx(744,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.833] src/components/CVGenerator.tsx(746,28): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.833] src/components/CVGenerator.tsx(747,30): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.833] src/components/CVGenerator.tsx(752,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.833] src/components/CVGenerator.tsx(753,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.833] src/components/CVGenerator.tsx(758,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.833] src/components/CVGenerator.tsx(759,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.833] src/components/CVGenerator.tsx(759,32): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.833] src/components/CVGenerator.tsx(760,37): error TS7006: Parameter 'exp' implicitly has an 'any' type.
[13:48:15.833] src/components/CVGenerator.tsx(760,42): error TS7006: Parameter 'index' implicitly has an 'any' type.
[13:48:15.833] src/components/CVGenerator.tsx(761,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.833] src/components/CVGenerator.tsx(762,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.833] src/components/CVGenerator.tsx(763,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.833] src/components/CVGenerator.tsx(765,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.834] src/components/CVGenerator.tsx(766,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.834] src/components/CVGenerator.tsx(771,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.834] src/components/CVGenerator.tsx(772,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.834] src/components/CVGenerator.tsx(773,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.834] src/components/CVGenerator.tsx(775,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.834] src/components/CVGenerator.tsx(776,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.834] src/components/CVGenerator.tsx(776,39): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.834] src/components/CVGenerator.tsx(777,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.834] src/components/CVGenerator.tsx(780,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.834] src/components/CVGenerator.tsx(781,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.834] src/components/CVGenerator.tsx(781,37): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.834] src/components/CVGenerator.tsx(782,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.835] src/components/CVGenerator.tsx(783,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.835] src/components/CVGenerator.tsx(783,34): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.835] src/components/CVGenerator.tsx(784,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.835] src/components/CVGenerator.tsx(787,30): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.835] src/components/CVGenerator.tsx(788,40): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.835] src/components/CVGenerator.tsx(794,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.835] src/components/CVGenerator.tsx(795,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.835] src/components/CVGenerator.tsx(796,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.835] src/components/CVGenerator.tsx(796,33): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.835] src/components/CVGenerator.tsx(797,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.835] src/components/CVGenerator.tsx(800,30): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.836] src/components/CVGenerator.tsx(801,40): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.836] src/components/CVGenerator.tsx(807,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.836] src/components/CVGenerator.tsx(808,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.836] src/components/CVGenerator.tsx(809,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.836] src/components/CVGenerator.tsx(810,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.836] src/components/CVGenerator.tsx(810,36): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.836] src/components/CVGenerator.tsx(811,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.836] src/components/CVGenerator.tsx(814,32): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.836] src/components/CVGenerator.tsx(815,42): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.836] src/components/CVGenerator.tsx(821,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.836] src/components/CVGenerator.tsx(822,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.836] src/components/CVGenerator.tsx(823,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.837] src/components/CVGenerator.tsx(823,34): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.837] src/components/CVGenerator.tsx(824,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.837] src/components/CVGenerator.tsx(827,32): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.837] src/components/CVGenerator.tsx(828,42): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.837] src/components/CVGenerator.tsx(835,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.837] src/components/CVGenerator.tsx(836,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.837] src/components/CVGenerator.tsx(837,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.837] src/components/CVGenerator.tsx(838,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.837] src/components/CVGenerator.tsx(839,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.837] src/components/CVGenerator.tsx(842,32): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.837] src/components/CVGenerator.tsx(843,42): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.838] src/components/CVGenerator.tsx(850,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.838] src/components/CVGenerator.tsx(851,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.838] src/components/CVGenerator.tsx(852,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.838] src/components/CVGenerator.tsx(853,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.838] src/components/CVGenerator.tsx(853,35): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.838] src/components/CVGenerator.tsx(854,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.838] src/components/CVGenerator.tsx(856,30): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.838] src/components/CVGenerator.tsx(857,40): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.838] src/components/CVGenerator.tsx(865,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.838] src/components/CVGenerator.tsx(866,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.838] src/components/CVGenerator.tsx(868,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.838] src/components/CVGenerator.tsx(869,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.838] src/components/CVGenerator.tsx(870,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.838] src/components/CVGenerator.tsx(875,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.838] src/components/CVGenerator.tsx(876,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.839] src/components/CVGenerator.tsx(876,26): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.839] src/components/CVGenerator.tsx(877,36): error TS7006: Parameter 'edu' implicitly has an 'any' type.
[13:48:15.839] src/components/CVGenerator.tsx(877,41): error TS7006: Parameter 'index' implicitly has an 'any' type.
[13:48:15.839] src/components/CVGenerator.tsx(878,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.839] src/components/CVGenerator.tsx(879,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.839] src/components/CVGenerator.tsx(880,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.839] src/components/CVGenerator.tsx(882,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.839] src/components/CVGenerator.tsx(883,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.839] src/components/CVGenerator.tsx(888,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.839] src/components/CVGenerator.tsx(889,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.839] src/components/CVGenerator.tsx(890,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.839] src/components/CVGenerator.tsx(892,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.839] src/components/CVGenerator.tsx(893,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.839] src/components/CVGenerator.tsx(896,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.839] src/components/CVGenerator.tsx(897,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.839] src/components/CVGenerator.tsx(897,36): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.840] src/components/CVGenerator.tsx(898,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.840] src/components/CVGenerator.tsx(899,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.840] src/components/CVGenerator.tsx(899,32): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.840] src/components/CVGenerator.tsx(900,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.840] src/components/CVGenerator.tsx(903,30): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.840] src/components/CVGenerator.tsx(904,39): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.840] src/components/CVGenerator.tsx(911,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.840] src/components/CVGenerator.tsx(912,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.840] src/components/CVGenerator.tsx(913,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.840] src/components/CVGenerator.tsx(913,40): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.840] src/components/CVGenerator.tsx(914,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.840] src/components/CVGenerator.tsx(917,30): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.840] src/components/CVGenerator.tsx(918,39): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.841] src/components/CVGenerator.tsx(925,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.841] src/components/CVGenerator.tsx(926,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.841] src/components/CVGenerator.tsx(927,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.841] src/components/CVGenerator.tsx(927,37): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.841] src/components/CVGenerator.tsx(928,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.841] src/components/CVGenerator.tsx(931,30): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.841] src/components/CVGenerator.tsx(932,39): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.841] src/components/CVGenerator.tsx(939,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.841] src/components/CVGenerator.tsx(940,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.841] src/components/CVGenerator.tsx(941,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.841] src/components/CVGenerator.tsx(941,39): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.841] src/components/CVGenerator.tsx(942,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.841] src/components/CVGenerator.tsx(945,30): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.841] src/components/CVGenerator.tsx(946,39): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.841] src/components/CVGenerator.tsx(953,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.842] src/components/CVGenerator.tsx(954,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.842] src/components/CVGenerator.tsx(956,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.842] src/components/CVGenerator.tsx(957,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.842] src/components/CVGenerator.tsx(958,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.842] src/components/CVGenerator.tsx(963,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.842] src/components/CVGenerator.tsx(964,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.842] src/components/CVGenerator.tsx(964,35): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.842] src/components/CVGenerator.tsx(966,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.842] src/components/CVGenerator.tsx(967,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.842] src/components/CVGenerator.tsx(967,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.842] src/components/CVGenerator.tsx(969,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.842] src/components/CVGenerator.tsx(970,39): error TS7006: Parameter 'skill' implicitly has an 'any' type.
[13:48:15.842] src/components/CVGenerator.tsx(970,46): error TS7006: Parameter 'index' implicitly has an 'any' type.
[13:48:15.842] src/components/CVGenerator.tsx(971,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.842] src/components/CVGenerator.tsx(973,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.842] src/components/CVGenerator.tsx(978,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.843] src/components/CVGenerator.tsx(979,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(981,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(983,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(984,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(984,52): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(985,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(988,30): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.846] src/components/CVGenerator.tsx(991,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(993,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(994,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(995,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(997,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(998,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(998,28): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1000,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1001,42): error TS7006: Parameter 'lang' implicitly has an 'any' type.
[13:48:15.846] src/components/CVGenerator.tsx(1001,48): error TS7006: Parameter 'index' implicitly has an 'any' type.
[13:48:15.846] src/components/CVGenerator.tsx(1002,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1004,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1009,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1010,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1012,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1014,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1015,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1015,55): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1016,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1019,30): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.846] src/components/CVGenerator.tsx(1022,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1024,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1025,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1026,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1027,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1032,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1033,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1033,37): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1034,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1035,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1035,26): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1036,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1037,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1037,39): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.846] src/components/CVGenerator.tsx(1039,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1040,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1041,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1041,36): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1043,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1044,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1045,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1045,35): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1046,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1047,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1048,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1048,32): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1049,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1050,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1051,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1051,35): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1052,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1053,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1054,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1064,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1075,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1083,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1084,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1093,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1094,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1104,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1105,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1107,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1108,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1112,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1113,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1119,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1120,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1121,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1122,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1131,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1131,5): error TS7016: Could not find a declaration file for module 'react/jsx-runtime'. '/vercel/path0/node_modules/react/jsx-runtime.js' implicitly has an 'any' type.
[13:48:15.847] Try `npm i --save-dev @types/react` if it exists or add a new declaration (.d.ts) file containing `declare module 'react/jsx-runtime';`
[13:48:15.847] src/components/CVGenerator.tsx(1132,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1133,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1133,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1134,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1134,47): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1135,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1137,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1138,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1140,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1145,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1147,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1148,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.847] src/components/CVGenerator.tsx(1150,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.848] src/components/CVGenerator.tsx(1150,49): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.848] src/components/CVGenerator.tsx(1152,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.848] src/components/CVGenerator.tsx(1154,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.848] src/components/CVGenerator.tsx(1155,44): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.848] src/components/CVGenerator.tsx(1159,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.848] src/components/CVGenerator.tsx(1162,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.848] src/components/CVGenerator.tsx(1163,44): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.848] src/components/CVGenerator.tsx(1167,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.848] src/components/CVGenerator.tsx(1169,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.848] src/components/CVGenerator.tsx(1170,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.848] src/components/JobAssistant.tsx(1,41): error TS7016: Could not find a declaration file for module 'react'. '/vercel/path0/node_modules/react/index.js' implicitly has an 'any' type.
[13:48:15.848] Try `npm i --save-dev @types/react` if it exists or add a new declaration (.d.ts) file containing `declare module 'react';`
[13:48:15.848] src/components/JobAssistant.tsx(24,3): error TS7031: Binding element 'onAuthRequired' implicitly has an 'any' type.
[13:48:15.848] src/components/JobAssistant.tsx(25,3): error TS7031: Binding element 'user' implicitly has an 'any' type.
[13:48:15.848] src/components/JobAssistant.tsx(60,18): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.848] src/components/JobAssistant.tsx(63,35): error TS7006: Parameter 'i' implicitly has an 'any' type.
[13:48:15.848] src/components/JobAssistant.tsx(71,20): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.848] src/components/JobAssistant.tsx(169,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.848] src/components/JobAssistant.tsx(169,7): error TS7016: Could not find a declaration file for module 'react/jsx-runtime'. '/vercel/path0/node_modules/react/jsx-runtime.js' implicitly has an 'any' type.
[13:48:15.848] Try `npm i --save-dev @types/react` if it exists or add a new declaration (.d.ts) file containing `declare module 'react/jsx-runtime';`
[13:48:15.848] src/components/JobAssistant.tsx(170,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.848] src/components/JobAssistant.tsx(171,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.848] src/components/JobAssistant.tsx(171,42): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.848] src/components/JobAssistant.tsx(172,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.848] src/components/JobAssistant.tsx(172,37): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.848] src/components/JobAssistant.tsx(173,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.851] src/components/JobAssistant.tsx(176,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.851] src/components/JobAssistant.tsx(177,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.851] src/components/JobAssistant.tsx(178,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.851] src/components/JobAssistant.tsx(178,35): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.851] src/components/JobAssistant.tsx(179,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.851] src/components/JobAssistant.tsx(180,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.851] src/components/JobAssistant.tsx(180,64): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.851] src/components/JobAssistant.tsx(181,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.851] src/components/JobAssistant.tsx(181,70): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.852] src/components/JobAssistant.tsx(182,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.852] src/components/JobAssistant.tsx(182,71): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.852] src/components/JobAssistant.tsx(183,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.852] src/components/JobAssistant.tsx(183,63): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.852] src/components/JobAssistant.tsx(184,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.852] src/components/JobAssistant.tsx(185,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.852] src/components/JobAssistant.tsx(186,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.852] src/components/JobAssistant.tsx(187,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.852] src/components/JobAssistant.tsx(187,32): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(188,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(189,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(189,44): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(190,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(190,77): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(191,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(192,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(193,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(193,45): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(194,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(197,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(198,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(199,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(200,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(200,43): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(201,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(204,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(205,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(206,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(207,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(207,40): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(208,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(208,57): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(209,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(210,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(211,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(213,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(214,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(215,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(227,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(228,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(229,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(230,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(230,63): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(231,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(234,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(234,33): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(236,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(237,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(246,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(262,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.853] src/components/JobAssistant.tsx(262,43): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(263,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(273,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(274,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(275,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(291,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(291,42): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(292,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(302,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(303,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(304,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(305,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(306,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(308,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(309,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(310,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(310,43): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(311,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(311,33): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(312,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(315,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(316,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(317,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(318,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(318,42): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(319,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(319,33): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(320,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(322,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(323,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(324,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(325,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(325,43): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(326,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(326,38): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(327,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(330,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(331,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.854] src/components/JobAssistant.tsx(332,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(333,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(333,43): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(334,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(334,40): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(335,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(338,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(339,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(340,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(341,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(341,43): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(342,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(342,35): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(343,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(345,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(346,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(347,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(348,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(348,43): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(349,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(349,36): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(350,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(353,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(354,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(355,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(357,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(358,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(358,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.855] src/components/JobAssistant.tsx(359,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(360,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(361,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(361,43): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(362,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(362,34): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(363,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(363,70): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(364,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(365,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(366,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(366,43): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(367,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(367,29): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(368,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(368,64): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(369,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(370,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(371,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(371,43): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(372,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(372,33): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(373,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(373,74): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(374,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(375,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(376,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(376,43): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.856] src/components/JobAssistant.tsx(377,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.857] src/components/JobAssistant.tsx(377,35): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.857] src/components/JobAssistant.tsx(378,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.857] src/components/JobAssistant.tsx(378,71): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.857] src/components/JobAssistant.tsx(379,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.857] src/components/JobAssistant.tsx(380,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.857] src/components/JobAssistant.tsx(381,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.857] src/components/JobAssistant.tsx(383,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.857] src/components/JobAssistant.tsx(384,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.857] src/components/JobAssistant.tsx(384,47): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.857] src/components/JobAssistant.tsx(386,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.857] src/components/JobAssistant.tsx(387,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.857] src/components/JobAssistant.tsx(387,35): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.857] src/components/JobAssistant.tsx(388,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.857] src/components/JobAssistant.tsx(389,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.858] src/components/JobAssistant.tsx(390,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.858] src/components/JobAssistant.tsx(390,33): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.858] src/components/JobAssistant.tsx(391,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.858] src/components/JobAssistant.tsx(394,28): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.858] src/components/JobAssistant.tsx(395,32): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.864] src/components/JobAssistant.tsx(399,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.864] src/components/JobAssistant.tsx(400,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.865] src/components/JobAssistant.tsx(401,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.865] src/components/JobAssistant.tsx(402,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.866] src/components/JobAssistant.tsx(403,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.866] src/components/JobAssistant.tsx(403,29): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.866] src/components/JobAssistant.tsx(404,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.866] src/components/JobAssistant.tsx(407,28): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.866] src/components/JobAssistant.tsx(408,32): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.866] src/components/JobAssistant.tsx(412,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.867] src/components/JobAssistant.tsx(413,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.867] src/components/JobAssistant.tsx(414,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.867] src/components/JobAssistant.tsx(414,32): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.867] src/components/JobAssistant.tsx(415,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.867] src/components/JobAssistant.tsx(418,28): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.867] src/components/JobAssistant.tsx(419,32): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.868] src/components/JobAssistant.tsx(424,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.868] src/components/JobAssistant.tsx(425,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.868] src/components/JobAssistant.tsx(426,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.868] src/components/JobAssistant.tsx(428,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.868] src/components/JobAssistant.tsx(429,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.869] src/components/JobAssistant.tsx(429,29): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.869] src/components/JobAssistant.tsx(430,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.869] src/components/JobAssistant.tsx(431,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.869] src/components/JobAssistant.tsx(432,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.869] src/components/JobAssistant.tsx(439,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.869] src/components/JobAssistant.tsx(440,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.870] src/components/JobAssistant.tsx(440,48): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.870] src/components/JobAssistant.tsx(441,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.870] src/components/JobAssistant.tsx(442,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.870] src/components/JobAssistant.tsx(442,50): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.870] src/components/JobAssistant.tsx(443,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.870] src/components/JobAssistant.tsx(443,54): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.871] src/components/JobAssistant.tsx(444,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.871] src/components/JobAssistant.tsx(445,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.871] src/components/JobAssistant.tsx(446,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.871] src/components/JobAssistant.tsx(448,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.871] src/components/JobAssistant.tsx(449,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.871] src/components/JobAssistant.tsx(449,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.872] src/components/JobAssistant.tsx(450,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.872] src/components/JobAssistant.tsx(453,34): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.872] src/components/JobAssistant.tsx(462,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.872] src/components/JobAssistant.tsx(463,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.872] src/components/JobAssistant.tsx(465,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.872] src/components/JobAssistant.tsx(466,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.873] src/components/JobAssistant.tsx(468,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.873] src/components/JobAssistant.tsx(469,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.873] src/components/JobAssistant.tsx(469,30): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.873] src/components/JobAssistant.tsx(470,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.873] src/components/JobAssistant.tsx(471,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.873] src/components/JobAssistant.tsx(472,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.873] src/components/JobAssistant.tsx(472,40): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.874] src/components/JobAssistant.tsx(473,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.874] src/components/JobAssistant.tsx(476,28): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.874] src/components/JobAssistant.tsx(477,32): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.874] src/components/JobAssistant.tsx(485,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.874] src/components/JobAssistant.tsx(486,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.874] src/components/JobAssistant.tsx(487,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.874] src/components/JobAssistant.tsx(487,43): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.874] src/components/JobAssistant.tsx(488,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.874] src/components/JobAssistant.tsx(490,28): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.874] src/components/JobAssistant.tsx(491,32): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.874] src/components/JobAssistant.tsx(499,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.874] src/components/JobAssistant.tsx(499,51): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.874] src/components/JobAssistant.tsx(500,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.874] src/components/JobAssistant.tsx(500,60): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.874] src/components/JobAssistant.tsx(501,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.874] src/components/JobAssistant.tsx(501,55): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.874] src/components/JobAssistant.tsx(502,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.874] src/components/JobAssistant.tsx(502,58): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.874] src/components/JobAssistant.tsx(503,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.874] src/components/JobAssistant.tsx(503,57): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.874] src/components/JobAssistant.tsx(504,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(504,55): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(505,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(506,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(507,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(508,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(509,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(510,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(510,40): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(511,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(513,28): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.875] src/components/JobAssistant.tsx(514,32): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.875] src/components/JobAssistant.tsx(518,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(518,53): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(519,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(519,62): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(520,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(520,62): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(521,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(521,62): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(522,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(522,62): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(523,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(523,48): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(524,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(525,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(526,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(527,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(527,39): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(528,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(530,28): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.875] src/components/JobAssistant.tsx(531,32): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.875] src/components/JobAssistant.tsx(538,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(538,51): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(539,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(539,58): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(540,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(540,65): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(541,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(541,65): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(542,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(543,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(544,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.875] src/components/JobAssistant.tsx(545,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(547,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(548,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(548,37): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(549,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(551,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(552,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(557,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(557,33): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(558,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(560,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(561,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(563,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(564,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(564,37): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(565,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(566,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(566,47): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(567,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(569,26): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.876] src/components/JobAssistant.tsx(570,30): error TS7006: Parameter 'prev' implicitly has an 'any' type.
[13:48:15.876] src/components/JobAssistant.tsx(578,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(579,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(581,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(583,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(593,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(601,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(602,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(611,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(612,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(622,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(623,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(625,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(627,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.876] src/components/JobAssistant.tsx(628,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.882] src/components/JobAssistant.tsx(631,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.882] src/components/JobAssistant.tsx(632,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.882] src/components/JobAssistant.tsx(633,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.882] src/components/JobAssistant.tsx(634,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.882] src/components/JobList.tsx(1,19): error TS7016: Could not find a declaration file for module 'react'. '/vercel/path0/node_modules/react/index.js' implicitly has an 'any' type.
[13:48:15.883] Try `npm i --save-dev @types/react` if it exists or add a new declaration (.d.ts) file containing `declare module 'react';`
[13:48:15.883] src/components/JobList.tsx(28,44): error TS7031: Binding element 'jobs' implicitly has an 'any' type.
[13:48:15.883] src/components/JobList.tsx(28,50): error TS7031: Binding element 'loading' implicitly has an 'any' type.
[13:48:15.883] src/components/JobList.tsx(28,59): error TS7031: Binding element 'error' implicitly has an 'any' type.
[13:48:15.883] src/components/JobList.tsx(119,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.883] src/components/JobList.tsx(119,7): error TS7016: Could not find a declaration file for module 'react/jsx-runtime'. '/vercel/path0/node_modules/react/jsx-runtime.js' implicitly has an 'any' type.
[13:48:15.885] Try `npm i --save-dev @types/react` if it exists or add a new declaration (.d.ts) file containing `declare module 'react/jsx-runtime';`
[13:48:15.885] src/components/JobList.tsx(120,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.885] src/components/JobList.tsx(121,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.885] src/components/JobList.tsx(121,30): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.885] src/components/JobList.tsx(122,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.886] src/components/JobList.tsx(122,77): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.886] src/components/JobList.tsx(123,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.886] src/components/JobList.tsx(124,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.886] src/components/JobList.tsx(135,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.886] src/components/JobList.tsx(136,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.886] src/components/JobList.tsx(142,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.887] src/components/JobList.tsx(143,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.887] src/components/JobList.tsx(144,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.887] src/components/JobList.tsx(144,33): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.887] src/components/JobList.tsx(145,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.887] src/components/JobList.tsx(145,76): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.888] src/components/JobList.tsx(146,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.888] src/components/JobList.tsx(147,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.888] src/components/JobList.tsx(159,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.888] src/components/JobList.tsx(160,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.888] src/components/JobList.tsx(166,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.889] src/components/JobList.tsx(167,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.889] src/components/JobList.tsx(168,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.889] src/components/JobList.tsx(168,28): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.889] src/components/JobList.tsx(169,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.889] src/components/JobList.tsx(169,76): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.890] src/components/JobList.tsx(170,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.890] src/components/JobList.tsx(171,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.890] src/components/JobList.tsx(183,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.890] src/components/JobList.tsx(184,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.890] src/components/JobList.tsx(189,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.890] src/components/JobList.tsx(190,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.891] src/components/JobList.tsx(191,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.891] src/components/JobList.tsx(191,37): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.891] src/components/JobList.tsx(192,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.891] src/components/JobList.tsx(195,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.891] src/components/JobList.tsx(196,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.892] src/components/JobList.tsx(198,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.892] src/components/JobList.tsx(199,20): error TS7006: Parameter 'job' implicitly has an 'any' type.
[13:48:15.892] src/components/JobList.tsx(203,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.892] src/components/JobList.tsx(204,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.892] src/components/JobList.tsx(205,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.893] src/components/JobList.tsx(207,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.893] src/components/JobList.tsx(208,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.893] src/components/JobList.tsx(210,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.893] src/components/JobList.tsx(211,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.893] src/components/JobList.tsx(211,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.893] src/components/JobList.tsx(212,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.894] src/components/JobList.tsx(212,49): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.894] src/components/JobList.tsx(213,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.894] src/components/JobList.tsx(215,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.894] src/components/JobList.tsx(216,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.894] src/components/JobList.tsx(216,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.895] src/components/JobList.tsx(217,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.902] src/components/JobList.tsx(217,50): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.902] src/components/JobList.tsx(218,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.902] src/components/JobList.tsx(221,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.902] src/components/JobList.tsx(223,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.902] src/components/JobList.tsx(226,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.903] src/components/JobList.tsx(226,73): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.903] src/components/JobList.tsx(228,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.903] src/components/JobList.tsx(230,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.903] src/components/JobList.tsx(232,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.903] src/components/JobList.tsx(233,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.904] src/components/JobList.tsx(254,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.904] src/components/JobList.tsx(255,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.904] src/components/JobList.tsx(256,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.904] src/components/JobList.tsx(259,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.904] src/components/JobList.tsx(260,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.905] src/components/JobSearch.tsx(1,44): error TS7016: Could not find a declaration file for module 'react'. '/vercel/path0/node_modules/react/index.js' implicitly has an 'any' type.
[13:48:15.905] Try `npm i --save-dev @types/react` if it exists or add a new declaration (.d.ts) file containing `declare module 'react';`
[13:48:15.905] src/components/JobSearch.tsx(37,3): error TS7031: Binding element 'onJobsChange' implicitly has an 'any' type.
[13:48:15.905] src/components/JobSearch.tsx(38,3): error TS7031: Binding element 'onLoadingChange' implicitly has an 'any' type.
[13:48:15.905] src/components/JobSearch.tsx(39,3): error TS7031: Binding element 'onErrorChange' implicitly has an 'any' type.
[13:48:15.906] src/components/JobSearch.tsx(412,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.906] src/components/JobSearch.tsx(412,5): error TS7016: Could not find a declaration file for module 'react/jsx-runtime'. '/vercel/path0/node_modules/react/jsx-runtime.js' implicitly has an 'any' type.
[13:48:15.906] Try `npm i --save-dev @types/react` if it exists or add a new declaration (.d.ts) file containing `declare module 'react/jsx-runtime';`
[13:48:15.906] src/components/JobSearch.tsx(414,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.906] src/components/JobSearch.tsx(416,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.907] src/components/JobSearch.tsx(417,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.907] src/components/JobSearch.tsx(417,54): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.907] src/components/JobSearch.tsx(418,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.907] src/components/JobSearch.tsx(421,24): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.907] src/components/JobSearch.tsx(425,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.908] src/components/JobSearch.tsx(428,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.908] src/components/JobSearch.tsx(429,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.908] src/components/JobSearch.tsx(429,50): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.908] src/components/JobSearch.tsx(430,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.908] src/components/JobSearch.tsx(432,24): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.909] src/components/JobSearch.tsx(436,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.909] src/components/JobSearch.tsx(438,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.909] src/components/JobSearch.tsx(440,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.909] src/components/JobSearch.tsx(441,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.909] src/components/JobSearch.tsx(444,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.910] src/components/JobSearch.tsx(445,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.910] src/components/JobSearch.tsx(445,51): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.910] src/components/JobSearch.tsx(446,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.910] src/components/JobSearch.tsx(448,24): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.910] src/components/JobSearch.tsx(452,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.911] src/components/JobSearch.tsx(454,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.911] src/components/JobSearch.tsx(456,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.911] src/components/JobSearch.tsx(457,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.911] src/components/JobSearch.tsx(460,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.911] src/components/JobSearch.tsx(461,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.912] src/components/JobSearch.tsx(461,59): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.912] src/components/JobSearch.tsx(462,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.912] src/components/JobSearch.tsx(464,24): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.912] src/components/JobSearch.tsx(468,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.912] src/components/JobSearch.tsx(470,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.913] src/components/JobSearch.tsx(472,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.913] src/components/JobSearch.tsx(473,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.913] src/components/JobSearch.tsx(476,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.913] src/components/JobSearch.tsx(477,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.913] src/components/JobSearch.tsx(477,55): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.914] src/components/JobSearch.tsx(478,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.914] src/components/JobSearch.tsx(480,24): error TS7006: Parameter 'e' implicitly has an 'any' type.
[13:48:15.914] src/components/JobSearch.tsx(484,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.914] src/components/JobSearch.tsx(486,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.914] src/components/JobSearch.tsx(488,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.915] src/components/JobSearch.tsx(489,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.915] src/components/JobSearch.tsx(490,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/JobSearch.tsx(493,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/JobSearch.tsx(500,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/JobSearch.tsx(502,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/JobSearch.tsx(504,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/JobSearch.tsx(506,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/JobSearch.tsx(507,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/JobSearch.tsx(511,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/JobSearch.tsx(518,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/JobSearch.tsx(521,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/JobSearch.tsx(535,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/JobSearch.tsx(541,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/JobSearch.tsx(558,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/JobSearch.tsx(562,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/JobSearch.tsx(576,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/JobSearch.tsx(577,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/JobSearch.tsx(578,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/JobSearch.tsx(580,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/PaymentForm.tsx(1,44): error TS7016: Could not find a declaration file for module 'react'. '/vercel/path0/node_modules/react/index.js' implicitly has an 'any' type.
[13:48:15.932] Try `npm i --save-dev @types/react` if it exists or add a new declaration (.d.ts) file containing `declare module 'react';`
[13:48:15.932] src/components/PaymentForm.tsx(12,3): error TS7031: Binding element 'applicationData' implicitly has an 'any' type.
[13:48:15.932] src/components/PaymentForm.tsx(13,3): error TS7031: Binding element 'onPaymentError' implicitly has an 'any' type.
[13:48:15.932] src/components/PaymentForm.tsx(14,3): error TS7031: Binding element 'onCancel' implicitly has an 'any' type.
[13:48:15.932] src/components/PaymentForm.tsx(104,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/PaymentForm.tsx(104,7): error TS7016: Could not find a declaration file for module 'react/jsx-runtime'. '/vercel/path0/node_modules/react/jsx-runtime.js' implicitly has an 'any' type.
[13:48:15.932] Try `npm i --save-dev @types/react` if it exists or add a new declaration (.d.ts) file containing `declare module 'react/jsx-runtime';`
[13:48:15.932] src/components/PaymentForm.tsx(105,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/PaymentForm.tsx(106,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/PaymentForm.tsx(106,38): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/PaymentForm.tsx(107,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.932] src/components/PaymentForm.tsx(107,54): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.933] src/components/PaymentForm.tsx(108,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.933] src/components/PaymentForm.tsx(109,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.933] src/components/PaymentForm.tsx(109,57): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.933] src/components/PaymentForm.tsx(110,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.933] src/components/PaymentForm.tsx(115,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.933] src/components/PaymentForm.tsx(116,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.933] src/components/PaymentForm.tsx(117,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.933] src/components/PaymentForm.tsx(117,46): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.933] src/components/PaymentForm.tsx(118,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.933] src/components/PaymentForm.tsx(118,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.933] src/components/PaymentForm.tsx(119,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.933] src/components/PaymentForm.tsx(121,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.933] src/components/PaymentForm.tsx(122,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.933] src/components/PaymentForm.tsx(123,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.933] src/components/PaymentForm.tsx(123,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.933] src/components/PaymentForm.tsx(124,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.933] src/components/PaymentForm.tsx(126,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(127,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(128,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(129,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(129,38): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(130,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(132,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(133,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(134,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(135,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(135,29): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(136,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(138,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(139,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(140,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(142,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(143,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(144,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(144,32): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(145,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(146,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(147,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(153,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(153,33): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(154,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(155,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(156,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(157,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(157,53): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(158,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(159,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(160,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(161,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(161,28): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(162,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(163,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(164,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(165,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(165,30): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(166,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(167,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(168,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.934] src/components/PaymentForm.tsx(170,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/PaymentForm.tsx(170,57): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/PaymentForm.tsx(172,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/PaymentForm.tsx(173,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/PaymentForm.tsx(180,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/PaymentForm.tsx(181,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/PaymentForm.tsx(185,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/PaymentForm.tsx(186,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/PaymentForm.tsx(187,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/PaymentForm.tsx(189,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/PaymentForm.tsx(190,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/PaymentForm.tsx(190,51): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/PaymentForm.tsx(191,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/PaymentForm.tsx(191,64): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/PaymentForm.tsx(192,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/PaymentForm.tsx(192,76): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/PaymentForm.tsx(193,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/PaymentForm.tsx(194,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(1,41): error TS7016: Could not find a declaration file for module 'react'. '/vercel/path0/node_modules/react/index.js' implicitly has an 'any' type.
[13:48:15.935] Try `npm i --save-dev @types/react` if it exists or add a new declaration (.d.ts) file containing `declare module 'react';`
[13:48:15.935] src/components/UserProfile.tsx(9,52): error TS7031: Binding element 'user' implicitly has an 'any' type.
[13:48:15.935] src/components/UserProfile.tsx(9,58): error TS7031: Binding element 'onLogout' implicitly has an 'any' type.
[13:48:15.935] src/components/UserProfile.tsx(47,22): error TS7006: Parameter 'open' implicitly has an 'any' type.
[13:48:15.935] src/components/UserProfile.tsx(88,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(88,5): error TS7016: Could not find a declaration file for module 'react/jsx-runtime'. '/vercel/path0/node_modules/react/jsx-runtime.js' implicitly has an 'any' type.
[13:48:15.935] Try `npm i --save-dev @types/react` if it exists or add a new declaration (.d.ts) file containing `declare module 'react/jsx-runtime';`
[13:48:15.935] src/components/UserProfile.tsx(93,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(100,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(106,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(108,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(110,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(112,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(127,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(128,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(130,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(131,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(131,73): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(132,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(133,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(149,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(150,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(158,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(159,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(170,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(171,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(184,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(185,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(200,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(201,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(202,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(204,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(220,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(221,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/components/UserProfile.tsx(223,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
[13:48:15.935] src/lib/supabase.ts(3,33): error TS2339: Property 'env' does not exist on type 'ImportMeta'.
[13:48:15.935] src/lib/supabase.ts(4,37): error TS2339: Property 'env' does not exist on type 'ImportMeta'.
[13:48:15.935] src/main.tsx(1,28): error TS7016: Could not find a declaration file for module 'react'. '/vercel/path0/node_modules/react/index.js' implicitly has an 'any' type.
[13:48:15.936] Try `npm i --save-dev @types/react` if it exists or add a new declaration (.d.ts) file containing `declare module 'react';`
[13:48:15.936] src/main.tsx(2,28): error TS7016: Could not find a declaration file for module 'react-dom/client'. '/vercel/path0/node_modules/react-dom/client.js' implicitly has an 'any' type.
[13:48:15.936] Try `npm i --save-dev @types/react-dom` if it exists or add a new declaration (.d.ts) file containing `declare module 'react-dom/client';`
[13:48:15.936] src/main.tsx(3,8): error TS2307: Cannot find module './index.css' or its corresponding type declarations.
[13:48:15.936] src/main.tsx(7,3): error TS7016: Could not find a declaration file for module 'react/jsx-runtime'. '/vercel/path0/node_modules/react/jsx-runtime.js' implicitly has an 'any' type.
[13:48:15.936] Try `npm i --save-dev @types/react` if it exists or add a new declaration (.d.ts) file containing `declare module 'react/jsx-runtime';`
[13:48:16.000] vite.config.ts(1,30): error TS2307: Cannot find module 'vite' or its corresponding type declarations.
[13:48:16.001] vite.config.ts(2,19): error TS2307: Cannot find module '@vitejs/plugin-react' or its corresponding type declarations.
[13:48:16.038] Error: Command "npm run build" exited with 1
[13:48:16.197]
[13:48:19.130] Exiting build container
