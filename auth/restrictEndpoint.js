const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

const restrictEndpoint = (req, res, next) => {
	const token = req.headers.authorization;

	if (token) {
		jwt.verify(token, env.TOKEN_SECRET, (err, decodedToken) => {
			if (err) {
				res.status(401).json({ message: "Invalid token" });
			} else {
				req.username = decodedToken.username;
				next();
			}
		});
	} else {
		res.status(400).json({ message: "No token provided" });
	}
};

module.exports = restrictEndpoint;
