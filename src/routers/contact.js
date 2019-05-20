"use strict";

const express = require("express");
const router = express.Router();

const { body, query } = require("express-validator/check");

const {
  saveContact,
  getContact,
  updateContact,
  deleteContact,
  searchContact
} = require("../controllers/contact");

router.get("/", (req, res) => {
  res.status(200).send("Contact Resource");
});

router.get(
  "/search",
  [
    query("query")
      .optional()
      .isString()
      .withMessage("Invalid search strinng")
  ],
  searchContact
);

router.get("/:id", getContact);

router.post(
  "/add",
  [
    body("email.value")
      .isEmail()
      .optional()
      .trim()
      .withMessage("Email is invalid"),
    body("phone.value")
      .exists()
      .trim()
      .optional()
      .isMobilePhone("any")
      .withMessage("invalid phone number")
  ],
  saveContact
);

router.patch(
  "/:id",
  [
    body("name")
      .optional()
      .trim()
      .withMessage("Name is invalid"),
    body("email.value")
      .isEmail()
      .optional()
      .trim()
      .withMessage("Email is invalid"),
    body("phone.value")
      .exists()
      .trim()
      .optional()
      .isMobilePhone("any")
      .withMessage("invalid phone number")
  ],
  updateContact
);

router.delete("/:id", deleteContact);

module.exports = router;
