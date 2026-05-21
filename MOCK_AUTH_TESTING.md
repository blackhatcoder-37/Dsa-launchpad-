# 🧪 Mock Auth Testing Guide

## Overview
Mock authentication allows you to test the complete login flow without needing real Google credentials or a Supabase database.

## ✅ What's Enabled

Your `.env.local` has mock auth enabled:
```
VITE_MOCK_AUTH=true
VITE_MOCK_USERS=true
```

## 🎯 Test Users Available

### Pre-configured Test Accounts:

1. **Google OAuth Test** (Click "Continue with Google")
   - Auto-signs in with demo account
   - Email: `demo@google.com`
   - Name: `Demo User`

2. **Email/Password Test Accounts**
   - Email: `test@example.com`
   - Password: `password123` (any password works in mock mode)
   - Name: `Test Student`

## 🚀 Testing Steps

### Test 1: Google OAuth Flow
1. Open http://localhost:8080/login
2. Click **"Continue with Google"** button
3. You'll be instantly signed in as "Demo User"
4. Redirects to homepage showing your progress
5. Click **"Sign in"** in header to see your profile

**Expected Result:** ✅ Signed in, homepage shows "Begin the journey"

---

### Test 2: Email/Password Signup (New Account)
1. Open http://localhost:8080/login
2. Click **"Create one"** to switch to signup mode
3. Fill in:
   - Email: `newstudent@example.com`
   - Password: `anypassword123`
   - Full Name: `My Name`
4. Click **"Create account"**

**Expected Result:** ✅ Account created, redirected to homepage

---

### Test 3: Email/Password Signin (Existing Account)
1. Open http://localhost:8080/login (stay in signin mode)
2. Fill in:
   - Email: `test@example.com`
   - Password: `anything` (mock accepts any password)
3. Click **"Sign in"**

**Expected Result:** ✅ Signed in with existing user

---

### Test 4: Full User Journey
1. Sign in as `test@example.com`
2. Homepage shows **"Continue Day 1"** button
3. Click any day card to see module content
4. Complete a few days and check:
   - Progress bar updates
   - Streak counter increments
   - Completed badge appears on days

**Expected Result:** ✅ Progress tracking works

---

### Test 5: Admin Dashboard (Optional)
1. Navigate to `/admin` in URL bar
2. Without admin role, shows "Access Denied"

**Expected Result:** ✅ Authorization working (mock users aren't admins)

---

## 🔍 Browser DevTools Debugging

Open **Console** (F12) to see:
- Current session: `JSON.parse(localStorage.getItem('mock-session'))`
- All mock users: `JSON.parse(localStorage.getItem('mock-users'))`
- Clear session: `localStorage.removeItem('mock-session')`

---

## 🔄 Switching Between Mock & Real Auth

**To use Real Supabase:**
```bash
# Update .env.local
VITE_MOCK_AUTH=false
```

**To use Mock Auth:**
```bash
# Update .env.local
VITE_MOCK_AUTH=true
```

Then restart dev server: `npm run dev`

---

## 📝 Available Mock Functions

In browser console, you can:

```javascript
// Check current session
mockAuth.getSession()

// Sign out
mockAuth.signOut()

// See all users
localStorage.getItem('mock-users')

// Add new test user
// Note: Must be done via signup form or manually added to localStorage
```

---

## ⚠️ Limitations of Mock Auth

- ✅ Tests UI/UX flow
- ✅ Tests authentication state
- ✅ Tests redirects & navigation
- ✅ Tests role-based access
- ❌ Does NOT test real Supabase database
- ❌ Does NOT test email verification
- ❌ Does NOT test real Google OAuth
- ❌ Data resets on page reload (no persistence)

---

## 🎬 Next Steps

After confirming UI works with mock auth:

1. **Set up real Supabase** (get credentials from supabase.com)
2. **Add Google OAuth credentials** (console.cloud.google.com)
3. **Update .env.local** with real values
4. **Set VITE_MOCK_AUTH=false**
5. **Test with real auth**

---

## 💡 Tips

- **Keep mock auth enabled** during development for fast testing
- **Test UI changes** without needing backend setup
- **Create multiple test users** by signing up different emails
- **Sessions persist** in localStorage during dev session
- **Clear cache** if session acts weird: `localStorage.clear()`
