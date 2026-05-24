const express = require("express");
const { connectDB } = require("./database/connect");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Routes
app.use("/games", require("./routes/games"));

// Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// MongoDB connection
connectDB();

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});