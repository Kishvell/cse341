const router = require("express").Router();
const { getDB } = require("../database/connect");
const { ObjectId } = require("mongodb");

// GET all
router.get("/", async (req, res) => {
  const db = getDB();
  const data = await db.collection("contacts").find().toArray();
  res.json(data);
});

// GET by id
router.get("/:id", async (req, res) => {
  const db = getDB();
  const data = await db.collection("contacts").findOne({
    _id: new ObjectId(req.params.id)
  });
  res.json(data);
});

module.exports = router;