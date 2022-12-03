const mongoose = require("mongoose");
const conn = require("./MongooseConnection");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  shop: {
    type: String,
  },
});

const model = conn.model("usermodel", userSchema);
module.exports = model;
