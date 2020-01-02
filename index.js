const mongoose = require('mongoose');
const express = require('express');
const App = express();

const genresRouter = require('./Routers/genres');
const moviesRouter = require('./Routers/movies');
const customersRouter = require('./Routers/customer');
const rentalMovieRouter = require('./Routers/rentalMovie');

mongoose.connect('mongodb://localhost/RentalMovies',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Database connecting successfully!'))
.catch( ex => console.log(`Something went wrong ${ex}`));

App.use(express.json());
App.use('/RentalMovies/api/genres', genresRouter);
App.use('/RentalMovies/api/movies', moviesRouter);
App.use('/RentalMovies/api/customers', customersRouter);
App.use('/RentalMovies/api/rental', rentalMovieRouter);

const port = process.env.PORT || 3000;
App.listen(port, () => console.log(`Server start on port ${port}`));
