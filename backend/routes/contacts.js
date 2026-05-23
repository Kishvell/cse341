const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const contactsController = require("../controllers/contacts");

/**
 * #swagger.tags = ['Contacts']
 */

// Validation rules
const contactValidationRules = [
  body("firstName")
    .notEmpty()
    .withMessage("firstName is required"),

  body("lastName")
    .notEmpty()
    .withMessage("lastName is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("favoriteColor")
    .notEmpty()
    .withMessage("favoriteColor is required"),

  body("birthday")
    .notEmpty()
    .withMessage("birthday is required")
];

// GET all contacts
router.get("/", contactsController.getAll);

// GET single contact
router.get("/:id", contactsController.getSingle);

// POST create contact
router.post(
  "/",
  contactValidationRules,
  contactsController.createContact
);

// PUT update contact
router.put(
  "/:id",
  contactValidationRules,
  contactsController.updateContact
);

// DELETE contact
router.delete("/:id", contactsController.deleteContact);

module.exports = router;