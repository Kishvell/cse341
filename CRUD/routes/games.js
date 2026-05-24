const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const gamesController = require("../controllers/games");

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

// POST create game
router.post(
  "/",
  gameValidation,
  gamesController.createGame
);

// PUT update game
router.put(
  "/:id",
  gameValidation,
  gamesController.updateGame
);

// DELETE game
router.delete("/:id", gamesController.deleteGame);

module.exports = router;