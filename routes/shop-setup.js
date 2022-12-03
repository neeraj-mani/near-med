const shopSetupRoute = require("express").Router();
const shopModel = require("../models/shopinfo");
const userModel = require("../models/userinfo");
const mongoose = require("mongoose");

shopSetupRoute.get("/user/shop", function (req, res) {
  res.sendFile("./views/shop-setup.html", {
    root: "./",
  });
});
shopSetupRoute.post("/user/shop", async function (req, res) {
  const data = req.body;
  const user = await userModel.findOne({
    email: data.email,
    password: data.password,
  });
  try {
    await shopModel.create({
      userId: user._id,
      name: data.name,
      city: data.city,
      dist: data.dist,
      state: data.state,
      pin: Number(data.pin),
      lat: Number(JSON.parse(data.coord).lat),
      lng: Number(JSON.parse(data.coord).lng),
    });
    await userModel.updateOne(
      { email: data.email },
      {
        $set: { shop: data.name },
      }
    );
    console.log("data submitted");
    res.json({ status: "ok" });
  } catch (e) {
    return console.log(e);
  }
});

module.exports = shopSetupRoute;
