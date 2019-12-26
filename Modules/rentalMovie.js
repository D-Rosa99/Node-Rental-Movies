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
    movies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Movie',
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
    }

}));

function inputValidation(userInput) {
    const squema = Joi.object({
        dateOfRent: Joi.date().required(),
        customer: Joi.string().required(),
        movies: Joi.string().required(),
        totalPrice: Joi.number().required()
    });

    squema.validate(userInput);
};

module.exports = { RentalMovies, inputValidation };
