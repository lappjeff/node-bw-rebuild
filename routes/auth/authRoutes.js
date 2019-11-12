const validateUser = require("../../helpers/user-validator");
const protected = require("../../auth/protectRoute");
const Users = require("../../models/user-model");
const generateToken = require("../../helpers/generateToken");
const router = require("express").Router();

router.post("/login", protected, async (req, res) => {
	const { username, password } = req.body;

	const user = await Users.findByUsername(username);

	if (user) {
		const token = generateToken(user);
		res.status(200).json({ message: `Welcome ${username}`, token });
	} else {
		res.status(401).json({ message: "Invalid credentials" });
	}
});

router.post("/register", (req, res) => {});

module.exports = router;
