const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    maxlength: 10,
    unique: false
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    minlength: 5
  },
  isAdmin: {
    type: Boolean,
    require: true,
    default: false
  }
});

userSchema.methods.genJWT = function() {
  const token = jwt.sign({ isAdmin: this.isAdmin }, config.get("JWTkey"));
  return token;
};

const Users = mongoose.model("user", userSchema);

function InputValidation(user) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .min(3)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .required(),
    isAdmin: Joi.boolean()
  });

  return schema.validate(user);
}

module.exports = { Users, InputValidation };
