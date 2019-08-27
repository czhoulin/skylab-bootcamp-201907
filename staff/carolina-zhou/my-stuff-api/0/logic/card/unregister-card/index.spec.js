const mongoose = require('mongoose')
const logic = require('../../')
const { expect } = require('chai')
const { User, Card } = require('../../../data')

describe('logic - unregister card', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test',  { useNewUrlParser: true }))

    let cardId, number, expiry, userId

    beforeEach(() => {
        
        number = `num-${Math.random()}`
        expiry = new Date()

        return User.deleteMany()
            .then(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`
                return User.create({ name, surname, email, password })
                .then(user => {
                    const newCard = new Card({ number, expiry })
                    userId = user.id
                    cardId = newCard.id
                    user.cards.push(newCard)
                    return user.save()
                })
            })
    })

    it('should succeed on correct data', () =>
        logic.unregisterCard(cardId, userId)
            .then(card => {
                expect(card).not.to.exist
                /* expect(card.number).not.to.exist
                expect(card.expiry).not.to.exist */
            })
    )

    it('should fail on unexisting card', () =>
        logic.unregisterCard('5d5d5530531d455f75da9fF9', userId)
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('card not found'))
    )

    // ID
    it('should fail on empty id', () => 
        expect(() => 
               logic.unregisterCard('', userId)
    ).to.throw('id is empty or blank')
    )

     it('should fail on undefined id', () => 
        expect(() => 
               logic.unregisterCard(undefined, userId)
    ).to.throw(`id with value undefined is not a string`)
    )

     it('should fail on wrong id data type', () => 
        expect(() => 
               logic.unregisterCard(123, userId)
    ).to.throw(`id with value 123 is not a string`)
    )

    // owner
    it('should fail on empty owner', () => 
        expect(() => 
               logic.unregisterCard(cardId, '')
    ).to.throw('owner is empty or blank')
    )

     it('should fail on undefined owner', () => 
        expect(() => 
               logic.unregisterCard(cardId, undefined)
    ).to.throw(`owner with value undefined is not a string`)
    )

     it('should fail on wrong owner data type', () => 
        expect(() => 
               logic.unregisterCard(cardId, 123)
    ).to.throw(`owner with value 123 is not a string`)
    )

    after(() => mongoose.disconnect())
})