const express = require("express");
const app = express();
const port = 8081;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/features", (req, res) => {
  res.render("features");
});

app.listen(port, (err) => {
  if (err) {
    console.log("server is not connected");
    return;
  }
  console.log("server is connected");
});
