const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
const { validateUser } = require('../middlewares/validation.middleware')

// Routes
router.get('/', authUser, productController.getAllProducts)
router.post('/', authUser, validateUser, productController.createProduct)
router.get('/:id', authUser, productController.getProductById)
router.put('/:id', authUser, validateUser, productController.updateProduct)
router.delete('/:id', authUser, productController.deleteProduct)

module.exports = router
