const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // installed this

const secret = process.env.JWT_SECRET || "do you liike jokes?";

const Users = require("../users/users-model.js");

function clg(...x) { console.log(...x) }

router.post('/register', (req, res) => {
	// implement registration

	let user = req.body;
	// clg("13", user);
	
	if (isEmpty(user)) {
		// clg("16", user.username);
		res.status(400).json({ msg: "Must have username and password. Together." })
		res.end();
	} else {

		const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
		user.password = hash;

		Users.add(user)
			.then(saved => {
				res.status(201).json(saved);
			})
			.catch(error => {
				res.status(500).json(error);
			});
	}
});

router.post('/login', (req, res) => {
	// implement login

	let { username, password } = req.body;
	Users.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				// sign token
				const token = signToken(user); // new line

				// send the token
				res.status(200).json({
					token, // added token as part of the response sent
					message: `Welcome ${user.username}!`,
				});
			} else {
				res.status(401).json({ message: "Invalid Credentials" });
			}
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

function signToken(user) {
	const payload = {
		username: user.username,
	};


	const options = {
		expiresIn: "10h",
	};

	return jwt.sign(payload, secret, options); // notice the return
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

module.exports = router;
