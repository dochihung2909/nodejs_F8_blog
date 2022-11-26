const Course = require('../models/Post')
const { mongooseToObject } = require('../../util/mongoose')

class CourseControllers {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('./courses/show', {
                    course: mongooseToObject(course),
                })
            })
            .catch(next)
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // [GET] /courses/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) => {
                res.render('courses/edit', { course: mongooseToObject(course) })
            })
            .catch(next)
    }

    // [POST] /courses/store
    store(req, res, next) {
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg`
        const course = new Course(req.body)
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        const formData = req.body
        formData.image = `https://i.ytimg.com/vi/${formData.videoId}/hq720.jpg`
        Course.updateOne({ _id: req.params.id }, formData)
            .then(() => {
                res.redirect('/me/stored/courses')
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

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    // [POST] /courses/handel-form-actions
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

module.exports = new CourseControllers()
