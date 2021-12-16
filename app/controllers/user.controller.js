const user = require("../models/user.model.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createUser = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({
      errors: errorMessages,
    });
  }
  await hashPassword(req);
  //await userDetails(req);
  const details = req.body;
  const results = await user.createUser(details);
  res.send(results);
  res.end();
};

const updateUser = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({
      errors: errorMessages,
    });
  }
  await hashPassword(req);
  //await userDetails(req);
  const details = req.body;
  const results = await user.updateUser(details);
  res.send(results);
  res.end();
};

const getCurrentUser = async (req, res) => {
  // Validate request
  if (!req.params) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const details = req.body;
  const results = await user.getCurrentUser(details);
  res.send(results);
  res.end();
};


const getAllUser = async (req, res) => {
  // Validate request
  if (!req.params) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const details = req.params;
  const results = await user.getAllUser(details);
  res.send(results);
  res.end();
};

const login = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({
      errors: errorMessages,
    });
  }
  //await hashPassword(req);
  const details = req.body;
  const results = await user.login(details);
  if (results.length == 0) {
    res.status(404).send({ message: "Invalid username or password!" });
  } else {
    const isMatch = await bcrypt.compare(
      req.body.password,
      results[0].password
    );

    if (!isMatch) {
      res.status(401).send({ message: "Invalid password!" });
    }

    // user matched!
    const secretKey = process.env.SECRET || "";
    const token = jwt.sign(
      { username: results[0].username.toString() },
      secretKey,
      {
        expiresIn: "24h",
      }
    );

    res.send({ result: results[0], token });
  }
};

const hashPassword = async (req) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 8);
  }
};

// const userDetails = async (req) => {
//   if (req.body) {
//     req.body.userName = req.currentUser.userName;
//     req.body.email = req.currentUser.email;
//     req.body.password = req.currentUser.password;
//   }
// };

module.exports = {
  createUser,
  updateUser,
  login,
  getCurrentUser,
  getAllUser,
};
