const validate = require('../../../utils/validate')
const { User } = require('../../../data')

/**
 * 
 * @param {*} id 
 * @returns {Promise}
 * 
*/

module.exports = function(id, owner) {
    validate.string(id, 'id')
    validate.string(owner, 'owner')

    return User.findOne({ _id : owner }, { _id: 0, __v: 0 }).lean()
        .then(user => { 
            const { cards } = user
            const card = cards.find(card => {
                if(card._id.toString() === id) return card
            })
            if (!card) throw Error(`card with id ${id} does not exist`)
            return card
        })
}