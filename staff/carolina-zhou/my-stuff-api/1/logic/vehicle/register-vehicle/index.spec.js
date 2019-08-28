const { expect } = require('chai')
const logic = require('../../')
const { User, Vehicle } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - register vehicle', () => {

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

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`
        
        const user = await User.create({ name, surname, email, password })
        id = user._id.toString()
    })

    it('should succeed on correct data', async () => {

        const result = await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        vehicleId = result
        expect(vehicleId).to.exist
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

    it('should fail if the vehicle already exists', async () => {
        await Vehicle.create({ brand, model, year, type, color, electric, plate })

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`vehicle already exists`)            
        }
    })

    // brand
    it('should fail on empty brand', async () => {
        brand = ''

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('brand is empty or blank')
        }
    })

    it('should fail on undefined brand', async () => {
        brand = undefined

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('brand with value undefined is not a string')
        }
    })

    it('should fail on wrong brand data type', async () => {
        brand = 123

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('brand with value 123 is not a string')
        }
    })

    // model
    it('should fail on empty model', async () => {
        model = ''

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('model is empty or blank')
        }
    })

    it('should fail on undefined model', async () => {
        model = undefined

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('model with value undefined is not a string')
        }
    })

    it('should fail on wrong model data type', async () => {
        model = 123

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('model with value 123 is not a string')
        }
    })

    // year
    it('should fail on empty year', async () => {
        year = ''

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('year is empty or blank')
        }
    })

    it('should fail on undefined year', async () => {
        year = undefined

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('year with value undefined is not a number')
        }
    })

    it('should fail on wrong year data type', async () => {
        year = '123'

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('year with value 123 is not a number')
        }
    })

    // type
    it('should fail on empty type', async () => {
        type = ''

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('type is empty or blank')
        }
    })

    it('should fail on undefined type', async () => {
        type = undefined

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('type with value undefined is not a string')
        }
    })

    it('should fail on wrong type data type', async () => {
        type = 123

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('type with value 123 is not a string')
        }
    })

    // color
    it('should fail on empty color', async () => {
        color = ''

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('color is empty or blank')
        }
    })

    it('should fail on undefined color', async () => {
        color = undefined

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('color with value undefined is not a string')
        }
    })

    it('should fail on wrong type data color', async () => {
        color = 123

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('color with value 123 is not a string')
        }
    })

    // electric
    it('should fail on empty electric', async () => {
        electric = ''

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('electric is empty or blank')
        }
    })

    it('should fail on undefined electric', async () => {
        electric = undefined

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('electric with value undefined is not a boolean')
        }
    })

    it('should fail on wrong type data electric', async () => {
        electric = 123

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('electric with value 123 is not a boolean')
        }
    })

    // plate
    it('should fail on empty plate', async () => {
        plate = ''

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('plate is empty or blank')
        }
    })

    it('should fail on undefined plate', async () => {
        plate = undefined

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('plate with value undefined is not a string')
        }
    })

    it('should fail on wrong type data plate', async () => {
        plate = 123

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('plate with value 123 is not a string')
        }
    })

    // id
    it('should fail on empty id', async () => {
        id = ''

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('id is empty or blank')
        }
    })

    it('should fail on undefined id', async () => {
        id = undefined

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('id with value undefined is not a string')
        }
    })

    it('should fail on wrong id data type', async () => {
        id = 123

        try {
            await logic.registerVehicle(brand, model, year, type, color, electric, plate, id)
        } catch({message}) {
            expect(message).to.equal('id with value 123 is not a string')
        }
    })

    after(() => mongoose.disconnect())
})