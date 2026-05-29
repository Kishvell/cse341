require("dotenv").config();

const express = require("express");
const session = require("express-session");

const passport = require("./config/passport");

const { connectDB } = require("./database/connect");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/games", require("./routes/games"));
app.use("/", require("./routes"));

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