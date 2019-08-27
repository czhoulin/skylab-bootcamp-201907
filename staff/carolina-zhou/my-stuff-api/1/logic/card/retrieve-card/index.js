const validate = require('../../../utils/validate')
const { User } = require('../../../data')

/**
 * Retrieves a card by its id and its owner id
 * 
 * @param {*} id 
 * @param {*} owner 
 * @returns {Promise}
 * 
*/

module.exports = function(id, owner) {
    validate.string(id, 'id')
    validate.string(owner, 'owner')

    return (async () => {
        const user = await User.findById(owner)
        const cards = user.cards
        const card = cards.find(card => {
            if(card._id.toString() === id) return card
        })
        if (!card) throw Error(`card with id ${id} does not exist`)
        return card
    })()

    /* return User.findOne({ _id : owner }, { _id: 0, __v: 0 }).lean()
        .then(user => { 
            const { cards } = user
            const card = cards.find(card => {
                if(card._id.toString() === id) return card
            })
            if (!card) throw Error(`card with id ${id} does not exist`)
            return card
        }) */
}