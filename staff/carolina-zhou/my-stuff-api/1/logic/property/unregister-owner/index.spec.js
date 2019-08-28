const mongoose = require('mongoose')
const logic = require('../../')
const { expect } = require('chai')
const { User, Property } = require('../../../data')

describe('logic - unregister property owner', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test',  { useNewUrlParser: true }))

    let address, m2, year, cadastre, propertyId, ownerId

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

        const newUser = await User.create({ name, surname, email, password })
        ownerId = newUser.id

        const newProperty = await Property.create({ address, m2, year, cadastre })
        propertyId = newProperty.id

        newProperty.owners.push(newUser)
        await newProperty.save()
    })

    it('should succeed on correct data', async () => {
        const result = await logic.unregisterPropertyOwner(propertyId, ownerId)
        expect(result).to.exist
        const property = await Property.findById(propertyId)
        expect(property).to.exist
        const user = await User.findById(ownerId)
        expect(user).not.to.exist
    })

    it('should fail on unexisting property', async () => {
        propertyId = '12342657'
        try {
            await logic.unregisterPropertyOwner(propertyId, ownerId)
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('wrong property id provided')
        }
    })

    it('should fail on existing property but wrong owner', async () => {
        ownerId = '5d5d5530531d455f75da9fF9'
        try {
            await logic.unregisterPropertyOwner(propertyId, ownerId)
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('user with id 5d5d5530531d455f75da9fF9 is not an owner')
        }
    })

    it('should fail on unexisting owner', async () => {
        ownerId = '124368587'
        try {
            await logic.unregisterPropertyOwner(propertyId, ownerId)
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('wrong owner id provided')
        }
    })

    it('should fail on empty property id', async () => {
        propertyId = ' '

        try{
            await logic.unregisterPropertyOwner(propertyId, ownerId)
        } catch({ message }) {
            expect(message).to.equal('property id is empty or blank')
        }
    })

    it('should fail on undefined property id', async () => {
        propertyId = undefined

        try{
            await logic.unregisterPropertyOwner(propertyId, ownerId)
        } catch({ message }) {
            expect(message).to.equal("property id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong property id data type', async() => {
        propertyId = 123

         try{
            await logic.unregisterPropertyOwner(propertyId, ownerId)
        } catch({ message }) {
            expect(message).to.equal("property id with value 123 is not a string")
        }
    })

    it('should fail on empty owner id', async () => {
        ownerId = ' '

        try{
            await logic.unregisterPropertyOwner(propertyId, ownerId)
        } catch({ message }) {
            expect(message).to.equal('owner id is empty or blank')
        }
    })

    it('should fail on undefined owner id', async () => {
        ownerId = undefined

        try{
            await logic.unregisterPropertyOwner(propertyId, ownerId)
        } catch({ message }) {
            expect(message).to.equal("owner id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong owner id data type', async() => {
        ownerId = 123

         try{
            await logic.unregisterPropertyOwner(propertyId, ownerId)
        } catch({ message }) {
                expect(message).to.equal("owner id with value 123 is not a string")
        }
    })

    after(() => mongoose.disconnect())
})