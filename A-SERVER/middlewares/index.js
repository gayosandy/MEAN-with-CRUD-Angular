const ObjectId = require('mongoose').Types.ObjectId

const validateId = (req, res, next) => {
    if(ObjectId.isValid(req.params.id) == false)
    res.status(400).json({
        error: 'given object ID (${req.params.id}) is not valid.'
    })
    else
    next()
}

const raiseRecord404Error = (req, res) => {
    res.status(404).json({
        error: 'No record with given _id: ' + req.params.id
    })
}

const errorHandler = (error, req, res, next) => {
    res.status(500).json({ error })
}

module.exports = {
    validateId,
    raiseRecord404Error,
    errorHandler
}