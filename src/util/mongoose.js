module.exports = {
    // Get Object from multiple mongoose
    multipleMongooseToObject: function (mongooses) {
        return mongooses.map((mongoose) => mongoose.toObject())
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose
    },
}
