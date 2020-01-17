const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const Genres = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true
    }
  })
);

function InputValidation(genre) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required()
  });

  return schema.validate(genre);
}

module.exports = { Genres, InputValidation };
