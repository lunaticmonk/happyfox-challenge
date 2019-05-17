"use strict";

const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contact");

router.get("/", (req, res) => {
  res.status(200).send("Contact Resource");
});

module.exports = router;
