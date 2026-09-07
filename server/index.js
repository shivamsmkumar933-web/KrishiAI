import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Production CORS & Middleware setup
const allowedOrigins = process.env.ALLOWED_ORIGIN
  ? process.env.ALLOWED_ORIGIN.split(',')
  : '*';

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'KrishiAI Express Backend',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 1. Gemini AI Chat Assistant Endpoint
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { userMessage, farmerProfile } = req.body;
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (!userMessage) {
      return res.status(400).json({ error: 'userMessage is required' });
    }

    const contextStr = farmerProfile ? `
Farmer Context:
- Name: ${farmerProfile.name}
- Location: ${farmerProfile.district}, ${farmerProfile.state}
- Land Area: ${farmerProfile.landArea} ${farmerProfile.landUnit}
- Soil Type: ${farmerProfile.soilType}
- Current Crop: ${farmerProfile.currentCrop}
- Irrigation Source: ${farmerProfile.irrigation}
` : '';

    if (apiKey && apiKey.trim() !== '') {
      const prompt = `You are KrishiAI, an empathetic expert Indian agricultural extension scientist.
Respond in warm, simple, actionable terms in the same language the farmer used (Hindi, Hinglish, or English).
${contextStr}

Farmer Question: ${userMessage}`;

      const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (geminiRes.ok) {
        const jsonRes = await geminiRes.json();
        const replyText = jsonRes.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) {
          return res.json({
            id: `msg_${Date.now()}`,
            sender: 'assistant',
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            audioAvailable: true
          });
        }
      }
    }

    // Fallback response if API key is not set
    return res.json({
      id: `msg_${Date.now()}`,
      sender: 'assistant',
      text: `Namaste! I am your KrishiAI Assistant. Based on your location (${farmerProfile?.district || 'your area'}), I am here to help with crop recommendations, weather advisories, leaf disease scans, and government schemes!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      audioAvailable: true
    });
  } catch (err) {
    console.error('Express Chat Endpoint Error:', err);
    res.status(500).json({ error: 'Failed to process AI chat query' });
  }
});

// 2. Gemini AI Leaf Disease Diagnosis Endpoint
app.post('/api/disease/diagnose', async (req, res) => {
  try {
    const { imageDataBase64 } = req.body;
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (!imageDataBase64) {
      return res.status(400).json({ error: 'imageDataBase64 is required' });
    }

    if (apiKey && apiKey.trim() !== '') {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                text: `You are an expert Indian plant pathologist. Analyze this crop leaf photo and return a strict JSON object:
                {
                  "detectedCrop": "crop name",
                  "cropHindiName": "crop name in Hindi",
                  "diseaseName": "botanical and common disease name",
                  "diseaseHindiName": "disease name in Hindi",
                  "confidence": 95,
                  "isHealthy": false,
                  "severity": "high/medium/low",
                  "symptoms": ["symptom 1"],
                  "symptomsHindi": ["symptom 1 in Hindi"],
                  "preventiveSteps": ["step 1"],
                  "preventiveStepsHindi": ["step 1 in Hindi"],
                  "recommendedActions": {
                    "chemical": ["chemical treatment 1"],
                    "chemicalHindi": ["chemical treatment in Hindi"],
                    "organic": ["organic treatment 1"],
                    "organicHindi": ["organic treatment in Hindi"]
                  }
                }`
              },
              {
                inline_data: {
                  mime_type: 'image/jpeg',
                  data: imageDataBase64.replace(/^data:image\/\w+;base64,/, '')
                }
              }
            ]
          }]
        })
      });

      if (response.ok) {
        const jsonRes = await response.json();
        const rawText = jsonRes.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const cleanedJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanedJson);

        return res.json({
          id: `scan_${Date.now()}`,
          ...parsed,
          timestamp: new Date().toISOString(),
          isDemo: false
        });
      }
    }

    return res.status(503).json({ error: 'AI Diagnosis service temporarily unavailable' });
  } catch (err) {
    console.error('Express Disease Diagnosis Error:', err);
    res.status(500).json({ error: 'Failed to diagnose leaf image' });
  }
});

// 3. Weather Proxy Endpoint
app.get('/api/weather', async (req, res) => {
  try {
    const { district = 'Ludhiana', lat = 30.901, lon = 75.8573 } = req.query;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&current_weather=true&timezone=auto`;

    const weatherRes = await fetch(url);
    if (weatherRes.ok) {
      const data = await weatherRes.json();
      return res.json({
        district,
        temperature: Math.round(data.current_weather?.temperature || 28),
        humidity: 62,
        windSpeed: data.current_weather?.windspeed || 12,
        weatherCondition: 'Partly Cloudy',
        weatherConditionHindi: 'आंशिक रूप से बादल',
        daily: data.daily || [],
        source: 'Open-Meteo REST API'
      });
    }

    res.status(500).json({ error: 'Failed to fetch weather data' });
  } catch (err) {
    console.error('Express Weather Endpoint Error:', err);
    res.status(500).json({ error: 'Weather service error' });
  }
});

// Start Standalone Node.js Express Server
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`✅ KrishiAI Express Backend Server running on port ${PORT}`);
  });
}

export default app;
