# 🔧 API Key Setup & Troubleshooting

## ✅ Issue Fixed!

The API key issue has been resolved. The problem was using an incorrect model name. The code has been updated from `gemini-2.0-flash-exp` to `gemini-2.5-flash`.

## 🔑 Getting a New Gemini API Key (If Needed)

If you need to get a fresh API key:

1. **Visit Google AI Studio**
   - Go to: https://aistudio.google.com/apikey
   - Sign in with your Google account

2. **Create API Key**
   - Click "Create API Key"
   - Choose "Create API key in new project" or select an existing project
   - Copy the generated API key

3. **Update Your .env File**
   - Open `server/.env`
   - Replace the existing key:
   ```env
   GEMINI_API_KEY=your_new_api_key_here
   PORT=5000
   ```

4. **Restart the Server**
   - Stop the server (Ctrl+C)
   - Start it again: `npm run dev`

## 🎯 Current Configuration

Your chatbot is now configured to use:
- **Model**: `gemini-2.5-flash` (Google's latest stable model)
- **API Endpoint**: Google Generative AI SDK
- **Features**: Text input/output, conversation history, 1M token context window

## ✅ Verification Steps

To verify everything is working:

1. **Check Server Status**
   - Look for: `🚀 Server is running on http://localhost:5000`
   - No error messages should appear

2. **Test the API**
   Open PowerShell and run:
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get
   ```
   Should return: `{"status":"OK","message":"Server is running"}`

3. **Test Chat in Browser**
   - Open http://localhost:5173
   - Type a message and send it
   - You should get a response from Gemini AI

## 🚨 Common Issues & Solutions

### Issue: "404 Not Found" Error
**Solution**: Model name was incorrect. This has been fixed to use `gemini-2.5-flash`.

### Issue: "API Key Invalid"
**Symptoms**: Error message about invalid API key
**Solution**: 
- Get a new API key from https://aistudio.google.com/apikey
- Update `server/.env` file
- Restart the server

### Issue: "Rate Limit Exceeded"
**Symptoms**: Error about too many requests
**Solution**: 
- Free tier has limits (60 requests per minute)
- Wait a minute and try again
- Consider upgrading to paid tier if needed

### Issue: Server Won't Start
**Symptoms**: Port already in use
**Solution**:
```powershell
# Find process using port 5000
netstat -ano | findstr :5000
# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Issue: CORS Errors
**Symptoms**: Browser console shows CORS errors
**Solution**: 
- Ensure backend server is running
- Check that CORS is enabled in `server.js` (it is by default)
- Frontend should connect to `http://localhost:5000`

## 📊 API Usage Limits

**Free Tier (Gemini 2.5 Flash)**:
- 15 requests per minute (RPM)
- 1 million tokens per minute (TPM)
- 1,500 requests per day (RPD)

**Input Limits**:
- Context window: 1,048,576 tokens
- Output: Up to 65,536 tokens

## 🔐 Security Best Practices

1. **Never commit .env file**
   - Already in `.gitignore`
   - Use `.env.example` for templates

2. **Rotate API Keys**
   - Change keys periodically
   - Revoke old keys in Google AI Studio

3. **Use Environment Variables**
   - Never hardcode API keys in source code
   - Always use `process.env.GEMINI_API_KEY`

## 📚 Additional Resources

- [Google AI Studio](https://aistudio.google.com)
- [Gemini API Documentation](https://ai.google.dev/gemini-api/docs)
- [Model Information](https://ai.google.dev/gemini-api/docs/models/gemini)
- [Pricing & Limits](https://ai.google.dev/pricing)

## ✨ Your Chatbot is Ready!

The API key issue has been resolved and your chatbot should now be working perfectly with Gemini 2.5 Flash!

Try it out at: **http://localhost:5173**
