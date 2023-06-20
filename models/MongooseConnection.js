const mongoose = require("mongoose");
const auth = process.env.mongo_new_auth;
console.log(auth);
const conn = mongoose.createConnection(
  `mongodb+srv://${auth}@cluster0.vkhwchr.mongodb.net/?retryWrites=true&w=majority`
);

module.exports = conn;
