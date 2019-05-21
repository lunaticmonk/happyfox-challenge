/**
 * Group controller.
 * Contains all the business logic executed after
 * hitting any group endpoint in routes.
 *
 */

"use strict";

const Group = require("../models/group");
const { validationResult } = require("express-validator/check");

const ApiError = require("../errors/api");
const NotFoundError = require("../errors/notfound");
const UnprocessableRequestError = require("../errors/unprocessablerequest");
const BadRequestError = require("../errors/badrequest");

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
      status: 201
    };

    return res.status(response.status).send(response);
  } catch (error) {
    const err = new ApiError("Failure adding new group.");
    return res.status(err.status).send(err);
  }
}

async function getGroup(req, res, next) {
  try {
    const { id } = req.params;

    const group = await Group.findOne({ _id: id }).populate(
      "contacts",
      "name email phone"
    );
    if (group) {
      const response = {
        data: group,
        message: `Group found!`,
        status: 200
      };

      return res.status(response.status).send(response);
    } else {
      const err = new NotFoundError("Group not found");
      return res.status(err.status).send(err);
    }
  } catch (error) {
    const err = new ApiError("Failed fetching group");
    return res.status(err.status).send(err);
  }
}

async function updateGroup(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next(new UnprocessableRequestError(err.mapped()));
  }
  try {
    const { id } = req.params;
    const { body } = req;

    const group = await Group.findOneAndUpdate({ _id: id }, body, {
      new: true
    });

    const response = {
      data: group,
      message: `Group updated!`,
      status: 200
    };

    return res.status(response.status).send(response);
  } catch (error) {
    const err = new BadRequestError("Failure updating new group.");
    return res.status(err.status).send(err);
  }
}

async function deleteGroup(req, res, next) {
  try {
    const { id } = req.params;

    const group = await Group.findOneAndDelete({ _id: id });

    const response = {
      message: `Group with group name: "${group.name}" deleted!`,
      status: 200
    };

    return res.status(response.status).send(response);
  } catch (error) {
    const err = new NotFoundError(
      "Failed deleting the group since it may be non-existent or already deleted."
    );
    return res.status(err.status).send(err);
  }
}

module.exports = {
  saveGroup,
  deleteGroup,
  getGroup,
  updateGroup
};
