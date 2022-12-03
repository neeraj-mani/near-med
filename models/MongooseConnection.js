const mongoose = require("mongoose");
const conn = mongoose.createConnection(
  process.env.mongo_url
);

module.exports = conn;
