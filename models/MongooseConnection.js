const mongoose = require("mongoose");
const conn = mongoose.createConnection(
  "mongodb+srv://nmt141319:rNImN2XevBe3jzAG@cluster0.vkhwchr.mongodb.net/?retryWrites=true&w=majority"
);

module.exports = conn;
