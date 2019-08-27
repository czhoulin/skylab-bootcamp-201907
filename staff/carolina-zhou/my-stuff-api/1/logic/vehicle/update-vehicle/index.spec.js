const { expect } = require('chai')
const logic = require('../../')
const { User, Vehicle } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - update vehicle', () => {
    
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    /* let name, surname, email, password, id, body

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        body = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            extra: `extra-${Math.random()}`
        }

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password }))
            .then(user => id = user.id)
    }) 
    
    it('should succeed on correct data', () =>
        logic.updateUser(id, body)
            .then(result => {
                expect(result).not.to.exist

                // return users.findOne({ _id: ObjectId(id) })
                return User.findById(id)
            })
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal(body.name)
                expect(user.surname).to.equal(body.surname)
                expect(user.email).to.equal(body.email)
                expect(user.password).to.equal(body.password)
                // expect(user.extra).to.equal(body.extra)
                expect(user.extra).not.to.exist
            })
    )*/


    it('should fail on non-existing vehicle', () => {
        id = '5d5d5530531d455f75da9fF9'

        return logic.updateVehicle(id, body)
            .then(() => { throw new Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal(`vehicle with id ${id} does not exist`))
    })

    it('should fail on undefined id', () => 
        expect(() => 
               logic.updateVehicle(undefined)
    ).to.throw(`vehicle id with value undefined is not a string`)
    )

    it('should fail on wrong data type', () => 
        expect(() => 
               logic.updateVehicle(123)
    ).to.throw(`vehicle id with value 123 is not a string`)
    )

    after(() => mongoose.disconnect())
})