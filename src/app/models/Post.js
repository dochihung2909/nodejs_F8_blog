const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const AutoIncrement = require('mongoose-sequence')(mongoose)

const Schema = mongoose.Schema

const Post = new Schema(
    {
        _id: { type: Number },
        name: { type: String, required: true },
        description: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 300 },
        videoId: { type: String, required: true },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        userId: { type: Number },
    },
    {
        _id: false,
        timestamps: true,
    },
)

// Add plugin
mongoose.plugin(slug)

Post.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
})

Post.plugin(AutoIncrement, { inc_field: '_id' })

module.exports = mongoose.model('Post', Post)
