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
        unique: true,
        required: true
    },
}));

function inputValidation(userInput) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required()
    });

    return schema.validate(userInput);
};

module.exports = { Customers, inputValidation };
