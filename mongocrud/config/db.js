const mongoose = require("mongoose");

const connection = async () => {
  await mongoose.connect("mongodb://127.0.0.1/users");
  console.log("connected to database");
};

module.exports = connection;
