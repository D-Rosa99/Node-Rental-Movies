const express = require("express");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const { Genres, InputValidation } = require("../models/genres");
const Router = express();

Router.get("/", authentication, async (req, res) => {
  const result = await Genres.find().select("name -_id");

  res.json(result);
});

Router.post("/", [authentication, authorization], async (req, res) => {
  const { value, error } = InputValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const isUnique = await Genres.findOne({ name: value.name });
  if (isUnique)
    return res.status(400).send("There is already a genre with that name");

  const genre = new Genres(value);

  await genre.save();
  res.send("save it successfully!");
});

Router.put("/:name", [authentication, authorization], async (req, res) => {
  const { value, error } = InputValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const isUnique = await Genres.findOne({ name: value.name });
  if (isUnique)
    return res.status(400).send("There is already a genre with that name");

  const genre = await Genres.findOneAndUpdate(
    { name: req.params.name },
    { $set: value }
  );
  if (!genre) return res.status(400).send("Invalid input genre");

  return res.send("update it successfully!");
});

Router.delete("/:name", [authentication, authorization], async (req, res) => {
  const genre = await Genres.findOneAndDelete({ name: req.params.name });
  if (!genre) return res.status(400).send("Invalid input genre");

  return res.send("delete it successfully!");
});

Router.get("/:name", [authentication, authorization], async (req, res) => {
  const result = await Genres.findOne({ name: req.params.name }).select(
    "name -_id"
  );
  if (!result) return res.status(400).send("Invalid input genre");

  return res.json(result);
});

module.exports = Router;
