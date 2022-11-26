const Course = require('../models/Post')
const { mongooseToObject } = require('../../util/mongoose')
var fs = require('fs')
const path = require('path')
require('dotenv/config')

class PostControllers {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('./posts/show', {
                    course: mongooseToObject(course),
                })
            })
            .catch(next)
    }

    // [GET] /post/create
    create(req, res, next) {
        res.render('posts/create')
    }

    // [GET] /post/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) => {
                res.render('posts/edit', { course: mongooseToObject(course) })
            })
            .catch(next)
    }

    // [POST] /posts/store
    // store(req, res, next) {
    //     const course = new Course(req.body)
    //     course
    //         .save()
    //         .then(() => res.redirect('/'))
    //         .catch(next)
    // }

    // [PUT] /courses/:id
    update(req, res, next) {
        const formData = req.body
        Course.updateOne({ _id: req.params.id }, formData)
            .then(() => {
                res.redirect('/me/stored/posts')
            })
            .catch(next)
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    // [DELETE] /post/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    // [PATCH] /post/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    // [POST] /post/handel-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            // Delete course
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            // Restore form trash
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            case 'deleteForce':
                Course.deleteMany({ _id: { $in: req.body.courseIds } })
                    .then(() => {
                        res.redirect('back')
                    })
                    .catch(next)
                break
            default:
                res.json({ message: 'Action is  invalid!' })
                break
        }
    }
}

module.exports = new PostControllers()
