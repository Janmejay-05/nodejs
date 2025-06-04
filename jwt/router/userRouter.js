const express = require("express");
const UserModel = require("../model/UserModel");

const userRouter = express.Router();

userRouter.get("/all", async (req, res) => {
  const data = await UserModel.find({});

  res.status(200).json(data);
});

userRouter.post("/userDetail", async (req, res) => {
  if (!req.body) {
    return res.status(401).json({
      message: "not responding",
    });
  }

  await UserModel.insertOne(req.body);

  return res.status(201).json(req.body);
});

module.exports = userRouter;
