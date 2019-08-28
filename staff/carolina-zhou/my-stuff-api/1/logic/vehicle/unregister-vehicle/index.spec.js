const { expect } = require('chai')
const logic = require('../../')
const { User, Vehicle } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - unregister vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let brand, model, year, type, color, electric, plate, id

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
        id = newVehicle.id
    })

    it('should succeed on correct data', async () => {
        const result = await logic.unregisterVehicle(id)
        expect(result).not.to.exist
        const vehicle = await Vehicle.findById(id)
        expect(vehicle).not.to.exist
    })

    it('should fail on empty id', async () => {
        id = ' '

        try{
            await logic.unregisterVehicle(id, password)
        } catch({ message }) {
            expect(message).to.equal('vehicle id is empty or blank')
        }
    })

    it('should fail on undefined id', async () => {
        id = undefined

          try{
            await logic.unregisterVehicle(id, password)
        } catch({ message }) {
            expect(message).to.equal("vehicle id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong id data type', async() => {
        id = 123

         try{
                await logic.unregisterVehicle(id, password)
            } catch({ message }) {
                expect(message).to.equal("vehicle id with value 123 is not a string")
            }
       
    })

    after(() => mongoose.disconnect())
})