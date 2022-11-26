const express = require('express')
const router = express.Router()
require('dotenv/config')
const multer = require('multer')

const uploadControllers = require('../app/controllers/UploadControllers')

var upload = multer({ storage: storage })

// Step 5 - set up multer for storing uploaded files

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    },
})

router.get('/', uploadControllers.upload)
router.post('/', upload.single('image'), uploadControllers.store)

module.exports = router
