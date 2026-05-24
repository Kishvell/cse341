const { ObjectId } = require("mongodb");
const { getDB } = require("../database/connect");
const { validationResult } = require("express-validator");

// GET all games
const getAllGames = async (req, res) => {
  try {
    const result = await getDB()
      .collection("games")
      .find()
      .toArray();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET single game
const getSingleGame = async (req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);

    const result = await getDB()
      .collection("games")
      .findOne({ _id: gameId });

    if (!result) {
      return res.status(404).json({
        message: "Game not found"
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// POST create game
const createGame = async (req, res) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const game = {
      title: req.body.title,
      genre: req.body.genre,
      developer: req.body.developer,
      releaseYear: req.body.releaseYear,
      platform: req.body.platform,
      rating: req.body.rating,
      multiplayer: req.body.multiplayer,
      price: req.body.price
    };

    const response = await getDB()
      .collection("games")
      .insertOne(game);

    res.status(201).json({
      message: "Game created successfully",
      id: response.insertedId
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// PUT update game
const updateGame = async (req, res) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const gameId = new ObjectId(req.params.id);

    const updatedGame = {
      title: req.body.title,
      genre: req.body.genre,
      developer: req.body.developer,
      releaseYear: req.body.releaseYear,
      platform: req.body.platform,
      rating: req.body.rating,
      multiplayer: req.body.multiplayer,
      price: req.body.price
    };

    const response = await getDB()
      .collection("games")
      .replaceOne(
        { _id: gameId },
        updatedGame
      );

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({
        message: "Game not found"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE game
const deleteGame = async (req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);

    const response = await getDB()
      .collection("games")
      .deleteOne({ _id: gameId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({
        message: "Game not found"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllGames,
  getSingleGame,
  createGame,
  updateGame,
  deleteGame
};