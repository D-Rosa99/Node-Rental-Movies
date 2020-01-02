const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const RentalMovies = mongoose.model('RentalMovie', new mongoose.Schema({
    dateOfRent: {
        type: Date,
        default: Date.now(),
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    status: {
        type:String,
        required: true,
        enum: ['valid', 'invalid'],
        default: 'valid'
    },
    totalPrice: {
        type: Number,
        required: true,
    }

}));

function inputValidation(userInput) {
    const squema = Joi.object({
        customer: Joi.string().required(),
        movie: Joi.string().required(),
    });

    return squema.validate(userInput);
};

module.exports = { RentalMovies, inputValidation };
