/**
 * Group controller.
 * Contains all the business logic executed after
 * hitting any group endpoint in routes.
 *
 */

"use strict";

const Group = require("../models/group");
const { validationResult } = require("express-validator/check");

const UnprocessableRequestError = require("../errors/unprocessablerequest");

async function saveGroup(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next(new UnprocessableRequestError(err.mapped()));
  }
  try {
    const { name, contacts } = req.body;

    const newGroup = new Group({
      name,
      contacts:
        contacts !== null || contacts !== undefined || contacts !== []
          ? contacts
          : []
    });

    const group = await newGroup.save();

    const response = {
      data: group,
      message: `Group added!`,
      status: 200
    };

    return res.status(response.status).send(response);
  } catch (error) {
    const err = {
      message: `Failure adding new group.`,
      status: 500
    };
    return res.status(err.status).send(err);
  }
}

module.exports = {
  saveGroup
};
