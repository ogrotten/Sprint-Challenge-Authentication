const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // installed this

const Users = require("../users/users-model.js");

function clg(...x) {console.log(...x)}

router.post('/register', (req, res) => {
	let user = req.body;
	clg("11", user);
	const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
	user.password = hash;

	Users.add(user)
		.then(saved => {
			res.status(201).json(saved);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

router.post('/login', (req, res) => {
	// implement login
});

module.exports = router;
