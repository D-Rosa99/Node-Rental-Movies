const express = require('express');
const Router = express.Router();

const { RentalMovies, inputValidation } = require('../Modules/rentalMovie');
const { Movies } = require('../Modules/movies');
const { Customers } = require('../Modules/customers');

Router.get('/', async (req, res) => {
    const getRentalMovie = await RentalMovies.find()
    .populate({ path: 'movie', select: 'name -_id'})
    .populate({ path: 'customer', select: 'name -_id'});

    return res.status(200).json(getRentalMovie);
});

Router.get('/:id', async (req, res) => {
    const getRentalMovie = await RentalMovies.findById({_id: req.params.id.toString()})
    .populate({ path: 'movie', select: 'name -_id'})
    .populate({ path: 'customer', select: 'name -_id'})
    .catch(() => res.status(404).send(`There's not a bill with that id`));

    res.status(200).json(getRentalMovie);
});

Router.post('/', async (req, res) => {
    const { error, value } = inputValidation(req.body);
    if(error)return res.status(404).send(`Sorry something faild ${error.details[0].message}`);

    const getMovie = await Movies.find({ name: value.movie });
    if(!getMovie[0])return res.status(400).send(`This movie ${req.body.movie} is not a valid movie`);

    const getCustomer = await Customers.find({ name: value.customer });
    if(!getCustomer[0])return res.status(400).send(`This customer ${req.body.customer} is not a valid customer`);

    value.totalPrice = getMovie[0].price;
    value.movie = getMovie[0]._id;
    value.customer = getCustomer[0]._id;
    const rentalMovieModel = new RentalMovies(value);
    await rentalMovieModel.save();
    res.status(200).send('Saved successfully!');
});

/*  Put just change the status of the bill to invalid because
    it's suppose that any bill should be deleted and that's why 
    I did not create a delete one.
*/
Router.put('/:id', async (req, res) => {
    await RentalMovies.findByIdAndUpdate({ _id: req.params.id}, {$set: { 'status': 'invalid'}})
    .catch( () => res.status(400).send(`This name ${req.params.id} is not a valid bill`));
    
    res.status(200).send('This bill has been invalidated successfully!');
});

module.exports = Router;
