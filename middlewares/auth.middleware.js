// middlewares/auth.middleware.js
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	const authHeader = req.headers.authorization

	if (!authHeader) {
		return res.status(401).json({ message: 'Unauthorized: No token provided' })
	}

	const token = authHeader.split(' ')[1] // "Bearer <token>"

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		req.user = decoded // attach decoded user { id, email, ... }
		next()
	} catch (err) {
		return res.status(401).json({ message: 'Unauthorized: Invalid token' })
	}
}
