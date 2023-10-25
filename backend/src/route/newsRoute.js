const express = require("express");
const { authJwt } = require("../middleware/jwt");
const { getAll } = require("../controller/newsController");
const newsRoute = express.Router();

newsRoute.get("/", authJwt,  getAll);

module.exports = { newsRoute };
