const router = require("express").Router();
const Users = require("../../models/user-model");
const verify = require("../../auth/verifyCredentials");

router.delete("/delete", verify, async (req, res) => {
	try {
		Users.deleteUser(req.user.user_id);
		res.status(200);
	} catch (err) {
		res.status(500).json({ message: "User could not be deleted", error: err });
	}
});

router.put("/update", verify, async (req, res) => {});
module.exports = router;
