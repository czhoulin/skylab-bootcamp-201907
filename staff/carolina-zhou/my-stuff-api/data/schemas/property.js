const mongoose = require('mongoose')

const { Schema, Schema: { Types: { ObjectId } } } = mongoose

module.exports = new Schema({
    address: {
        type: String,
        required: true
    },
    m2: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    cadastre: {
        type: String,
        required: true
    },
    owners: [{ type: ObjectId, ref: 'User' }]
})