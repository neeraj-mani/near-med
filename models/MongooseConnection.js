const mongoose = require("mongoose");
const auth = process.env.mongo_auth;
const conn = mongoose.createConnection(
  `mongodb+srv://${auth}@cluster0.vkhwchr.mongodb.net/?retryWrites=true&w=majority`
);

module.exports = conn;
