const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const cookie = require("cookie");

// models
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: (true, "Username is required"),
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: (true, "Email is required"),
  },
  password: {
    type: String,
    required: (true, "Password is required"),
    minlength: [6, "minimum length of the Password should be 6"],
  },
  customerId: {
    type: String,
    default: " ", //default value for customers who are not registered
  },
  subscription: {
    type: String,
    default: " ",
  },
});

// Hashing password
userSchema.pre("save", async function (next) {
  // update
  if (!this.isModified("password")) return next();

  const saltRounds = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

// match the password

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// sign token
userSchema.methods.getSignToken = function (res) {
  const accessToken = JWT.sign(
    { id: this._id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: `${process.env.JWT_ACCESS_EXPIREIN}` }
  );
  const refreshToken = JWT.sign(
    { id: this._id },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: `${process.env.JWT_REFRESH_EXPIREIN}` }
  );
  res.cookie("refreshToken", `${refreshToken}`, {
    maxage: 86400 * 7000,
    httpOnly: true,
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
