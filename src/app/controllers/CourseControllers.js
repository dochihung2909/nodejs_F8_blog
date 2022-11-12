const Course = require('../models/Course')
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
        const formData = req.body
        formData.image = `https://i.ytimg.com/vi/${formData.videoId}/hq720.jpg`
        const course = new Course(formData)
        course
            .save()
            .then(() => res.redirect('/'))
            .catch((error) => {})
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
}

module.exports = new CourseControllers()