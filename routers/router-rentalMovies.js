const express = require("express");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const { Customers } = require("../models/customers");
const { Movies } = require("../models/movies");
const { RentalMovie, InputValidation } = require("../models/rentalMovies");
const Router = express();

Router.get("/", authentication, async (req, res) => {
  const result = await RentalMovie.find()
    .select("-__v")
    .populate({
      path: "movie",
      select: "name price genre -_id",
      populate: { path: "genre", select: "name -_id" }
    })
    .populate({ path: "customer", select: "name -_id" });

  res.json(result);
});

Router.post("/", [authentication, authorization], async (req, res) => {
  const { value, error } = InputValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const getCustomer = await Customers.findOne({ name: value.customer });
  if (!getCustomer) return res.status(400).send("Invalid input customer");

  const getMovie = await Movies.find({ name: { $in: value.movie } });
  if (getMovie.length !== value.movie.length)
    return res.status(400).send(`One or more of the movie are no valid`);

  value.movie = getMovie.map(movie => movie.id);
  value.customer = getCustomer._id;
  value.totalPrice = getMovie.reduce(
    (accumlator, movie) => (accumlator += movie.price),
    0
  );
  const rentMov = new RentalMovie(value);
  await rentMov.save();

  res.json("save it successfully!");
});

//It can't be delete a bill, just can put its status as invalid

Router.put("/:invalidId", [authentication, authorization], async (req, res) => {
  await RentalMovie.findOneAndUpdate(
    { _id: req.params.invalidId },
    { $set: { isValidBill: false } }
  );

  return res.status(200).send("This bill has being invalidated");
});

module.exports = Router;
