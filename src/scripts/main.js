require('dotenv').config()
const yargs = require('yargs')
const {getCategoriesAlphaCoders,deleteCategories} = require('./getCategories')
const {getImagesAlphaCoders,deleteAllImages,testImage} = require('./getImages')

yargs.command({
	command: 'addCategories',
	describe: 'fetch and insert all categories and subcategories from wall.alphacoders',
	builder: {
	},
	handler() {
		getCategoriesAlphaCoders('category_list','categories')
	}
})

yargs.command({
	command: 'deleteCategories',
	describe: 'delete all categories from DB',
	builder: {
	},
	handler() {
		deleteCategories()
	}
})

yargs.command({
	command: 'getImages',
	describe: 'get all images of every category and sub category',
	builder: {
		mobile:{
			describe: "option for mobile wallpapers or not",
			type: 'boolean',
			default: false
		}
	},
	handler(argv) {
		getImagesAlphaCoders(argv.mobile)
	}
})

yargs.command({
	command: 'deleteAllImages',
	describe: 'delete all images from DB',
	builder: {
	},
	handler() {
		deleteAllImages()
	}
})

yargs.command({
	command: 'testImage',
	describe: 'delete all categories from DB',
	builder: {
	},
	handler() {
		testImage()
	}
})

yargs.parse()