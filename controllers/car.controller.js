const Car = require('../models/car.model')

exports.create = async (req, res, next) => {
	try {
		const car = await Car.create({ ...req.body, createdBy: req.user.id })
		res.status(201).json(car)
	} catch (err) {
		next(err)
	}
}

exports.list = async (_req, res, next) => {
	try {
		const cars = await Car.find().populate('createdBy', 'name email')
		res.json(cars)
	} catch (err) {
		next(err)
	}
}

exports.get = async (req, res, next) => {
	try {
		const car = await Car.findById(req.params.id)
		if (!car) return res.status(404).json({ message: 'Not found' })
		res.json(car)
	} catch (err) {
		next(err)
	}
}

exports.update = async (req, res, next) => {
	try {
		const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
		if (!car) return res.status(404).json({ message: 'Not found' })
		res.json(car)
	} catch (err) {
		next(err)
	}
}

exports.remove = async (req, res, next) => {
	try {
		const car = await Car.findByIdAndDelete(req.params.id)
		if (!car) return res.status(404).json({ message: 'Not found' })
		res.json({ ok: true })
	} catch (err) {
		next(err)
	}
}
