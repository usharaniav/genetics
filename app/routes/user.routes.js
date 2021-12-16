const express = require('express');
const user = require("../controllers/user.controller.js");
const validation = require('../middlewares/validators/userValidator.js');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();


router.route("/createUser").post(validation.createUser, (req, res) => {
  user.createUser(req, res);
});

router.route("/updateUser").put( validation.updateUser, (req, res) => {
  user.updateUser(req, res);
});

router.route("/getCurrentUser").get( (req, res) => {
  user.getCurrentUser(req, res);
});

router.route("/getAllUser").get( (req, res) => {
  user.getAllUser(req, res);
});

router.route("/login").post((req, res) => {
  user.login(req, res);
});

module.exports = router
