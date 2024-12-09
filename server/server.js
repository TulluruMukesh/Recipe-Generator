const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = 5000;

// Endpoint for the frontend to request ingredients
app.post("/api/ingredients", async (req, res) => {
  const { recipeName } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant for cooking recipes.",
          },
          {
            role: "user",
            content: `List all the ingredients required to make ${recipeName}.`,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching from OpenAI API:", error);
    res.status(500).json({ error: "Failed to fetch ingredients" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
