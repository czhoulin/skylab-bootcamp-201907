const validate = require('../../../utils/validate')
const { Property } = require('../../../data')

/**
 * Updates a property
 * 
 * @param {*} id
 * @param {*} fieldsToUpdate 
 * 
* @returns {Promise}
*/

module.exports = function(id, fieldsToUpdate) {
    validate.string(id, 'property id')
    validate.object(fieldsToUpdate, 'body')

    return (async() => {
        const property = await Property.findByIdAndUpdate(id, { $set: fieldsToUpdate })
            
        if (!property) throw new Error(`property with id ${id} does not exist`)
    })()
}