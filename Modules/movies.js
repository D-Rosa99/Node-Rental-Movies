const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Movies = mongoose.model('Movie', new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    totalStock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}));

function inputValidation(userInput) {
    const squema = Joi.object({
        name: Joi.string().required(),
        genre: Joi.string().required(),
        totalStock: Joi.number().required(),
        price: Joi.number().required()
    });

    return squema.validate(userInput);
};

module.exports = { Movies, inputValidation };
