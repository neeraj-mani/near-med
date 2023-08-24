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

otpRoute.post("/register/mail", async function (req, res) {
  try {
    const otp = generateOTP(); // Securely generate OTP
    await mailService.sendMail(req.body.email, otp);
    req.session.otp = otp; // Store OTP in session
    return res.json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: "Failed to send OTP email." });
  }
});

otpRoute.post("/register/otp", async function (req, res) {
  try {
    const storedOTP = req.session.otp;
    const enteredOTP = Number(req.body.otp);
    if (storedOTP === enteredOTP) {
      await userModel.create({
        name: req.body.fullname,
        email: req.body.email,
        password: req.body.pass,
      });
      return res.json({ ok: true });
    } else {
      return res.json({ ok: false, error: "Invalid OTP." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: "An error occurred." });
  }
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
}

module.exports = otpRoute;

