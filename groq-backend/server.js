// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(bodyParser.json());

// Store conversation history
let conversationHistory = [];
const HISTORY_LIMIT = 30; // Limit the history to the last 10 messages

app.post('/api/predict', async (req, res) => {
  try {
    const { text } = req.body;

    // Add the user message to the history
    conversationHistory.push({ role: 'user', content: text });

    // Limit the size of the conversation history
    if (conversationHistory.length > HISTORY_LIMIT * 2) {
      conversationHistory = conversationHistory.slice(-HISTORY_LIMIT * 2); // Keep only the last few messages
    }

    // Call the Groq API with the conversation history
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a professional car mechanic and dealer. Answer all queries related to car services, maintenance, and repairs.' },
        ...conversationHistory,
      ],
      model: 'llama-3.1-70b-versatile',
    });

    let botResponse = chatCompletion.choices[0]?.message?.content || '';

    // Check if the response is relevant to car-related queries
    const carRelatedTerms = ['car', 'engine', 'tire', 'oil', 'brakes', 'maintenance', 'repair', 'make', 'fuel-type', 'aspiration', 'num-of-doors', 'body-style', 'drive-wheels', 'engine-location', 'wheel-base', 'length', 'width', 'height', 'curb-weight', 'engine-type', 'num-of-cylinders', 'engine-size', 'fuel-system', 'bore', 'stroke', 'compression-ratio', 'horsepower', 'peak-rpm', 'city-mpg', 'highway-mpg', 'price'];

    const isRelevant = carRelatedTerms.some(term => botResponse.toLowerCase().includes(term));

    // If the response is not relevant, provide a fallback message
    if (!isRelevant) {
      botResponse = "I'm sorry, I can only assist with car-related queries. Please ask me something about car services or maintenance.";
    }

    // Add the assistant's response to the history
    conversationHistory.push({ role: 'assistant', content: botResponse });

    res.json({ prediction: botResponse });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
