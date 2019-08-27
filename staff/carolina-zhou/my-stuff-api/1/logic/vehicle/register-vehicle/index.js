const validate = require('../../../utils/validate')
const { User, Vehicle } = require('../../../data')

/**
 * Registers a vehicle.
 * 
 * @param {string} brand 
 * @param {string} model 
 * @param {number} year 
 * @param {string} type
 * @param {string} color
 * @param {boolean} electric
 * @param {number} plate 
 * @param {string} id owner id
 * 
 * @returns {Promise}
 */
module.exports = function (brand, model, year, type, color, electric, plate, id) {

    validate.string(brand, 'brand')
    validate.string(model, 'model')
    validate.number(year, 'year')
    validate.string(type, 'type')
    validate.string(color, 'color')
    validate.boolean(electric, 'electric')
    validate.string(plate, 'plate')
    validate.string(id, 'id')

/*     // this.__users__.findOne() --> User.findOne()
    return Vehicle.findOne({ plate })
        .then(vehicle => {
            if (vehicle) throw new Error(`vehicle with plate ${plate} already exists`)

            // this.__users__.insertOne() --> User.create()
            return Vehicle.create({ brand, model, year, type, color, electric, plate, owner })
        })
        .then(() => { }) */

        return Vehicle.findOne({ plate })
            .then(response => {
                if (response) throw new Error('vehicle already exists')
                const vehicle = new Vehicle({
                    brand, 
                    model,
                    year,
                    type,
                    color,
                    electric,
                    plate 
                })
                vehicle.owner = id
                return vehicle.save()
                // save() method to assign vehicle to owner by saving it in the database
            })
            .then(() => Vehicle.findOne({ plate })
            ).then(response => {
                if (!response) throw new Error(`vehicle with plate ${plate} does not exist`)
                vehicleId = response._id.toString()
                return vehicleId
            })
}