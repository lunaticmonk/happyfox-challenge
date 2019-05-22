"use strict";

require("dotenv").config();

const axios = require("axios");
const { expect } = require("chai");

const { BASE_URL } = process.env;

describe("CONTACT", () => {
  let contactId;
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

  it("should add a new contact", async () => {
    const result = await axios.post(`${BASE_URL}/api/contact/add`, newContact);
    const { name, email, phone, _id } = result.data.data;
    contactId = _id;

    expect(name).to.equal(newContact.name);
    expect(email[0].value).to.equal(newContact.email.value);
    expect(phone[0].value).to.equal(newContact.phone.value);
    expect(email[0].tag).to.equal(newContact.email.tag);
    expect(phone[0].tag).to.equal(newContact.phone.tag);
  });

  it("should return a contact", async () => {
    const result = await axios.get(`${BASE_URL}/api/contact/${contactId}`);
    const { _id, name } = result.data.data;

    expect(_id).to.equal(contactId);
    expect(name).to.equal(newContact.name);
  });

  it("should update a contact", async () => {
    const toUpdate = {
      name: "Bran the broken"
    };

    const result = await axios.patch(
      `${BASE_URL}/api/contact/${contactId}`,
      toUpdate
    );
    const { _id, name } = result.data.data;

    expect(_id).to.equal(contactId);
    expect(name).to.equal(toUpdate.name);
    expect(name).to.not.equal(newContact.name);
  });

  it("should search for a contact", async () => {
    const result = await axios.get(
      `${BASE_URL}/api/contact/search?name=sumedh`
    );
    const { status, data: matches } = result.data;

    expect(matches.length).to.be.at.most(5);
    expect(matches[0].name).to.equal(newContact.name.toLowerCase());
    expect(status).to.equal(200);
  });

  it("should delete a contact", async () => {
    const result = await axios.delete(`${BASE_URL}/api/contact/${contactId}`);
    const { status } = result.data;

    expect(status).to.equal(200);
  });
});
