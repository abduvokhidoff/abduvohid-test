const express = require('express')
const router = express.Router()
const { auth } = require('../middlewares/auth.middleware')
const ctrl = require('../controllers/car.controller')

// Anyone logged in can list cars
router.get('/', auth(), ctrl.list)
router.get('/:id', auth(), ctrl.get)

// Only logged-in users can create/update/delete
router.post('/', auth(), ctrl.create)
router.put('/:id', auth(), ctrl.update)
router.delete('/:id', auth(), ctrl.remove)

module.exports = router
