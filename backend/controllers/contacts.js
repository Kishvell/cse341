const { ObjectId } = require("mongodb");
const { getDB } = require("../database/connect");

// GET all contacts
const getAll = async (req, res) => {
  try {
    const result = await getDB()
      .collection("contacts")
      .find()
      .toArray();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// GET single contact
const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const result = await getDB()
      .collection("contacts")
      .findOne({ _id: contactId });

    if (!result) {
      return res.status(404).json({
        message: "Contact not found"
      });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// POST create contact
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await getDB()
      .collection("contacts")
      .insertOne(contact);

    res.status(201).json({
      message: "Contact created successfully",
      id: response.insertedId
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// PUT update contact
const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await getDB()
      .collection("contacts")
      .replaceOne(
        { _id: contactId },
        updatedContact
      );

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({
        message: "Contact not found"
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// DELETE contact
const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const response = await getDB()
      .collection("contacts")
      .deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({
        message: "Contact not found"
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};