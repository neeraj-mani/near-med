const registrationRoute = require("express").Router();
const userModel = require("../models/userinfo");
const mongoose = require("mongoose");
const mailService = require("../mailService");

registrationRoute.get("/register", function (req, res) {
  res.sendFile("./views/register.html", {
    root: "./",
  });
});

registrationRoute.post("/register", async function (req, res) {
  if (!req.body.email || req.body.email == "") {
    return res.json({ status: "Please Enter Your Email!" });
  }
  if (!req.body.pass) {
    return res.json({ status: "Please Enter Password!" });
  }
  if (!req.body.fullname) {
    return res.json({ status: "Please Enter Your Name!" });
  }
  if (await userModel.findOne({ email: req.body.email })) {
    return res.json({ status: "User already exists!" });
  } else {
    return res.json({ status: "ok" });
  }
});

module.exports = registrationRoute;
