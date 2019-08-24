const validate = require('../../utils/validate')
const { Vehicle } = require('../../data')

/**
 * Adds vehicle.
 * 
 * @param {string} brand 
 * @param {string} model 
 * @param {number} year 
 * @param {string} type
 * @param {string} color
 * @param {boolean} electric
 * @param {number} plate 
 * 
 * @returns {Promise}
 */
module.exports = function (brand, model, year, type, color, electric, plate) {
    validate.string(brand, 'brand')
    validate.string(model, 'model')
    // validate.number(year, 'year')
    validate.string(type, 'type')
    validate.string(color, 'color')
    // validate.boolean(electric, 'electric')

    // this.__users__.findOne() --> User.findOne()
    return Vehicle.findOne({ plate })
        .then(vehicle => {
            if (vehicle) throw new Error(`vehicle with plate ${plate} already exists`)

            // this.__users__.insertOne() --> User.create()
            return Vehicle.create({ brand, model, year, type, color, electric, plate })
        })
        .then(() => { })
}