"use strict";

require("dotenv").config();

const url = require("url");
const axios = require("axios");
const { expect } = require("chai");

const { BASE_URL } = process.env;

describe("GROUP", () => {
  let contactId;
  let groupId;

  const newGroup = {
    name: "Family",
    contacts: []
  };

  before(async () => {
    const newContact = {
      name: "Sumedh Nimkarde",
      email: {
        value: "hi@lunaticmonk.space",
        tag: "work"
      },
      phone: {
        value: "9822264738",
        tag: "personal"
      }
    };

    const result = await axios.post(
      url.resolve(BASE_URL, `/api/contact/add`),
      newContact
    );
    const { _id } = result.data.data;
    const { status } = result.data;

    contactId = _id;
    newGroup.contacts.push(contactId);

    expect(status).to.equal(201);
  });

  it("should add a new group", async () => {
    const result = await axios.post(
      url.resolve(BASE_URL, `/api/group/add`),
      newGroup
    );
    const { _id, name, contacts } = result.data.data;

    groupId = _id;

    expect(name).to.equal(newGroup.name);
    expect(contacts).to.have.length(1);
    expect(contacts[0]).to.equal(contactId);
  });

  it("should return a group", async () => {
    const result = await axios.get(
      url.resolve(BASE_URL, `/api/group/${groupId}`)
    );
    const { _id, name } = result.data.data;

    expect(_id).to.equal(groupId);
    expect(name).to.equal(newGroup.name);
  });

  it("should update a group", async () => {
    const toUpdate = {
      name: "Friends"
    };

    const result = await axios.patch(
      url.resolve(BASE_URL, `/api/group/${groupId}`),
      toUpdate
    );
    const { _id, name } = result.data.data;

    expect(_id).to.equal(groupId);
    expect(name).to.equal(toUpdate.name);
    expect(name).to.not.equal(newGroup.name);
  });

  it("should delete a group", async () => {
    const result = await axios.delete(
      url.resolve(BASE_URL, `/api/group/${groupId}`)
    );
    const { status } = result.data;

    expect(status).to.equal(200);
  });

  after(async () => {
    const result = await axios.delete(
      url.resolve(BASE_URL, `/api/contact/${contactId}`)
    );
    const { status } = result.data;

    expect(status).to.equal(200);
  });
});
