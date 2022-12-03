const loginRoute = require("express").Router();
const mongoose = require("mongoose");
const userModel = require("../models/userinfo");

loginRoute.get("/login", function (req, res) {
  res.sendFile("./views/login.html", {
    root: "./",
  });
});

loginRoute.post("/login", async function (req, res) {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.json({ msg: "wrong credentials" });
  }
  if (user.password === req.body.pass) {
    return res.json({
      name: user.name,
      shop: user.shop,
      userId: user._id,
      authenticated: true,
    });
  }
  return res.json({ msg: "wrong password", authenticated: false });
});

module.exports = loginRoute;
