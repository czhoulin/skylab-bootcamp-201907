const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../data')

/**
 * Unregisters a vehicle by its id
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {

    validate.string(id, 'vehicle id')

    return (async() => {
        const response = await Vehicle.deleteOne({ _id: id })
        if (!response.deletedCount) throw Error(`wrong id`)
    })()
}