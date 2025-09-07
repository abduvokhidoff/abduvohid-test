const mongoose = require('mongoose')

const carSchema = new mongoose.Schema(
	{
		make: { type: String, required: true }, // e.g. Toyota
		model: { type: String, required: true }, // e.g. Corolla
		year: { type: Number, required: true },
		price: { type: Number, required: true },
		mileage: { type: Number, default: 0 },
		description: String,
		images: [String], // array of image URLs
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Car', carSchema)
