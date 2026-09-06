require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://127.0.0.1:5500"
}));
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: messages
        })
      }
    );

    const data = await response.json();

    res.status(response.status).json(data);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erreur du serveur"
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});