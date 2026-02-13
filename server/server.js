import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import rateLimit from 'express-rate-limit';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Port 5001 is set in .env to avoid EADDRINUSE on 5000

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Simple in-memory cache for responses (expires after 1 hour)
const responseCache = new Map();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_HISTORY_MESSAGES = 10; // Limit conversation history to last 10 messages

// Cache cleanup function
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of responseCache.entries()) {
        if (now - value.timestamp > CACHE_DURATION) {
            responseCache.delete(key);
        }
    }
}, 10 * 60 * 1000); // Run cleanup every 10 minutes

// CORS configuration - Allow frontend to access the API
const corsOptions = {
    origin: [
        'http://localhost:5173', // Local Vite dev server
        'http://localhost:5001', // Local server
        'https://personal-assistent-frontend.onrender.com' // Production frontend
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

// Rate limiting - 30 requests per 15 minutes per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // Limit each IP to 30 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/chat', limiter); // Apply rate limiting to chat endpoints

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Check cache first
        const cacheKey = `single_${message.toLowerCase().trim()}`;
        const cached = responseCache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            console.log('📦 Returning cached response');
            return res.json({
                success: true,
                response: cached.response,
                cached: true
            });
        }

        // Get the generative model
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: "You are a direct and concise AI assistant. Answer the user's questions strictly and immediately. Do not explain that you are an AI, do not discuss your existence or internal processes, and do not use meta-commentary (e.g., 'That is a great question'). Just answer the question."
        });

        // Generate content
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        // Cache the response
        responseCache.set(cacheKey, {
            response: text,
            timestamp: Date.now()
        });

        res.json({
            success: true,
            response: text
        });

    } catch (error) {
        console.error('Error generating response:', error);
        const errorMessage = error.message || 'Unknown error occurred';
        res.status(500).json({
            error: errorMessage,
            details: error.stack || error.toString()
        });
    }
});

// Conversation endpoint with history support
app.post('/api/chat/conversation', async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Messages array is required' });
        }

        // Limit the conversation history to prevent excessive token usage
        const limitedMessages = messages.slice(-MAX_HISTORY_MESSAGES);
        const lastMessage = limitedMessages[limitedMessages.length - 1];

        // Create cache key from recent conversation context
        const contextKey = limitedMessages.slice(-3).map(m => m.content).join('|').toLowerCase().trim();
        const cacheKey = `conv_${contextKey}`;
        const cached = responseCache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            console.log('📦 Returning cached conversation response');
            return res.json({
                success: true,
                response: cached.response,
                cached: true
            });
        }

        // Get the generative model
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: "You are a direct and concise AI assistant. Answer the user's questions strictly and immediately. Do not explain that you are an AI, do not discuss your existence or internal processes, and do not use meta-commentary (e.g., 'That is a great question'). Just answer the question."
        });

        // Start a chat session with LIMITED history
        const chat = model.startChat({
            history: limitedMessages.slice(0, -1).map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            })),
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        // Send the latest message
        const result = await chat.sendMessage(lastMessage.content);
        const response = await result.response;
        const text = response.text();

        // Cache the response
        responseCache.set(cacheKey, {
            response: text,
            timestamp: Date.now()
        });

        res.json({
            success: true,
            response: text
        });

    } catch (error) {
        console.error('Error in conversation:', error);
        const errorMessage = error.message || 'Unknown error occurred';
        res.status(500).json({
            error: errorMessage,
            details: error.stack || error.toString()
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/api/chat`);
});
