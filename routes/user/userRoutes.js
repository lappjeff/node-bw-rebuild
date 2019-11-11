const router = require("express").Router();
const protected = require("../../auth/protectRoute");
const Users = require("../../models/user-model");

const validateUser = require("../../helpers/user-validator");
router.post("/", async (req, res) => {
	try {
		validateUser(req.body);
		const user = await Users.createUser(req.body);

		res.status(201).json({ message: "User created", id: user });
	} catch (errors) {
		res.status(500).json({ message: "User could not be created", errors });
	}
});

module.exports = router;
