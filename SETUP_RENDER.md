# QUICK FIX - Connect Frontend & Backend

## The Problem
Your frontend at `https://personal-assistent-frontend.onrender.com/` was still connecting to `localhost:5001` instead of your production backend.

## What I Fixed in the Code

1. ✅ Updated [client/src/App.jsx](client/src/App.jsx#L6) to use environment variable
2. ✅ Created [client/.env](client/.env), [client/.env.production](client/.env.production), and [client/.env.example](client/.env.example)
3. ✅ Updated [server/server.js](server/server.js#L14) with proper CORS configuration for your production frontend
4. ✅ Created [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) with detailed instructions

---

## ⚡ ACTION REQUIRED - Setup on Render.com

### Step 1: Backend Environment Variables

1. Go to https://dashboard.render.com
2. Open your **backend service** (personal-assistent-backend)
3. Click **Environment** in the left sidebar
4. Add these environment variables:

| Key | Value |
|-----|-------|
| `GEMINI_API_KEY` | Your Gemini API key from https://makersuite.google.com/app/apikey |
| `PORT` | `5000` |

5. Click **Save Changes**
6. Wait for auto-redeploy or click **Manual Deploy** → **Deploy latest commit**

---

### Step 2: Frontend Environment Variables

1. Still on Render dashboard
2. Open your **frontend service** (personal-assistent-frontend)
3. Click **Environment** in the left sidebar
4. Add this environment variable:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://personal-assistent-backend-ix0k.onrender.com/api` |

5. Click **Save Changes**
6. Wait for auto-redeploy or click **Manual Deploy** → **Deploy latest commit**

---

### Step 3: Push Code Changes to GitHub

Since I've updated the code locally, you need to push these changes:

```bash
git add .
git commit -m "Fix: Connect frontend to production backend and add environment variables"
git push
```

This will trigger automatic redeployment on Render.

---

### Step 4: Test the Connection

1. Wait 2-5 minutes for both services to redeploy
2. Visit https://personal-assistent-frontend.onrender.com/
3. Send a test message like "hi"
4. You should get an AI response!

---

## What Each Environment Variable Does

**Backend:**
- `GEMINI_API_KEY` - Your Google Gemini API key for AI responses
- `PORT` - The port the server runs on (Render requires PORT or defaults to 10000)

**Frontend:**
- `VITE_API_URL` - The backend URL the frontend should connect to

---

## Test Backend Health

Before testing the full app, check if your backend is working:

Visit: https://personal-assistent-backend-ix0k.onrender.com/api/health

Expected response:
```json
{"status":"OK","message":"Server is running"}
```

---

## Need Your Gemini API Key?

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"** or **"Get API Key"**
4. Copy the key (starts with `AIzaSy...`)
5. Paste it in Render's `GEMINI_API_KEY` environment variable

---

## If You See Errors

**"Failed to get response"** → Backend is not receiving requests
- Check if `VITE_API_URL` is set correctly on frontend
- Make sure backend URL doesn't have trailing slash

**"Failed to generate response"** → Gemini API key issue
- Check if `GEMINI_API_KEY` is set on backend
- Verify the API key is valid
- Check backend logs on Render

**CORS errors** → The updated CORS config should fix this
- Make sure you pushed the latest code
- Frontend URL must match exactly in the CORS config

---

## Summary

✅ Code is ready
⏳ Need to: Add environment variables on Render
⏳ Need to: Push code to GitHub
⏳ Need to: Wait for redeployment

After completing the steps above, your chat app will be fully connected and working! 🚀
