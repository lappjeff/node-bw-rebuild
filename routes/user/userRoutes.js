const router = require("express").Router();
const protected = require("../../auth/protectRoute");
const Users = require("../../models/user-model");

const validateUser = require("../../helpers/user-validator");

module.exports = router;
