const express = require("express");
const connection = require("./config/db");
const UserModel = require("./models/UserModel");
const port = 8081;

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    let allUserData = await UserModel.find({});

    res.render("home", { allUserData });
  } catch (err) {
    return res.send(err);
  }
});

app.get("/edit/:id", async (req, res) => {
  let id = req.params.id;

  try {
    let data = await UserModel.findById(id);
    console.log(data);
    res.render("edit", { data, id });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.get("/delete/:id", async (req, res) => {
  let id = req.params.id;

  try {
    let data = await UserModel.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.post("/userData", async (req, res) => {
  try {
    await UserModel.create(req.body);

    return res.redirect("/");
  } catch (err) {
    return err;
  }
});

app.post("/update", async (req, res) => {
  let id = req.body.id;
  console.log(id);

  let { userName, email, password, city, gender, image } = req.body;
  console.log({ userName, email });
  try {
    await UserModel.findByIdAndUpdate(id, {
      userName,
      email,
      password,
      city,
      gender,
      image,
    });
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.listen(port, (err) => {
  if (err) {
    console.log("server is not running");
    return;
  }

  connection();
  console.log("server is running");
});
