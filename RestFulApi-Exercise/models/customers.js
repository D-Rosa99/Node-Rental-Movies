const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Customers = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
}));

function InputValidation(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required()
    });

    return schema.validate(customer);
}

module.exports = {Customers, InputValidation};
