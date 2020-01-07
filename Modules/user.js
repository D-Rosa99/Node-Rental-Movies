const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Users = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 255
    },
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
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
}));

function inputValidation(userInput) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().max(10).min(3).required()
    });

    schema.validate(userInput);
}

module.exports = { Users, inputValidation };
