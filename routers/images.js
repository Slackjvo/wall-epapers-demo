const express = require('express')
const router = new express.Router()

//Models
const Image = require('../models/image')
const Category = require('../models/category')

function addOptionalRegex(name){
	const replaces = [
		['s ','\'?s ']
	]
	for(r of replaces){
		name = name.replace(r[0],r[1])
	}
	return name 
}


router.get('/images', async (req, res) => {
	try {
		const images = await Image.find().skip(page).limit(36)
		res.send(images)
	} catch (e) {
		res.status(500).send()
	}
})

router.post('/images', async (req, res) => {
	const images = new Image(req.body)
	try {
		await images.save()
		res.status(201).send(images)
	} catch (e) {
		res.status(400).send(e)
	}
})

router.post('/images/filter', async (req, res) => {
	const name = await addOptionalRegex(req.body.name)
	const page = parseInt(req.body.page)*36
	const results = (page === 0 ? await Image.countDocuments({"name": { "$regex": name, "$options": "i" },mobile:req.body.mobile}):0)
	try {
		const images = await Image.find({name: { "$regex": name, "$options": "i" },mobile:req.body.mobile}).skip(page).limit(36)
		res.send({results,images})
	} catch (e) {
		res.status(500).send()
	}
})

router.get('/images/:id', async (req, res) => {
	try {
		const images = await Image.findById(req.params.id)
		await images.populate('category').execPopulate()
		if (!images)	return res.status(404).send()
		res.send(images)
	} catch (e) {
		res.status(500).send()
	}
})

router.post('/images/random', async (req, res) => {
	try {
		const totalImages = await Image.countDocuments({mobile:req.body.mobile})
		const randomStart = Math.floor(Math.random() * (totalImages - 36) + 0)
		const images = await Image.find({mobile:req.body.mobile}).skip((randomStart<0?0:randomStart)).limit(36)
		res.send(images)
	} catch (e) {
		res.status(500).send()
	}
})


router.patch('/images/:id', async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation)	return res.status(400).send({ error: 'Invalid updates!' })

	try {
		const images = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
		if (!images)	return res.status(404).send()
		res.send(images)
	} catch (e) {
		res.status(400).send(e)
	}
})

router.delete('/images/:id', async (req, res) => {
	try {
		const images = await Image.findByIdAndDelete(req.params.id)
		if (!images)	res.status(404).send()
		res.send(images)
	} catch (e) {
		res.status(500).send()
	}
})

module.exports = router