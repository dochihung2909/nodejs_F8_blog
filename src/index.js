const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
// const morgan = require('morgan')
const { engine } = require('express-handlebars')
const ejs = require('ejs')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const route = require('./routes')
const db = require('./config/db')
var fs = require('fs')
require('dotenv/config')

const SortMiddleware = require('./app/middlewares/SortMiddleware')

// Connect to DB
db.connect()
// Custom middleware
app.use(SortMiddleware)

// HTTP logger
// app.use(morgan('combined'))

app.set('view engine', 'ejs')
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

// Step 4 - set up EJS

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Step 5 - set up multer for storing uploaded files

var multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    },
})

var upload = multer({ storage: storage })

// Step 6 - load the mongoose model for Image

var imgModel = require('./app/models/Image')
var Post = require('./app/models/Post')

// Step 7 - the GET request handler that provides the HTML UI
// app.get('/upload', (req, res) => {
//     imgModel.find({}, (err, items) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send('An error occurred', err);
//         }
//         else {
//             res.render('upload.ejs', { items: items });
//         }
//     });
// });

// Step 8 - the POST handler for processing the uploaded file

app.post('/post/store', upload.single('image'), (req, res, next) => {
    var obj = {
        description: req.body.description,
        img: {
            data: fs.readFileSync(
                path.join(__dirname + '/uploads/' + req.file.filename),
            ),
            contentType: 'image/png',
        },
    }
    req.body.image = obj.img
    const post = new Post(req.body)
    post.save()
        .then(() => res.redirect('/'))
        .catch(next)
})

app.use(express.static(path.join(__dirname, 'public')))

// Routes
route(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
