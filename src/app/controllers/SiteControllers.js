const Post = require('../models/Post')
const { multipleMongooseToObject } = require('../../util/mongoose')
const bodyParser = require('body-parser')
class SiteControllers {
    // [GET] /home
    home(req, res, next) {
        Post.find({}, (err, items) => {
            if (err) {
                console.log(err)
                res.status(500).send('An error occurred', err)
            } else {
                res.render('home.ejs', { items: items })
            }
        })
    }

    // [GET] /search
    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteControllers()
