const newsRouter = require('./news')
const siteRouter = require('./site')
const postRouter = require('./post')
const meRouter = require('./me')
const userRouter = require('./user')
const uploadRouter = require('./upload')

function route(app) {
    // app.use('/upload', uploadRouter)
    app.use('/user', userRouter)
    app.use('/news', newsRouter)
    app.use('/post', postRouter)
    app.use('/me', meRouter)
    app.use('/', siteRouter)
}

module.exports = route
