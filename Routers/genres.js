const express = require('express');
const Router = express.Router();

const { Genres, inputValidation } = require('../Modules/genres');

Router.get('/', async (req, res) => {
    const getGenre = await Genres.find();
    return res.status(200).json(getGenre);
});

Router.get('/:name', async (req, res) => {
    const getGenre = await Genres.find({ name: req.params.name });
    if( !getGenre[0] )return res.status(404).send(`This genre does not exist`);

    res.status(200).json(getGenre);
});

Router.post('/', async (req, res) => {
    const { error, value } = inputValidation(req.body);
    if(error)return res.status(400).send(`Sorry something faild ${error.details[0].message}`);

    const getGenre = await Genres.find({ name: req.params.name });
    if( !getGenre[0] )return res.status(400).send(`There's already a genre with that name`);

    const genreModel = new Genres(value);
    await genreModel.save();
    res.status(200).send('Saved it successfully!');
});

Router.put('/:name', async (req, res) => {
    const getGenre = findGenre(req.params.name);
    if(!getGenre[0])return res.status(404).send(`This name ${req.params.name} is not a valid genre`);

    const { error, value } = await Genres.find({ name: req.params.name });
    if(error)return res.status(400).send(`Sorry something faild ${error.details[0].message}`)

    await Genres.updateOne({_id: getGenre[0]._id}, {$set: value});
    res.status(200).send('Updated it success!');
});

Router.delete('/:name', async (req, res) => {
    const getGenre = await Genres.find({ name: req.params.name });
    if(!getGenre[0])return res.status(400).send(`This name ${req.params.name} have been deleted or is not a valid genre`);

    await Genres.deleteOne({_id: getGenre[0]._id});
    res.status(200).send('Deleted it successfully!');
});

module.exports = Router;
