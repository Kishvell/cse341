const express = require("express");
const app = express();
const { connectDB } = require("./database/connect");
require("dotenv").config();

app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// routes
app.use("/contacts", require("./routes/contacts"));

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);

    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

start();