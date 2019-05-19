"use strict";

const express = require("express");
const router = express.Router();

const { body } = require("express-validator/check");

const { saveGroup } = require("../controllers/group");

router.get("/", (req, res) => {
  res.status(200).send("Group Resource");
});

router.post(
  "/add",
  [
    body("name")
      .exists()
      .trim()
      .withMessage("Name of the group is required"),
    body("contacts")
      .trim()
      .optional()
      .isArray()
      .withMessage("Contacts required as an array")
  ],
  saveGroup
);

module.exports = router;
