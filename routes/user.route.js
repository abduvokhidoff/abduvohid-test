const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const { validateUser } = require('../middlewares/validation.middleware')

// Routes
router.get('/', authUser, userController.getAllUsers)
router.post('/', authUser, validateUser, userController.createUser)
router.get('/:id', authUser, userController.getUserById)
router.put('/:id', authUser, validateUser, userController.updateUser)
router.delete('/:id', authUser, userController.deleteUser)

module.exports = router
