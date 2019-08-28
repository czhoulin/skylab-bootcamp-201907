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
        const user = await User.findById(id)
        expect(user).not.to.exist
    })

    it('should fail on undefined id', () => 
        expect(() => 
               logic.unregisterVehicle(undefined)
    ).to.throw(`vehicle ID with value undefined is not a string`)
    )

    it('should fail on wrong data type', () => 
        expect(() => 
               logic.unregisterVehicle(123)
    ).to.throw(`vehicle ID with value 123 is not a string`)
    )

    after(() => mongoose.disconnect())
})