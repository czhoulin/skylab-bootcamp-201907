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
    validate.object(fieldsToUpdate, 'body')

    return (async() => {
        const vehicle = await Vehicle.findByIdAndUpdate(id, { $set: fieldsToUpdate })
            
        if (!vehicle) throw new Error(`vehicle with id ${id} does not exist`)
    })()
}