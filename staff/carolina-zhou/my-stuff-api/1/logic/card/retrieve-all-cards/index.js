const validate = require('../../../utils/validate')
const { User } = require('../../../data')

/**
 * Retrieves all the cards by its owner id
 * 
 * @param {*} id 
 * @returns {Promise}
 * 
*/

module.exports = function(id) {
    validate.string(id, 'owner')

    return (async () => {
        const user = await User.findById(id)
        const cards = user.cards

        if (!cards) throw Error(`this user does not have any cards`)

        return cards
    })()

    /* return User.findOne({ _id : owner }, { _id: 0, __v: 0 }).lean()
        .then(user => { 
            const { cards } = user

            if (!cards) throw Error(`this user does not have any cards`)
            return cards
        }) */
}