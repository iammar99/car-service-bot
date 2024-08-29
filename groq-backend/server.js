// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();
const port = 5000;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(bodyParser.json());

let conversationHistory = [];

app.post('/api/predict', async (req, res) => {
  try {
    const { text } = req.body;
    conversationHistory.push({ role: 'user', content: text });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a professional car assistant. Answer all queries related to car services, maintenance, and repairs.If ' },
        ...conversationHistory,
      ],
      model: 'llama-3.1-70b-versatile',
    });

    let botResponse = chatCompletion.choices[0]?.message?.content || '';

    // Relevance check: Simple keyword match for car-related terms
    const carRelatedTerms = ['car', 'engine', 'tire', 'oil', 'brakes', 'maintenance', 'repair'];
    const isRelevant = carRelatedTerms.some(term => botResponse.toLowerCase().includes(term));

    // If the response is not relevant to cars, provide a fallback message
    if (!isRelevant) {
      botResponse = "I'm sorry, I can only assist with car-related queries. Please ask me something about car services or maintenance.";
    }

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
