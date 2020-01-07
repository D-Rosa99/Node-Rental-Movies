const express = require('express');
const Router = express.Router();

const { Users, inputValidation } = require('../Modules/user');

Router.get('/:name', async (req, res) => {
    const getUser = await Users.find({ name: req.params.name });
    if( !getUser[0] )return res.status(404).send(`This user does not exist`);

    res.status(200).json(getUser);
});

Router.post('/', async (req, res) => {
    const { error, value } = inputValidation(req.body);
    if(error)return res.status(400).send(`Sorry something faild ${error.details[0].message}`);

    const getUser = await Users.find({ name: req.params.name });
    if( !getUser[0] )return res.status(400).send(`There's already a user with that name`);

    const userModel = new Users(value);
    await userModel.save();
    res.status(200).send('Saved it successfully!');
});

Router.put('/:name', async (req, res) => {
    const getUser = findGenre(req.params.name);
    if(!getUser[0])return res.status(404).send(`This name ${req.params.name} is not a valid user`);

    const { error, value } = await Users.find({ name: req.params.name });
    if(error)return res.status(400).send(`Sorry something faild ${error.details[0].message}`)

    await Users.updateOne({_id: getUser[0]._id}, {$set: value});
    res.status(200).send('Updated it success!');
});

Router.delete('/:name', async (req, res) => {
    const getUser = await Users.find({ name: req.params.name });
    if(!getUser[0])return res.status(400).send(`This name ${req.params.name} have been deleted or is not a valid genre`);

    await Users.deleteOne({_id: getUser[0]._id});
    res.status(200).send('Deleted it successfully!');
});

module.exports = Router;
