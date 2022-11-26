const Image = require('../models/Image')

var fs = require('fs')
const path = require('path')

class UploadControllers {
    // [GET] /upload
    upload(req, res, next) {
        Image.find({}, (err, items) => {
            if (err) {
                console.log(err)
                res.status(500).send('An error occurred', err)
            } else {
                res.render('upload', { items: items })
            }
        })
    }

    //[POST] /upload
    store(req, res, next) {
        console.log(req.file.filename)
        var obj = {
            name: req.body.name,
            desc: req.body.desc,
            img: {
                data: fs.readFileSync(
                    path.join(__dirname + '/uploads/' + req.file.filename),
                ),
                contentType: 'image/png',
            },
        }
        Image.create(obj, (err, item) => {
            if (err) {
                console.log(err)
            } else {
                // item.save();
                res.redirect('/')
            }
        })
    }
}

module.exports = new UploadControllers()
