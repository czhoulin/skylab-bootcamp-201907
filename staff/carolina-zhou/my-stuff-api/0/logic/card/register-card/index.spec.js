const mongoose = require('mongoose')
const { expect } = require('chai')
const logic = require('../../')
const { User, Card } = require('../../../data')

describe('logic - register card', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id, _number, expiration

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        _number = `555-${Math.random()}`

        expiration = new Date

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password }))
            .then(user => id = user.id)
    })

    it('should succeed on correct data', () =>
        logic.registerCard(id, _number, expiration)
            .then(_id => {
                cardId = _id

                return User.findById(id)
            })
            .then(user => {
                expect(user).to.exist

                const { cards } = user

                expect(cards).to.have.lengthOf(1)

                const [card] = cards

                expect(card).to.exist
                expect(card.number).to.equal(_number)
                expect(card.expiration).to.deep.equal(expiration)
            })
    )

    it('should fail on empty id', () => 
        expect(() => 
               logic.registerCard('')
    ).to.throw('id is empty or blank')
    )

     it('should fail on undefined id', () => 
        expect(() => 
               logic.registerCard(undefined)
    ).to.throw(`id with value undefined is not a string`)
    )

     it('should fail on wrong id data type', () => 
        expect(() => 
               logic.registerCard(123)
    ).to.throw(`id with value 123 is not a string`)
    )

    after(() => mongoose.disconnect())
})

// const mongoose = require('mongoose')
// const logic = require('../../')
// const { expect } = require('chai')
// const { User, Card } = require('../../../data')

// describe('logic - register card', () => {

//     before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
    
//     let number, expiration, id, _user
//     let name, surname, email, password

//     beforeEach(() => {
//         ​
//         name = `name-${Math.random()}`
//         surname = `surname-${Math.random()}`
//         email = `email-${Math.random()}@email.com`
//         password = `123-${Math.random()}`
// ​
//         number = `555-${Math.random()}`
//         expiration = '09/19'
// ​
//         return User.deleteMany()
//         .then(() => User.create({ name, surname, email, password }))
//         .then(user => {
//             _user = user
//             id = user.id
//         })
//     })

//     it('should succeed on correct data', () => {
//         let _cardId
//         logic.registerCard(id, number, expiration)
//             .then(cardId => {
//                 expect(cardId).to.exist
//                 _cardId = cardId
//                 return User.findById({ _id: id })
//             })
//             .then(user => {
//                 expect(user.cards).to.exist
//                 expect(user.cards[user.cards.length - 1].id).to.equal(_cardId)
//             })
//         })
// ​
//     it('should fail if the card already exists', () => {
//         _user.cards.push(new Card({ number, expiration }))
//         _user.save()
//         .then(() => logic.registerCard(id, number, expiration))
//         .catch( error =>{
//                 expect(error).to.exist
//                 expect(error.message).to.equal(`card already exists.`)
//         })
//     })
// ​
//     /* Number */
//     it('should fail on empty card number', () => 
//         expect(() => 
//                logic.registerCard(id, '', expiration)
//     ).to.throw('card number is empty or blank')
//     )
// ​
//      it('should fail on undefined card number', () => 
//         expect(() => 
//                logic.registerCard(id, undefined, expiration)
//     ).to.throw(`card number with value undefined is not a string`)
//     )
// ​
//      it('should fail on wrong data type for card number', () => 
//         expect(() => 
//                logic.registerCard(id, 123, expiration)
//     ).to.throw(`card number with value 123 is not a string`)
//     )
// ​
//     /* expiration */
//     it('should fail on empty expiration date', () => 
//         expect(() => 
//                logic.registerCard(id, number, '')
//     ).to.throw('expiration date is empty or blank')
//     )
// ​
//      it('should fail on undefined expiration date', () => 
//         expect(() => 
//                logic.registerCard(id, number, undefined)
//     ).to.throw(`expiration date with value undefined is not a valid date`)
//     )
// ​
//      it('should fail on wrong data type for expiration date', () => 
//         expect(() => 
//                logic.registerCard(id, number, 123)
//     ).to.throw(`expiration date with value 123 is not a valid date`)
//     )

//     after(() => mongoose.disconnect())
// })