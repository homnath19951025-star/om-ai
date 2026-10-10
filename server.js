const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
res.send("Om AI backend is running!");
});

app.post("/chat", async (req, res) => {
try {
const message = req.body.message;

if (!message) {
  return res.status(400).json({
    error: "Message is required"
  });
}

const response = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: "You are Om AI, a helpful AI assistant. Reply in the user's language. User message: " + message
            }
          ]
        }
      ]
    })
  }
);

const data = await response.json();

if (!response.ok) {
  return res.status(response.status).json({
    error: data.error?.message || "Gemini API error"
  });
}

res.json({
  reply:
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No response from AI"
});

} catch (error) {
console.error(error);
res.status(500).json({
error: "Server error"
});
}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log("Om AI running on port " + PORT);
});
