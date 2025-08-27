// middlewares/error.middleware.js
module.exports = (err, req, res, next) => {
	console.error('💥 Error middleware:', err)
	const status = err.status || 500
	const message = err.message || 'Internal Server Error'
	const body = { message }
	if (process.env.NODE_ENV !== 'production' && err.stack) body.stack = err.stack
	res.status(status).json(body)
}
