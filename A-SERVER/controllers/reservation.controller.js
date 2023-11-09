const express = require('express')
const router = express.Router()
const Reservation = require('../models/reservation.model')
const { generateCrudMethods } = require('../services/index.js')
const reservationCrud = generateCrudMethods(Reservation)
const { validateId, raiseRecord404Error } = require('../middlewares/index.js')



router.get('/', (req, res, next) => {
    reservationCrud.getAll()
        .then(data => res.send(data))
        .catch( err => next(err))
})

router.get('/:id', validateId, (req, res, next) => {
    reservationCrud.getById(req.params.id)
        .then(data => {
            if(data)
            res.send(data)
            else
            raiseRecord404Error(req, res)
        }) 
        .catch( err => next(err))
})

router.post('/', (req, res, next) => {
    const newRecord = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        citystate: req.body.citystate,
        zip: req.body.zip,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        numNights: req.body.numNights,
        numRooms: req.body.numRooms,
        numGuest: req.body.numGuest,
        catRates: req.body.catRates,
        arrivalDate: req.body.arrivalDate,
    }
    console.log(req.body)
    reservationCrud.create(newRecord)
        .then(data => res.status(201).json(data))
        .catch( err => next(err))
})

router.put('/:id', validateId, (req, res) => {
    const updatedRecord = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        citystate: req.body.citystate,
        zip: req.body.zip,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        numNights: req.body.numNights,
        numRooms: req.body.numRooms,
        numGuest: req.body.numGuest,
        catRates: req.body.catRates,
        arrivalDate: req.body.arrivalDate,
    }
    reservationCrud.update(req.params.id, updatedRecord)
    .then(data => {
        if(data) 
        res.send(data)
        else
        raiseRecord404Error(req, res)
    }) 
    .catch( err => next(err))
})

router.delete('/:id', validateId, (req, res) => {
    reservationCrud.delete(req.params.id)
    .then(data => {
        if(data) 
        res.send(data)
        else
        raiseRecord404Error(req, res)
    }) 
    .catch( err => next(err))
})

module.exports = router