const { expect } = require('chai')
const logic = require('../../')
// const data = require('../../data')
// const { ObjectId } = require('mongodb')
// Add:
const { User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - update user', () => {
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

    let name, surname, email, password, id, body

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

        // users --> User
        return User.deleteMany()
            // this.__users__.insertOne() --> User.create()
            .then(() => User.create({ name, surname, email, password }))
            //.then(result => id = result.insertedId.toString())
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
    )

    it('should fail on non-existing user', () => {
        id = '5d5d5530531d455f75da9fF9'

        return logic.updateUser(id, body)
            .then(() => { throw new Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal(`user with id ${id} does not exist`))
    })

    // after(() => client.close())
    after(() => mongoose.disconnect())
})