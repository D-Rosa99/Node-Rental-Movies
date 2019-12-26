const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Customers = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        lowercase: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        minlength: 3,
        maxlength: 10,
        required: true
    },
    isGold: {
        type: Boolean,
        required: true,
        default: false
    }
}));

function inputValidation(userInput) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email(),
        password: Joi.string().min(3).max(10).required(),
        isGold: Joi.bool().required()
    })

    return schema.validate(userInput);
};

module.exports = { Customers, inputValidation };
