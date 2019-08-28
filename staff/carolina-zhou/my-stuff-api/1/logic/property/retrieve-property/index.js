const validate = require('../../../utils/validate')
const { Property } = require('../../../data')

/**
 * Retrieves a property by its id
 * 
 * @param {*} id
 * 
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'property ID')

    return (async () => {
        const property = await Property.findOne({ _id: id }, { _id: 0 }).lean()
        if (!property) throw Error(`property with id ${id} does not exist.`)
        property.id = id
        return property
    })()
}