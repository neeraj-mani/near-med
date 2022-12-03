const userAuthRoute = require("express").Router();
const mongoose = require("mongoose");
const userModel = require("../models/userinfo");

userAuthRoute.post("/user/auth", async function (req, res) {
  let email = req.body.email;
  let pass = req.body.pass;
  const user = await userModel.findOne({ email, pass });
  if (!user) {
    return res.json({
      authenticated: false,
    });
  }
  return res.json({
    name: user.name,
    email: user.email,
    shop: user.shop,
    authenticated: true,
  });
});

module.exports = userAuthRoute;
