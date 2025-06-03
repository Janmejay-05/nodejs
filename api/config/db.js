const mongoose = require("mongoose");

const connection = async () => {
  await mongoose.connect("mongodb://127.0.0.1/api");
  console.log("database connected successfully");
};

module.exports = connection;
