const mongoose = require("mongoose");
const conn = require("./MongooseConnection");
const medSchema = new mongoose.Schema({
  shopId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  mfg_date: {
    type: String,
    required: true,
  },
  exp_date: {
    type: String,
    required: true,
  },
  unit: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  shopLocation: {
    type: String,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
});

module.exports = conn.model("medInfoModel", medSchema);
