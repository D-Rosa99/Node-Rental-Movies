const express = require('express');
const Router = express.Router();

const { Customers, inputValidation } = require('../Modules/customers');

Router.get('/', async (req, res) => {
    const getCustomers = await Customers.find();

    return res.status(200).json(getCustomers);
});

Router.get('/:name', async (req, res) => {
    const getCustomer = await Customers.find({name: req.params.name});
    if(!getCustomer[0])return res.status(404).send(`This customer does not exist`);

    res.status(200).json(getCustomer);
});

Router.post('/', async (req, res) => {
    const { error, value } = inputValidation(req.body);
    if(error)return res.status(400).send(`Sorry something faild ${error.details[0].message}`);

    const getCustomer = new Customers(value);
    await getCustomer.save();
    res.status(200).send('Saved it successfully!');
});

Router.put('/:name', async (req, res) => {
    const getCustomer = await Customers.find({name: req.params.name});
    if(!getCustomer[0])return res.status(400).send(`This name ${req.params.name} is not a valid customer`);

    const { error, value } = inputValidation(req.body);
    if(error)return res.status(404).send(`Sorry something faild ${error.details[0].message}`)

    await Customers.updateOne({_id: getCustomer[0]._id}, {$set: value});
    res.status(200).send('Updated it success!');
});

Router.delete('/:name', async (req, res) => {
    const getCustomer = await Customers.find({name: req.params.name});
    if(!getCustomer[0])return res.status(400).send(`This name ${req.params.name} is not a valid customer`);

    await Customers.deleteOne({_id: getCustomer[0]._id});
    res.status(200).send('Deleted it successfully!');
});

module.exports = Router;
