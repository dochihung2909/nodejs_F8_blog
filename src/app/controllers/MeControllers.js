const Course = require('../models/Post')
const { multipleMongooseToObject } = require('../../util/mongoose')

class MeControllers {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({})

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            })
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-posts', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next)
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        let courseQuery = Course.findDeleted({})

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            })
        }

        courseQuery
            .then((courses) =>
                res.render('me/trash-posts', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next)
    }
}

module.exports = new MeControllers()
