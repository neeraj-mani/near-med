const otpRoute = require("express").Router();
const mailService = require("../mailService");
const mongoose = require("mongoose");
const userModel = require("../models/userinfo");

let otp;
otpRoute.get("/register/otp", function (req, res) {
  res.sendFile("./views/otp.html", {
    root: "./",
  });
});
otpRoute.post("/register/mail", function (req, res) {
  otp = parseInt(Math.random() * 1000000);
  mailService.sendMail(req.body.email, otp);
  console.log(otp);
  return res.json({ ok: true });
});
otpRoute.post("/register/otp", async function (req, res) {
  console.log(otp, req.body.otp);
  if (otp === Number(req.body.otp)) {
    await userModel.create({
      name: req.body.fullname,
      email: req.body.email,
      password: req.body.pass,
    });
    return res.json({ ok: true });
  }
  return res.json({ ok: false });
});

module.exports = otpRoute;
