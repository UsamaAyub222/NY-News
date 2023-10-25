const express = require("express");
const {
  createUser,
  getAll,
  deleteUser,
  logInUser,
} = require("../controller/userController");
const userRoute = express.Router();

userRoute.get("/", getAll);
userRoute.post("/create", createUser);
userRoute.delete("/:id", deleteUser);
userRoute.post("/", logInUser);

module.exports = { userRoute };
