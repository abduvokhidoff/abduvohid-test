// controllers/auth.controller.js
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

function sign(user) {
	return jwt.sign(
		{ sub: user._id.toString(), role: user.role },
		process.env.JWT_SECRET,
		{ expiresIn: '7d' }
	)
}

exports.register = async (req, res, next) => {
	try {
		const { name, email, password, role } = req.body
		const exists = await User.findOne({ email })
		if (exists) return res.status(409).json({ message: 'Email already in use' })
		const user = await User.create({ name, email, password, role })
		const token = sign(user)
		res.status(201).json({ user, token })
	} catch (err) {
		next(err)
	}
}

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })
		if (!user) return res.status(401).json({ message: 'Invalid credentials' })
		const ok = await user.comparePassword(password)
		if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
		const token = sign(user)
		res.json({ user, token })
	} catch (err) {
		next(err)
	}
}


