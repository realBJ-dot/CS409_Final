const express = require("express");
const router = express.Router();
const signUpTemplateCopy = require("../models/signUpTemplate");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.get("/signup", (req, res) => {
  console.log("signup");
});


router.post("/signup", async (req, res) => {

  try {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send({message: error.details[0].message});
    }
    const userName = await signUpTemplateCopy.User.findOne({
        userName: req.body.userName
    });
    const userEmail = await signUpTemplateCopy.User.findOne({
        email: req.body.email
    })
    if (userName) {
        return res.status(409).send({message: "This Username alreay exist"});
    } else if (userEmail) {
        return res.status(409).send({message: "This Email alreay exist"});
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new signUpTemplateCopy.User({
        ...req.body,
        password: hashPassword,
    }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal server issue" });
  }
});

router.get("/login", (req, res) => {
    console.log("LOGIN");
});


router.post("/login", async (req, res) => {
  try {
    const { err } = validate(req.body);
    if (err) return res.status(400).send({ message: err.detail[0].message });

    const user = await signUpTemplateCopy.User.findOne({
        userName: req.body.userName,
    });
    console.log(user)
    if (!user) {
        return res.status(401).send({
            message: "Invalid Username or Password, please check again",
        });
    }
      

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword) {
        return res.status(401).send({
            message: "Invalid Username or Password, please check again",
        });
    }
     
    const token = user.generateAuthToken();
    res.status(200).send({ token: token, message: "You are in now!!" });
  } catch (err) {
    res.status(500).send({ message: "Internal server issues" });
  }
});


const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        userName: Joi.string().required().label("User Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = router;
