const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try {
        const token = jwt.verify(req.header('x-auth-JWT'), config.get('JWTkey'));
        return next();
    } catch (error) {
        return res.status(400).send('Invalid token!');
    }
}
