const router = require("express").Router();
const Users = require("../../models/user-model");

const validateUser = require("../../helpers/user-validator");

const restricted = require("../../auth/restrictEndpoint");

router.get("/testtoken", restricted, (req, res) => {
	res.status(200).json({ message: `Welcome ${req.username}` });
});
module.exports = router;
