const express = require('express')
const router = express.Router()

const meController = require('../app/controllers/MeControllers')

router.get('/stored/posts', meController.storedCourses)
router.get('/trash/posts', meController.trashCourses)

module.exports = router
