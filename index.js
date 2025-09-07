// index.js
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const connectDB = require('./config/database')
const errorHandler = require('./middlewares/error.middleware')

dotenv.config()

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))

app.get('/health', (req, res) => res.json({ ok: true }))

// routes
app.use('/auth', require('./routes/auth.routes'))
app.use('/cars', require('./routes/car.routes'))
app.use('/users', require('./routes/user.routes')) // includes create user (admin) + CRUD

app.use(errorHandler)

const PORT = process.env.PORT || 5000

connectDB(process.env.MONGO_URI)
	.then(() => {
		app.listen(PORT, () => console.log(`🚀 Listening on :${PORT}`))
	})
	.catch(err => {
		console.error('❌ DB connect failed', err)
		process.exit(1)
	})
