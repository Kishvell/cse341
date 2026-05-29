const express = require("express");
const passport = require("passport");

const router = express.Router();

// Home
router.get("/", (req, res) => {
  res.send("Welcome to the Games API");
});

// Google Login
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// Google Callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api-docs"
  }),
  (req, res) => {
    res.send("Login Successful");
  }
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.send("Logged out successfully");
  });
});

module.exports = router;