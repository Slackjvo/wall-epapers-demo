const wait = require('waait')
const {axios,userAgent} = require('../utils')
const {getItemsModel,insertIfNotExists} = require('../../db/mongooseFunctions')
const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities()

//DB
const mongoose = require ('../../db/mongoose')
//Models
const Category = require('../../models/category')

/*async function getNumImagesMobile(url){
	await wait(1000)
	let numImagesMobile = 0
	try{
		const res = await axios.get(url)
		const data = res.data
		if(res.request._redirectable._redirectCount === 0){
			const regex = /<title>\s*([0-9]+)/gmi
				numImagesMobile = regex.exec(data)[1]
		}
	}catch(e){
		console.log(e)
	}
	return numImagesMobile
}*/

function getCategoriesAlphaCoders(method,option){
	const startTime = Date.now()
	try{
		axios.get(`https://wall.alphacoders.com/api2.0/get.php?auth=${process.env.API_KEY}&info_level=3&method=${method}`,{ headers: { 'User-Agent': userAgent }})
		.then(async(res) => {
			const data = res.data
			if (data.success){
				const categories = []
				for(item of data[option]){
					const mobileUrl = `https://mobile.alphacoders.com/by-category/${item['id']}`
					categories.push({
						'id':parseInt(item['id']),
						'type':'category',
						'name':entities.decode(item['name']),
						'desktopUrl':item['url'],
						'mobileUrl':mobileUrl,
						'numImagesDesktop':item['count'],
						'numImagesMobile': 0
					})
				}
				console.log('Categories Fetched')

				//Fetch sub Categories
				method = "sub_category_list"
				option = "sub-categories"
				for(category of categories.slice()){
					try{
						const res = await axios.get(`https://wall.alphacoders.com/api2.0/get.php?auth=${process.env.API_KEY}&info_level=3&method=${method}&id=${category['id'].toString()}`,{ headers: { 'User-Agent': userAgent }})
						const dataSub = res.data
						if (dataSub.success){
							for(item of dataSub[option]){
								const mobileUrl = `https://mobile.alphacoders.com/by-sub-category/${item['id']}`
								categories.push({
									'id':parseInt(item['id']),
									'type':'subCategory',
									'idCategory':category['id'],
									'name':item['name'],
									'desktopUrl':item['url'],
									'mobileUrl':mobileUrl,
									'numImagesDesktop':item['count'],
									'numImagesMobile': 0
								})
							}
						}
					}catch(e){
						console.log(e)
					}
				}

				console.log('Sub Categories Fetched')
				//Insert categories into DB
				await mongoose.open()
				if(categories.length > 0){
					const categoriesPromises = await getItemsModel(categories,insertIfNotExists,['id'],Category)
					if(categoriesPromises.length > 0)	await Promise.all(categoriesPromises.map(model => model.save()))
					console.log(`${categoriesPromises.length} new Categories Inserted`)
				}

				await mongoose.close()
				console.log('FINISHED')
				console.log(`${(Date.now()-startTime)/1000} seconds`)
			}
		}).catch(err => console.log(err))
	}catch (e){
		console.log(`Error ${e}`)
	}
}

async function deleteCategories(){
	await mongoose.open()
	await Category.deleteMany().then()
	console.log('Data deleted')
	await mongoose.close()
}

async function test(){
	await wait(3000)
	console.log('haha')
}

module.exports = {
	getCategoriesAlphaCoders,deleteCategories,test
}