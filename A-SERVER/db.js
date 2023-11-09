const mongoose = require('mongoose')

const dbUri = 'mongodb+srv://admin:pass1234@cluster1.wqermia.mongodb.net/reservation_db?retryWrites=true&w=majority'

module.exports = () => {
    return mongoose.connect(dbUri)
}