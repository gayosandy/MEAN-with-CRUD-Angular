const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

const connectDb = require('./db.js')
const reservationRoutes = require('./controllers/reservation.controller')
const { errorHandler } = require('./middlewares/index.js')
const app = express()


app.use(bodyParser.json())
app.use(cors({origin: 'http://localhost:4200'}))
app.use('/api/reservations', reservationRoutes)
app.use(errorHandler)


connectDb()
    .then(() => {
        console.log('db connection sucess')
        app.listen(3000, 
            ()=> console.log('server started at 3000'))
    })
    .catch(err => {
        console.log(err)
    })