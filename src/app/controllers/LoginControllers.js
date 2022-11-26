const Course = require('../models/Post')
const { multipleMongooseToObject } = require('../../util/mongoose')

class LoginControllers {
    // [GET] /login
    login(req, res, next) {
        res.render('user/login')
    }

    // [GET] /register
    register(req, res, next) {
        res.render('user/register')
    }
}

module.exports = new LoginControllers()
