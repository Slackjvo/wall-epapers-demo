const {axios,userAgent} = require('../utils')
const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities()
const wait = require('waait')
//DB
const mongoose = require('../../db/mongoose')
const {getItemsModel,insertIfNotExists} = require('../../db/mongooseFunctions')
//Models
const Image = require('../../models/image')
const Category = require('../../models/category')

async function getImagesAlphaCoders(mobile){
	await mongoose.open()
	const categories = await Category.find({'scrappedOnceDesktop': false,type: "category"})
	for([numCategory,category] of categories.entries()){
		console.log(`${numCategory} from ${categories.length} Categories`)
		if(mobile){
			//TODO
		}else{
			let resCount,dataCount
			try{
				resCount = await axios.get(`https://wall.alphacoders.com/api2.0/get.php?auth=${process.env.API_KEY}&method=category_count&id=${category.id.toString()}`,{ headers: { 'User-Agent': userAgent }})
				dataCount = resCount.data
			}catch{
				return
			}
			if(dataCount.success){
				//Each Requests gives 30 wallpapers so.. but alphacoders only gives us the first 500 pages due to his own limitation...
				const lastPage = Math.ceil(parseInt(dataCount.count)/30)
				for(page=1;page<=(lastPage>=500?500:lastPage);page++){
					let resImages,dataImages
					try{
						resImages = await axios.get(`https://wall.alphacoders.com/api2.0/get.php?auth=${process.env.API_KEY}&method=category&id=${category.id.toString()}&page=${page.toString()}&&info_level=3`,{ headers: { 'User-Agent': userAgent }})
						dataImages = resImages.data
					}catch{
						return
					}
					if (dataImages.success){
						let images = []
						for(image of dataImages.wallpapers){
							//Request to get the name of image without using api to use less requests due to the month limitation
							let nameImage = ''
							try{
								const resImageUrl = await axios.get(image.url_page,{ headers: { 'User-Agent': userAgent }})
								//await wait(1000)
								const dataImageUrl = resImageUrl.data
								const imageNameMatch = /<title>(.*?)(?:HD )?Wallpaper[\s\S]*?<\/title>(?:[\s\S]*?<h1 class="center title wallpaper-name">([\s\S]*?)<\/h1>)?/gmi.exec(dataImageUrl)
								try {
									if(imageNameMatch){
										nameImage = (imageNameMatch[2] ? imageNameMatch[2].replace(/by .*$/gmi,''): imageNameMatch[1])
									}
								} catch (e) {
									console.log(e)
									console.log(image.url_page)
									throw new Error('asdsad')
								}
							}catch(e){
								console.log(e)
							}
							images.push({
								"id":parseInt(image.id),
								"category":category._id,
								"name":entities.decode(nameImage),
								"url":image.url_image,
								"thumb":image.url_thumb,
								"width":parseInt(image.width),
								"height":parseInt(image.height),
								"mobile":false
							})
						}
						
						if(images.length > 0){
							const promisesSave = await getItemsModel(images,insertIfNotExists,['id',"mobile"],Image)
							if(promisesSave.length > 0)	await Promise.all(promisesSave.map(model => model.save()))
							console.log(`${promisesSave.length} Images Inserted from Category id ${category.id}, Page ${page} of ${lastPage}`)
						}
					}
				}
			}
			await Category.findByIdAndUpdate(category._id, {'scrappedOnceDesktop': true})
		}
	}
	console.log('FINISHED')
	await mongoose.close()
}

async function deleteAllImages(){
	await mongoose.open()
	await Image.deleteMany().then()
	console.log('Data deleted')
	await mongoose.close()
}

module.exports = {
	getImagesAlphaCoders,deleteAllImages
}