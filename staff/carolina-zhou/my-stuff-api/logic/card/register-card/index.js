const validate = require('../../../utils/validate')
const convertDate = require('../../../utils/convert-date')
const { User, Card } = require('../../../data')

/**
 * Registers a card
 * 
 * @param {string} id 
 * @param {string} number 
 * @param {date} expiry 
 * 
 * @returns {Promise}
 */

module.exports = function(id, number, expiry) {
    let _user, cardId

    validate.string(id, 'id')
    validate.string(number, 'number')
    /* validate.date(expiry, 'expiry date') */
    
    return User.findById(id)
        .then(user => {
            if (!user) throw Error('user does not exist')
            const card = user.cards.find(card => card.number === number)
            if (card) throw Error('card already exists')
            _user = user
            // Call to convertDate (in utils) to format string to date
            const expiryDate = convertDate(expiry)
            return Card.create({ number, expiry: expiryDate})
        })
        .then(newCard => {
            cardId = newCard._id
            _user.cards.push(newCard)
            return _user.save()
        })
        .then(() => cardId.toString())
}