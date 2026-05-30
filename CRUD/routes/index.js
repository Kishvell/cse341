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

// Google Callback (Debug Version)
router.get(
  "/auth/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (err, user) => {
      if (err) {
        console.error("OAuth Error:", err);
        return res.status(500).json({
          error: err.message,
          stack: err.stack
        });
      }

      if (!user) {
        return res.status(401).json({
          error: "No user returned from Google"
        });
      }

      req.logIn(user, (err) => {
        if (err) {
          console.error("Login Error:", err);
          return res.status(500).json({
            error: err.message
          });
        }

        return res.send("Login Successful");
      });
    })(req, res, next);
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