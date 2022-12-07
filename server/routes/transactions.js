const express = require("express");
const router = express.Router();
const Transaction = require("../models/transactionTemplate");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

router.get("/transactions_for_user", async (req, res) => {
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
    let query = null;
    try {
        const filter = { assignedUser: userId };
        if (req.query.startDate && req.query.endDate) {
            // convert date to iso format
            const startISO = new Date(req.query.startDate).toISOString();
            const endISO = new Date(req.query.endDate).toISOString()
            filter.dateCreated = {"$gte": startISO, "$lt": endISO}
        }
        const sortQuery = req.query.sort ? JSON.parse(req.query.sort) : {}
        query = Transaction.find(filter).sort(sortQuery)
        if (req.query.limit) {
            const limitQuery = parseInt(req.query.limit)
            // throw error if parseInt fail
            if (isNaN(limitQuery)) {
                return res.status(400).send({
                    message: "Limit should be a number",
                    data: req.query.limit
                });
            }
            query = query.limit(limitQuery)
        }
    } catch {
        return res.status(400).send({
            message: "Error while parsing params",
            data: req.query
        });
    }
    
    query.exec().then(result => {
        res.status(200).send({
            message: "Transaction retrieved successfully",
            data: result
        })
    }).catch(err => {
        res.status(500).send({
            message: "Internal server error. Unable to retrieve transaction",
            data: []
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

router.get("/transaction_stats_for_user", async (req, res) => {
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
    let filter = { assignedUser: userId };
    try {
        if (req.query.startDate && req.query.endDate) {
            // convert date to iso format
            const startISO = new Date(req.query.startDate).toISOString();
            const endISO = new Date(req.query.endDate).toISOString()
            filter.dateCreated = {"$gte": startISO, "$lt": endISO}
        }
    } catch {
        return res.status(400).send({
            message: "Error while parsing params",
            data: req.query
        });
    }
    
    // Transaction.find(filter).exec().then(result => {
    //     res.status(200).send({
    //         message: "Transaction retrieved successfully",
    //         data: result
    //     })
    // }).catch(err => {
    //     res.status(500).send({
    //         message: "Internal server error. Unable to retrieve transaction",
    //         data: []
    //     })
    // })
    Transaction.aggregate([
        {"$match": filter},
        {"$group": {
            "_id": "$category",
            "sum": {"$sum": "$amount"}
        }},
    ], (err, stats) => {
        if (err) {
            res.status(500).send({
                message: "Internal server error. Unable to retrieve transaction stats",
                data: []
            })
        } else {
            res.status(200).send({
                message: "Transaction stats retrieved successfully",
                data: stats
            })
        }
    })
});

router.delete("/transactions_for_user/:id", async (req, res) => {
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
        Transaction.findByIdAndDelete(req.params._id, function(err, deletedTransaction) {
            if (err) {
                res.status(404).send({
                    message: "cannot find task to delete",
                    data: {}
                });
            }
            else {
                res.status(200).send({
                    message: "Transaction deleted",
                    data: deletedTransaction
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