const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../data')

/**
 * Retrieves all vehicles by the user id
 * 
 * @param {*} id 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'user id')

    return Vehicle.find({ owner : id }, { __v: 0 }).lean()
        .then(vehicles => {
            if (!vehicles) throw Error(`user with id ${userId} does not own any car`)
            vehicles.forEach(vehicle => {
                vehicle.id = vehicle._id
                delete vehicle._id
            })
            return vehicles
        })
}