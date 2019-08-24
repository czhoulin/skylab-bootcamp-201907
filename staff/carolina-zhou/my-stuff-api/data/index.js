const mongoose = require('mongoose')
const { user, carSchema/*,  propertySchema, cardSchema */ } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Vehicle: mongoose.model('Car', carSchema)/* ,
    Property: mongoose.model('Property', propertySchema),
    Card: mongoose.model('Card', cardSchema) */
}