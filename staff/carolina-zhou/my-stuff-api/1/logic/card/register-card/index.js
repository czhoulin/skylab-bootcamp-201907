const validate = require('../../../utils/validate')
const { User, Card } = require('../../../data')

/**
 * Registers a card associated to a user
 * 
 * @param {string} id 
 * @param {string} number 
 * @param {date} expiry 
 * 
 * @returns {Promise}
 */

module.exports = function(id, number, expiry) {
    validate.string(id, 'id')
    validate.string(number, 'number')
    /* validate.date(expiry, 'expiry date') */

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new Error(`user with id ${id} does not exists`)

        const existing = user.cards.some(({ number: _number }) => _number === number)

        if (existing) throw new Error(`user with id ${id} already has card number ${number}`)

        const card = new Card({ number, expiry })

        user.cards.push(card)

        await user.save()

        return card.id
    })()

    /* return User.findById(id)
        .then(user => {
            if (!user) throw new Error(`user with id ${id} does not exists`)

            const existing = user.cards.some(({ number: _number }) => _number === number)

            if (existing) throw new Error(`user with id ${id} already has card number ${number}`)

            user.cards.push(new Card({ number, expiry }))

            return user.save()
        })
        .then(() => { }) */
}