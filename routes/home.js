const express = require("express");
const mongoose = require("mongoose");
const medInfoModel = require("../models/medinfo");
const shopModel = require("../models/shopinfo");

const homeRoute = express.Router();

homeRoute.get("/", function (req, res) {
  res.sendFile("./views/app.html", {
    root: "./",
  });
});

homeRoute.post("/search", async function (req, res) {
  let regexQuery = new RegExp(req.body.q, "i");
  let cityRegexQuery = new RegExp(req.body.city, "i");
  console.log(req.body.q, req.body.city);
  let result = await medInfoModel.find({
    shopLocation: cityRegexQuery,
    $or: [
      { name: { $regex: regexQuery } },
      { category: { $regex: regexQuery } },
    ],
  });
  res.json({ result });
});

module.exports = homeRoute;
