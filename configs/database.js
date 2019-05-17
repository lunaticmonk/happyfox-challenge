"use strict";

const dotenv = require("dotenv");
dotenv.config();

const configs = {
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD
};

module.exports = configs;
