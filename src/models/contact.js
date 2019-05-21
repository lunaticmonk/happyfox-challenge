"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailSchema = require("./email");
const phoneSchema = require("./phone");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: [
      {
        type: emailSchema,
        required: false
      }
    ],
    phone: [
      {
        type: phoneSchema,
        required: false
      }
    ]
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

contactSchema.index({
  name: "text"
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
