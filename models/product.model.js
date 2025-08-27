const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true, unique: true },
    img: { type: String },
		price: { type: Number },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)
