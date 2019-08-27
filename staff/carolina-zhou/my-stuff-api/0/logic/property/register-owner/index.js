const validate = require('../../../utils/validate')
const { User, Property } = require('../../../data')

/**
 * Registers a property owner
 * 
 * @param {string} propertyId
 * @param {string} ownerId 
 * 
 * @returns {Promise}
*/

module.exports = function(propertyId, ownerId) {

    let _property

    validate.string(propertyId, 'property id')
    validate.string(ownerId, 'owner id')

    return Property.findOne({ _id: propertyId })
        .then(property => {
            if (!property) throw Error('wrong property id provided.')
            _property = property
            return User.findOne({ _id: ownerId })
        })
        .then(user => {
            if (!user) throw Error('wrong owner id provided.')
            const match = _property.owners.find(owner => owner === ownerId)
            if (match) throw Error(`owner already registered in property with id ${propertyId}`)
            _property.owners.push(ownerId)
            return _property.save()
        })
}