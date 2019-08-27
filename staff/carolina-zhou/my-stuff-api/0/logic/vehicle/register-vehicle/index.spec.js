const { expect } = require('chai')
const logic = require('../../')
const { User, Vehicle } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - register vehicle', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
    
    let brand, model, year, type, color, electric, plate, id, vehicleId

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
        logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
            .then(result => {
                vehicleId = result
                expect(vehicleId).to.exist
                return Vehicle.findOne({ plate })
            })
            .then(vehicle => {
                expect(vehicle).to.exist
                expect(vehicle.id).to.equal(vehicleId)
                expect(vehicle.brand).to.equal(brand)
                expect(vehicle.model).to.equal(model)
                expect(vehicle.year).to.equal(year)
                expect(vehicle.type).to.equal(type)
                expect(vehicle.color).to.equal(color)
                expect(vehicle.electric).to.equal(electric)
            })
    )

    it('should fail if the vehicle already exists', () =>
       Vehicle.create({ brand, model, year, type, color, electric, plate })
           .then (() => logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
               .catch( error =>{
                   expect(error).to.exist
                   expect(error.message).to.equal(`vehicle already exists`)
               })
           )
    )

    // The following 3 tests can/should be applied to for every parameter passed to logic 
    it('should fail on empty brand', () => 
        expect(() => 
               logic.registerVehicle('', model, year, type, color, electric, plate, id)
    ).to.throw('brand is empty or blank')
    )

     it('should fail on undefined brand', () => 
        expect(() => 
               logic.registerVehicle(undefined, model, year, type, color, electric, plate, id)
    ).to.throw(`brand with value undefined is not a string`)
    )

     it('should fail on wrong data type', () => 
        expect(() => 
               logic.registerVehicle(123, model, year, type, color, electric, plate, id)
    ).to.throw(`brand with value 123 is not a string`)
    )

    after(() => mongoose.disconnect())
})