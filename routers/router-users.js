const Bcrypt = require("bcrypt");
const express = require("express");
const { pick } = require("lodash");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const { Users, InputValidation } = require("../models/users");
const Router = express();

Router.get("/", [authentication, authorization], async (req, res) => {
  const result = await Users.find().select("name email isAdmin -_id");

  res.json(result);
});

Router.post("/", [authentication, authorization], async (req, res) => {
  const { value, error } = InputValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const isUnique = await Users.findOne({ email: value.email });
  if (isUnique)
    return res.status(400).send("There is already a user with that email");

  const salt = await Bcrypt.genSalt(8);
  value.password = await Bcrypt.hash(value.password, salt);

  const user = new Users(pick(value, ["name", "email", "password", "isAdmin"]));

  await user.save();
  const token = user.genJWT();
  res.header("x-auth-JWT", token).send("save it successfully!");
});

Router.put("/:email", [authentication, authorization], async (req, res) => {
  const { value, error } = InputValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const isUnique = await Users.findOne({ email: value.email });
  if (isUnique.email !== req.params.email)
    return res.status(400).send("There is already a user with that email");

  const user = await Users.findOneAndUpdate(
    { email: req.params.email },
    { $set: value }
  );
  if (!user) return res.status(400).send("Invalid user email");

  return res.send("update it successfully!");
});

Router.delete("/:email", [authentication, authorization], async (req, res) => {
  const user = await Users.findOneAndDelete({ email: req.params.email });
  if (!user) return res.status(400).send("Invalid user email");

  return res.send("delete it successfully!");
});

Router.get("/:email", [authentication, authorization], async (req, res) => {
  const result = await Users.findOne({ email: req.params.email }).select(
    "name email isAdmin -_id"
  );
  if (!result) return res.status(400).send("Invalid input category");

  return res.json(result);
});

module.exports = Router;
