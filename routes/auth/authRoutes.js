const generateToken = require("../../helpers/generateToken");
const validateUser = require("../../helpers/user-validator");
const verify = require("../../auth/verifyCredentials");
const Users = require("../../models/user-model");
const router = require("express").Router();

router.post("/login", verify, async (req, res) => {
	const user = req.user;

	const token = generateToken(user);
	res.status(200).json({ message: `Welcome ${user.username}`, token });
});

router.post("/register", async (req, res) => {
	try {
		validateUser(req.body);
		const user = await Users.createUser(req.body);

		res.status(201).json({ message: "User created", user });
	} catch (errors) {
		res.status(500).json({ message: "User could not be created", errors });
	}
});

module.exports = router;
