const { expect } = require('chai')
const logic = require('../../')
const { User, Vehicle} = require('../../../data')
const mongoose = require('mongoose')

describe('logic - retrieve all vehicles', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
    
    let brand, model, year, type, color, electric, plate, id

    beforeEach(() => {
        const typeArray = ['tourism', 'suv', 'van', 'coupe', 'cabrio', 'roadster', 'truck']

        brand = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = Number((Math.random()*1000).toFixed())
        type = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`
        color = `color-${Math.random()}`
        electric = Boolean(Math.round(Math.random()))
        plate = `plate-${Math.random()}`

        return Vehicle.deleteMany()
            .then(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`

                return User.create({ name, surname, email, password })
            })
            .then(user => id = user._id.toString())
    })

    it('should succeed on correct data', () =>
        logic.retrieveAllVehicles(id)
            .then(result => {
                expect(result).to.exist
                return Vehicle.findOne({ plate })
            })
            /* .then(vehicle => {
                expect(vehicle).to.exist
                expect(vehicle.id).to.equal(vehicleId)
                expect(vehicle.brand).to.equal(brand)
                expect(vehicle.model).to.equal(model)
                expect(vehicle.year).to.equal(year)
                expect(vehicle.type).to.equal(type)
                expect(vehicle.color).to.equal(color)
                expect(vehicle.electric).to.equal(electric)
            }) */
    )

    it('should fail on empty id', () => 
        expect(() => 
               logic.retrieveAllVehicles('')
        ).to.throw('user id is empty or blank')
    )

    it('should fail on undefined id', () => 
        expect(() => 
               logic.retrieveAllVehicles(undefined)
    ).to.throw(`user id with value undefined is not a string`)
    )

    it('should fail on wrong data type', () => 
        expect(() => 
               logic.retrieveAllVehicles(123)
    ).to.throw(`user id with value 123 is not a string`)
    )

    after(() => mongoose.disconnect())
})