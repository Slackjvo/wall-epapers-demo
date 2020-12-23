const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities()

async function getItemsModel(array,callback,filters,model = ''){
	const promises = []
	for (let i=0; i < array.length; i++) {
		const filterDict = {}
		for(const filter of filters){
			filterDict[filter] = array[i][filter]
		}
		const result = (model ? await callback(array[i],model,filterDict) : await callback(array[i],filterDict))
		await (result !== '' ? promises.push(result) : '')
	}
	return promises
}

async function insertIfNotExists(item,model,filterDict){
	const oldItem = (Object.entries(filterDict).length > 0 ? await model.findOne(filterDict) : '')
	if(!oldItem){
		return await new model(item)
	}else return ''
}

module.exports = {
	getItemsModel,insertIfNotExists
}