const express = require('express')
const router = express.Router()

const courseController = require('../app/controllers/PostControllers')
const { route } = require('./news')

var fs = require('fs')
const path = require('path')
require('dotenv/config')

var multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    },
})

var imgModel = require('../app/models/Image')

var upload = multer({ storage: storage })

// [GET] /courses/creates
router.get('/create', courseController.create)
// router.post('/store', (req, res, next) {
//         const course = new Course(req.body)
//         course
//             .save()
//             .then(() => res.redirect('/'))
//             .catch(next)
//     })
router.post('/handle-form-actions', courseController.handleFormActions)
router.get('/:id/edit', courseController.edit)
router.patch('/:id/restore', courseController.restore)
router.delete('/:id/force', courseController.forceDestroy)
router.put('/:id', courseController.update)
router.delete('/:id', courseController.destroy)
// [GET] /courses/:slug
router.get('/:slug', courseController.show)

module.exports = router
