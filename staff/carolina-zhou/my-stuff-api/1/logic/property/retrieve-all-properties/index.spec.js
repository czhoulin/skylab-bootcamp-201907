const { expect } = require('chai')
const logic = require('../../')
const { User, Property} = require('../../../data')
const mongoose = require('mongoose')

describe('logic - retrieve all properties', () => {

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

    it('should succeed on correct data', async() => {
        const properties = logic.retrieveAllProperties(id)
        expect(properties).to.exist
    })

    it('should fail on empty id', async () => {
        try{
            await logic.retrieveAllProperties(' ')
        } catch({ message }) {
            expect(message).to.equal('user id is empty or blank')
        }
    })

    it('should fail on undefined id', async () => {
          try{
            await logic.retrieveAllProperties(undefined)
        } catch({ message }) {
            expect(message).to.equal("user id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong id data type', async() => {
         try{
            await logic.retrieveAllProperties(123)
        } catch({ message }) {
                expect(message).to.equal("user id with value 123 is not a string")
        }
    })

    after(() => mongoose.disconnect())
})