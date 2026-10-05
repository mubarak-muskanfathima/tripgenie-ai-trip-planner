const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const tripRoutes = require("./routes/tripRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "TripGenie backend is running!"
  });
});

// Generate AI Trip
app.post("/api/generate-trip", async (req, res) => {
  try {
    const {
      from,
      destination,
      days,
      travelers,
      budget,
      interests
    } = req.body;

    // Basic validation
    if (!from || !destination || !days || !budget) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required trip details."
      });
    }

    const prompt = `
You are TripGenie, an AI travel planner.

Create a practical travel itinerary using:

Starting location: ${from}
Destination: ${destination}
Number of days: ${days}
Number of travelers: ${travelers}
Budget: ₹${budget}
Interests: ${interests?.join(", ") || "General sightseeing"}

Return ONLY valid JSON.

Use exactly this structure:

{
  "itinerary": [
    {
      "day": 1,
      "title": "Day title",
      "morning": "Morning activity",
      "afternoon": "Afternoon activity",
      "evening": "Evening activity",
      "food": "Food recommendation"
    }
  ],
  "budget": {
    "accommodation": 0,
    "food": 0,
    "transport": 0,
    "activities": 0
  },
  "tips": [
    "Travel tip 1",
    "Travel tip 2",
    "Travel tip 3"
  ]
}

Create exactly ${days} itinerary days.

Keep the plan realistic for the destination and budget.

Do not include markdown.
Do not include code fences.
Return only JSON.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    let result = response.text.trim();

    // Remove markdown code fences if Gemini adds them
    result = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedResult = JSON.parse(result);

    // Successful response
    res.json({
      success: true,
      result: parsedResult
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    // Gemini quota exceeded
    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message:
          "TripGenie AI is temporarily busy. Please wait about a minute and try again."
      });
    }

    // Gemini temporarily unavailable
    if (error.status === 503) {
      return res.status(503).json({
        success: false,
        message:
          "TripGenie AI is temporarily unavailable. Please try again in a few moments."
      });
    }

    // Network / DNS error
    if (
      error.code === "ENOTFOUND" ||
      error.cause?.code === "ENOTFOUND"
    ) {
      return res.status(503).json({
        success: false,
        message:
          "Unable to connect to Gemini AI. Please check your internet connection and try again."
      });
    }

    // Invalid JSON returned by Gemini
    if (error instanceof SyntaxError) {
      return res.status(500).json({
        success: false,
        message:
          "TripGenie received an unexpected AI response. Please try again."
      });
    }

    // Other errors
    res.status(500).json({
      success: false,
      message:
        "Something went wrong while generating your trip. Please try again."
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `TripGenie server running on http://localhost:${PORT}`
  );
});