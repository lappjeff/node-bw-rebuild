const jwt = require("jsonwebtoken");

const generateToken = user => {
	const payload = {
		username: user.username,
		subject: user.user_id
	};

	const secret = process.env.TOKEN_SECRET || "development";

	const options = {
		expiresIn: "1h"
	};

	return jwt.sign(payload, secret, options);
};
