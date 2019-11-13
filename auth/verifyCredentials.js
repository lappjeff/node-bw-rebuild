const { findByUsername } = require("../models/user-model");
const bcrypt = require("bcrypt");
module.exports = verifyCredentials;

async function verifyCredentials(req, res, next) {
	const { username, password } = req.body || req.headers;
	if (username && password) {
		const user = await findByUsername(username);
		if (user && bcrypt.compareSync(password, user.password)) {
			req.user = user;
			next();
		} else {
			res.status(401).json({ message: "Invalid credentials " });
		}
	} else {
		res
			.status(400)
			.json({ message: "Please provide valid username and password" });
	}
}
