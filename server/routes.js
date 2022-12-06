const express = require('express');
const app = express();
const router = express.Router();
const createAccount = require('./routes/authentication')
const loadUser = require('./routes/users')
const transaction = require('./routes/transactions')

router.use("/api", createAccount, loadUser, transaction);

module.exports = router;