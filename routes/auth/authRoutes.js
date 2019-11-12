const validateUser = require("../../helpers/user-validator");
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

router.post("/register", async (req, res) => {
	try {
		validateUser(req.body);
		const user = await Users.createUser(req.body);

		res.status(201).json({ message: "User created", id: user });
	} catch (errors) {
		res.status(500).json({ message: "User could not be created", errors });
	}
});

module.exports = router;
