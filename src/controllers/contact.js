/**
 * Contact controller.
 * Contains all the business logic executed after
 * hitting any contact endpoint in routes.
 *
 */

"use strict";

const Contact = require("../models/contact");
const { validationResult } = require("express-validator/check");

const UnprocessableRequestError = require("../errors/unprocessablerequest");

async function saveContact(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next(new UnprocessableRequestError(err.mapped()));
  }
  try {
    const { name, email, phone } = req.body;

    const newContact = new Contact({
      name,
      phone,
      email: email || []
    });

    const contact = await newContact.save();

    const response = {
      data: contact,
      message: `Contact saved!`,
      status: 200
    };

    return res.status(200).send(response);
  } catch (error) {
    const err = {
      message: `Failure adding new contact.`,
      status: 500
    };
    return res.status(500).send(err);
  }
}

module.exports = {
  saveContact
};
