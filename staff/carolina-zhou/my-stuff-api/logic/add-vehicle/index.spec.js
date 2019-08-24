const { expect } = require('chai')
const logic = require('..')
const { Vehicle } = require('../../data')
const mongoose = require('mongoose')

describe('logic - add vehicle', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let brand, model, year, type, color, electric, plate

    beforeEach(() => {
        typeArray = ['tourism', 'suv', 'van', 'coupe', 'cabrio', 'roadster', 'truck']

        brand = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = `${Math.random()}`
        type = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`
        color = `color-${Math.random()}`
        electric = `${Math.random() >= 0.5}`
        plate = `${Math.random()}`

        return Vehicle.deleteMany()
    })

    it('should succeed on correct data', () =>
        logic.addVehicle(brand, model, year, type, color, electric, plate)
            .then(result => {
                expect(result).not.to.exist

                return Vehicle.findOne({ brand, model, year, type, color, electric, plate })
            })
            .then(vehicle => {
                const carYear = vehicle.year
                const carElectric = vehicle.electric
                const carPlate = vehicle.plate

                expect(vehicle).to.exist
                expect(vehicle.brand).to.equal(brand)
                expect(vehicle.model).to.equal(model)
                expect(carYear.toString()).to.equal(year)
                expect(vehicle.type).to.equal(type)
                expect(vehicle.color).to.equal(color)
                expect(carElectric.toString()).to.equal(electric)
                expect(carPlate.toString()).to.equal(plate)
            })
    )

    after(() => mongoose.disconnect())
})