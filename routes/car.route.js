const express = require('express')
const router = express.Router()
const carController = require('../controllers/car.controller')
const { validateUser } = require('../middlewares/validation.middleware')

// Routes
router.get('/', carController.getAllCars)
router.post('/', validateUser, carController.createCar)
router.get('/:id', carController.getCarById)
router.put('/:id', validateUser, carController.updateCar)
router.delete('/:id', carController.deleteCar)

module.exports = router
