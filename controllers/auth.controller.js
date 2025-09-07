// auth.controller.js
const authService = require('../services/auth.service')

exports.login = async (req, res) => {
	try {
		const { email, age } = req.body
		const { user, token } = await authService.login({ email, age })

		res.json({
			message: 'Login successful',
			user: { id: user._id, email: user.email },
			token,
		})
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}
