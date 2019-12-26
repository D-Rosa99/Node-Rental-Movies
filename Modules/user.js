const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Users = mongoose.model('User', new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 3,
        maxlength: 10,
        required: true
    }
}));

function inputValidation(userInput) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().max(10).min(3).required()
    });

    schema.validate(userInput);
}

module.exports = { Users, inputValidation };
