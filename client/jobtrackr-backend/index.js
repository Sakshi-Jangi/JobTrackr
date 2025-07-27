// Load required modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = 5000;

// Middleware setup
app.use(cors());               // Enable Cross-Origin Resource Sharing
app.use(express.json());       // Parse incoming JSON requests

// Initialize Google Gemini AI client with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST endpoint to handle prompt requests
app.post('/api/ask', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // Use Gemini 1.5 Flash model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generate content from prompt
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Send AI response back to frontend
    res.json({ response: text });
  } catch (error) {
    console.error('❌ Error generating content:', error);
    res.status(500).json({
      error: 'Failed to generate response',
      details: error?.message || 'Unknown error',
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
