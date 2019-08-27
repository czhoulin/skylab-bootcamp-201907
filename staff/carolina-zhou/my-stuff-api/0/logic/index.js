module.exports = {
    registerUser: require('./user/register-user'),
    authenticateUser: require('./user/authenticate-user'),
    retrieveUser: require('./user/retrieve-user'),
    updateUser: require('./user/update-user'),
    unregisterUser: require('./user/unregister-user'),
    registerVehicle: require('./vehicle/register-vehicle'),
    retrieveAllVehicles: require('./vehicle/retrieve-all-vehicles'),
    retrieveVehicle: require('./vehicle/retrieve-vehicle'),
    updateVehicle: require('./vehicle/update-vehicle'),
    unregisterVehicle: require('./vehicle/unregister-vehicle'),
    registerProperty: require('./property/register-property'),
    registerPropertyOwner: require('./property/register-owner'),
    retrieveAllProperties: require('./property/retrieve-all-properties'),
    retrieveProperty: require('./property/retrieve-property'),
    updateProperty: require('./property/update-property'),
    unregisterProperty: require('./property/unregister-property'),
    unregisterPropertyOwner: require('./property/unregister-owner'),
    registerCard: require('./card/register-card'),
    retrieveCard: require('./card/retrieve-card'),
    retrieveAllCards: require('./card/retrieve-all-cards'),
    unregisterCard: require('./card/unregister-card')
}