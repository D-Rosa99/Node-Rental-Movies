const express = require("express");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const { Movies, InputValidation } = require("../models/movies");
const { Genres } = require("../models/genres");
const Router = express();

Router.get("/", authentication, async (req, res) => {
  const result = await Movies.find()
    .select("-_id -__v")
    .populate({ path: "genre", select: "name -_id" });

  res.json(result);
});

Router.post("/", [authentication, authorization], async (req, res) => {
  const { value, error } = InputValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genres.findOne({ name: value.genre });
  if (!genre)
    return res.status(400).send(`${value.genre} is not a valid genre element`);

  value.genre = genre._id;
  const movie = new Movies(value);

  await movie.save();
  res.send("save it successfully!");
});

Router.put("/:model", [authentication, authorization], async (req, res) => {
  const { value, error } = InputValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genres.findOne({ name: value.genre });
  if (!genre)
    return res.status(400).send(`${value.genre} is not a valid genre element`);

  const movie = await Movies.findOne({ model: req.params.model });
  if (!movie)
    return res
      .status(400)
      .send(`${req.params.model} is not a valid movie element`);

  value.genre = genre._id;
  await Movies.updateMany({ model: req.params.model }, { $set: value });
  return res.send("update it successfully!");
});

Router.delete("/:model", [authentication, authorization], async (req, res) => {
  const movie = await Movies.findOne({ model: req.params.model });
  if (!movie)
    return res
      .status(400)
      .send(`${req.params.model} is not a valid movie element`);

  await Movies.deleteMany({ model: req.params.model });
  return res.send("delete it successfully!");
});

Router.get("/:movieName", [authentication, authorization], async (req, res) => {
  const result = await Movies.findOne({ name: req.params.movieName }).select(
    "-_id -__v"
  );
  if (!result)
    return res
      .status(404)
      .send(`${req.params.movieName} is not a valid movie element`);

  const movie = await Movies.find({ name: req.params.movieName })
    .select("-_id -__v")
    .populate({ path: "genre", select: "name -_id" });

  return res.json(movie);
});

module.exports = Router;
