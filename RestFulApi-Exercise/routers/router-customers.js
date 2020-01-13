const express = require('express');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const { Customers, InputValidation} = require('../models/customers');
const Router = express();

Router.get('/', authentication, async (req, res) => {
    const result = await Customers.find().select('name -_id');
    
    res.json(result);
});

Router.post('/', [authentication, authorization], async (req, res) => {
    const { value, error } = InputValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const isUnique = await Customers.findOne({name: value.name});
    if(isUnique) return res.status(400).send('There is already a customer with that name');

    const customer = new Customers(value);

    await customer.save();
    res.send('save it successfully!');
});

Router.put('/:name', [authentication, authorization], async (req, res) => {
    const { value, error } = InputValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const isUnique = await Customers.findOne({name: value.name});
    if(isUnique) return res.status(400).send('There is already a customer with that name');

    const customer = await Customers.findOneAndUpdate({name: req.params.name},{$set: value });
    if(!customer) return res.status(400).send('Invalid input customer');

    return res.send('update it successfully!');
});

Router.delete('/:name', [authentication, authorization], async (req, res) => {
    const customer = await Customers.findOneAndDelete({name: req.params.name});
    if(!customer) return res.status(400).send('Invalid input customer');
    
    return res.send('delete it successfully!');
});

Router.get('/:name', [authentication, authorization], async (req, res) => {
    const result = await Customers.findOne({name: req.params.name}).select('name -_id');
    if(!result) return res.status(400).send('Invalid input customer');

    return res.json(result);
});

module.exports = Router;
