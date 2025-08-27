const Car = require('../models/car.model')

exports.getAll = () => Car.find()

exports.create = data => Car.create(data)

exports.getById = id => Car.findById(id)

exports.update = (id, data) => Car.findByIdAndUpdate(id, data, { new: true })

exports.remove = id => Car.findByIdAndDelete(id)
