const { ObjectId } = require("mongodb");
const { getDB } = require("../database/connect");
const { validationResult } = require("express-validator");

// i.e. pc, mac, xbox, ps2, switch, switch2

// GET all consoles
const getAllconsoles = async (req, res) => {
  try {
    const result = await getDB("consolesDB")
      .collection("consoles")
      .find()
      .toArray();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET single console
const getSingleconsole = async (req, res) => {
  try {
    const consoleId = new ObjectId(req.params.id);

    const result = await getDB("consolesDB")
      .collection("consoles")
      .findOne({ _id: consoleId });

    if (!result) {
      return res.status(404).json({
        message: "console not found"
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// POST create console
const createconsole = async (req, res) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const console = {
      name: req.body.name,
      ageRange: req.body.ageRange,
      price: req.body.price
    };

    const response = await getDB("consolesDB")
      .collection("consoles")
      .insertOne(console);

    res.status(201).json({
      message: "console created successfully",
      id: response.insertedId
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// PUT update console
const updateconsole = async (req, res) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const consoleId = new ObjectId(req.params.id);

    const updatedconsole = {
      name: req.body.name,
      ageRange: req.body.ageRange,
      price: req.body.price
    };

    const response = await getDB("consolesDB")
      .collection("consoles")
      .replaceOne(
        { _id: consoleId },
        updatedconsole
      );

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({
        message: "console not found"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE console
const deleteconsole = async (req, res) => {
  try {
    const consoleId = new ObjectId(req.params.id);

    const response = await getDB("consolesDB")
      .collection("consoles")
      .deleteOne({ _id: consoleId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({
        message: "console not found"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllConsoles,
  getSingleConsole,
  createConsole,
  updateConsole,
  deleteConsole
};