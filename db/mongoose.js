const mongoose = require('mongoose')
mongoose.Promise = global.Promise

async function open(){
	try{
		await mongoose.connect(process.env.MONGODB_LOCAL, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		})
		console.log('DB Connected!')
	}catch(e){
		console.log(`Error when connecting to the DB \n ${e}`)
	}
}

async function close(){
	try{
		await mongoose.disconnect()
		console.log('DB Disconnected!')
	}catch(e){
		console.log(`Error when connecting to the DB \n ${e}`)
	}
}

async function show(){
	console.log(mongoose.connection.readyState)
}

module.exports = {
	open,close,show
}

