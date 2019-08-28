const validate = require('../../../utils/validate')
const { Property } = require('../../../data')

/**
 * Unregisters a property
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {

    validate.string(id, 'property id')

    return (async () => {
        const result = await Property.deleteOne({ _id: id })
        if (!result.deletedCount) throw Error('wrong data provided')
    })()
}