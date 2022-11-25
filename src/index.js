const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')

app.use(methodOverride('_method'))

const route = require('./routes')
const db = require('./config/db')

const SortMiddleware = require('./app/middlewares/SortMiddleware')

// Connect to DB
db.connect()

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// Custom middleware
app.use(SortMiddleware)

// HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default'

                const icons = {
                    default: 'fa-solid fa-sort',
                    desc: 'fa-solid fa-arrow-down-short-wide',
                    asc: 'fa-solid fa-arrow-down-wide-short',
                }

                const types = {
                    default: 'desc',
                    desc: 'asc',
                    asc: 'desc',
                }

                const icon = icons[sortType]
                const type = types[sortType]

                return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`
            },
        },
    }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

app.use(express.static(path.join(__dirname, 'public')))

// Routes
route(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
