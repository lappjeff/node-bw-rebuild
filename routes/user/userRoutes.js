const router = require("express").Router();
const Users = require("../../models/user-model");
const verify = require("../../auth/verifyCredentials");

router.use(verify);

router.delete("/delete", async (req, res) => {
	try {
		Users.deleteUser(req.user.user_id);
		res.status(204).end();
	} catch (err) {
		res.status(500).json({ message: "User could not be deleted", error: err });
	}
});

router.put("/update", async (req, res) => {
	try {
		const updates = req.body;
		Users.updateUser(req.user.user_id, updates);
		res
			.status(200)
			.json({ message: `User ${req.user.user_id} successfully updated` });
	} catch (err) {
		res.status(500).json({ message: "User could not be updated", error: err });
	}
});
module.exports = router;
