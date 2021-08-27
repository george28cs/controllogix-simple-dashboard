const express = require('express')
const router = express.Router()
const db = require('../services/database')
const { getDataTypes, createTag, getTags, getLastValue, deleteTag } = require('../services/routeServices/tags')

router.get('/', async (req, res) => {
	try {
		const tags = await getTags()
  res.render('pages/index', { 
		tags : tags,
	});
	} catch (error) {
		console.error(error)
		res.status(400).send({error})
	}
});

router.get('/add', async (req, res) => {
	try {
		const { error } = req.body

		res.render('pages/add', 
		{ action: '/tags/add', 
			data: await getDataTypes(),
			error: error ? true: false
		})
	} catch (error) {
		res.status(400).send({error})
	}
})

router.post('/add', async (req, res) => {
	try {

		const data = {
			name: req.body.name,
			program: req.body.program,
			type_id: Number(req.body.type_id)
		}
		
		data.scope = data.program ? data.program : req.body.scope
		if (req.body.program === '') delete data.program

		const newTag = {
			name: data.name,
			scope: data.scope,
			type_id: data.type_id
		}

		const schema = require('../utils/schemas/tags').create
		await schema.validateAsync(data)
		await createTag(newTag)
		
		res.redirect('/tags')
	} catch (error) {
		console.error(error.message)
		res.status(400).render('pages/add', 
		{ action: '/tags/add', 
			data: await getDataTypes(),
			error: true
		}
		)
	}
})

router.get('/values', async (req, res) => {
	try {
		const tagValues = await getLastValue()
		res.render('pages/values', {
			tags: tagValues
		})
	} catch (error) {
		console.error(error)
		res.status(400).send({error})
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params
		await deleteTag(Number(id))
		res.send({ success: true })
	} catch (error) {
		console.error(error)
		res.status(400).send({error})
	}
})

module.exports = router