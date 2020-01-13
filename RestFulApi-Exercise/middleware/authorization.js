const config = require('config');
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = jwt.verify(req.header('x-auth-JWT'), config.get('JWTkey'));
    token.isAdmin === true? next() : res.status(403).send(`you don't have enouth permission to make this request`);
}
