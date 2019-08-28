const { expect } = require('chai')
const logic = require('../../')
const { User, Property } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - register property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
    
    let address, m2, year, cadastre, id

    beforeEach(async() => {
        address = `address-${Math.random()}`
        m2 = Number((Math.random()*1000).toFixed())
        year = Number((Math.random()*1000).toFixed())
        cadastre = `cadastre-${Math.random()}`

        await Property.deleteMany()
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        const user = await User.create({ name, surname, email, password })
        id = user._id.toString()
    })

    it('should succeed on correct data', async () => {
        const propertyId = await logic.registerProperty(address, m2, year, cadastre, id)
        expect(propertyId).to.exist

        const property = await Property.findOne({ cadastre })
        expect(property).to.exist
        expect(property.id).to.equal(propertyId)
        expect(property.address).to.equal(address)
        expect(property.m2).to.equal(m2)
        expect(property.year).to.equal(year)
        expect(property.cadastre).to.equal(cadastre)
    })

    it('should fail if the property already exists', async () => {
        try {
            Property.create({ address, m2, year, cadastre, id })
            await logic.registerProperty(address, m2, year, cadastre, id)
        } catch({error}) {
            expect(error).to.exist
            expect(error.message).to.equal(`property already exists`)
        }
    })

    // Address
    it('should fail on empty property address', async () => {
        address = ''

        try {
            await logic.registerProperty(address, m2, year, cadastre, id)
        } catch({message}) {
            expect(message).to.equal('address is empty or blank')
        }
    })

    it('should fail on undefined property address', async () => {
        address = undefined

        try {
            await logic.registerProperty(address, m2, year, cadastre, id)
        } catch({message}) {
            expect(message).to.equal('address with value undefined is not a string')
        }
    })

    it('should fail on wrong property address data type', async () => {
        address = 123

        try {
            await logic.registerProperty(address, m2, year, cadastre, id)
        } catch({message}) {
            expect(message).to.equal('address with value 123 is not a string')
        }
    })

    // Area
    it('should fail on empty property area', async () => {
        area = ''

        try {
            await logic.registerProperty(address, m2, year, cadastre, id)
        } catch({message}) {
            expect(message).to.equal('area is empty or blank')
        }
    })

    it('should fail on undefined property area', async () => {
        area = undefined

        try {
            await logic.registerProperty(address, m2, year, cadastre, id)
        } catch({message}) {
            expect(message).to.equal('area with value undefined is not a number')
        }
    })

    it('should fail on wrong property area data type', async () => {
        area = '123'

        try {
            await logic.registerProperty(address, m2, year, cadastre, id)
        } catch({message}) {
            expect(message).to.equal('area with value 123 is not a number')
        }
    })

    // Year
    it('should fail on empty property year', async () => {
        year = ''

        try {
            await logic.registerProperty(address, m2, year, cadastre, id)
        } catch({message}) {
            expect(message).to.equal('year is empty or blank')
        }
    })

    it('should fail on undefined property year', async () => {
        year = undefined

        try {
            await logic.registerProperty(address, m2, year, cadastre, id)
        } catch({message}) {
            expect(message).to.equal('year with value undefined is not a number')
        }
    })

    it('should fail on wrong property year data type', async () => {
        year = '123'

        try {
            await logic.registerProperty(address, m2, year, cadastre, id)
        } catch({message}) {
            expect(message).to.equal('year with value 123 is not a number')
        }
    })

    // Cadastre
    it('should fail on empty property cadastre', async () => {
        cadastre = ''

        try {
            await logic.registerProperty(address, m2, year, cadastre, id)
        } catch({message}) {
            expect(message).to.equal('cadastre is empty or blank')
        }
    })

    it('should fail on undefined property cadastre', async () => {
        cadastre = undefined

        try {
            await logic.registerProperty(address, m2, year, cadastre, id)
        } catch({message}) {
            expect(message).to.equal('cadastre with value undefined is not a string')
        }
    })

    it('should fail on wrong property cadastre data type', async () => {
        cadastre = 123

        try {
            await logic.registerProperty(address, m2, year, cadastre, id)
        } catch({message}) {
            expect(message).to.equal('cadastre with value 123 is not a string')
        }
    })

    // ID
    it('should fail on empty property id', async () => {
        id = ''

        try {
            await logic.registerProperty(address, m2, year, cadastre, id)
        } catch({message}) {
            expect(message).to.equal('id is empty or blank')
        }
    })

    it('should fail on undefined property id', async () => {
        id = undefined

        try {
            await logic.registerProperty(address, m2, year, cadastre, id)
        } catch({message}) {
            expect(message).to.equal('id with value undefined is not a string')
        }
    })

    it('should fail on wrong property id data type', async () => {
        id = 123

        try {
            await logic.registerProperty(address, m2, year, cadastre, id)
        } catch({message}) {
            expect(message).to.equal('id with value 123 is not a string')
        }
    })

    after(() => mongoose.disconnect())
})