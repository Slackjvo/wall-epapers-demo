const mongoose = require('mongoose')
const { boolean } = require('yargs')
const Image = mongoose.model('Images', {
	id: {
		type: Number,
		required: true,
		unique: true
	},
	idCategory: {
		type: Number,
		required: true
	},
	idSubCategory: {
		type: Number,
		default: 0
	},
	name: {
		type: String,
		trim: true
	},	
	url: {
		type: String,
		required: true,
		trim: true
   },
   thumb: {
		type: String,
		trim: true
	},
	width: {
		type: Number,
		default: 0
	},
	height: {
		type: Number,
		default: 0
	},
	mobile: {
		type: Boolean,
		default: false
	}
},'images')

module.exports = Image