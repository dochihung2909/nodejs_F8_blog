const express = require('express')
const router = express.Router()

const courseController = require('../app/controllers/CourseControllers')

// [GET] /courses/creates
router.get('/create', courseController.create)
router.post('/store', courseController.store)
router.get('/:id/edit', courseController.edit)
router.put('/:id', courseController.update)
// [GET] /courses/:slug
router.get('/:slug', courseController.show)

module.exports = router
