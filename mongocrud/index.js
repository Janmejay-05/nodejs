const express = require("express");
const connection = require("./config/db");
const UserModel = require("./models/UserModel");
const upload = require("./middleware/multer");
const fs = require("fs");
const path = require("path");
const port = 8081;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//home page
app.get("/", async (req, res) => {
  try {
    const data = await UserModel.find({});

    res.render("home", { data });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

//post from home page
app.post("/addData", upload, async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
    }

    await UserModel.create(req.body);
    console.log("user data added successfully");
    res.redirect("/");
  } catch (err) {
    console.log("err is " + err);
    res.redirect("/");
  }
});

//delete data from db
app.get("/delete/:id", async (req, res) => {
  try {
    const data = await UserModel.findById(req.params.id);
    fs.unlinkSync(path.join(__dirname, data.image));

    await UserModel.findByIdAndDelete(req.params.id);
    console.log("data deleted successfully");
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

//edit page getting data
app.get("/edit", (req, res) => {
  try {
    let raw = req.query.data;
    data = JSON.parse(decodeURIComponent(raw));

    console.log("obj", data);
    res.render("edit", { data });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

//update data from the edit page
app.post("/updateData", upload, async (req, res) => {
  try {
    const { id } = req.body;
    const data = await UserModel.findById(id);
    if (req.file) {
      fs.unlinkSync(path.join(__dirname, data.image));
      req.body.image = `/uploads/${req.file.filename}`;
    }
    const object = req.body;

    await UserModel.findByIdAndUpdate(id, object);
    res.redirect("/");
    console.log("date updated successfully");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.listen(port, (err) => {
  if (err) {
    console.log("server is not connected");
    return;
  }

  connection();
  console.log("server is connected");
});
