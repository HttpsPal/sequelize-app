const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");
require("dotenv").config();

router.post("/", async (req, res) => {
	try {
		const { username, password } = req.body;
		const salt = await bcrypt.genSalt(10);
		const bcryptPassword = await bcrypt.hash(password, salt);
		const [user, created] = await Users.findOrCreate({
			where: { username: username },
			defaults: {
				password: bcryptPassword,
			},
		});
		if (created) {
			res.json({
				status: 200,
				message: "SUCCESS",
				user: { id: user.id, username: user.username },
			});
		} else {
			return res.json({ status: 400, message: "User already exists" });
		}
	} catch (error) {
		console.error(error);
		return res.json({
			message: "ERROR User was not created or server error",
			status: 500,
		});
	}
});

router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await Users.findOne({ where: { username: username } });
		if (user === null) {
			return res.json({ status: 401, message: "invalid credentials" });
		}
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.json({ status: 401, message: "invalid credentials" });
		}
		const accessToken = jwt.sign(
			{
				username: user.username,
				id: user.id,
			},
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRE }
		);
		return res.json({
			status: 200,
			token: accessToken,
			message: "Login Successfully",
		});
	} catch (error) {
		console.error(error);
		return res.json({
			message: "Couldnt Log In!!!!",
			status: 500,
		});
	}
});

module.exports = router;
