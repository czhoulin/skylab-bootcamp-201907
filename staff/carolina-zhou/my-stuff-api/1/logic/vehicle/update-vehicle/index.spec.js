const { expect } = require('chai')
const logic = require('../../')
const { User, Vehicle } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - update vehicle', () => {
    
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

        body = {
            brand: `brand-${Math.random()}`,
            model: `model-${Math.random()}`,
            year: Number((Math.random()*1000).toFixed()),
            type: `${typeArray[Math.floor(Math.random() * typeArray.length)]}`,
            color: `color-${Math.random()}`,
            electric: Boolean(Math.round(Math.random())),
            plate: `plate-${Math.random()}`
        }

        await Vehicle.deleteMany()
        const newVehicle = await Vehicle.create({brand, model, year, type, color, electric, plate})
        id = newVehicle.id.toString()
    })

    it('should succeed on correct data', async() => {
        const result = await logic.updateVehicle(id, body)
        expect(result).not.to.exist
        const vehicle = await Vehicle.findById(id)
        expect(vehicle).to.exist
        expect(vehicle.id).to.equal(id)
        expect(vehicle.brand).to.equal(body.brand)
        expect(vehicle.model).to.equal(body.model)
        expect(vehicle.year).to.equal(body.year)
        expect(vehicle.type).to.equal(body.type)
        expect(vehicle.color).to.equal(body.color)
        expect(vehicle.electric).to.equal(body.electric)
    })

    it('should fail on non-existing vehicle', async () => {
        id = '5d5d5530531d455f75da9fF9'

        try{
            await logic.updateVehicle(id, body)

            throw new Error('should not reach this point')
        } catch({ message }) {
            expect(message).to.equal(`vehicle with id ${id} does not exist`)
        }
    })

    it('should fail on empty id', async () => {
        id = ''

        try{
            await logic.updateVehicle(id, body)
        } catch({ message }) {
            expect(message).to.equal('vehicle id is empty or blank')
        }
    })

    it('should fail on undefined id', async () => {
        id = undefined

        try{
            await logic.updateVehicle(id, body)
        } catch({ message }) {
            expect(message).to.equal("vehicle id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong id data type', async() => {
        id = 123

        try{
            await logic.updateVehicle(id, body)
        } catch({ message }) {
            expect(message).to.equal("vehicle id with value 123 is not a string")
        }
    })

    it('should fail on empty body', async () => {
        body = ''

        try{
            await logic.updateVehicle(id, body)
        } catch({ message }) {
            expect(message).to.equal('body is empty or blank')
        }
    })

    it('should fail on undefined body', async () => {
        body = undefined

        try{
            await logic.updateVehicle(id, body)
        } catch({ message }) {
            expect(message).to.equal("body with value undefined is not an object")
        }
    })
     
    it('should fail on wrong body data type', async() => {
        body = 123

        try{
            await logic.updateVehicle(id, body)
        } catch({ message }) {
            expect(message).to.equal("body with value 123 is not an object")
        }
    })

    after(() => mongoose.disconnect())
})