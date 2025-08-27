const productService = require('../services/product.service')

exports.getAllProducts = async (req, res, next) => {
	try {
		const products = await productService.getAll()
		res.json(products)
	} catch (err) {
		next(err)
	}
}

exports.createProduct = async (req, res, next) => {
	try {
		const product = await productService.create(req.body)
		res.status(201).json(product)
	} catch (err) {
		next(err)
	}
}

exports.getProductById = async (req, res, next) => {
	try {
		const product = await productService.getById(req.params.id)
		if (!product) return res.status(404).json({ message: 'Product not found' })
		res.json(product)
	} catch (err) {
		next(err)
	}
}

exports.updateProduct = async (req, res, next) => {
	try {
		const updated = await productService.update(req.params.id, req.body)
		res.json(updated)
	} catch (err) {
		next(err)
	}
}

exports.deleteProduct = async (req, res, next) => {
	try {
		await productService.remove(req.params.id)
		res.json({ message: 'Product deleted' })
	} catch (err) {
		next(err)
	}
}
