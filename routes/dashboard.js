const dashboardRoute = require("express").Router();
const mongoose = require("mongoose");
const userModel = require("../models/userinfo");
const shopModel = require("../models/shopinfo");
const medInfoModel = require("../models/medinfo");
const { ObjectId } = require("mongodb");

dashboardRoute.get("/user/dashboard", function (req, res) {
  res.sendFile("./views/dashboard.html", {
    root: "./",
  });
});

dashboardRoute.post("/user/dashboard", async function (req, res) {
  let user = await userModel.findOne({
    email: req.body.email,
    password: req.body.pass,
  });
  if (!user) return res.status(403).json({ msg: "not allowed!" });
  let shopId = (
    await shopModel.findOne({
      userId: user._id,
    })
  )._id;
  return res.json({
    shopId,
    name: user.name,
    shop: user.shop,
    authenticated: true,
  });
});

dashboardRoute.post("/user/dashboard/data", async function (req, res) {
  let shopInfo = await shopModel.findOne({
    _id: new ObjectId(req.body.shopId),
  });
  let result = await medInfoModel.create({
    shopId: req.body.shopId,
    name: req.body.name,
    brand: req.body.brand,
    category: req.body.catg,
    mfg_date: req.body.mfg,
    exp_date: req.body.exp,
    unit: Number(req.body.unit),
    price: Number(req.body.price),
    shopName: shopInfo.name,
    shopLocation: shopInfo.city,
    lat: shopInfo.lat,
    lng: shopInfo.lng,
  });
  return res.json({ medId: result._id });
});

dashboardRoute.post("/user/dashboard/alldata", async function (req, res) {
  let shopId = req.body.shopId;
  let data = await medInfoModel.find({ shopId });
  res.json(data);
});

dashboardRoute.delete("/user/dashboard/data", async function (req, res) {
  let result = await medInfoModel.findByIdAndDelete(req.body.medId);
  res.json({ ok: true });
});

module.exports = dashboardRoute;
