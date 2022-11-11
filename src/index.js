const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const morgan = require('morgan')
const { engine } = require('express-handlebars')

const route = require('./routes')
const db = require('./config/db')

// Connect to DB
db.connect()

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine('hbs', engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

app.use(express.static(path.join(__dirname, 'public')))

// Routes
route(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
