"use strict";

const dotenv = require("dotenv");
dotenv.config();

const configs = {
  APP_PORT: process.env.APP_PORT,
  ALLOWED_DOMAINS: process.env.ALLOWED_DOMAINS
};

module.exports = configs;
