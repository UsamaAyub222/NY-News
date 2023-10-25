const userModel = require("../../config/db/model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const createUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);
    email = email.toLowerCase();
    const user = await userModel.create({
      name,
      email,
      password: hash,
    });
    return res
      .status(201)
      .json({ _message: "User created.", data: user });
  } catch (error) {
    return res.status(501).json(error);
  }
};

const getAll = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const result = {};
    const users = await userModel.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.users = users;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await userModel.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await userModel
      .find()
      .sort("-_id")
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.rowsPerPage = limit;
    return res
      .status(200)
      .json({ _message: "Get all.", data: result });
  } catch (error) {
    return res.status(501).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOneAndDelete(id);
    return res
      .status(200)
      .json({ _message: "Deleted successfully.", data: user });
  } catch (error) {
    return res.status(501).json(error);
  }
};

const logInUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();
    const user = await userModel.findOne({ email });
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        msg: "The credentials are missing or are wrong.",
      });
    }
    const userData = {
      id: user.id,
      email: user.email,
    };
    const authToken = jwt.sign(userData, process.env.MY_SECRET);
    return res
      .status(200)
      .json({
        _message: "User loggedIn successfully.",
        data: user,
        token: authToken,
        error: "",
      });
  } catch (error) {
    return res.status(501).json(error);
  }
};

module.exports = { createUser, getAll, deleteUser, logInUser };
