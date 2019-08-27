const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../data')

/**
 * Uptades a vehicle
 * 
 * @param {*} id
 * @param {*} fieldsToUpdate 
 * 
* @returns {Promise}
*/

module.exports = function(id, fieldsToUpdate) {
    validate.string(id, 'vehicle id')

    return Vehicle.findByIdAndUpdate(id, { $set: fieldsToUpdate })
        .then(vehicle => {
             if (!vehicle) throw Error(`vehicle with id ${id} does not exist`)
        })
}