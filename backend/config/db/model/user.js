const mongoose = require("mongoose");

const validateEmail = function (email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required."],
    },
    email: {
      type: String,
      required: [true, "email is required."],
      validate: [validateEmail, "Please enter a valid email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required."],
      validate(value) {
        if (value.length < 8) {
          throw new Error("Passwords is too short. At least 8 characters.");
        }
      },
    },
  },
  { timestamps: true }
);

//export
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
