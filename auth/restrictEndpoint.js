const jwt = require("jsonwebtoken");

const restrictEndpoint = (req, res, next) => {
	const token = req.headers.authorization;

	if (token) {
		jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
			if (err) {
				res.status(401).json({ message: "Invalid token", error: err });
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
