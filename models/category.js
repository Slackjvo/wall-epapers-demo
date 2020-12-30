const mongoose = require('mongoose')
const CategorySchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		unique: true
	},
	type: {
		type: String,
		required: true,
		trim: true
	},
	idCategory: {
		type: Number,
		required: true,
		default: 0
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	desktopUrl: {
		type: String,
		required: true,
		trim: true
	},
   	mobileUrl: {
		type: String,
		required: true,
		trim: true
	},
	numImagesDesktop: {
		type: Number,
		required: true,
		default: 0
	},
	numImagesMobile: {
		type: Number,
		required: true,
		default: 0
	},
	scrappedOnceDesktop: {
		type: Boolean,
		default: false
	},
	scrappedOnceMobile: {
		type: Boolean,
		default: false
	}
}, {timestamps: true})

const Category = mongoose.model('Category', CategorySchema,'categories')
module.exports = Category