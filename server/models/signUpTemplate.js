const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");

const signUpTemplate = new mongoose.Schema(
  {
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      equired: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);
//generate Token for account
signUpTemplate.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "10d",
  });
  return token;
};

const User = mongoose.model("users", signUpTemplate);
//Validating data before export to database
const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    userName: Joi.string().required().label("User Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().require().label("Passowrd"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
