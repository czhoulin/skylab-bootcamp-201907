const { expect } = require('chai')
const logic = require('../../')
const { User, Space } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - register space', () => {

    before(() => mongoose.connect('mongodb://localhost/e-cohabitat-api-test', { useNewUrlParser: true }))
    
    let title, type, address, passcode, id, username, name, surname, email, password

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
    })

    it('should succeed on correct data', async () => {
        const spaceId = await logic.registerSpace(title, type, address, passcode, id)
        expect(spaceId).to.exist

        const space = await Space.findOne({ passcode })
        expect(space).to.exist
        expect(space.id).to.equal(spaceId)
        expect(space.title).to.equal(title)
        expect(space.type).to.equal(type)
        expect(space.address).to.equal(address)
        expect(space.passcode).to.equal(passcode)
    })

    it('should fail if the space already exists', async () => {
        try {
            Space.create({ title, type, address, passcode, id })
            await logic.registerSpace(title, type, address, passcode, id)
        } catch({error}) {
            expect(error).to.exist
            expect(error.message).to.equal(`space already exists`)
        }
    })

    // name
    it('should fail on empty space name', async () => {
        title = ''

        try {
            await logic.registerSpace(title, type, address, passcode, id)
        } catch({message}) {
            expect(message).to.equal('space name is empty or blank')
        }
    })

    it('should fail on undefined space name', async () => {
        title = undefined

        try {
            await logic.registerSpace(title, type, address, passcode, id)
        } catch({message}) {
            expect(message).to.equal('space name with value undefined is not a string')
        }
    })

    it('should fail on wrong space name data type', async () => {
        title = 123

        try {
            await logic.registerSpace(title, type, address, passcode, id)
        } catch({message}) {
            expect(message).to.equal('space name with value 123 is not a string')
        }
    })

    // type
    it('should fail on empty space type', async () => {
        type = ''

        try {
            await logic.registerSpace(title, type, address, passcode, id)
        } catch({message}) {
            expect(message).to.equal('space type is empty or blank')
        }
    })

    it('should fail on undefined space type', async () => {
        type = undefined

        try {
            await logic.registerSpace(title, type, address, passcode, id)
        } catch({message}) {
            expect(message).to.equal('space type with value undefined is not a number')
        }
    })

    it('should fail on wrong space type data type', async () => {
        type = '123'

        try {
            await logic.registerSpace(title, type, address, passcode, id)
        } catch({message}) {
            expect(message).to.equal('space type with value 123 is not a number')
        }
    })

    // address
    it('should fail on empty space address', async () => {
        address = ''

        try {
            await logic.registerSpace(title, type, address, passcode, id)
        } catch({message}) {
            expect(message).to.equal('space address is empty or blank')
        }
    })

    it('should fail on undefined space address', async () => {
        address = undefined

        try {
            await logic.registerSpace(title, type, address, passcode, id)
        } catch({message}) {
            expect(message).to.equal('space address with value undefined is not a number')
        }
    })

    it('should fail on wrong space address data type', async () => {
        address = '123'

        try {
            await logic.registerSpace(title, type, address, passcode, id)
        } catch({message}) {
            expect(message).to.equal('space address with value 123 is not a number')
        }
    })

    // passcode
    it('should fail on empty space passcode', async () => {
        passcode = ''

        try {
            await logic.registerSpace(title, type, address, passcode, id)
        } catch({message}) {
            expect(message).to.equal('space passcode is empty or blank')
        }
    })

    it('should fail on undefined property passcode', async () => {
        passcode = undefined

        try {
            await logic.registerSpace(title, type, address, passcode, id)
        } catch({message}) {
            expect(message).to.equal('space passcode with value undefined is not a string')
        }
    })

    it('should fail on wrong property passcode data type', async () => {
        passcode = 123

        try {
            await logic.registerSpace(title, type, address, passcode, id)
        } catch({message}) {
            expect(message).to.equal('space passcode with value 123 is not a string')
        }
    })

    // id
    it('should fail on empty creator-user id', async () => {
        id = ''

        try {
            await logic.registerSpace(title, type, address, passcode, id)
        } catch({message}) {
            expect(message).to.equal('creator-user id is empty or blank')
        }
    })

    it('should fail on undefined creator-user id', async () => {
        id = undefined

        try {
            await logic.registerSpace(title, type, address, passcode, id)
        } catch({message}) {
            expect(message).to.equal('creator-user id with value undefined is not a string')
        }
    })

    it('should fail on wrong creator-user id data type', async () => {
        id = 123

        try {
            await logic.registerSpace(title, type, address, passcode, id)
        } catch({message}) {
            expect(message).to.equal('creator-user id with value 123 is not a string')
        }
    })

    after(() => mongoose.disconnect())
})