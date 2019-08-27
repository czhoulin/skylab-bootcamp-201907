const { expect } = require('chai')
const logic = require('../../')
// const data = require('../../data')
// Add:
const { User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - register user', () => {
    /* let client, users
    before(() => {
        return data('mongodb://localhost', 'my-api-test')
            .then(({ client: _client, db }) => {
                client = _client

                users = db.collection('users')

                logic.__users__ = users
            })
    }) */

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        // users --> User
        return User.deleteMany()
    })

    it('should succeed on correct data', () =>
        logic.registerUser(name, surname, email, password)
            .then(result => {
                expect(result).not.to.exist

                // users --> User
                return User.findOne({ email })
            })
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
            })
    )

    // name
    it('should fail on empty name', () => 
        expect(() => 
               logic.registerUser('', surname, email, password)
    ).to.throw('name is empty or blank')
    )

     it('should fail on undefined name', () => 
        expect(() => 
               logic.registerUser(undefined, surname, email, password)
    ).to.throw(`name with value undefined is not a string`)
    )

     it('should fail on wrong password data name', () => 
        expect(() => 
               logic.registerUser(123, surname, email, password)
    ).to.throw(`name with value 123 is not a string`)
    )

    // surname
    it('should fail on empty surname', () => 
        expect(() => 
               logic.registerUser(name, '', email, password)
    ).to.throw('surname is empty or blank')
    )

     it('should fail on undefined surname', () => 
        expect(() => 
               logic.registerUser(name, undefined, email, password)
    ).to.throw(`surname with value undefined is not a string`)
    )

     it('should fail on wrong password data surname', () => 
        expect(() => 
               logic.registerUser(name, 123, email, password)
    ).to.throw(`surname with value 123 is not a string`)
    )

    // email
     it('should fail on undefined email', () => 
        expect(() => 
               logic.registerUser(name, surname, undefined, password)
    ).to.throw(`email with value undefined is not a string`)
    )

     it('should fail on wrong email data type', () => 
        expect(() => 
               logic.registerUser(name, surname, 123, password)
    ).to.throw(`email with value 123 is not a string`)
    )

    // password
    it('should fail on empty password', () => 
        expect(() => 
               logic.registerUser(name, surname, email, '')
    ).to.throw('password is empty or blank')
    )

     it('should fail on undefined password', () => 
        expect(() => 
               logic.registerUser(name, surname, email, undefined)
    ).to.throw(`password with value undefined is not a string`)
    )

     it('should fail on wrong password data type', () => 
        expect(() => 
               logic.registerUser(name, surname, email, 123)
    ).to.throw(`password with value 123 is not a string`)
    )

    // after(() => client.close())
    after(() => mongoose.disconnect())
})