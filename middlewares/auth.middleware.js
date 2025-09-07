// middlewares/auth.middleware.js
const jwt = require('jsonwebtoken')

function auth(required = true) {
	return (req, res, next) => {
		const h = req.headers.authorization || ''
		const token = h.startsWith('Bearer ') ? h.slice(7) : null
		if (!token) {
			if (!required) return next()
			return res.status(401).json({ message: 'No token provided' })
		}
		try {
			const payload = jwt.verify(token, process.env.JWT_SECRET)
			req.user = { id: payload.sub, role: payload.role }
			next()
		} catch {
			return res.status(401).json({ message: 'Invalid or expired token' })
		}
	}
}

// simple admin check
function requireAdmin(req, res, next) {
	if (req.user?.role !== 'admin')
		return res.status(403).json({ message: 'Admin only' })
	next()
}

module.exports = { auth, requireAdmin }
