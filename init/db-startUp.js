const mongoose = require("mongoose");

module.exports = function() {
  mongoose
    .connect("mongodb://localhost:27017/Movies", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("database connection successfully"))
    .catch(err =>
      console.log("there was a problem while trying to connect mongo", err)
    );
};
