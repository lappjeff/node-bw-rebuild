const jwt = require("jsonwebtoken");

const restrictEndpoint = (req, res, next) => {
	const token = req.headers.authorization;

	console.log("-----------------------------", process.env.TOKEN_SECRET);
	if (token) {
		jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
			if (err) {
				console.log(err);

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
