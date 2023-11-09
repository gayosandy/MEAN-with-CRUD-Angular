const mongoose = require('mongoose')

module.exports = mongoose.model('Reservation', {
    firstName: { type: String},
    lastName: { type: String},
    address: {type: String},
    citystate: {type: String},
    zip: {type: Number},
    phoneNumber: {type: Number},
    email: {type: String},
    numNights: {type: Number},
    numRooms: {type: Number},
    numGuest: {type: Number},
    catRates: {type: Array},
    arrivalDate: {type: String},

})