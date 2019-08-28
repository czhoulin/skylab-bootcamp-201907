const mongoose = require('mongoose')
const logic = require('../../')
const { expect } = require('chai')
const { User, Property } = require('../../../data')


describe('logic - update property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test',  { useNewUrlParser: true }))

    let id, address, m2, year, cadastre

    beforeEach(async () => {

        address = `address-${Math.random()}`
        m2 = Number((Math.random()*500).toFixed())
        year = Number((Math.random()*1000).toFixed())
        cadastre = `cadastre-${Math.random()}`

        body = {
            address : `newAddress-${Math.random()}`,
            m2: Number((Math.random()*1000).toFixed())
        }
        
        await Property.deleteMany()
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        const newProperty = await Property.create({ address, m2, year, cadastre })

        id = newProperty.id
    })

    it('should succeed on correct data', async () => {
        const result = await logic.updateProperty(id, body)
        expect(result).not.to.exist
        const property = await Property.findById(id)
        expect(property).to.exist
        expect(property.address).to.equal(body.address)
        expect(property.m2).to.equal(body.m2) 
            
    })

     it('should fail on non-existing property', async () => {
        id = '5d5d5530531d455f75da9fF9'

        try{
            await logic.updateProperty(id, body)

            throw new Error('should not reach this point')
        } catch({ message }) {
            expect(message).to.equal(`property with id ${id} does not exist`)
        }
    }) 

    it('should fail on empty id', async () => {
        id = ''

        try{
            await logic.updateProperty(id, body)
        } catch({ message }) {
            expect(message).to.equal('property id is empty or blank')
        }
    })

    it('should fail on undefined id', async () => {
        id = undefined

        try{
            await logic.updateProperty(id, body)
        } catch({ message }) {
            expect(message).to.equal("property id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong id data type', async() => {
        id = 123

        try{
            await logic.updateProperty(id, body)
        } catch({ message }) {
            expect(message).to.equal("property id with value 123 is not a string")
        }
    })

    it('should fail on empty body', async () => {
        body = ''

        try{
            await logic.updateProperty(id, body)
        } catch({ message }) {
            expect(message).to.equal('body is empty or blank')
        }
    })

    it('should fail on undefined body', async () => {
        body = undefined

        try{
            await logic.updateProperty(id, body)
        } catch({ message }) {
            expect(message).to.equal("body with value undefined is not an object")
        }
    })
     
    it('should fail on wrong body data type', async() => {
        body = 123

        try{
            await logic.updateProperty(id, body)
        } catch({ message }) {
            expect(message).to.equal("body with value 123 is not an object")
        }
    })

    after(() => mongoose.disconnect())
})