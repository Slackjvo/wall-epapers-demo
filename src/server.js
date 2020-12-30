const express = require('express')
const {open} = require('../db/mongoose')
const axios = require('axios')
const Image = require('../models/image')

open()
const port = process.env.PORT

// express app
const app = express()

//Api
const imagesRouter = require('../routers/images')

// listen for requests
app.listen(port, () => {
	console.log(`Server listening for port ${port}`)
})

// register view engine
app.set('view engine', 'ejs')

// middleware & static files
app.use(express.static('public'))

app.use((req, res, next) => {
	console.log('new request made:')
	console.log('host: ', req.hostname)
	console.log('path: ', req.path)
	console.log('method: ', req.method)
	next()
})


app.get(/^\/(?:desktop)?\/?$/, (req, res) => {
	const file = 'index'
	res.render(file, { title: 'Search Images Desktop', 'device': 'desktop', file:file})
})

app.get(/^\/mobile\/?$/, (req, res) => {
	const file = 'index'
	res.render(file, { title: 'Search Images Mobile', 'device': 'mobile', file:file})
})

app.get(/^\/random\/?(?:desktop)?$/, async (req, res) => {
	const file = 'random'
	res.render(file, { title: 'Random Images Desktop', 'device': 'desktop', file:file})
})

app.get(/^\/random\/mobile\/?$/, async (req, res) => {
	const file = 'random'
	res.render(file, { title: 'Random Images Desktop', 'device': 'mobile', file:file})
})

app.use(express.json())
app.use('/api', imagesRouter)


// 404 page
app.use((req, res) => {
	res.status(404).render('404', { title: '404' })
})