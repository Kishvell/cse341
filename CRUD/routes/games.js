const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const gamesController = require("../controllers/games");

const { isAuthenticated } = require("../middleware/authenticate");

/**
 * #swagger.tags = ['Games']
 */

// Validation rules
const gameValidation = [
  body("title")
    .notEmpty()
    .withMessage("title is required"),

  body("genre")
    .notEmpty()
    .withMessage("genre is required"),

  body("developer")
    .notEmpty()
    .withMessage("developer is required"),

  body("releaseYear")
    .notEmpty()
    .withMessage("releaseYear is required"),

  body("platform")
    .notEmpty()
    .withMessage("platform is required"),

  body("rating")
    .notEmpty()
    .withMessage("rating is required"),

  body("price")
    .notEmpty()
    .withMessage("price is required")
];

// GET all games
router.get("/", gamesController.getAllGames);

// GET single game
router.get("/:id", gamesController.getSingleGame);

// POST create game (Protected)
router.post(
  "/",
  isAuthenticated,
  gameValidation,
  gamesController.createGame
);

// PUT update game
router.put(
  "/:id",
  gameValidation,
  gamesController.updateGame
);

// DELETE game (Protected)
router.delete(
  "/:id",
  isAuthenticated,
  gamesController.deleteGame
);

module.exports = router;