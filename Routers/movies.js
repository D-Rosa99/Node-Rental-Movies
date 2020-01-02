const express = require('express');
const Router = express.Router();

const { Movies, inputValidation } = require('../Modules/movies');
const { Genres } = require('../Modules/genres');

Router.get('/', async (req, res) => {
    const getMovies = await Movies.find()
    .populate({ path: 'genre', select: 'name -_id' });

    return res.status(200).json(getMovies);
});

Router.get('/:name', async (req, res) => {
    const getMovie = await Movies.find({name: req.params.name})
    .populate({path: 'genre', select: 'name -_id'});
    if(!getMovie[0])return res.status(404).send(`This movie does not exist`);
    
    res.status(200).json(getMovie);
});

Router.post('/', async (req, res) => {
    const { error, value } = inputValidation(req.body);
    if(error)return res.status(400).send(`Sorry something faild ${error.details[0].message}`);

    const getGenre = await Genres.find({ name: value.genre });
    if(!getGenre[0])return res.status(400).send(`This genre ${req.body.genre} is not a valid genre`);

    value.genre = getGenre[0]._id;
    const moviesModel = new Movies(value);
    await moviesModel.save();
    res.status(200).send('Saved it successfully!');
});

Router.put('/:name', async (req, res) => {
    const getMovie = await Movies.find({name: req.params.name});
    if(!getMovie[0])return res.status(400).send(`This name ${req.params.name} is not a valid movie`);
    
    const { error, value } = inputValidation(req.body);
    if(error)return res.status(404).send(`Sorry something faild ${error.details[0].message}`)
    
    const getGenre = await Genres.find({ name: req.body.genre });
    if(!getGenre[0])return res.status(400).send(`This genre ${req.body.genre} is not a valid genre`);
    
    if(req.body.genre === getGenre[0].name || req.body.name === getMovie[0].name)return res
    .status(400)
    .send('You just can update the totalStock and price fields');
    
    value.genre = getGenre[0]._id;
    await Movies.updateOne({_id: getMovie[0]._id}, {$set: value});
    res.status(200).send('Updated it success!');
});

Router.delete('/:name', async (req, res) => {
    const getMovie = await Movies.find({name: req.params.name});
    if(!getMovie[0])return res.status(400).send(`This name ${req.params.name} is not a valid movie`);

    await Movies.deleteOne({_id: getMovie[0]._id});
    res.status(200).send('Deleted it successfully!');
});

module.exports = Router;
