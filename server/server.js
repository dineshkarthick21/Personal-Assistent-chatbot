import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Port 5001 is set in .env to avoid EADDRINUSE on 5000

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

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

        // Get the generative model
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: "You are a direct and concise AI assistant. Answer the user's questions strictly and immediately. Do not explain that you are an AI, do not discuss your existence or internal processes, and do not use meta-commentary (e.g., 'That is a great question'). Just answer the question."
        });

        // Generate content
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

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

        // Get the generative model
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: "You are a direct and concise AI assistant. Answer the user's questions strictly and immediately. Do not explain that you are an AI, do not discuss your existence or internal processes, and do not use meta-commentary (e.g., 'That is a great question'). Just answer the question."
        });

        // Start a chat session with history
        const chat = model.startChat({
            history: messages.slice(0, -1).map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            })),
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        // Send the latest message
        const lastMessage = messages[messages.length - 1];
        const result = await chat.sendMessage(lastMessage.content);
        const response = await result.response;
        const text = response.text();

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
