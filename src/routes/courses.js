const express = require('express')
const router = express.Router()

const courseController = require('../app/controllers/CourseControllers')
const { route } = require('./news')

// [GET] /courses/creates
router.get('/create', courseController.create)
router.post('/store', courseController.store)
router.post('/handle-form-actions', courseController.handleFormActions)
router.get('/:id/edit', courseController.edit)
router.patch('/:id/restore', courseController.restore)
router.delete('/:id/force', courseController.forceDestroy)
router.put('/:id', courseController.update)
router.delete('/:id', courseController.destroy)
// [GET] /courses/:slug
router.get('/:slug', courseController.show)

module.exports = router
