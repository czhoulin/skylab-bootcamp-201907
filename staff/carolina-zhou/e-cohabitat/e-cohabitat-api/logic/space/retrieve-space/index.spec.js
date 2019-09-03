const mongoose = require('mongoose')
const logic = require('../../')
const { expect } = require('chai')
const { User, Space } = require('../../../data')

describe('logic - retrieve space', () => {

    before(() => mongoose.connect('mongodb://localhost/e-cohabitat-api-test', { useNewUrlParser: true }))

    let title, type, address, passcode, id, spaceId, username, name, surname, email, password

    beforeEach(async() => {
        title = `name-${Math.random()}`
        type = `type-${Math.random()}`
        address = `address-${Math.random()}`
        passcode = `123-${Math.random()}`

        await Space.deleteMany()
        username = `username-${Math.random()}`
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        const user = await User.create({ username, name, surname, email, password })
        id = user._id.toString()

        const space = await Space.create({ title, type, address, passcode })
        spaceId = space.id
    })

    it('should succeed on correct data', async () => {
        const space = await logic.retrieveSpace(spaceId)
        expect(space).to.exist
        expect(space.id).to.equal(spaceId)
        expect(space.title).to.equal(title)
        expect(space.type).to.equal(type)
        expect(space.address).to.equal(address)
        expect(space.passcode).to.equal(passcode)
    })

    it('should fail on empty space id', async () => {
        try{
            await logic.retrieveSpace(' ')
        } catch({ message }) {
            expect(message).to.equal('space id is empty or blank')
        }
    })

    it('should fail on undefined space id', async () => {
          try{
            await logic.retrieveSpace(undefined)
        } catch({ message }) {
            expect(message).to.equal("space id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong space id data type', async() => {
         try{
            await logic.retrieveSpace(123)
        } catch({ message }) {
                expect(message).to.equal("space id with value 123 is not a string")
        }
    })

    after(() => mongoose.disconnect())
})