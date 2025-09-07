exports.validateUser = (req, res, next) => {
	const { name, email } = req.body

	if ( !email) {
		return res.status(400).json({ message: 'Name and email are required' })
	}

	next()
}
