const validate = require('../../../utils/validate')
const { Property } = require('../../../data')

/**
 * Registers a property
 * 
 * @param {*} address 
 * @param {*} m2 
 * @param {*} year 
 * @param {*} cadastre 
 * @param {*} id 
 * 
 * @returns {Promise}
 */

module.exports = function(address, m2, year, cadastre, id) {

    validate.string(address, 'address')
    validate.number(m2, 'area')
    validate.number(year, 'year')
    validate.string(cadastre, 'cadastre')
    validate.string(id, 'id')

    return (async () => {
        const result = await Property.findOne({ cadastre })

        if (result) throw Error('property already exists')

        const property = new Property({ address,m2, year, cadastre })
        property.owners.push(id)

        await property.save()

        return property._id.toString()
    })()
}    
