var { User } = require('../models/signUpTemplate')
const express = require('express');
const app = express()
const router = express.Router();
const jwt = require("jsonwebtoken");
const Transaction = require("../models/transactionTemplate");
const Joi = require("joi");

router.get("/current_user_info", (req, res) => {
    //console.log(req.headers.authorization)
    if (!(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
        return res.status(403).send({
            message: "Authentication failed"
        });
    }
    const token = req.headers.authorization.split(' ')[1];
    //console.log(token)
    try {
        jwt.verify(token, process.env.JWTPRIVATEKEY);
    } catch {
        //console.log("here")
        return res.status(403).send({
            message: "Authentication failed"
        });
    }
    const userId = jwt.verify(token, process.env.JWTPRIVATEKEY)._id;
    User.findById(userId)
    .exec()
        .then(user => {
            if (user) {
                return res.status(200).send({
                    message: 'Users Retrieved',
                    data: user
                });
            } else {
                return res.status(404).send({
                    message: 'User Not Found',
                    data: userId
                });
            }
        })
        .catch(err => {
            return res.status(500).send({
                message: 'Server Error',
                data: []
            });
        });
  });


  router.delete("/users", async (req, res) => {
    if (!(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
        return res.status(403).send({
            message: "Authentication failed",
            data: []
        });
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
        jwt.verify(token, process.env.JWTPRIVATEKEY);
    } catch {
        return res.status(403).send({
            message: "Authentication failed",
            data: []
        });
    }
    const userId = jwt.verify(token, process.env.JWTPRIVATEKEY)._id;
    try {
        User.findByIdAndDelete(userId, function(err, deletedUser) {
            if (err) {
                res.status(404).send({
                    message: "User does not exist",
                    data: userId
                });
            }
            else {
                res.status(200).send({
                    message: "User deleted successfully",
                    data: deletedUser
                });
            }
        });
    } catch {
        return res.status(500).send({ 
            message: "Internal server error. Failed to create transaction"
        });
    }
});  

const validate = (data) => {
    const schema = Joi.object({
      description: Joi.string().label("Description"),
      category: Joi.string().required().label("Category"),
      dateCreated: Joi.date().label("Date"),
      amount: Joi.number().label("Amount")
    });
    return schema.validate(data);
};


module.exports = router;