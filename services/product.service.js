const Product = require('../models/product.model')

exports.getAll = () => Product.find()

exports.create = data => Product.create(data)

exports.getById = id => Product.findById(id)

exports.update = (id, data) => Product.findByIdAndUpdate(id, data, { new: true })

exports.remove = id => Product.findByIdAndDelete(id)
