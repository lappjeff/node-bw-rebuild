const router = require("express").Router();

const Users = require("../models/user-model");

router.post("/", async (req, res) => {
	try {
		// add user to DB
		const user = await Users.createUser(req.body);

		res.status(201).json({ message: "User created", user });
	} catch (error) {
		// handle errors
		res.status(500).json({ message: "User could not be created", error });
	}
});

module.exports = router;