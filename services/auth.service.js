// services/auth.service.js
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

exports.login = async ({ email, password }) => {
	const user = await User.findOne({ email }).select('+password')
	if (!user) throw new Error('User not found')

	const isMatch = await bcrypt.compare(password, user.password)
	if (!isMatch) throw new Error('Invalid credentials')

	const token = jwt.sign(
		{ id: user._id, email: user.email },
		process.env.JWT_SECRET,
		{ expiresIn: '1h' }
	)

	return { user, token }
}
