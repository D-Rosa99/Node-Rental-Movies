const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Genres = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 3,
        lowercase: true,
        unique: true
    }
}));

function inputValidation(userInput) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    return schema.validate(userInput)
};

module.exports = { Genres, inputValidation };
