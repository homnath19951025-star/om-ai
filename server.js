const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Om AI backend is running!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Om AI running on port ${PORT}`);
});
