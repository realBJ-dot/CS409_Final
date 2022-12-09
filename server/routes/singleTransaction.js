const express = require("express");
const router = express.Router();
const Transaction = require("../models/transactionTemplate");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

router.delete("/transaction/:id", async (req, res) => {
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
    const transactionId = req.params.id;
    try {
        Transaction.findById(transactionId).then(async transaction => {
            if (!transaction) {
                res.status(404).send({
                    message: `Transaction with id ${transactionId} does not exist`,
                    data: {}
                });
            } else if (transaction.assignedUser !== userId) {
                return res.status(400).send({
                    message: "Transaction does not belong to current user",
                    data: {
                        "current user": userId,
                        "transaction belongs to": transaction.assignedUser
                    }
                })
            } else {
                await Transaction.deleteOne({_id: transactionId});
                return res.status(200).send({ 
                    message: "Transaction deleted successfully",
                    data: transaction
                });
            }
        })
    } catch {
        return res.status(500).send({ 
            message: "Internal server error. Failed to delete transaction"
        });
    }
});

module.exports = router;