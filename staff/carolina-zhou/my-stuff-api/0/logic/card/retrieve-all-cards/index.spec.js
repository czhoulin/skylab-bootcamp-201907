const mongoose = require('mongoose')
const logic = require('../../')
const { expect } = require('chai')
const { User, Card } = require('../../../data')

describe('logic - retrieve all cards', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let userId

    beforeEach(() => {

        number = `num-${Math.random()}`
        expiration = new Date()

        return User.deleteMany()
            .then(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`
                return User.create({ name, surname, email, password })
                .then(user => {
                    const newCard = new Card({ number, expiration })
                    userId = user.id
                    cardId = newCard.id
                    user.cards.push(newCard)
                    return user.save()
                })
            })
    })

    it('should succeed on correct data', () =>
        logic.retrieveAllCards(userId)
            .then(cards => {
                expect(cards).to.exist
                expect(cards.length).to.equal(1)
            })
    )

    // owner
    it('should fail on empty owner', () => 
        expect(() => 
               logic.retrieveAllCards('')
    ).to.throw('owner is empty or blank')
    )

     it('should fail on undefined owner', () => 
        expect(() => 
               logic.retrieveAllCards(undefined)
    ).to.throw(`owner with value undefined is not a string`)
    )

     it('should fail on wrong owner data type', () => 
        expect(() => 
               logic.retrieveAllCards(123)
    ).to.throw(`owner with value 123 is not a string`)
    )

    after(() => mongoose.disconnect())
})