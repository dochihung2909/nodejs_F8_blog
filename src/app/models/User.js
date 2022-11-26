const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const AutoIncrement = require('mongoose-sequence')(mongoose)

const Schema = mongoose.Schema

const User = new Schema(
    {
        _id: { type: Number },
        name: { type: String, required: true },
        avatar: { type: String },
        role: { type: Boolean },
    },
    {
        _id: false,
        timestamps: true,
    },
)

// Add plugin
mongoose.plugin(slug)

User.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
})

Person.plugin(AutoIncrement, { inc_field: '_id' })

module.exports = mongoose.model('User', User)
