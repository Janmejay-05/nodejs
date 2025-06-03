const express = require("express");
const UserModel = require("../models/UserModels");
const { body, validationResult } = require("express-validator");
const userRoutes = express.Router();

userRoutes.get("/", (req, res) => {
  res.status(200).json({
    message: "user router is runnig",
  });
});

userRoutes.post(
  "/add",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("gender").notEmpty(),
    body("hobby").isArray({ min: 1 }),
    body("city").notEmpty(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      result.errors = result.errors.map((item) => {
        if (item.path == "name") {
          item.msg = "enter your name";
          return item;
        }
        if (item.path == "email") {
          item.msg = "email formate is invalid";
          return item;
        }

        if (item.path == "password") {
          item.msg = "atleast 5 characters are required";
          return item;
        }

        if (item.path == "gender") {
          item.msg = "select gender";
          return item;
        }

        if (item.path == "hobby") {
          item.msg = "1 hobby atleast requred";
          return item;
        }

        if (item.path == "city") {
          item.msg = "selected any city";
          return item;
        }

        return item;
      });

      return res.status(400).send(result);
    }

    try {
      await UserModel.create(req.body);
      res.status(200).send("added successfully");
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

userRoutes.get("/all", async (req, res) => {
  const { search, sortBy = "name", sortOrder = "desc" } = req.query;
  let filter = {};

  if (search) {
    filter = {
      $or: [
        {
          name: { $regex: search, $options: "i" },
        },
        {
          email: { $regex: search, $options: "i" },
        },
      ],
    };
  }

  try {
    const user = await UserModel.find(filter).sort({
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    });

    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

userRoutes.delete("/delete", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "id is not found" });
  }

  try {
    const result = await UserModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ erro: "User not found" });
    }

    res.json({ result });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = userRoutes;
