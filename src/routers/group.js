"use strict";

const express = require("express");
const router = express.Router();

const { body } = require("express-validator/check");

const {
  saveGroup,
  deleteGroup,
  getGroup,
  updateGroup
} = require("../controllers/group");

router.get("/", (req, res) => {
  res.status(200).send("Group Resource");
});

router.get("/:id", getGroup);

router.delete("/:id", deleteGroup);

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

router.patch(
  "/:id",
  [
    body("name")
      .optional()
      .trim()
      .isString()
      .withMessage("Name of the group is required and should be a string"),
    body("contacts")
      .optional()
      .trim()
      .isArray()
      .withMessage("Contacts required as an array")
  ],
  updateGroup
);

module.exports = router;
