const router = require("express").Router();
const { getDB } = require("../database/connect");
const { ObjectId } = require("mongodb");

// GET all contacts
router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const data = await db.collection("contacts").find().toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET contact by ID
router.get("/:id", async (req, res) => {
  try {
    const db = getDB();

    const data = await db.collection("contacts").findOne({
      _id: new ObjectId(req.params.id)
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;