const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const RentalMovie = mongoose.model(
  "Rental",
  new mongoose.Schema({
    movie: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
      }
    ],
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },
    dateOfRent: {
      type: Date,
      required: true,
      default: Date.now()
    },
    isValidBill: {
      type: Boolean,
      required: true,
      default: true
    },
    totalPrice: {
      type: Number,
      required: true
    }
  })
);

function InputValidation(rentalMovie) {
  const schema = Joi.object({
    movie: Joi.array().required(),
    customer: Joi.string().required()
  });

  return schema.validate(rentalMovie);
}

module.exports = { RentalMovie, InputValidation };
