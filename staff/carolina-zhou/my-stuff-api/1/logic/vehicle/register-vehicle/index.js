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

    return (async() => {
        const response = await Vehicle.findOne({ plate })
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
        await vehicle.save() 

        const newVehicle = await Vehicle.findOne({ plate })
        if (!newVehicle) throw new Error(`vehicle with plate ${plate} does not exist`)

        vehicleId = newVehicle._id.toString()
        return vehicleId
    })()
}