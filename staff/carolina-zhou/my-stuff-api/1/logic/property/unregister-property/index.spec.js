const mongoose = require('mongoose')
const logic = require('../../')
const { expect } = require('chai')
const { User, Property } = require('../../../data')

describe('logic - unregister property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test',  { useNewUrlParser: true }))

    let address, m2, year, cadastre, id

    beforeEach(async () => {

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

        const newProperty = await Property.create({ address, m2, year, cadastre })
        id = newProperty.id
    })

    it('should succeed on correct data', async () => {
        const result = await logic.unregisterProperty(id)
        expect(result).not.to.exist
        const property = await Property.findById(id)
        expect(property).not.to.exist
    })

    it('should fail on unexisting property', async () => {
        try {
            await logic.unregisterProperty('5d5d5530531d455f75da9fF9')
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('wrong data provided')
        }
    })

    it('should fail on empty id', async () => {
        id = ' '

        try{
            await logic.unregisterProperty(id, password)
        } catch({ message }) {
            expect(message).to.equal('property id is empty or blank')
        }
    })

    it('should fail on undefined id', async () => {
        id = undefined

          try{
            await logic.unregisterProperty(id, password)
        } catch({ message }) {
            expect(message).to.equal("property id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong id data type', async() => {
        id = 123

         try{
                await logic.unregisterProperty(id, password)
            } catch({ message }) {
                expect(message).to.equal("property id with value 123 is not a string")
            }
       
    })

    after(() => mongoose.disconnect())
})