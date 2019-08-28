const mongoose = require('mongoose')
const logic = require('../../')
const { expect } = require('chai')
const { User, Property } = require('../../../data')

describe('logic - retrieve property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let  address, m2, year, cadastre, id, propertyId

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

        const property = await Property.create({ address, m2, year, cadastre })
        propertyId = property.id

    })

    it('should succeed on correct data', async () => {
        const property = await logic.retrieveProperty(propertyId)
        expect(property).to.exist
        expect(property.id).to.equal(propertyId)
        expect(property.address).to.equal(address)
        expect(property.m2).to.equal(m2)
        expect(property.year).to.equal(year)
        expect(property.cadastre).to.equal(cadastre)
    })

    it('should fail on empty id', async () => {
        try{
            await logic.retrieveProperty(' ')
        } catch({ message }) {
            expect(message).to.equal('property ID is empty or blank')
        }
    })

    it('should fail on undefined id', async () => {
          try{
            await logic.retrieveProperty(undefined)
        } catch({ message }) {
            expect(message).to.equal("property ID with value undefined is not a string")
        }
    })
     
    it('should fail on wrong id data type', async() => {
         try{
            await logic.retrieveProperty(123)
        } catch({ message }) {
                expect(message).to.equal("property ID with value 123 is not a string")
        }
    })

    after(() => mongoose.disconnect())
})