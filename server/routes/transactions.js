const express = require("express");
const router = express.Router();
const Transaction = require("../models/transactionTemplate");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

router.get("/transactions_for_user", async (req, res) => {
    if (!(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
        return res.status(403).send({
            message: "Authentication failed"
        });
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
        jwt.verify(token, process.env.JWTPRIVATEKEY);
    } catch {
        return res.status(403).send({
            message: "Authentication failed"
        });
    }
    const userId = jwt.verify(token, process.env.JWTPRIVATEKEY)._id;
    Transaction.find({assignedUser: userId}).then(result => {
        res.status(200).send({
            message: "Transaction retrieved successfully",
            data: result
        })
    }).catch(err => {
        res.status(200).send({
            message: "Internal server error. Unable to retrieve transaction"
        })
    })
});

router.post("/transactions_for_user", async (req, res) => {
    if (!(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
        return res.status(403).send({
            message: "Authentication failed"
        });
    }
    const token = req.headers.authorization.split(' ')[1];
    const { schemaValidationError } = validate(req.body);
    if (schemaValidationError) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    try {
        jwt.verify(token, process.env.JWTPRIVATEKEY);
    } catch {
        return res.status(403).send({
            message: "Authentication failed"
        });
    }
    const userId = jwt.verify(token, process.env.JWTPRIVATEKEY)._id;
    try {
        const newTransaction = new Transaction({
            assignedUser: userId,
            ...req.body,
        })
        await newTransaction.save();
        return res.status(201).send({ 
            message: "Transaction created successfully",
            data: newTransaction
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