const mongoose = require('mongoose')
const logic = require('../../')
const { expect } = require('chai')
const { User, Card } = require('../../../data')

describe('logic - retrieve card', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let cardId, number, expiration, userId

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
        logic.retrieveCard(cardId, userId)
            .then(card => {
                expect(card).to.exist
                expect(card._id.toString()).to.equal(cardId)
                expect(card.number).to.equal(number)
                expect(card.expiration).to.deep.equal(expiration)
            })
    )

    it('should fail if the id is not a string', () =>
        expect(() => logic.retrieveCard(1234).to.throw(`card with id ${1234} does not exist`))
    )

    // ID
    it('should fail on empty id', () => 
        expect(() => 
               logic.retrieveCard('', userId)
    ).to.throw('id is empty or blank')
    )

     it('should fail on undefined id', () => 
        expect(() => 
               logic.retrieveCard(undefined, userId)
    ).to.throw(`id with value undefined is not a string`)
    )

     it('should fail on wrong id data type', () => 
        expect(() => 
               logic.retrieveCard(123, userId)
    ).to.throw(`id with value 123 is not a string`)
    )

    // owner
    it('should fail on empty owner', () => 
        expect(() => 
               logic.retrieveCard(cardId, '')
    ).to.throw('owner is empty or blank')
    )

     it('should fail on undefined owner', () => 
        expect(() => 
               logic.retrieveCard(cardId, undefined)
    ).to.throw(`owner with value undefined is not a string`)
    )

     it('should fail on wrong owner data type', () => 
        expect(() => 
               logic.retrieveCard(cardId, 123)
    ).to.throw(`owner with value 123 is not a string`)
    )

    after(() => mongoose.disconnect())
})