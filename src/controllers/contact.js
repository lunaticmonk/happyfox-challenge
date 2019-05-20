/**
 * Contact controller.
 * Contains all the business logic executed after
 * hitting any contact endpoint in routes.
 *
 */

"use strict";

const Contact = require("../models/contact");
const { validationResult } = require("express-validator/check");

const ApiError = require("../errors/api");
const NotFoundError = require("../errors/notfound");
const UnprocessableRequestError = require("../errors/unprocessablerequest");

const { sortMatchesDescending } = require("../utils/utils");

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
    return res.status(err.status).send(err);
  }
}

async function getContact(req, res, next) {
  try {
    const { id } = req.params;

    const contact = await Contact.findOne({ _id: id });
    if (contact) {
      const response = {
        data: contact,
        message: `Contact saved!`,
        status: 200
      };

      return res.status(response.status).send(response);
    } else {
      const err = new NotFoundError("Contact not found");
      return res.status(err.status).send(err);
    }
  } catch (error) {
    const err = new ApiError("Failed fetching contact");
    return res.status(err.status).send(err);
  }
}

async function updateContact(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next(new UnprocessableRequestError(err.mapped()));
  }
  try {
    const { id } = req.params;
    const { body } = req;

    const contact = await Contact.findOneAndUpdate({ _id: id }, body, {
      new: true
    });

    const response = {
      data: contact,
      message: `Contact updated!`,
      status: 200
    };

    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    const err = {
      message: `Failure updating new contact.`,
      status: 500
    };
    return res.status(err.status).send(err);
  }
}

async function deleteContact(req, res, next) {
  try {
    const { id } = req.params;

    const contact = await Contact.findOneAndDelete({ _id: id });

    const response = {
      message: `Contact with contact name: ${contact.name} deleted!`,
      status: 200
    };

    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    const err = {
      message: `Failure deleting the contact.`,
      status: 422
    };
    return res.status(err.status).send(err);
  }
}

async function searchContact(req, res, next) {
  try {
    const { query } = req.query;
    const matches = await Contact.find({
      $text: { $search: query, $caseSensitive: false }
    });

    const descendingOrdered = await sortMatchesDescending(matches);

    const response = {
      data: matches,
      message: `Returned matches`,
      status: 200
    };

    return res.status(response.status).send(response);
  } catch (error) {
    console.log(error);
    const err = {
      message: `Failure searching for the given query`,
      status: 404
    };
    return res.status(err.status).send(err);
  }
}

module.exports = {
  saveContact,
  getContact,
  updateContact,
  deleteContact,
  searchContact
};
