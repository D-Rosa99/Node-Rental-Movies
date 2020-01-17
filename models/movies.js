const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const Movies = mongoose.model(
  "Movie",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    isAvaliable: {
      type: Boolean,
      required: true,
      default: true
    },
    price: {
      type: Number,
      required: true
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Genre"
    }
  })
);

function InputValidation(movie) {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    genre: Joi.string()
      .min(3)
      .required()
  });

  return schema.validate(movie);
}

module.exports = { Movies, InputValidation };
