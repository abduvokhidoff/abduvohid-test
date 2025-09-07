const express = require('express')
const router = express.Router()
const carController = require('../controllers/car.controller')
const { validateUser } = require('../middlewares/validation.middleware')
const authUser = require('../middlewares/auth.middleware') // export directly, not destructure

// Routes
router.get('/', authUser, carController.getAllCars) // protected
router.post('/', authUser, validateUser, carController.createCar) // protected
router.get('/:id', authUser, carController.getCarById) // protected
router.put('/:id', authUser, validateUser, carController.updateCar) // protected
router.delete('/:id', authUser, carController.deleteCar) // protected

module.exports = router
