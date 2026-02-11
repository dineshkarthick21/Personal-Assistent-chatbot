# Deployment Guide for Render

## Backend Deployment (Already Done)

Your backend is running at: `https://personal-assistent-backend-ix0k.onrender.com`

### Required Environment Variables on Render (Backend)

1. Go to your backend service on Render dashboard
2. Navigate to **Environment** section
3. Add these environment variables:

```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

**Important**: Replace `your_gemini_api_key_here` with your actual Gemini API key.

To get a Gemini API key:
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key and add it to Render

---

## Frontend Deployment (Already Done)

Your frontend is running at: `https://personal-assistent-frontend.onrender.com/`

### Required Environment Variables on Render (Frontend)

1. Go to your frontend service on Render dashboard
2. Navigate to **Environment** section
3. Add this environment variable:

```
VITE_API_URL=https://personal-assistent-backend-ix0k.onrender.com/api
```

---

## Redeploy After Adding Environment Variables

After adding the environment variables:

1. **Backend**: Click "Manual Deploy" → "Deploy latest commit" or wait for auto-deploy
2. **Frontend**: Click "Manual Deploy" → "Deploy latest commit" or wait for auto-deploy

---

## Testing the Connection

After both services are redeployed:

1. Visit https://personal-assistent-frontend.onrender.com/
2. Try sending a message in the chat
3. You should get a response from the AI (no more "Failed to get response" error)

---

## Troubleshooting

### If you still get connection errors:

1. **Check backend logs** on Render:
   - Go to your backend service → Logs
   - Look for any errors related to GEMINI_API_KEY

2. **Check frontend logs** on Render:
   - Go to your frontend service → Logs
   - Check if it's trying to connect to the right backend URL

3. **Verify environment variables**:
   - Backend should have: `GEMINI_API_KEY` and `PORT`
   - Frontend should have: `VITE_API_URL`

4. **Test backend directly**:
   - Visit: https://personal-assistent-backend-ix0k.onrender.com/api/health
   - You should see: `{"status":"OK","message":"Server is running"}`

---

## Local Development

For local development, the `.env` files are already configured:

**Backend** (`server/.env`):
```
GEMINI_API_KEY=your_api_key_here
PORT=5001
```

**Frontend** (`client/.env`):
```
VITE_API_URL=http://localhost:5001/api
```

To run locally:
```bash
# Terminal 1 - Backend
cd server
npm install
npm start

# Terminal 2 - Frontend
cd client
npm install
npm run dev
```

---

## Security Notes

- Never commit `.env` files to Git (they're in `.gitignore`)
- Always use `.env.example` files as templates
- Keep your Gemini API key secret
- Render automatically keeps environment variables secure
