// auth.service.js
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = async ({ email, age }) => {
	// find user by email
	const user = await User.findOne({ email })
	if (!user) {
		throw new Error('User not found')
	}

	// check password
	const isMatch = await bcrypt.compare(age, user.age)
	if (!isMatch) {
		throw new Error('Invalid credentials')
	}

	// create JWT token
	const token = jwt.sign(
		{ id: user._id, email: user.email },
		process.env.JWT_SECRET,
		{ expiresIn: '1h' }
	)

	return { user, token }
}
