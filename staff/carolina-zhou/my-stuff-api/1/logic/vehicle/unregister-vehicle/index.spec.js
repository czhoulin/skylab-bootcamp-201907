const { expect } = require('chai')
const logic = require('../../')
const { User, Vehicle } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - unregister vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    /* let name, surname, email, password, id

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password }))
            .then(user => id = user.id)
    })

    it('should succeed on correct data', () =>
        logic.unregisterVehicle(id)
            .then(result => {
                expect(result).not.to.exist

                return User.findById(id)
            })
            .then(user => {
                expect(user).not.to.exist
            })
    ) */

    it('should fail on undefined id', () => 
        expect(() => 
               logic.unregisterVehicle(undefined)
    ).to.throw(`vehicle ID with value undefined is not a string`)
    )

    it('should fail on wrong data type', () => 
        expect(() => 
               logic.unregisterVehicle(123)
    ).to.throw(`vehicle ID with value 123 is not a string`)
    )

    after(() => mongoose.disconnect())
})