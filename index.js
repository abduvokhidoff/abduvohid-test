const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoutes = require('./routes/user.route')
const productRoutes = require('./routes/product.route')
const carRoutes = require('./routes/car.route')
const errorHandler = require('./middlewares/error.middleware')
const app = express()

dotenv.config()

app.use(express.json())

const cors = require('cors');

app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes)
app.use('/api/cars', carRoutes)

app.use(errorHandler);

const PORT = process.env.PORT 

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('MongoDB connected')
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
	})
	.catch(err => {
		console.error('MongoDB connection error:', err.message)
		process.exit(1)
	})
