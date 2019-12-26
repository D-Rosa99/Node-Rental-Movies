const mongoose = require('mongoose');
const express = require('express');
const App = express();

const genresRouter = require('./Routers/genres');

mongoose.connect('mongodb://localhost/RentalMovies',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Database connecting successfully!'))
.catch( ex => console.log(`Something went wrong ${ex}`));

App.use(express.json());
App.use('/RentalMovies/api/genres', genresRouter);

const port = process.env.PORT || 3000;
App.listen(port, () => console.log(`Server start on port ${port}`));
