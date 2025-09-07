const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

// routes
const userRoutes = require('./routes/user.route')
const productRoutes = require('./routes/product.route')
const carRoutes = require('./routes/car.route')
const authRoutes = require('./routes/auth.routes') // 👈 add this
const errorHandler = require('./middlewares/error.middleware')

const app = express()
app.use(cors())
app.use(express.json())

// mount routes
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cars', carRoutes)
app.use('/api/auth', authRoutes) // 👈 add this

// health check
app.get('/healthz', (req, res) => res.json({ ok: true }))

// error handler
app.use(errorHandler)

const PORT = process.env.PORT || 3000
const MONGO_URI =
	process.env.MONGO_URI ||
	'mongodb+srv://Abduvohid:xoshimov_2010@cluster0.tmelrtu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

if (!MONGO_URI) {
	console.error('❌ Missing MONGO_URI environment variable')
	process.exit(1)
}

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log('✅ MongoDB connected')
		app.listen(PORT, () => console.log(`🚀 Server on ${PORT}`))
	})
	.catch(err => {
		console.error('❌ MongoDB connection error:', err.message)
		process.exit(1)
	})
