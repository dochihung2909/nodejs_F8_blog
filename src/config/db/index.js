const mongoose = require('mongoose')
const MONGO_URI =
    'mongodb+srv://hungts:tinhyeu123@cluster0.gcxve2l.mongodb.net/?retryWrites=true&w=majority'

async function connect() {
    try {
        // await mongoose.connect('mongodb://localhost:27017/HowT-blog')
        await mongoose.connect(MONGO_URI)
        console.log('Connect Successful!!')
    } catch (error) {
        console.log('Connect Failure!!!')
    }
}

module.exports = { connect }
