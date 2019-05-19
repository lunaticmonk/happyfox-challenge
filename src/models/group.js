"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Contact = require("./contact");

const groupSchema = Schema(
  {
    name: {
      type: String,
      required: true
    },
    contacts: [
      {
        type: Schema.Types.ObjectId,
        ref: Contact,
        required: false
      }
    ]
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "createdAt" } }
);

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
