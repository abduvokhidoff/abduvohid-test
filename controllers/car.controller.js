const carService = require('../services/car.service')

exports.getAllCars = async (req, res, next) => {
	try {
		const cars = await carService.getAll()
		res.json(cars)
	} catch (err) {
		next(err)
	}
}

exports.createCar = async (req, res, next) => {
	try {
		const car = await carService.create(req.body)
		res.status(201).json(car)
	} catch (err) {
		next(err)
	}
}

exports.getCarById = async (req, res, next) => {
	try {
		const car = await carService.getById(req.params.id)
		if (!car) return res.status(404).json({ message: 'Car not found' })
		res.json(car)
	} catch (err) {
		next(err)
	}
}

exports.updateCar = async (req, res, next) => {
	try {
		const updated = await carService.update(req.params.id, req.body)
		res.json(updated)
	} catch (err) {
		next(err)
	}
}

exports.deleteCar = async (req, res, next) => {
	try {
		await carService.remove(req.params.id)
		res.json({ message: 'Car deleted' })
	} catch (err) {
		next(err)
	}
}
