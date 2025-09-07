// models/user.model.js
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
	{
		name: { type: String, trim: true, required: true },
		email: {
			type: String,
			trim: true,
			lowercase: true,
			unique: true,
			required: true,
		},
		password: { type: String, minlength: 6, required: true },
		role: { type: String, enum: ['user', 'admin'], default: 'user' },
	},
	{ timestamps: true }
)

userSchema.index({ email: 1 }, { unique: true })

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next()
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
	next()
})

userSchema.methods.comparePassword = function (candidate) {
	return bcrypt.compare(candidate, this.password)
}

userSchema.methods.toJSON = function () {
	const obj = this.toObject()
	delete obj.password
	return obj
}

module.exports = mongoose.model('User', userSchema)
