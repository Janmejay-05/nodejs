const express = require("express");
const app = express();
const port = 8081;

let data = [];

-app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home", { data });
});

app.get("/edit/:id", (req, res) => {
  let editData = data[req.params.id];
  let { id } = req.params;
  res.render("edit", { editData, id });
});

app.post("/userData", (req, res) => {
  let { userName, age } = req.body;
  if (userName === "" || age === "") {
    console.log("please enter the empty fields");
    return res.redirect("/");
  }

  data.push({ userName, age });
  res.redirect("/");
});

app.get("/userData/:id", (req, res) => {
  let index = req.params.id;
  data = data.filter((e, i) => i != index);
  console.log("index", index);
  console.log("data", data);
  res.redirect("/");
});

app.post("/updateData", (req, res) => {
  let { userName, age } = req.body;
  data[req.body.index] = { userName, age };
  res.redirect("/");
});

app.listen(port, (err) => {
  if (err) {
    console.log("server is not connected");
    return;
  }
  console.log("server is connected");
});
