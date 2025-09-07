const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const { validateUser } = require('../middlewares/validation.middleware')

// Routes
router.post('/login', validateUser, authController.checkUser)

module.exports = router
