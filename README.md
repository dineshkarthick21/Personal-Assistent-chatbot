# 🤖 AI Chatbot - Gemini 2.5 Flash Powered

A modern, minimalist AI chatbot web application built with React.js and Node.js, powered by Google's Gemini 2.5 Flash API. Features a beautiful, responsive UI with light/dark mode support and smooth animations.

![AI Chatbot](https://img.shields.io/badge/AI-Gemini%202.5-blue)
![React](https://img.shields.io/badge/React-19.2-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, minimalist design inspired by ChatGPT
- 🌓 **Light/Dark Mode** - Seamless theme switching with persistent preferences
- 💬 **Real-time Chat** - Smooth chat experience with typing indicators
- 🚀 **Fast Responses** - Powered by Google Gemini 2.5 Flash
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎯 **Smart Suggestions** - Quick-start conversation prompts
- ⚡ **Conversation History** - Context-aware responses
- 🔒 **Secure API** - Environment-based API key management
- 🎭 **Smooth Animations** - Delightful micro-interactions

## 🏗️ Tech Stack

### Frontend
- **React.js 19.2** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with CSS variables
- **Google Fonts (Inter)** - Beautiful typography

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Google Generative AI SDK** - Gemini API integration
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
Chat Bot san/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── App.jsx        # Main application component
│   │   ├── App.css        # Application styles
│   │   ├── index.css      # Global styles & design system
│   │   └── main.jsx       # React entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Backend Node.js server
│   ├── server.js          # Express server & API routes
│   ├── package.json
│   ├── .env               # Environment variables (not in git)
│   └── .env.example       # Environment template
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   cd "Chat Bot san"
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

3. **Configure Environment Variables**
   
   The `.env` file is already configured with your API key:
   ```env
   GEMINI_API_KEY=AIzaSyBwekYAsvfOf4uf_AWNiYivXB5Gq1Do29o
   PORT=5000
   ```

4. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start the Frontend (in a new terminal)**
   ```bash
   cd client
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` and start chatting!

## 🔌 API Endpoints

### Backend API

- **POST** `/api/chat` - Simple chat endpoint
  ```json
  {
    "message": "Your question here"
  }
  ```

- **POST** `/api/chat/conversation` - Conversation with history
  ```json
  {
    "messages": [
      { "role": "user", "content": "Hello" },
      { "role": "ai", "content": "Hi there!" }
    ]
  }
  ```

- **GET** `/api/health` - Health check endpoint

## 🎨 Design Features

### Color Palette
- **Light Mode**: Clean whites and subtle grays with vibrant accent colors
- **Dark Mode**: Deep navy backgrounds with bright, readable text
- **Accent Colors**: Beautiful gradient from indigo to purple

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Animations
- Smooth fade-in effects for messages
- Typing indicators with pulsing dots
- Hover effects on interactive elements
- Theme transition animations

## 🔒 Security Best Practices

- ✅ API keys stored in environment variables
- ✅ `.env` file excluded from version control
- ✅ CORS configured for frontend-backend communication
- ✅ Input validation on backend
- ✅ Error handling for API failures

## 📱 Responsive Design

- **Desktop**: Full-width chat interface with suggestions
- **Tablet**: Optimized layout with adjusted spacing
- **Mobile**: Single-column layout with touch-friendly controls

## 🛠️ Development

### Build for Production

**Frontend:**
```bash
cd client
npm run build
```

**Backend:**
```bash
cd server
npm start
```

### Linting
```bash
cd client
npm run lint
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Update API URL in `App.jsx`

### Backend (Heroku/Railway/Render)
1. Push the `server` folder
2. Set environment variables in platform dashboard
3. Update CORS origin to match frontend URL

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Gemini API for powerful AI responses
- React.js community for excellent documentation
- Inter font family for beautiful typography

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Made with ❤️ using React.js, Node.js, and Google Gemini AI**
