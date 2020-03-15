const express = require('express');
const error = require('../middleware/error-validation');
const router_auth = require('../routers/router-auth');
const router_customers = require('../routers/router-customers');
const router_movies = require('../routers/router-movies');
const router_genres = require('../routers/router-genres');
const router_users = require('../routers/router-users');
const router_rentalMovies = require('../routers/router-rentalMovies');
const App = express();

module.exports = function () {
    App.use(express.json());
    App.use('/api/rentalMovie/auth/', router_auth);
    App.use('/api/rentalMovie/customers/', router_customers);
    App.use('/api/rentalMovie/genres/', router_genres);
    App.use('/api/rentalMovie/movies/', router_movies);
    App.use('/api/rentalMovie/users/', router_users);
    App.use('/api/rentalMovie/rentMovie/', router_rentalMovies);
    App.use(error);
    App.listen(5000, () => console.log('server up!'));
}
