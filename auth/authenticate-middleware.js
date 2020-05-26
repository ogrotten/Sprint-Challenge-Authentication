const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "do you liike jokes?";

function clg(...x) { console.log(...x) }

module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	// clg(authorization)

	if (authorization) {
		const secret = process.env.JWT_SECRET || "do you liike jokes?";

		jwt.verify(authorization, secret, function (err, decodedToken) {
			if (err) {
				res.status(401).json({ message: "Invalid Token" });
			} else {
				req.token = decodedToken;

				next();
			}
		});
	} else {
		res.status(400).json({ message: "Please login and try again" });
	}
};
