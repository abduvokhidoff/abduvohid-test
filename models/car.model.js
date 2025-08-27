const mongoose = require('mongoose')

const carSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		color: { type: String, required: true },
		type: { type: String, required: true, unique: true },
		price: { type: Number },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Car', carSchema)
