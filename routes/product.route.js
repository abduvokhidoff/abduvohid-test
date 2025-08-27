const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
const { validateUser } = require('../middlewares/validation.middleware')

// Routes
router.get('/', productController.getAllProducts)
router.post('/', validateUser, productController.createProduct)
router.get('/:id', productController.getProductById)
router.put('/:id', validateUser, productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router
