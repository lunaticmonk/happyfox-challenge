"use strict";

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Routers
const contactRouter = require("./routers/contact");

const { ALLOWED_DOMAINS } = require("../configs/app");
const { DATABASE_USER, DATABASE_PASSWORD } = require("../configs/database");

class Server {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.initializeDb();
  }

  config() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    const corsOptions = {
      origin: ALLOWED_DOMAINS,
      credentials: true,
      optionsSuccessStatus: 200
    };
    this.app.use(cors(corsOptions));
  }

  routes() {
    this.app.use("/api/contact", contactRouter);

    this.app.use((err, req, res, next) => {
      if (res.headersSent) {
        return next();
      }

      if (err) {
        const response = {
          error: err.toJSON()
        };
        return res.status(err.status).send(response);
      }
    });
  }

  initializeDb() {
    mongoose.connect(
      `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:27017/happyfox`,
      {
        useNewUrlParser: true
      }
    );
  }
}

module.exports = new Server().app;
