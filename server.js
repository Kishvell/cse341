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
  await connectDB(process.env.MONGODB_URI);

  app.listen(8080, () => {
    console.log("Server running on 8080");
  });
};

start();