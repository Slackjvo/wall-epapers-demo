const mongoose = require('mongoose')
const imageSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
	name: {
		type: String,
		trim: true
	},	
	url: {
		type: String,
		required: true,
		unique: true,
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
},{timestamps: true})

const Image = mongoose.model('Image', imageSchema,'images')

module.exports = Image