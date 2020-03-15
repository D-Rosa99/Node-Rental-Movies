module.exports = (error, req, res, next) => {
    console.log(`something went wrong ${error}` );
    res.status(500).send(`something went wrong!! ${error}`)
};
