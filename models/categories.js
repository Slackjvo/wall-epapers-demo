const mongoose = require('mongoose')
const Category = mongoose.model('Categories', new mongoose.Schema({
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
}),'categories')

module.exports = Category