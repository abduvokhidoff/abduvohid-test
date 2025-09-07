// controllers/user.controller.js
const User = require('../models/user.model')

exports.create = async (req, res, next) => {
	try {
		// Admin creates users: password hashed by pre-save hook
		const { name, email, password, role } = req.body
		if (!name || !email || !password)
			return res.status(400).json({ message: 'name, email, password required' })
		const exists = await User.findOne({ email })
		if (exists) return res.status(409).json({ message: 'Email already in use' })
		const user = await User.create({ name, email, password, role })
		res.status(201).json(user)
	} catch (err) {
		next(err)
	}
}

exports.list = async (_req, res, next) => {
	try {
		const users = await User.find().sort({ createdAt: -1 })
		res.json(users)
	} catch (err) {
		next(err)
	}
}

exports.get = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id)
		if (!user) return res.status(404).json({ message: 'Not found' })
		res.json(user)
	} catch (err) {
		next(err)
	}
}

exports.update = async (req, res, next) => {
	try {
		const { name, email, role, password } = req.body
		const user = await User.findById(req.params.id)
		if (!user) return res.status(404).json({ message: 'Not found' })

		if (name !== undefined) user.name = name
		if (email !== undefined) user.email = email
		if (role !== undefined) user.role = role
		if (password) user.password = password // will re-hash via pre-save

		await user.save()
		res.json(user)
	} catch (err) {
		next(err)
	}
}

exports.remove = async (req, res, next) => {
	try {
		const deleted = await User.findByIdAndDelete(req.params.id)
		if (!deleted) return res.status(404).json({ message: 'Not found' })
		res.json({ ok: true })
	} catch (err) {
		next(err)
	}
}
