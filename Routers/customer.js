const express = require('express');
const Router = express.Router();

const { Customers, inputValidation } = require('../Module/customer');

Router.get('/', async (req, res) => {
    const result = await Customers.find();

    return res.status(200).json(result);
});

Router.get('/:name', async (req, res) => {
    const result = await Customers.find({name: req.params.name});

    res.status(200).json(result);
});

Router.post('/', async (req, res) => {
    const { error, value } = inputValidation(req.body);

    if(error)return res.status(404).send(`Sorry something faild ${error.details[0].message}`);

    const result = new Customers(value);
    await result.save();
    res.status(200).send('Saved it successfully!');
});

Router.put('/:name', async (req, res) => {
    const result = await Customers.find({name: req.params.name});
    if(!result[0])return res.status(400).send(`This name ${req.params.name} is not a valid genre`);

    const { error, value } = inputValidation(req.body);
    if(error)return res.status(404).send(`Sorry something faild ${error.details[0].message}`)

    await Customers.updateOne({_id: result[0]._id}, {$set: value});
    res.status(200).send('Updated it success!');
});

Router.delete('/:name', async (req, res) => {
    const result = await Customers.find({name: req.params.name});
    if(!result[0])return res.status(400).send(`This name ${req.params.name} is not a valid genre`);

    await Customers.deleteOne({_id: result[0]._id});
    res.status(200).send('Deleted it successfully!');
});

module.exports = Router;
