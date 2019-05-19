"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { WORK, PERSONAL } = require("../../configs/constants");

const phoneSchema = Schema(
  {
    value: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      enum: [WORK, PERSONAL],
      required: true
    }
  },
  { _id: false, id: false }
);

module.exports = phoneSchema;
