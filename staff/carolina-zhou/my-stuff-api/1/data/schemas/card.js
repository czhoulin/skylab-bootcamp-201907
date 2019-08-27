/* const mongoose = require('mongoose')
const { Schema } = mongoose */

const { Schema } = require('mongoose')

module.exports = new Schema({
    number: {
        type: String,
        required: true
    },
    expiry: {
        type: Date,
        required: true
    }
})