const Post = require('../models/Post')
const { multipleMongooseToObject } = require('../../util/mongoose')
const bodyParser = require('body-parser')
class SiteControllers {
    // [GET] /home
    home(req, res, next) {
        Post.find({})
            .then((posts) => {
                console.log(bodyParser.json(posts))
                res.render('home.hbs', {
                    posts: multipleMongooseToObject(posts),
                })
            })
            .catch(next)
    }

    // [GET] /search
    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteControllers()
