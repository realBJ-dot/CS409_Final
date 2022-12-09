const express = require('express');
const app = express();
const router = express.Router();
const createAccount = require('./routes/authentication')
const loadUser = require('./routes/users')
const userTransactions = require('./routes/userTransactions')
const singleTransaction = require('./routes/singleTransaction')

router.use("/api", createAccount, loadUser, userTransactions, singleTransaction);

module.exports = router;