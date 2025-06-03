const express = require("express");
const connection = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const port = 8081;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);

app.listen(port, (err) => {
  if (err) {
    console.log("server is not connected");
    return;
  }

  connection();
  console.log("server is connected");
});
