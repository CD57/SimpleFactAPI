const mongoose = require("mongoose")

const factSchema = new mongoose.Schema({
    fact: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('fact', factSchema)