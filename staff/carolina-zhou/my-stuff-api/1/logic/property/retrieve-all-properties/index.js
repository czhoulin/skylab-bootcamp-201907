const validate = require('../../../utils/validate')
const { Property } = require('../../../data')

/**
 * Retrieves all the properties by their owner's user id
 * 
 * @param {*} id 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'user id')

    return (async() => {
        const properties = await Property.find({ owner : id }, { __v: 0 }).lean()
        if (!properties) throw Error(`user with id ${id} does not own any properties`)

        properties.forEach(property => {
            property.id = property._id
            delete property._id

            return property
        })
    })()
}