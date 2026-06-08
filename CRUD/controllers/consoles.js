const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const consolesController = require("../controllers/consoles");

// GET all consoles
router.get("/", consolesController.getAllConsoles);

// GET single console
router.get("/:id", consolesController.getSingleConsole);

// POST create console 
router.post(
  "/",
  consolesController.createConsole
);

// PUT update console
router.put(
  "/:id",
  consolesController.updateConsole
);

// DELETE console
router.delete(
  "/:id",
  consolesController.deleteConsole
);

module.exports = router;