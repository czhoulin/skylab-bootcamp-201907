const { expect } = require('chai')
const logic = require('../../')
const { User, Vehicle} = require('../../../data')
const mongoose = require('mongoose')

describe('logic - retrieve vehicle', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
    
    let brand, model, year, type, color, electric, plate, id, vehicleId

    beforeEach(async() => {
        const typeArray = ['tourism', 'suv', 'van', 'coupe', 'cabrio', 'roadster', 'truck']

        brand = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = Number((Math.random()*1000).toFixed())
        type = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`
        color = `color-${Math.random()}`
        electric = Boolean(Math.round(Math.random()))
        plate = `plate-${Math.random()}`
        
        await Vehicle.deleteMany()

        const newVehicle = await Vehicle.create({brand, model, year, type, color, electric, plate})
        vehicleId = newVehicle.id.toString()
    })

    it('should succeed on correct data', async () => {
        const result = await logic.retrieveVehicle(vehicleId)
        expect(result).to.exist
        
        const vehicle = await Vehicle.findOne({ plate })
        expect(vehicle).to.exist
        expect(vehicle.id).to.equal(vehicleId)
        expect(vehicle.brand).to.equal(brand)
        expect(vehicle.model).to.equal(model)
        expect(vehicle.year).to.equal(year)
        expect(vehicle.type).to.equal(type)
        expect(vehicle.color).to.equal(color)
        expect(vehicle.electric).to.equal(electric)
    })

    it('should fail on empty id', async () => {
        try{
            await logic.retrieveVehicle(' ')
        } catch({ message }) {
            expect(message).to.equal('vehicle ID is empty or blank')
        }
    })

    it('should fail on undefined id', async () => {
          try{
            await logic.retrieveVehicle(undefined)
        } catch({ message }) {
            expect(message).to.equal("vehicle ID with value undefined is not a string")
        }
    })
     
    it('should fail on wrong id data type', async() => {
         try{
            await logic.retrieveVehicle(123)
        } catch({ message }) {
                expect(message).to.equal("vehicle ID with value 123 is not a string")
        }
    })

    after(() => mongoose.disconnect())
})