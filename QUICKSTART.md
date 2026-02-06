# 🚀 Quick Start Guide

## Your AI Chatbot is Ready!

Both servers are currently running:
- ✅ **Backend Server**: http://localhost:5000
- ✅ **Frontend App**: http://localhost:5173

## 📱 Access Your Chatbot

Simply open your web browser and navigate to:
```
http://localhost:5173
```

## 🎯 What You'll See

### Initial Screen
- Beautiful gradient logo "AI Chat" with robot emoji
- Light/dark theme toggle button (🌙/☀️)
- Welcome message: "How can I help you today?"
- 4 suggestion cards to get started:
  - 💡 Explain quantum computing in simple terms
  - 🎨 Give me creative writing prompts
  - 🚀 How does machine learning work?
  - 📚 Recommend books on AI and technology

### Chat Interface
- Clean, minimalist design
- User messages appear on the right (purple bubble)
- AI responses appear on the left (white/dark bubble)
- Typing indicator with animated dots while AI is thinking
- Auto-scrolling to latest messages
- Timestamps on each message

## 🎨 Features to Try

1. **Send a Message**
   - Type in the input box at the bottom
   - Press Enter or click the send button (➤)

2. **Toggle Theme**
   - Click the moon/sun icon in the header
   - Theme preference is saved automatically

3. **Start New Chat**
   - Click "✨ New Chat" button to clear conversation
   - Appears after you send your first message

4. **Use Suggestions**
   - Click any suggestion card to instantly start a conversation

## 🛑 Stopping the Servers

When you're done:
1. Press `Ctrl + C` in the terminal running the backend server
2. Press `Ctrl + C` in the terminal running the frontend server

## 🔄 Restarting

To restart later:

**Terminal 1 - Backend:**
```bash
cd "c:\Users\ezhil\Videos\Projects\Chat Bot san\server"
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd "c:\Users\ezhil\Videos\Projects\Chat Bot san\client"
npm run dev
```

## 🎨 UI Highlights

- **Modern Design**: Inspired by ChatGPT with custom improvements
- **Smooth Animations**: Fade-in effects, typing indicators, hover states
- **Responsive**: Works on desktop, tablet, and mobile
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Beautiful Typography**: Inter font from Google Fonts

## 🔧 Troubleshooting

### Frontend won't load?
- Check that both servers are running
- Verify the URLs: backend on :5000, frontend on :5173

### API errors?
- Ensure the Gemini API key is set in `server/.env`
- Check the backend terminal for error messages

### CORS errors?
- The backend is configured to allow all origins
- If issues persist, check the CORS configuration in `server/server.js`

## 📝 Making Changes

### Update API Key
Edit `server/.env`:
```env
GEMINI_API_KEY=your_new_key_here
```
Then restart the backend server.

### Customize UI Colors
Edit `client/src/index.css` - look for the `:root` section with CSS variables.

### Change Port Numbers
- Backend: Edit `PORT` in `server/.env`
- Frontend: Edit `vite.config.js` in client folder

## 🌟 Enjoy Your AI Chatbot!

**Made with ❤️ using React.js, Node.js, and Google Gemini 2.5 Flash AI**
