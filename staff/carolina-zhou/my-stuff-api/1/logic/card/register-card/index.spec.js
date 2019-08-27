const mongoose = require('mongoose')
const { expect } = require('chai')
const logic = require('../../')
const { User, Card } = require('../../../data')

describe('logic - register card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id, _number, expiry

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        _number = `555-${Math.random()}`

        expiry = new Date

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password })
        id = user.id

        /* return User.deleteMany()
            .then(() => User.create({ name, surname, email, password }))
            .then(user => id = user.id) */
    })

    it('should succeed on correct data', async () => {
        const _id = await logic.registerCard(id, _number, expiry)

        cardId = _id

        const user = await User.findById(id)

        expect(user).to.exist

        const { cards } = user

        expect(cards).to.have.lengthOf(1)

        const [card] = cards

        expect(card).to.exist
        expect(card.number).to.equal(_number)
        expect(card.expiry).to.deep.equal(expiry)
    })

    /* it('should succeed on correct data', async() =>
        logic.registerCard(id, _number, expiry)
            .then(_id => {
                cardId = _id

                return User.findById(id)
            })
            .then(user => {
                expect(user).to.exist

                const { cards } = user

                expect(cards).to.have.lengthOf(1)

                const [card] = cards

                expect(card).to.exist
                expect(card.number).to.equal(_number)
                expect(card.expiry).to.deep.equal(expiry)
            })
    )

    it('should fail on empty id', () => 
        expect(() => 
               logic.registerCard('')
    ).to.throw('id is empty or blank')
    )

     it('should fail on undefined id', () => 
        expect(() => 
               logic.registerCard(undefined)
    ).to.throw(`id with value undefined is not a string`)
    )

     it('should fail on wrong id data type', () => 
        expect(() => 
               logic.registerCard(123)
    ).to.throw(`id with value 123 is not a string`)
    ) */

    after(() => mongoose.disconnect())
})