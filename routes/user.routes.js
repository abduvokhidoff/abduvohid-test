// routes/user.routes.js
const express = require('express')
const router = express.Router()
const { auth, requireAdmin } = require('../middlewares/auth.middleware')
const ctrl = require('../controllers/user.controller')

// Admin create user explicitly:
router.post('/', auth(), requireAdmin, ctrl.create)

router.get('/', auth(), requireAdmin, ctrl.list)
router.get('/:id', auth(), requireAdmin, ctrl.get)
router.put('/:id', auth(), requireAdmin, ctrl.update)
router.delete('/:id', auth(), requireAdmin, ctrl.remove)

module.exports = router
