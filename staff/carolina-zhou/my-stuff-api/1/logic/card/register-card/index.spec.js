const mongoose = require('mongoose')
const { expect } = require('chai')
const logic = require('../../')
const { User, Card } = require('../../../data')

describe('logic - register card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id, _number, expiration

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        _number = `555-${Math.random()}`

        expiration = new Date

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password })
        id = user.id
    })

    it('should succeed on correct data', async () => {
        const _id = await logic.registerCard(id, _number, expiration)

        cardId = _id

        const user = await User.findById(id)

        expect(user).to.exist

        const { cards } = user

        expect(cards).to.have.lengthOf(1)

        const [card] = cards

        expect(card).to.exist
        expect(card.number).to.equal(_number)
        expect(card.expiration).to.deep.equal(expiration)
    })

    // user id
    it('should fail on empty id', async () => {
        id = ''

        try {
            await logic.registerCard(id, _number, expiration)
        } catch({message}) {
            expect(message).to.equal('user id is empty or blank')
        }
    })

    it('should fail on undefined id', async () => {
        id = undefined

        try {
            await logic.registerCard(id, _number, expiration)
        } catch({message}) {
            expect(message).to.equal('user id with value undefined is not a string')
        }
    })

    it('should fail on wrong id data type', async () => {
        id = 123

        try {
            await logic.registerCard(id, _number, expiration)
        } catch({message}) {
            expect(message).to.equal('user id with value 123 is not a string')
        }
    })

    // number
    it('should fail on empty number', async () => {
        number = ''

        try {
            await logic.registerCard(id, _number, expiration)
        } catch({message}) {
            expect(message).to.equal('number is empty or blank')
        }
    })

    it('should fail on undefined number', async () => {
        number = undefined

        try {
            await logic.registerCard(id, _number, expiration)
        } catch({message}) {
            expect(message).to.equal('number with value undefined is not a string')
        }
    })

    it('should fail on wrong number data type', async () => {
        number = 123

        try {
            await logic.registerCard(id, _number, expiration)
        } catch({message}) {
            expect(message).to.equal('number with value 123 is not a string')
        }
    })

    // expiration
    it('should fail on empty expiration', async () => {
        expiration = ''

        try {
            await logic.registerCard(id, _number, expiration)
        } catch({message}) {
            expect(message).to.equal('expiration is empty or blank')
        }
    })

    it('should fail on undefined expiration', async () => {
        expiration = undefined

        try {
            await logic.registerCard(id, _number, expiration)
        } catch({message}) {
            expect(message).to.equal('expiration date with value undefined is not a date')
        }
    })

    it('should fail on wrong expiration data type', async () => {
        expiration = 123

        try {
            await logic.registerCard(id, _number, expiration)
        } catch({message}) {
            expect(message).to.equal('expiration date with value 123 is not a date')
        }
    })

    after(() => mongoose.disconnect())
})